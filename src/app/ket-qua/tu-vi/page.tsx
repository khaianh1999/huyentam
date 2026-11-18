import { Suspense } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { Result } from "./Result";

export const metadata = createPageMetadata({
  title: "Kết quả tử vi",
  description: "Lá tử vi lập lại từ họ tên, ngày giờ sinh và mốc muốn xem trên đường dẫn.",
  path: "/ket-qua/tu-vi",
  noindex: true,
});

export default function TuViResultPage() {
  return (
    <PageShell
      title="Kết quả tử vi"
      description="Trang này lập lại luận giải từ các tham số trên đường dẫn, để giữ và chia sẻ."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Tử vi", href: "/tu-vi" },
        { label: "Kết quả" },
      ]}
    >
      <Suspense fallback={<LoadingYinYang label="Đang mở kết quả…" />}>
        <Result />
      </Suspense>
    </PageShell>
  );
}
