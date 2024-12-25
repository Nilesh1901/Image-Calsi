import { Button } from "@/components/ui/button";
import { useState } from "react";

function UploadSection() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  console.log(file);

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
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  return (
    <div className=" mt-12">
      <div className="flex items-center justify-center p-6">
        <form action="">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`w-96 mb-4 p-4 h-32 border-2 border-dashed ${
              dragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            } flex items-center justify-center text-zinc-300`}
          >
            {file ? (
              <p>{file.name}</p>
            ) : (
              <p>Drag & Drop your file here or click to upload</p>
            )}
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
              className=" px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
            >
              Choose File
            </label>
            <Button variant={"outline"} size={"lg"}>
              Upload
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadSection;
