import { Suspense } from "react";
import { connection } from "next/server";
import { AdminHeading, DataTable, SchemaNote } from "@/components/admin/AdminBits";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { hasDatabase } from "@/lib/prisma";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Cấu hình",
  description: "Biến môi trường và khóa SiteSetting của Huyền Tâm.",
  path: "/admin/cau-hinh",
});

export default function AdminSettingsPage() {
  return (
    <>
      <AdminHeading
        eyebrow="Hệ thống"
        title="Cấu hình"
        description="Trang này chỉ báo biến đã đặt hay chưa. Không hiện giá trị bí mật."
      />
      <SchemaNote>
        Model SiteSetting lưu key duy nhất và value dạng văn bản. Khóa gợi ý: site.name, site.tagline, seo.title, lich.le-tet. Chưa có màn hình ghi các khóa đó vào cơ sở dữ liệu.
      </SchemaNote>
      <Suspense fallback={<LoadingYinYang label="Đang đọc cấu hình…" />}>
        <EnvTable />
      </Suspense>
    </>
  );
}

async function EnvTable() {
  await connection();
  const rows: [string, boolean, string][] = [
    [
      "DATABASE_URL",
      hasDatabase(),
      "Postgres cho User, Post, HexagramContent, FortuneStick, SiteSetting. Thiếu thì blog và quản trị vẫn đọc dữ liệu tĩnh.",
    ],
    [
      "AUTH_SECRET",
      Boolean(process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET),
      "Khóa ký phiên JWT. Bản demo có khóa dự phòng trong mã; khi chạy thật hãy đặt biến này.",
    ],
    [
      "NEXT_PUBLIC_SITE_URL",
      Boolean(process.env.NEXT_PUBLIC_SITE_URL),
      "Gốc URL cho canonical, Open Graph, sitemap và JSON-LD.",
    ],
  ];

  return (
    <DataTable
      headers={["Biến", "Trạng thái", "Việc dùng"]}
      rows={rows.map(([name, set, note]) => [name, set ? "Đã đặt" : "Chưa đặt", note])}
    />
  );
}
