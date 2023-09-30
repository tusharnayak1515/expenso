/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "cdn.pixabay.com",
      "vercel.app",
      "localhost",
    ],
  },
};

module.exports = nextConfig;
