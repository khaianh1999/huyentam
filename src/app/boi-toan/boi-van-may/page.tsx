import { Suspense } from "react";
import { connection } from "next/server";
import { PageShell } from "@/components/layout/PageShell";
import { FortuneWheel } from "@/components/divination/FolkStudios";
import { BOI_TOAN_LINKS, Subnav } from "@/components/divination/Subnav";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { vnDateParts } from "@/lib/divination/vn-date";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Bói vận may",
  description: "Xoay bàn tám ô theo tên, mối bận tâm và ngày hiện tại.",
  path: "/boi-toan/boi-van-may",
});

export default function FortunePage() {
  return (
    <PageShell
      title="Bói vận may"
      description="Một bàn tròn tám ô. Kim chỉ đứng yên, bàn xoay tới ô của ngày."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Bói toán", href: "/boi-toan" },
        { label: "Vận may" },
      ]}
    >
      <Subnav items={BOI_TOAN_LINKS} />
      <Suspense fallback={<LoadingYinYang label="Đang lấy ngày…" />}>
        <Wheel />
      </Suspense>
    </PageShell>
  );
}

async function Wheel() {
  await connection();
  const today = vnDateParts(new Date());
  return <FortuneWheel todayKey={today.key} todayLabel={today.label} />;
}
