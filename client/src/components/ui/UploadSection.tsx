import { Button } from "@/components/ui/button";
import app from "@/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import axios from "axios";
import { useCallback, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import ProductDetail from "./ProductDetail";
import ProductDetailSkeleton from "./ProductDetailSkeleton";

function UploadSection() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [imageProgress, setImageProgress] = useState<number | null>(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const user = useSelector((state: any) => state.user);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

  // handleing drag and drop functionality of input
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

  // validating image it should not more then 5MB
  const validateFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      const errorMsg = "File size exceeds 5 MB.";
      setUploadError(errorMsg);
      toast({ title: errorMsg, description: "error" });
    } else {
      setFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
      setUploadError(null);
    }
  };

  // uploading image to firebase
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
          setUploadError(err.message || "Upload failed.");
          setImageUploading(false);
          reject(err);
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            setImageUploading(false);
            setFile(null); // Clear the file after uploading
            resolve(url); // Return the URL
          } catch (error) {
            setUploadError("Error fetching the download URL.");
            setImageUploading(false);
            reject(error);
          }
        }
      );
    });
  }, [file]);

  // uploading the image to backend
  const handleSubmit = async () => {
    // Reset previous results and state before uploading
    setProducts([]);
    setTotalPrice(null);
    setImageProgress(null);
    setUploadError(null);
    setImagePreviewUrl(null);

    if (!user.username || !user._id) {
      toast({ title: "Please log in before uploading.", description: "error" });
      return;
    }

    try {
      const url = await uploadImageFile(); // Get the URL directly

      setIsCalculating(true);

      const { data } = await axios.post(
        "/api/upload",
        { imageUrl: url },
        { withCredentials: true }
      );
      setProducts(data.products);
      setTotalPrice(data.totalPrice);
      toast({ title: "Upload successful!", description: "success" });
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "An unexpected error occurred.";
      toast({ title: errorMsg, description: "error" });
    } finally {
      setIsCalculating(false);
    }
  };

  // Reset the file input value after upload
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input value
    }
  };

  return (
    <div className="mt-12">
      {/* { file input } */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full md:w-auto flex flex-col items-center justify-center">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`w-full md:w-96 mb-4 p-4 h-32 border-2 border-dashed ${
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
            ref={fileInputRef} // Add ref to the file input
          />
          <div className="w-full gap-3 flex items-center justify-between mt-2">
            <label
              htmlFor="fileInput"
              className="text-xs md:text-base px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
            >
              Choose File
            </label>
            <Button
              variant="outline"
              size="custom2"
              disabled={imageUploading || !file || isCalculating}
              onClick={() => {
                handleSubmit();
                resetFileInput(); // Reset file input after submit
              }}
            >
              {imageUploading
                ? "Uploading..."
                : isCalculating
                ? "Calculating Total..."
                : "Submit"}
            </Button>
          </div>
          <div className="flex justify-center mt-4">
            <img
              src={imagePreviewUrl || ""}
              alt=""
              className="w-full object-cover"
            />
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
        <div className="w-full px-4 md:p-0 flex justify-center mt-10">
          <ProductDetail products={products} totalPrice={totalPrice} />
        </div>
      ) : null}

      <Toaster />
    </div>
  );
}

export default UploadSection;
