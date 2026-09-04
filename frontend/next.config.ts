import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.146"],
  images: {
    unoptimized: isDevelopment,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.wayneven.uk',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.openfoodfacts.org',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.openfoodfacts.org',
        pathname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://api.wayneven.uk/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
