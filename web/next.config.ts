import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // The site is hosted on a custom root domain zeroemi.in, so basePath is empty
  basePath: '',
};

export default nextConfig;
