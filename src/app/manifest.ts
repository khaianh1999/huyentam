import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "@/lib/seo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME}: Phong thủy, tử vi & lịch âm`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    lang: "vi",
    start_url: absoluteUrl("/"),
    scope: absoluteUrl("/"),
    display: "standalone",
    background_color: "#f8f3ea",
    theme_color: "#2b1311",
    categories: ["lifestyle", "entertainment"],
    icons: [
      { src: absoluteUrl("/icon-192.png"), sizes: "192x192", type: "image/png" },
      { src: absoluteUrl("/icon-512.png"), sizes: "512x512", type: "image/png" },
      { src: absoluteUrl("/icon-512.png"), sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

// Lets `output: "export"` prerender this route under cacheComponents.
export function generateStaticParams() {
  return [{}];
}
