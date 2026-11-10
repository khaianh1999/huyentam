import type { MetadataRoute } from "next";

function origin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return raw.replace(/\/$/, "");
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/", "/tai-khoan", "/dang-nhap", "/dang-ky"],
    },
    sitemap: `${origin()}/sitemap.xml`,
  };
}
