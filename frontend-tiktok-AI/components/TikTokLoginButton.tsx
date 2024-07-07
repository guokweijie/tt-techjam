// components/TikTokLoginButton.js
"use client";

const TikTokLoginButton = () => {
  const CLIENT_KEY = "sbawgbcd6kwg0yhkmk";
  const REDIRECT_URI = "http://localhost:3000/callback";

  const handleLogin = () => {
    const state = Math.random().toString(36).substring(2);
    const authUrl = `https://www.tiktok.com/auth/authorize/?client_key=${CLIENT_KEY}&response_type=code&scope=user.info.basic&redirect_uri=${encodeURIComponent("http://localhost:3000/callback")}&state=${state}`;
    window.location.href = authUrl;
    window.location.href = authUrl;
  };

  return (
    <button
      onClick={handleLogin}
      className="mt-4 rounded bg-blue-500 p-2 text-white"
    >
      Login with TikTok
    </button>
  );
};

export default TikTokLoginButton;
