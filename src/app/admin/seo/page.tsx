import { AdminHeading, SchemaNote } from "@/components/admin/AdminBits";
import { SeoDraftForm } from "@/components/admin/SeoDraftForm";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "SEO",
  description: "Ghi chú metadata, sitemap và bản nháp tiêu đề.",
  path: "/admin/seo",
});

export default function AdminSeoPage() {
  return (
    <>
      <AdminHeading
        eyebrow="Tìm kiếm"
        title="SEO"
        description="Mỗi trang công khai gọi createPageMetadata: tiêu đề tuyệt đối, mô tả, canonical và Open Graph tiếng Việt."
      />
      <SchemaNote>
        SiteSetting.key / value dành cho ghi đè sau này (seo.title, seo.description). Sitemap ở src/app/sitemap.ts gồm route chính, slug bài viết và mã con giáp, cung hoàng đạo. robots.ts chặn /admin và /api. Đặt NEXT_PUBLIC_SITE_URL để canonical ra đúng miền.
      </SchemaNote>
      <SeoDraftForm />
    </>
  );
}
