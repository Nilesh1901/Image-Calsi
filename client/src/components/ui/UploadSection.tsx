import { Button } from "@/components/ui/button";
import app from "@/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import axios from "axios";
import { useCallback, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component
import ProductDetail from "./ProductDetail";
import ProductDetailSkeleton from "./ProductDetailSkeleton";

function UploadSection() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [imageProgress, setImageProgress] = useState<number>(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false); // Loading state for backend processing
  const { toast } = useToast();
  const user = useSelector((state: any) => state.user);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) validateFile(droppedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) validateFile(selectedFile);
  };

  const validateFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      setUploadError("File size exceeds 5 MB.");
      toast({
        title: "File size exceeds 5 MB."!,
        description: "error",
      });
    } else {
      setFile(file);
      setUploadError(null);
    }
  };

  const uploadImageFile = useCallback(async (): Promise<string> => {
    if (!file) throw new Error("No file selected.");
    setImageUploading(true);

    const storage = getStorage(app);
    const fileName = Date.now() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageProgress(progress);
        },
        (err) => {
          console.error(err);
          setUploadError(err.message);
          setImageUploading(false);
          reject(err);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setImageUploading(false);
          setFile(null);
          resolve(url); // Return the URL
        }
      );
    });
  }, [file]);

  const handleSubmit = async () => {
    setProducts([]);
    setTotalPrice(null);

    if (!user) {
      toast({ title: "Please log in before uploading.", description: "error" });
      return;
    }

    try {
      const url = await uploadImageFile(); // Get the URL directly

      setIsCalculating(true);

      const { data } = await axios.post(
        "/api/upload",
        { imageUrl: url }, // Use the URL here
        { withCredentials: true }
      );
      console.log(data);
      setProducts(data.products);
      setTotalPrice(data.totalPrice);
      toast({ title: "Upload successful!", description: "success" });
    } catch (err: any) {
      toast({
        title: err.response?.data?.message || err.message || "Error.",
        description: "error",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="mt-12">
      <div className="flex items-center justify-center p-6">
        <div>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`w-96 mb-4 p-4 h-32 border-2 border-dashed ${
              dragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            } flex items-center justify-center text-gray-500`}
          >
            {file ? <p>{file.name}</p> : <p>Drag & Drop or click to upload</p>}
          </div>

          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <div className="flex items-center mt-2 justify-between">
            <label
              htmlFor="fileInput"
              className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
            >
              Choose File
            </label>
            <Button
              variant="outline"
              size="lg"
              disabled={imageUploading || !file || isCalculating}
              onClick={handleSubmit}
            >
              {imageUploading
                ? "Uploading..."
                : isCalculating
                ? "Calculating Total..."
                : "Submit"}
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {imageUploading && (
        <div className="flex justify-center mt-4">
          <Progress value={imageProgress} className="w-96" />
        </div>
      )}

      {/* Errors */}
      {uploadError && <p className="text-red-500 mt-2">{uploadError}</p>}

      {/* Results */}
      {isCalculating ? (
        <ProductDetailSkeleton />
      ) : products.length > 0 ? (
        <div className="w-full flex justify-center mt-10">
          <ProductDetail products={products} totalPrice={totalPrice} />
        </div>
      ) : null}

      <Toaster />
    </div>
  );
}

export default UploadSection;
