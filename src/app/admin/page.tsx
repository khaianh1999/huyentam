import Link from "next/link";
import { AdminHeading } from "@/components/admin/AdminBits";
import { BLOG_POSTS } from "@/data/blog/posts";
import { HEXAGRAMS } from "@/data/hexagrams";
import { QUAN_AM_STICKS } from "@/data/fortune-sticks/quan-am";
import { QUAN_THANH_STICKS } from "@/data/fortune-sticks/quan-thanh";
import { TOOL_CATALOG } from "@/data/tools/catalog";
import { blogCategories } from "@/lib/blog/query";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Bảng tin quản trị",
  description: "Số liệu tĩnh của tủ sách, quẻ, xăm và công cụ Huyền Tâm.",
  path: "/admin",
});

const STATS = [
  { label: "Bài viết", value: String(BLOG_POSTS.length), href: "/admin/bai-viet", note: "Nguồn BLOG_POSTS" },
  { label: "Danh mục bài", value: String(blogCategories().length), href: "/admin/danh-muc", note: "Gom từ bài tĩnh" },
  { label: "Quẻ Kinh Dịch", value: String(HEXAGRAMS.length), href: "/admin/que-kinh-dich", note: "Đủ 64 quẻ Văn Vương" },
  { label: "Công cụ", value: String(TOOL_CATALOG.length), href: "/admin/cau-hinh", note: "TOOL_CATALOG" },
  {
    label: "Quẻ xăm",
    value: String(QUAN_AM_STICKS.length + QUAN_THANH_STICKS.length),
    href: "/admin/xin-xam",
    note: "Quan Âm và Quan Thánh",
  },
  { label: "Người dùng", value: "—", href: "/admin/nguoi-dung", note: "Cần DATABASE_URL" },
] as const;

export default function AdminHomePage() {
  return (
    <>
      <AdminHeading
        eyebrow="Bảng tin"
        title="Xưởng nội dung Huyền Tâm"
        description="Số đếm lấy từ dữ liệu tĩnh trong mã nguồn. Bảng Prisma đã sẵn cho bài viết, quẻ, xăm, người dùng và cấu hình site."
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STATS.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="paper-card gold-border block rounded-xl p-5 hover:border-accent">
              <p className="text-xs tracking-[0.16em] text-bronze uppercase">{item.label}</p>
              <p className="ink-heading mt-2 text-4xl text-ink">{item.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.note}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
