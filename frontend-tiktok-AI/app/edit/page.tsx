"use client";
import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ImgContext } from "../imgContext";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { PutBlobResult } from "@vercel/blob";
import { FileObject } from "openai/resources/files.mjs";

const ItemTypes = {
  IMAGE: "image",
};

function Draggable({
  src,
  index,
  moveImage,
  className,
}: {
  src: string;
  index: number;
  moveImage: (fromIndex: number, toIndex: number) => void;
  className: string;
}) {
  const [, ref] = useDrag({
    type: ItemTypes.IMAGE,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.IMAGE,
    hover(item: { index: number }) {
      if (item.index !== index) {
        moveImage(item.index, index);
        item.index = index;
      }
    },
  });
  console.log(src);

  return (
    <img
      ref={(node) => {
        ref(drop(node));
      }}
      // @ts-ignore
      src={src.image}
      alt={`Image ${index + 1}`}
      className={className}
    />
  );
}

export default function ViewPage() {
  // console.log(window.localStorage.getItem('accessToken'));
  const { storedFiles, llmResponse } = useContext(ImgContext);
  console.log(localStorage.getItem("accessToken"));
  const mappedData = llmResponse.map((item: any) => ({
    image: storedFiles[item.original_position].file,}))

  const [imageArray, setImageArray] = useState(mappedData);

  const moveImage = (fromIndex: number, toIndex: number) => {
    const updatedArray = [...imageArray];
    const [movedImage] = updatedArray.splice(fromIndex, 1);
    updatedArray.splice(toIndex, 0, movedImage);
    setImageArray(updatedArray);
  };

  const [openCaptionModal, setOpenCaptionModal] = useState(false);
  const CaptionModalComponent = dynamic(
    () => import("@/components/caption-modal"),
  );

  return (
    <>
      <div className="container space-y-4 py-6 md:py-8 lg:py-12">
        <div className="flex items-center justify-center rounded-lg border">
          <DndProvider backend={HTML5Backend}>
            <div className="grid grid-cols-6 gap-4 px-2 py-2">
              {imageArray.map((image: any, index: number) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="mb-2 text-center">{index + 1}</div>
                  <div className="z-10 aspect-[7/12] transform overflow-hidden rounded-md border-white transition-transform duration-300 hover:scale-105">
                    <Draggable
                      index={index}
                      src={image}
                      className="h-full w-full object-cover"
                      moveImage={moveImage}
                    />
                  </div>
                </div>
              ))}
            </div>
          </DndProvider>
        </div>

        <Button
          className="w-full font-normal"
          onClick={() => setOpenCaptionModal(true)}
        >
          Next
        </Button>
      </div>

      <CaptionModalComponent
        open={openCaptionModal}
        setIsOpen={setOpenCaptionModal}
        onSubmit={(caption) => {
          console.log(caption); // Use this return together with the rearrange images to upload to tiktok
          setOpenCaptionModal(false);
          
        }}
      />
    </>
  );
}
