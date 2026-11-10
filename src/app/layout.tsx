import type { Metadata } from "next";
import { Be_Vietnam_Pro, Noto_Serif } from "next/font/google";
import "./globals.css";

const bodyFont = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const displayFont = Noto_Serif({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Huyền Tâm — Phong thủy, tử vi & lịch âm dương Việt Nam",
    template: "%s · Huyền Tâm",
  },
  description:
    "Nền tảng phong thủy, tử vi, lịch âm dương, Kinh Dịch và bói toán dân gian Việt Nam. Công cụ thật, dữ liệu có cấu trúc, phân biệt rõ thuật toán và quan niệm dân gian.",
  keywords: [
    "phong thủy",
    "tử vi",
    "lịch âm dương",
    "xem ngày tốt",
    "Kinh Dịch",
    "gieo quẻ",
    "12 con giáp",
    "ngũ hành",
  ],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Huyền Tâm",
    title: "Huyền Tâm — Phong thủy & tâm linh Việt Nam",
    description:
      "Lịch âm dương, xem ngày tốt, tử vi, gieo quẻ Kinh Dịch và kiến thức phong thủy.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${bodyFont.variable} ${displayFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
