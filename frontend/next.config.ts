import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.146"],
  images: {
    qualities: [75],
    unoptimized: isDevelopment,
  },
};

export default nextConfig;
