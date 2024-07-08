// pages/index.js
"use client"
import FileUploader from "@/components/file-uploader";
import { useRouter, useSearchParams } from "next/navigation";

export default function Upload() {
  try {
    const searchParams = useSearchParams();
    const code=searchParams.get('code')
    console.log(code)
    fetch('/api/tiktok-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Handle the access token as needed, e.g., store it in local storage or context
      })
      .catch((error) => {
        console.error('Error exchanging code for token:', error);
      });
  } catch (error) {
    console.error('Error parsing code from URL:', error);
  }
  return (
    <div className="flex flex-col items-center py-6 md:py-8 lg:py-12">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
          SequenceSnap
        </h1>
        <p className="text-sm capitalize text-gray-600">
          Smart Sequencing Made Easy.
        </p>
      </div>
      <FileUploader />
    </div>
  );
}
