import { AdminHeading, DataTable, SchemaNote } from "@/components/admin/AdminBits";
import { blogCategories } from "@/lib/blog/query";
import { slugifyVi } from "@/lib/utils";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Danh mục",
  description: "Danh mục bài viết gom từ dữ liệu tĩnh.",
  path: "/admin/danh-muc",
});

export default function AdminCategoriesPage() {
  const categories = blogCategories();

  return (
    <>
      <AdminHeading
        eyebrow="Nội dung"
        title="Danh mục"
        description="Mỗi danh mục là trường category trên bài tĩnh. Slug bên dưới chỉ để đối chiếu với model Category."
      />
      <SchemaNote>
        Model <strong>Category</strong> có name, slug duy nhất và description. Bài gắn qua Post.categoryId. Chưa có form tạo danh mục vì chưa ghi cơ sở dữ liệu.
      </SchemaNote>
      <DataTable
        headers={["Tên", "Slug gợi ý", "Số bài"]}
        rows={categories.map((item) => [item.name, slugifyVi(item.name), String(item.count)])}
      />
    </>
  );
}
