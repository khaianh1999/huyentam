import { Suspense } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { Result } from "./Result";

export const metadata = createPageMetadata({
  title: "Kết quả bói tên",
  description: "Các chỉ số tên được lập lại từ họ tên, ngày sinh và giới tính trên đường dẫn.",
  path: "/ket-qua/boi-ten",
  noindex: true,
});

export default function NameResultPage() {
  return (
    <PageShell
      title="Kết quả bói tên"
      description="Bốn thẻ số và lời đối chiếu ngũ hành, lập lại từ đường dẫn."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Bói tên", href: "/boi-ten" },
        { label: "Kết quả" },
      ]}
    >
      <Suspense fallback={<LoadingYinYang label="Đang đọc tên…" />}>
        <Result />
      </Suspense>
    </PageShell>
  );
}
