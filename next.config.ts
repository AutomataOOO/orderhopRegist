import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone', // Use standalone mode for server deployment
  images: {
    unoptimized: true, // Required for static exports
  },
  // Enable React strict mode
  reactStrictMode: true,
  // Add trailing slash for better compatibility
  trailingSlash: true,
  // Configure base path if needed
  basePath: '',
  // Configure asset prefix if needed
  assetPrefix: '',
};

export default nextConfig;
