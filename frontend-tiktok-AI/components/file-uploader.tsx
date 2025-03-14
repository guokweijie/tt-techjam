"use client";
import { ImgContext } from "@/app/imgContext";
import { type PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { XCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { Button } from "./ui/button";
import { Dropzone } from "./ui/dropzone";

type FileObject = {
  name: string;
  size: string;
  file: string;
};

export default function FileUploader() {
  const context = useContext(ImgContext);
  const { storedFiles, setStoredFiles, llmResponse, setLlmResponse } =
    context ?? {};

  const router = useRouter();
  // Remove a file from the files array
  const removeFile = (index: number) => {
    const newFiles = [...storedFiles];
    newFiles.splice(index, 1);
    setStoredFiles(newFiles);
  };

  const handleReorder = async () => {
    
    const formattedFiles = storedFiles.map((file: any, index) => ({
      type: "image_url",
      image_url: { url: storedFiles[index].file },
    }));
      
    const additionalDictionary = {
      type: "text",
      text: "I am creating a TikTok slideshow post. I have a list of images that I want to arrange meaningfully to tell a story and generate captions. Feel free to rearrange the images and highlight details such as main objects, time of day, and locations, original position is the index of the image starting from 0. Please return the rearranged images in JSON format return me the same number of images uploaded. Here's an example format: { 'details':{'main_objects':[],'time_of_day':'','location':'','caption':''},'original_position': 0}, do not return me any other text, i want it in a valid JSON string , do not give me extra ```",
    };
    // Prepend the additional dictionary
    const finalFormattedFiles = [additionalDictionary, ...formattedFiles];

    const aiResponse = await fetch("/api/image", {
      method: "POST",
      body: JSON.stringify({
        input: finalFormattedFiles,
      }),
    });

    const responseData = await aiResponse.json();
    console.log(responseData);

    // Set llmResponse with the response data
    setLlmResponse(JSON.parse(responseData));

    router.push("/edit");
  };

  return (
    <div className="container max-w-3xl">
      {storedFiles.length === 0 && (
        <div className="py-6">
          <Dropzone
            onChange={setStoredFiles}
            className="flex h-[260px] w-full items-center justify-center bg-white"
            fileExtension="jpg"
          />
        </div>
      )}

      {storedFiles.length > 0 && (
        <div className="py-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className=" font-medium tracking-tight">
              {storedFiles.length} Files Uploaded
            </h2>
            <Button className="flex h-8 font-normal" onClick={handleReorder}>
              Reorder
            </Button>
          </div>

          <div
            role="list"
            className="divide-y divide-gray-100 rounded-lg border border-muted"
          >
            {storedFiles.map((file, index) => (
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
