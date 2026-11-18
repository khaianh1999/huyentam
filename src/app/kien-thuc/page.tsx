import { Suspense } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { KnowledgeList } from "./KnowledgeList";

export const metadata = createPageMetadata({
  title: "Kiến thức",
  description:
    "Bài đọc về con giáp, can chi, lịch vạn niên, ngũ hành, Kinh Dịch và phong thủy nhà ở. Tư liệu văn hóa, không phải lời tiên đoán.",
  path: "/kien-thuc",
});

export default function KnowledgePage() {
  return (
    <PageShell
      title="Kiến thức"
      description="Bài đọc ngắn để tách lịch pháp, quy ước dân gian và lời khẳng định về tương lai."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Kiến thức" },
      ]}
    >
      <Suspense fallback={<LoadingYinYang label="Đang mở tủ sách…" />}>
        <KnowledgeList />
      </Suspense>
    </PageShell>
  );
}
