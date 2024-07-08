"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginForm() {

  const handleLogin = async () => {
    // const state = Math.random().toString(36).substring(2);
    // const authUrl = `https://www.tiktok.com/auth/authorize/?client_key=${CLIENT_KEY}&response_type=code&scope=user.info.basic&redirect_uri=${encodeURIComponent("https://localhost:3000")}&state=${state}`;
    // window.location.href = authUrl;
    // window.location.href = authUrl;
    window.location.href = '/api/auth';
  };

  return (
    <Card className="w-full max-w-md border sm:rounded-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your credentials below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button type="submit" className="mt-4 w-full" onClick = {handleLogin} >
          Login
        </Button>
      </CardContent>
    </Card>
  );
}
