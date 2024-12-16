import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Cache-Control', value: 'max-age=60, s-maxage=60, stale-while-revalidate=60' },
        ],
      },
    ];
  },
};

export default nextConfig;
