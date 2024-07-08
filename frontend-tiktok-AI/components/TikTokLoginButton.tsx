// components/TikTokLoginButton.js
"use client";

const TikTokLoginButton = () => {

  const handleLogin = async () => {
    // const state = Math.random().toString(36).substring(2);
    // const authUrl = `https://www.tiktok.com/auth/authorize/?client_key=${CLIENT_KEY}&response_type=code&scope=user.info.basic&redirect_uri=${encodeURIComponent("https://localhost:3000")}&state=${state}`;
    // window.location.href = authUrl;
    // window.location.href = authUrl;
    window.location.href = '/api/auth';
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
