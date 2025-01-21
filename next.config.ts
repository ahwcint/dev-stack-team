import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    SOCKET_LOCAL: process.env.SOCKET_LOCAL,
  },
};

export default nextConfig;
