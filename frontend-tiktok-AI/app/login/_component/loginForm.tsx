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
  async function handleLogin() {}

  return (
    <Card className="w-full max-w-md border sm:rounded-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your credentials below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button type="submit" className="mt-4 w-full">
          Login
        </Button>
      </CardContent>
    </Card>
  );
}
