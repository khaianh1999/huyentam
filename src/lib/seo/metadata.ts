import type { Metadata } from "next";

const SITE_NAME = "Huyền Tâm";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

function siteUrl(): URL | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return undefined;
  try {
    return new URL(raw);
  } catch {
    return undefined;
  }
}

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const pathname = path.startsWith("/") ? path : `/${path}`;
  const fullTitle =
    title === SITE_NAME || title.endsWith(`· ${SITE_NAME}`) || title.endsWith(`| ${SITE_NAME}`)
      ? title
      : `${title} · ${SITE_NAME}`;
  const base = siteUrl();

  return {
    ...(base ? { metadataBase: base } : {}),
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: pathname,
      siteName: SITE_NAME,
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
