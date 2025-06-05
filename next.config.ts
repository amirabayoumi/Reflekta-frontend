import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "*.flagcdn.com",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",  // Added non-wildcard version
      },
      {
        protocol: "https",
        hostname: "*.restcountries.com",
      },
      {
        protocol: "https",
        hostname: "restcountries.com", // Added non-wildcard version
      },
      {
        protocol: "https",
        hostname: "*.themealdb.com",
      },
      {
        protocol: "https",
        hostname: "themealdb.com", // Added non-wildcard version
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "cloudinary.com", // Added non-wildcard version
      },
      {
        protocol: "https",
        hostname: "*.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "unsplash.com", // Added non-wildcard version
      },
    ],
  },
};

export default nextConfig;
