"use client";
import { PutBlobResult } from "@vercel/blob";
import React, { ReactNode, createContext, useState } from "react";

export interface FileObject {
  name: string;
  size: string;
  file: string;
}

interface ImgContextType {
  llmResponse: any;
  setLlmResponse: (response: any) => void;
  storedFiles: FileObject[];
  setStoredFiles: React.Dispatch<React.SetStateAction<FileObject[]>>;
}

const defaultContextValue: ImgContextType = {
  llmResponse: [],
  setLlmResponse: () => {},
  storedFiles: [],
  setStoredFiles: () => {},
};

export const ImgContext = createContext<ImgContextType>(defaultContextValue);

export const ImgProvider = ({ children }: { children: ReactNode }) => {
  const [llmResponse, setLlmResponse] = useState([]);
  const [storedFiles, setStoredFiles] = useState<FileObject[]>([]);

  return (
    <ImgContext.Provider
      value={{ llmResponse, setLlmResponse, storedFiles, setStoredFiles }}
    >
      {children}
    </ImgContext.Provider>
  );
};
