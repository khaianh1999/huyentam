import { Suspense } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Subnav, TU_VI_LINKS } from "@/components/divination/Subnav";
import { TuViLoader } from "@/components/divination/TuViLoader";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Lá số tử vi",
  description: "Lập lá số Tử Vi Đẩu Số đủ 12 cung, 14 chính tinh, Tứ Hóa, đại hạn và lưu niên, kèm luận giải từng cung.",
  path: "/tu-vi",
});

export default function TuViPage() {
  return (
    <PageShell
      title="Lá số tử vi"
      description="Nhập ngày giờ sinh để an đủ 12 cung, 14 chính tinh, Tứ Hóa, đại hạn, lưu niên và đọc luận giải từng cung."
      breadcrumbs={[{ label: "Trang chủ", href: "/" }, { label: "Tử vi" }]}
    >
      <Subnav items={TU_VI_LINKS} />
      <Suspense fallback={<LoadingYinYang label="Đang mở lá số…" />}>
        <TuViLoader mode="studio" />
      </Suspense>
    </PageShell>
  );
}
