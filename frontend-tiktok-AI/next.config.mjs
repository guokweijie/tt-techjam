/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "hhezlbqmjmoy7b5j.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;