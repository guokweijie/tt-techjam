"use client";
import { PutBlobResult } from "@vercel/blob";
import React, { ReactNode, createContext, useState } from "react";

interface ImgContextType {
  llmResponse: any;
  setLlmResponse: (response: any) => void;
  storedFiles: PutBlobResult[];
  setStoredFiles: React.Dispatch<React.SetStateAction<PutBlobResult[]>>;
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
  const [storedFiles, setStoredFiles] = useState<PutBlobResult[]>([]);

  return (
    <ImgContext.Provider
      value={{ llmResponse, setLlmResponse, storedFiles, setStoredFiles }}
    >
      {children}
    </ImgContext.Provider>
  );
};
