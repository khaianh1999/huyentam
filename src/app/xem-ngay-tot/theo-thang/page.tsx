import { Suspense } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { createPageMetadata } from "@/lib/seo/metadata";
import { MonthResults, ListFallback } from "./MonthResults";

export const metadata = createPageMetadata({
  title: "Ngày tốt trong tháng",
  description:
    "Lọc các ngày trong tháng đạt từ 65 điểm trở lên theo mục đích và năm sinh, dựa trên lịch âm và quy ước dân gian.",
  path: "/xem-ngay-tot/theo-thang",
});

export default function GoodDaysInMonthPage() {
  return (
    <PageShell
      width="wide"
      title="Ngày tốt trong tháng"
      description="Chọn năm, tháng và mục đích. Trang liệt kê những ngày trong tháng đạt từ 65 điểm trở lên."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Xem ngày tốt", href: "/xem-ngay-tot" },
        { label: "Theo tháng" },
      ]}
    >
      <Suspense fallback={<ListFallback />}>
        <MonthResults />
      </Suspense>
    </PageShell>
  );
}
