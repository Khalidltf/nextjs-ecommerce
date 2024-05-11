/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "tinyurl.com" }],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
