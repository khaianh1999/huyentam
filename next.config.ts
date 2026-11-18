import type { NextConfig } from "next";

// Static export for GitHub Pages: enabled by scripts/build-static.mjs (STATIC_EXPORT=1).
const isStaticExport = process.env.STATIC_EXPORT === "1";
// e.g. "/huyentam" when served from https://<user>.github.io/huyentam/
const basePath = isStaticExport ? process.env.NEXT_PUBLIC_BASE_PATH || "" : "";

const nextConfig: NextConfig = {
  /* config options here */
  // Next.js refuses `output: "export"` while Cache Components is on.
  cacheComponents: !isStaticExport,
  // Not supported with `output: "export"`.
  partialPrefetching: !isStaticExport,
  ...(isStaticExport && {
    output: "export",
    trailingSlash: true,
    basePath: basePath || undefined,
    images: { unoptimized: true },
    env: { NEXT_PUBLIC_STATIC_EXPORT: "1" },
  }),
  turbopack: {
    // The static build runs from ./.static-build; node_modules lives one level up.
    ...(process.env.STATIC_EXPORT_ROOT && { root: process.env.STATIC_EXPORT_ROOT }),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
