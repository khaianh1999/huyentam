import { Suspense } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { createPageMetadata } from "@/lib/seo/metadata";
import { ResultBody, ResultFallback } from "./ResultBody";

export const metadata = createPageMetadata({
  title: "Kết quả xem ngày",
  description:
    "Trang kết quả xem ngày theo mục đích, năm sinh và ngày dương lịch. Điểm số là tham khảo từ lịch âm và quan niệm dân gian.",
  path: "/ket-qua/xem-ngay",
  noindex: true,
});

export default function DayResultPage() {
  return (
    <PageShell
      title="Kết quả xem ngày"
      description="Điểm, lý do, giờ hoàng đạo, hướng xuất hành và đủ thông tin can chi của ngày đã chọn."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Xem ngày tốt", href: "/xem-ngay-tot" },
        { label: "Kết quả" },
      ]}
    >
      <Suspense fallback={<ResultFallback />}>
        <ResultBody />
      </Suspense>
    </PageShell>
  );
}
