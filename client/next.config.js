/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "cdn.pixabay.com",
      "localhost",
    ],
  },
};

module.exports = nextConfig;
