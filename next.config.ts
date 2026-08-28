import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // Higgsfield CDN host — set once real chapter media is generated.
        hostname: "d8j0ntlcm91z4.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
