import { Card, CardContent } from "@/components/ui/card";
import { FilePlus } from "lucide-react";
import React, { useRef } from "react";
import { toast } from "sonner";
import { Button } from "./button";

type FileObject = {
  name: string;
  size: string;
  file: string;
};

interface DropzoneProps {
  onChange: React.Dispatch<React.SetStateAction<FileObject[]>>;
  className?: string;
  fileExtension?: string;
}

export function Dropzone({
  onChange,
  className,
  fileExtension,
  ...props
}: DropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to file input element
  // Function to handle drag over event
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Function to handle drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    handleFiles(files);
  };

  // Function to handle file input change event
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      handleFiles(files);
    }
  };

  // Function to handle processing of uploaded files
  const handleFiles = (files: FileList) => {
    const uploadedFile = files[0];

    // Check file extension
    if (fileExtension && !uploadedFile.name.endsWith(`.${fileExtension}`)) {
      toast.error(`File type not supported!`);
      return;
    }

    const fileObjects = Array.from(files).map((file) => ({
      name: file.name,
      size: (file.size / 1024).toFixed(2), // Size in KB rounded to 2 decimal places
      file: URL.createObjectURL(file),
    }));

    onChange((prevFiles) => [...prevFiles, ...fileObjects]);
  };

  // Function to simulate a click on the file input element
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card
      className={`border-2 border-dashed bg-muted shadow-none hover:cursor-pointer hover:border-muted-foreground/50 ${className}`}
      {...props}
    >
      <CardContent
        className="flex flex-col items-center justify-center space-y-2 px-2 py-4 text-xs"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4 text-sm text-muted-foreground">
          <Button
            variant="outline"
            className="flex h-10"
            onClick={handleButtonClick}
          >
            <FilePlus className="mr-1.5 h-5 w-5" />
            Browse files
          </Button>
          <span className="text-xs text-muted-foreground">OR</span>
          <span className="">Drop files here</span>
          <span className="text-xs text-muted-foreground/60">
            Only {fileExtension?.toUpperCase()} files supported
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept={`.${fileExtension}`} // Set accepted file type
            onChange={handleFileInputChange}
            className="hidden"
            multiple
          />
        </div>
      </CardContent>
    </Card>
  );
}
