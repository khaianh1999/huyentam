import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { Subnav, TU_VI_LINKS } from "@/components/divination/Subnav";
import { TuViLoader } from "@/components/divination/TuViLoader";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { createPageMetadata } from "@/lib/seo/metadata";

const LOAI = {
  "hang-nam": {
    mode: "nam",
    title: "Tử vi hàng năm",
    description: "Xem một năm dương lịch, kèm lưới mười hai tháng để mở từng tháng.",
  },
  "hang-thang": {
    mode: "thang",
    title: "Tử vi hàng tháng",
    description: "Chọn tháng trong năm xem. Lời tháng lấy từ cùng khóa với lá năm.",
  },
} as const;

export function generateStaticParams() {
  return [{ loai: "hang-nam" }, { loai: "hang-thang" }];
}

export async function generateMetadata({ params }: { params: Promise<{ loai: string }> }) {
  const { loai } = await params;
  const item = LOAI[loai as keyof typeof LOAI];
  return createPageMetadata({
    title: item?.title ?? "Tử vi",
    description: item?.description ?? "Luận tử vi theo năm hoặc theo tháng.",
    path: `/tu-vi/${loai}`,
  });
}

export default async function TuViLoaiPage({ params }: { params: Promise<{ loai: string }> }) {
  const { loai } = await params;
  const item = LOAI[loai as keyof typeof LOAI];
  if (!item) notFound();

  return (
    <PageShell
      title={item.title}
      description={item.description}
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Tử vi", href: "/tu-vi" },
        { label: item.title },
      ]}
    >
      <Subnav items={TU_VI_LINKS} />
      <Suspense fallback={<LoadingYinYang label="Đang mở năm xem…" />}>
        <TuViLoader mode={item.mode} />
      </Suspense>
    </PageShell>
  );
}
