"use client";
import { ImgContext } from "@/app/imgContext";
import { XCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Button } from "./ui/button";
import { Dropzone } from "./ui/dropzone";

type FileObject = {
  name: string;
  size: string;
  file: string;
};

export default function FileUploader() {
  const context = useContext(ImgContext);
  const { files, setFiles, llmResponse, setLlmResponse } = context ?? {};

  const router = useRouter();
  // Remove a file from the files array
  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleReorder = async () => {
    const formattedFiles = files.map((file, index) => ({
      type: "image_url",
      image_url: { url: files[index].file },
    }));

    const additionalDictionary = {
      type: "text",
      text: "I am creating a TikTok slideshow post. I have a list of images that I want to arrange meaningfully to tell a story and generate captions. Feel free to rearrange the images and highlight details such as main objects, time of day, and locations. Please return the rearranged images in a valid JSON strictly following this template format: { 'details':{'main_objects':[],'time_of_day':'','location':'','caption':''},'original_position': 0}. Do not add any description in front of the valid JSON.",
    };

    // Prepend the additional dictionary
    const finalFormattedFiles = [additionalDictionary, ...formattedFiles];
    console.log(JSON.stringify({input:finalFormattedFiles}))
    const aiResponse = await fetch("/api/image", {
      method: "POST",
      body: JSON.stringify({
        input: finalFormattedFiles,
      }),
    });

    const responseData = await aiResponse.json();

    // Set llmResponse with the response data
    setLlmResponse(JSON.parse(responseData));

    router.push("/edit");
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
            <Button className="flex h-8 font-normal" onClick={handleReorder}>
              Reorder
            </Button>
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
