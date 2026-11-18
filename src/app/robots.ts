import type { MetadataRoute } from "next";
import { absoluteUrl, siteOrigin } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteOrigin(),
  };
}

// Lets `output: "export"` (GitHub Pages) prerender this route under cacheComponents,
// where `export const dynamic = "force-static"` is not allowed.
export function generateStaticParams() {
  return [{}];
}
