// pages/index.js
"use client"
import FileUploader from "@/components/file-uploader";
import TikTokLoginButton from "@/components/TikTokLoginButton";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import LoginForm from "./login/_component/loginForm";

export default function Home() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    console.log(code)
    console.log(state)

    if (code && state) {
      // Redirect to an API route to exchange the code for a token

      fetch('https://open.tiktokapis.com/v2/oauth/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          client_key: process.env.CLIENT_KEY,
          client_secret: process.env.CLIENT_SECRET,
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: process.env.REDIRECT_URI,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Handle the access token as needed, e.g., store it in local storage or context
        })
        .catch((error) => {
          console.error('Error exchanging code for token:', error);
        });
    }
  }, [searchParams]);
  return (
    <div className="flex flex-col items-center py-6 md:py-8 lg:py-12">
      <LoginForm/>
    </div>
  );
}
