// pages/index.js
"use client"
import { useRouter, useSearchParams } from "next/navigation";
import LoginForm from "./login/_component/loginForm";

export default function Home() {
  
  return (
    <div className="flex flex-col items-center py-6 md:py-8 lg:py-12">
      <LoginForm/>
    </div>
  );
}
