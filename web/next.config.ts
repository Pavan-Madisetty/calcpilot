import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Adjust base path for GitHub Pages subfolder deployment if building in CI
  basePath: isGithubActions ? '/calcpilot' : '',
};

export default nextConfig;
