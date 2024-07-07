"use client";
import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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

  return (
    <img
      ref={(node) => {
        ref(drop(node));
      }}
      src={src}
      alt={`Image ${index + 1}`}
      className={className}
    />
  );
}

export default function ViewPage() {
  const [imageArray, setImageArray] = useState([
    "test.png",
    "test.png",
    "tiktok.png",
    "test.png",
    "test.png",
    "test.png",
    "test.png",
  ]);

  const moveImage = (fromIndex: number, toIndex: number) => {
    const updatedArray = [...imageArray];
    const [movedImage] = updatedArray.splice(fromIndex, 1);
    updatedArray.splice(toIndex, 0, movedImage);
    setImageArray(updatedArray);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-6 gap-4 px-2 py-2">
        {imageArray.map((src, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-center mb-2">{index + 1}</div>
            <div className="transition-transform duration-300 transform hover:scale-105 z-10 border-white rounded-md overflow-hidden aspect-[7/12]">
              <Draggable
                index={index}
                src={src}
                className="object-cover w-full h-full"
                moveImage={moveImage}
              />
            </div>
          </div>
        ))}
      </div>
    </DndProvider>
  );
}