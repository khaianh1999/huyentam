/**
 * Thông tin chung cho SEO. NEXT_PUBLIC_SITE_URL là địa chỉ gốc đầy đủ (kể cả base path
 * trên GitHub Pages, ví dụ https://ten.github.io/huyentam). Khi chưa đặt, dùng localhost.
 */
export const SITE_NAME = "Huyền Tâm";
export const SITE_TAGLINE = "Phong thủy, tử vi & lịch âm dương Việt Nam";
export const SITE_DESCRIPTION =
  "Lịch âm dương, xem ngày tốt xấu, lá số tử vi, gieo quẻ Kinh Dịch, xin xăm, bói tên và kiến thức phong thủy Việt Nam. Công cụ miễn phí, dễ dùng trên điện thoại.";

export const SITE_KEYWORDS = [
  "phong thủy",
  "tử vi",
  "lá số tử vi",
  "lịch âm dương",
  "lịch vạn niên",
  "xem ngày tốt",
  "Kinh Dịch",
  "gieo quẻ",
  "xin xăm",
  "bói tên",
  "xem tuổi vợ chồng",
  "12 con giáp",
  "cung hoàng đạo",
  "ngũ hành",
];

export const OG_IMAGE = { path: "/og-image.png", width: 1200, height: 630, alt: `${SITE_NAME}: ${SITE_TAGLINE}` };

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Địa chỉ gốc, không có dấu / ở cuối. */
export function siteOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (raw) {
    try {
      return new URL(raw).toString().replace(/\/$/, "");
    } catch {
      // bỏ qua giá trị sai, dùng mặc định bên dưới
    }
  }
  return `http://localhost:3100${BASE_PATH}`;
}

/** Đổi đường dẫn trong site thành URL tuyệt đối (đã gồm base path). */
export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${siteOrigin()}${clean === "/" ? "/" : clean}`;
}

/** Đường dẫn file trong public/ kèm base path (thẻ <img> thường không tự thêm base path). */
export function assetPath(path: string): string {
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}
