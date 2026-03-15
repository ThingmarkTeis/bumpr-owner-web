import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "bumpr.online",
          },
        ],
        destination: "https://www.bumpr.online/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
