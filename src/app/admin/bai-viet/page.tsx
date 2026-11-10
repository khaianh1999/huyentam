import Link from "next/link";
import { AdminHeading, DataTable, SchemaNote } from "@/components/admin/AdminBits";
import { BLOG_POSTS } from "@/data/blog/posts";
import { formatPublished } from "@/lib/blog/query";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Bài viết",
  description: "Danh sách bài kiến thức tĩnh và ghi chú model Post.",
  path: "/admin/bai-viet",
});

export default function AdminPostsPage() {
  return (
    <>
      <AdminHeading
        eyebrow="Nội dung"
        title="Bài viết"
        description={`${BLOG_POSTS.length} bài đang phát hành từ src/data/blog/posts.ts.`}
      />
      <SchemaNote>
        Model Prisma <strong>Post</strong> đã có slug, excerpt, content, status (DRAFT / PUBLISHED / ARCHIVED), category, author, seoTitle, seoDesc. Khi có DATABASE_URL, danh sách này có thể chuyển sang bảng Post. Hiện chưa có nút ghi đè file.
      </SchemaNote>
      <DataTable
        headers={["Tiêu đề", "Danh mục", "Ngày", "Phút", "Trạng thái"]}
        rows={BLOG_POSTS.map((post) => [
          <Link key={post.slug} href={`/kien-thuc/${post.slug}`} className="font-medium text-ink hover:text-primary">
            {post.title}
          </Link>,
          post.category,
          formatPublished(post.publishedAt),
          String(post.readingMinutes),
          "Tĩnh · đã xuất bản",
        ])}
      />
    </>
  );
}
