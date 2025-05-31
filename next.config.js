/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...existing config...
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
        pathname: "/username",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  // ...existing config...
};

module.exports = nextConfig;