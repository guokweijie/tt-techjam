// pages/index.js
"use client"
import FileUploader from "@/components/file-uploader";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Upload() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    const fetchData = async () => {
      if (code) {
        try {
          const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          });
          const data = await response.json();
          console.log('Fetched data:', data);
          localStorage.setItem('accessToken', data.access_token);
          console.log('Token set in local storage:', data.access_token);
        } catch (error) {
          console.error('Error exchanging code for token:', error);
        }
      }
    };

    fetchData();
  }, [code]);

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
