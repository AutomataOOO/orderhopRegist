import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // Change to export for static generation
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
  // Add Amplify-specific configurations
  experimental: {
    serverActions: {
      allowedOrigins: ['*'],
    },
  },
  // Configure environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  // Add Amplify-specific configurations
  distDir: '.next',
  poweredByHeader: false,
  // Add Amplify-specific configurations
  compress: true,
  productionBrowserSourceMaps: false,
};

export default nextConfig;
