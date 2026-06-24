import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lehlehka.b.goit.study",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://lehlehka.b.goit.study/:path*",
      },
    ];
  },
};

export default nextConfig;
