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
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: "script-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self';",
            },
          ],
        },
      ];
    },
  };

module.exports = nextConfig
