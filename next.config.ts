import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    API_URL_PATH: process.env.API_URL_PATH,
  },
};

export default nextConfig;
