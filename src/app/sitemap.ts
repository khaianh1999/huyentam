import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/blog/posts";
import { WESTERN_SIGNS, ZODIAC_ANIMALS } from "@/data/zodiac";

function origin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return raw.replace(/\/$/, "");
}

const MAJOR = [
  "/",
  "/lich-am-duong",
  "/xem-ngay-tot",
  "/xem-ngay-tot/theo-thang",
  "/tu-vi",
  "/tu-vi/hang-ngay",
  "/tu-vi/hang-nam",
  "/tu-vi/hang-thang",
  "/boi-ten",
  "/boi-toan",
  "/boi-toan/xin-xam-quan-am",
  "/boi-toan/xin-xam-quan-thanh",
  "/boi-toan/tuoi-hop",
  "/boi-toan/tuoi-vo-chong",
  "/boi-toan/boi-tinh-yeu",
  "/boi-toan/boi-cong-danh",
  "/boi-toan/boi-tai-loc",
  "/boi-toan/boi-van-may",
  "/boi-toan/boi-so-dien-thoai",
  "/boi-toan/boi-bien-so-xe",
  "/gieo-que",
  "/gieo-que/kinh-dich",
  "/gieo-que/tung-dong-xu",
  "/gieo-que/lac-que",
  "/gieo-que/rut-que",
  "/gieo-que/que-hom-nay",
  "/phong-thuy",
  "/phong-thuy/ngu-hanh",
  "/phong-thuy/mau-huong",
  "/phong-thuy/nha-o",
  "/phong-thuy/tuoi-lam-nha",
  "/phong-thuy/phong-ngu",
  "/phong-thuy/phong-khach",
  "/phong-thuy/ban-lam-viec",
  "/phong-thuy/ban-tho",
  "/phong-thuy/xay-nha",
  "/12-con-giap",
  "/cung-hoang-dao",
  "/kien-thuc",
  "/tim-kiem",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = origin();

  const pages: MetadataRoute.Sitemap = MAJOR.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: path === "/" || path === "/lich-am-duong" ? "daily" : "weekly",
    priority: path === "/" ? 1 : path === "/kien-thuc" || path === "/tu-vi" ? 0.9 : 0.7,
  }));

  const posts: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${base}/kien-thuc/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const animals: MetadataRoute.Sitemap = ZODIAC_ANIMALS.map((animal) => ({
    url: `${base}/12-con-giap/${animal.id}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const signs: MetadataRoute.Sitemap = WESTERN_SIGNS.map((sign) => ({
    url: `${base}/cung-hoang-dao/${sign.id}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...posts, ...animals, ...signs];
}
