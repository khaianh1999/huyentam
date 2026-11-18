import { Suspense } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { createPageMetadata } from "@/lib/seo/metadata";
import { AssessmentBody, FormFallback } from "./AssessmentBody";

export const metadata = createPageMetadata({
  title: "Xem ngày tốt",
  description:
    "Xem một ngày dương lịch theo mục đích cưới hỏi, khai trương, động thổ, xuất hành và các việc khác. Kết quả trộn lịch âm với quy ước dân gian.",
  path: "/xem-ngay-tot",
});

export default function GoodDayPage() {
  return (
    <PageShell
      title="Xem ngày tốt"
      description="Chọn một ngày dương lịch và việc cần làm. Trang đối chiếu 12 thần, 12 trực, nhị thập bát tú, hơn 100 sao tốt xấu và tuổi của bạn, rồi ghi rõ từng yếu tố cộng trừ bao nhiêu điểm."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Xem ngày tốt" },
      ]}
    >
      <Suspense fallback={<FormFallback />}>
        <AssessmentBody />
      </Suspense>
    </PageShell>
  );
}
