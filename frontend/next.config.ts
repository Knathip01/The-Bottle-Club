import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.146"],
  images: {
    unoptimized: isDevelopment,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'possimon.onrender.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://possimon.onrender.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;
