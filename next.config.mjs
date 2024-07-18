/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: "export",
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};

export default nextConfig;
