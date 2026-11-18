import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/blog/posts";
import { WESTERN_SIGNS, ZODIAC_ANIMALS } from "@/data/zodiac";
import { solarKey, todayInVietnam } from "@/lib/calendar/dates";
import { absoluteUrl } from "@/lib/seo/site";

type Freq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

/** [đường dẫn, độ ưu tiên, tần suất đổi]. Trang kết quả và tìm kiếm để noindex nên không đưa vào. */
const PAGES: [string, number, Freq][] = [
  ["/", 1, "daily"],
  ["/lich-am-duong", 0.9, "daily"],
  ["/xem-ngay-tot", 0.9, "daily"],
  ["/xem-ngay-tot/theo-thang", 0.8, "weekly"],
  ["/tu-vi", 0.9, "weekly"],
  ["/tu-vi/hang-ngay", 0.8, "daily"],
  ["/tu-vi/hang-thang", 0.7, "monthly"],
  ["/tu-vi/hang-nam", 0.7, "monthly"],
  ["/boi-ten", 0.8, "monthly"],
  ["/boi-toan", 0.8, "weekly"],
  ["/boi-toan/xin-xam-quan-am", 0.8, "monthly"],
  ["/boi-toan/xin-xam-quan-thanh", 0.7, "monthly"],
  ["/boi-toan/xin-xam-dau-nam", 0.7, "monthly"],
  ["/boi-toan/tuoi-hop", 0.8, "monthly"],
  ["/boi-toan/tuoi-vo-chong", 0.8, "monthly"],
  ["/boi-toan/boi-bai-tay", 0.6, "monthly"],
  ["/boi-toan/boi-tinh-yeu", 0.6, "monthly"],
  ["/boi-toan/boi-cong-danh", 0.6, "monthly"],
  ["/boi-toan/boi-tai-loc", 0.6, "monthly"],
  ["/boi-toan/boi-van-may", 0.6, "monthly"],
  ["/boi-toan/boi-so-dien-thoai", 0.6, "monthly"],
  ["/boi-toan/boi-bien-so-xe", 0.6, "monthly"],
  ["/gieo-que", 0.8, "weekly"],
  ["/gieo-que/kinh-dich", 0.8, "monthly"],
  ["/gieo-que/tung-dong-xu", 0.7, "monthly"],
  ["/gieo-que/lac-que", 0.7, "monthly"],
  ["/gieo-que/rut-que", 0.7, "monthly"],
  ["/gieo-que/que-hom-nay", 0.7, "daily"],
  ["/phong-thuy", 0.8, "weekly"],
  ["/phong-thuy/ngu-hanh", 0.8, "monthly"],
  ["/phong-thuy/mau-huong", 0.7, "monthly"],
  ["/phong-thuy/nha-o", 0.7, "monthly"],
  ["/phong-thuy/tuoi-lam-nha", 0.7, "monthly"],
  ["/phong-thuy/xay-nha", 0.6, "monthly"],
  ["/phong-thuy/phong-ngu", 0.6, "monthly"],
  ["/phong-thuy/phong-khach", 0.6, "monthly"],
  ["/phong-thuy/ban-lam-viec", 0.6, "monthly"],
  ["/phong-thuy/ban-tho", 0.6, "monthly"],
  ["/12-con-giap", 0.8, "monthly"],
  ["/cung-hoang-dao", 0.8, "monthly"],
  ["/kien-thuc", 0.8, "weekly"],
];

/** Bản tĩnh dựng sẵn từng ngày lịch âm (xem lich-am-duong/[date]); đưa các ngày gần hiện tại vào sitemap. */
function calendarDays(): MetadataRoute.Sitemap {
  if (process.env.STATIC_EXPORT !== "1") return [];
  const today = todayInVietnam();
  const before = Number(process.env.STATIC_CALENDAR_YEARS_BEFORE ?? 2);
  const after = Number(process.env.STATIC_CALENDAR_YEARS_AFTER ?? 3);
  const days: MetadataRoute.Sitemap = [];
  const cursor = new Date(Date.UTC(today.year - before, 0, 1));
  const end = Date.UTC(today.year + after, 11, 31);
  while (cursor.getTime() <= end) {
    const key = solarKey({ year: cursor.getUTCFullYear(), month: cursor.getUTCMonth() + 1, day: cursor.getUTCDate() });
    days.push({ url: absoluteUrl(`/lich-am-duong/${key}`), changeFrequency: "yearly", priority: 0.4 });
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return days;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = PAGES.map(([path, priority, changeFrequency]) => ({
    url: absoluteUrl(path),
    changeFrequency,
    priority,
  }));

  const posts: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: absoluteUrl(`/kien-thuc/${post.slug}`),
    lastModified: post.publishedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const animals: MetadataRoute.Sitemap = ZODIAC_ANIMALS.map((animal) => ({
    url: absoluteUrl(`/12-con-giap/${animal.id}`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const signs: MetadataRoute.Sitemap = WESTERN_SIGNS.map((sign) => ({
    url: absoluteUrl(`/cung-hoang-dao/${sign.id}`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...posts, ...animals, ...signs, ...calendarDays()];
}

// Lets `output: "export"` (GitHub Pages) prerender this route under cacheComponents,
// where `export const dynamic = "force-static"` is not allowed.
export function generateStaticParams() {
  return [{}];
}
