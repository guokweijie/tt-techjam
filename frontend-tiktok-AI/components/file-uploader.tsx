"use client";
import { XCircleIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Dropzone } from "./ui/dropzone";

type FileObject = {
  name: string;
  size: string;
  file: string;
};

export default function FileUploader() {
  const [files, setFiles] = useState<FileObject[]>([]);
  console.log(files);

  // Remove a file from the files array
  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <div className="container max-w-3xl">
      {files.length === 0 && (
        <div className="py-6">
          <Dropzone
            onChange={setFiles}
            className="flex h-[260px] w-full items-center justify-center bg-white"
            fileExtension="png"
          />
        </div>
      )}

      {files.length > 0 && (
        <div className="py-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className=" font-medium tracking-tight">
              {files.length} Files Uploaded
            </h2>
            <Button className="flex h-8 font-normal">Convert</Button>
          </div>

          <div
            role="list"
            className="divide-y divide-gray-100 rounded-lg border border-muted"
          >
            {files.map((file, index) => (
              <div
                key={index}
                className="flex flex-row items-center justify-between px-4 py-2.5"
              >
                <div className="text-sm">
                  {file.name}{" "}
                  <span className="text-xs text-muted-foreground">
                    ({file.size}KB)
                  </span>
                </div>
                {/* prettier-ignore */}
                <Button variant="ghost" size="sm" className="group h-fit w-fit p-2 hover:bg-transparent" onClick={() => removeFile(index)}>
                  <XCircleIcon className="h-5 w-5 text-gray-600 group-hover:text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
