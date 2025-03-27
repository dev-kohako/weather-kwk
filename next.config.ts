import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "api.microlink.io",
    ]
  },
  reactStrictMode: true,
};

export default nextConfig;
