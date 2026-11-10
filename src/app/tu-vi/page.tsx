import { Suspense } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Subnav, TU_VI_LINKS } from "@/components/divination/Subnav";
import { TuViLoader } from "@/components/divination/TuViLoader";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Xem tử vi",
  description: "Lập luận trọn đời và theo năm từ họ tên, ngày giờ sinh và giới tính.",
  path: "/tu-vi",
});

export default function TuViPage() {
  return (
    <PageShell
      title="Xem tử vi"
      description="Luận tổng quan theo khóa ngày giờ sinh. Phần can chi lấy từ lịch pháp. Phần cung mệnh là khung tham khảo, chưa phải lá số Đẩu Số đủ chính tinh."
      breadcrumbs={[{ label: "Trang chủ", href: "/" }, { label: "Tử vi" }]}
    >
      <Subnav items={TU_VI_LINKS} />
      <Suspense fallback={<LoadingYinYang label="Đang mở lá số…" />}>
        <TuViLoader mode="studio" />
      </Suspense>
    </PageShell>
  );
}
