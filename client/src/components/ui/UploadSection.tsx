import { Button } from "@/components/ui/button";
import app from "@/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

function UploadSection() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageProgress, setImageProgress] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      if (droppedFile.size > MAX_FILE_SIZE) {
        setUploadError("File size exceeds 5 MB.");
        return;
      }
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE) {
        setUploadError("File size exceeds 5 MB.");
        return;
      }
      setFile(selectedFile);
      setUploadError(null);
    }
  };

  useEffect(() => {
    if (file) {
      uploadImageFile();
    }
  }, [file]);

  const uploadImageFile = useCallback(async () => {
    if (file) {
      setImageUploading(true);

      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageProgress(progress.toFixed(0));
        },
        (err) => {
          console.log(err);
          setUploadError(err.message);
          setImageUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImageUrl(url);
            setImageUploading(false);
            setUploadError(null);
          });
        }
      );
    }
  }, [file]);

  const handleSubmit = async () => {
    if (!imageUrl) {
      console.error("Image URL is not available.");
      return;
    }

    try {
      const res = await axios.post(
        "/api/upload",
        { imageUrl },
        { withCredentials: true }
      );
      console.log("Backend Response:", res.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const isUploading = imageUploading || imageProgress !== null;

  return (
    <div className="mt-12">
      <div className="flex items-center justify-center p-6">
        <div>
          <div
            onDragOver={!isUploading ? handleDragOver : undefined}
            onDragLeave={!isUploading ? handleDragLeave : undefined}
            onDrop={!isUploading ? handleDrop : undefined}
            className={`w-96 mb-4 p-4 h-32 border-2 border-dashed ${
              dragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            } flex items-center justify-center text-zinc-300 ${
              isUploading ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            {file ? <p>{file.name}</p> : <p>Drag & Drop your file here or click to upload</p>}
          </div>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-4"
            style={{ display: "none" }}
            id="fileInput"
          />
          <div className="flex items-center mt-2 justify-between">
            <label
              htmlFor="fileInput"
              className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
            >
              Choose File
            </label>
            <Button
              variant={"outline"}
              size={"lg"}
              disabled={isUploading || !imageUrl}
              onClick={handleSubmit}
            >
              {imageUploading ? "Uploading..." : "Submit"}
            </Button>
          </div>
        </div>
      </div>
      {imageProgress && (
        <div className="flex justify-center mt-4">
          <Progress value={+imageProgress} className="w-96" />
        </div>
      )}
      {uploadError && <p className="text-red-500">{uploadError}</p>}
    </div>
  );
}

export default UploadSection;
