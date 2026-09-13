import type { NextConfig } from "next";

// GitHub Pages serves this repo at /<repo-name>/, so the static export needs
// a matching basePath — only applied for that build, not local dev/default builds.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "AI-Native-administrative-help-for-estate-executors-";

const nextConfig: NextConfig = {
  agentRules: false,
  ...(isGithubPages && {
    output: "export",
    images: { unoptimized: true },
    trailingSlash: true,
    basePath: `/${repoName}`,
  }),
};

export default nextConfig;
