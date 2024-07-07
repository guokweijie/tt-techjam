"use client";
import { useContext, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ImgContext } from "../imgContext";

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
  const { files, llmResponse } = useContext(ImgContext);
  console.log("ok");
  console.log(files);
  console.log(llmResponse);

  const mappedData = llmResponse.map((item: any) => ({
    image: files[item.original_position].file,
  }));

  const [imageArray, setImageArray] = useState(mappedData);
  console.log(imageArray);
  const moveImage = (fromIndex: number, toIndex: number) => {
    const updatedArray = [...imageArray];
    const [movedImage] = updatedArray.splice(fromIndex, 1);
    updatedArray.splice(toIndex, 0, movedImage);
    setImageArray(updatedArray);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-6 gap-4 px-2 py-2">
        {imageArray.map((image: string, index: number) => (
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
  );
}
