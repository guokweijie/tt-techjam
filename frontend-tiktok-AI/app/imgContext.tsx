"use client";
import React, { ReactNode, createContext, useState } from "react";

interface FileObject {
  name: string;
  size: string;
  file: string;
}

interface ImgContextType {
  llmResponse: any;
  setLlmResponse: (response: any) => void;
  files: FileObject[];
  setFiles: React.Dispatch<React.SetStateAction<FileObject[]>>;
}

const defaultContextValue: ImgContextType = {
  llmResponse: [],
  setLlmResponse: () => {},
  files: [],
  setFiles: () => {},
};

export const ImgContext = createContext<ImgContextType>(defaultContextValue);

export const ImgProvider = ({ children }: { children: ReactNode }) => {
  const [llmResponse, setLlmResponse] = useState([]);
  const [files, setFiles] = useState<FileObject[]>([]);

  return (
    <ImgContext.Provider
      value={{ llmResponse, setLlmResponse, files, setFiles }}
    >
      {children}
    </ImgContext.Provider>
  );
};
