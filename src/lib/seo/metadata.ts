import type { Metadata } from "next";
import { OG_IMAGE, SITE_KEYWORDS, SITE_NAME, absoluteUrl } from "@/lib/seo/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  /** Từ khóa riêng của trang, ghép thêm vào bộ từ khóa chung. */
  keywords?: string[];
  /** Trang kết quả theo tham số, trang tìm kiếm: không cho lập chỉ mục. */
  noindex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  /** Ảnh chia sẻ riêng (đường dẫn trong public/), mặc định dùng ảnh chung của site. */
  image?: { path: string; alt: string };
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  noindex,
  type = "website",
  publishedTime,
  image,
}: PageMetadataInput): Metadata {
  const pathname = path.startsWith("/") ? path : `/${path}`;
  const fullTitle =
    title === SITE_NAME || title.endsWith(`· ${SITE_NAME}`) || title.endsWith(`| ${SITE_NAME}`)
      ? title
      : `${title} · ${SITE_NAME}`;
  const og = image ?? { path: OG_IMAGE.path, alt: OG_IMAGE.alt };
  const images = [{ url: absoluteUrl(og.path), width: OG_IMAGE.width, height: OG_IMAGE.height, alt: og.alt }];

  return {
    title: { absolute: fullTitle },
    description,
    keywords: keywords?.length ? [...keywords, ...SITE_KEYWORDS.slice(0, 6)] : SITE_KEYWORDS,
    alternates: {
      canonical: pathname,
    },
    robots: noindex
      ? { index: false, follow: true, googleBot: { index: false, follow: true } }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
        },
    openGraph: {
      title: fullTitle,
      description,
      url: pathname,
      siteName: SITE_NAME,
      locale: "vi_VN",
      type,
      images,
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images.map((image) => image.url),
    },
  };
}
