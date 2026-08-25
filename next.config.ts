import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: "export" as const,
        basePath: "/PN",
        assetPrefix: "/PN/",
        trailingSlash: true,
        typescript: {
          // The Cloudflare-only D1 helpers are not part of the static storefront.
          ignoreBuildErrors: true,
        },
      }
    : {}),
};

export default nextConfig;
