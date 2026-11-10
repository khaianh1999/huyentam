import { Suspense } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Subnav, TU_VI_LINKS } from "@/components/divination/Subnav";
import { TuViLoader } from "@/components/divination/TuViLoader";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Tử vi hàng ngày",
  description: "Gợi ý ngắn trong một ngày theo khóa ngày sinh và ngày muốn xem.",
  path: "/tu-vi/hang-ngay",
});

export default function DailyTuViPage() {
  return (
    <PageShell
      title="Tử vi hàng ngày"
      description="Ba lát cắt cho một ngày dương lịch: việc nên nhớ, chỗ nên để tâm, chỗ nên chậm."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Tử vi", href: "/tu-vi" },
        { label: "Hàng ngày" },
      ]}
    >
      <Subnav items={TU_VI_LINKS} />
      <Suspense fallback={<LoadingYinYang label="Đang lấy ngày…" />}>
        <TuViLoader mode="ngay" />
      </Suspense>
    </PageShell>
  );
}
