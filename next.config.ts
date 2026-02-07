import type { NextConfig } from "next";

const repo = process.env.GITHUB_REPOSITORY?.replace(/^[^/]+\//, "") ?? "";
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const isUserPageRepo = repo.toLowerCase() === "niteshsekhar.github.io";
const basePath = isGithubActions && repo && !isUserPageRepo ? `/${repo}` : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
