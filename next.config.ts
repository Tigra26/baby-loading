import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.102"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lehlehka.b.goit.study",
      },
      { protocol: "https", hostname: "ftp.goit.study" },
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
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
