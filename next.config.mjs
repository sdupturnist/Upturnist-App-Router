import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    domains: [
      "admin.upturnist.com",
      "demo.upturnist.com",
      "localhost",
      "upturnist.com",
      "img.freepik.com",
    ],
  },

 
};

export default withNextVideo(nextConfig);