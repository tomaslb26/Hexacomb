/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CDN_ID: process.env.CDN_ID,
    BACKEND_URL: process.env.BACKEND_URL,
    LOCAL_URL: process.env.LOCAL_URL,
  },
  images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
  };

module.exports = nextConfig
