import { Suspense } from "react";
import { Wheel } from "./Wheel";
import { PageShell } from "@/components/layout/PageShell";
import { BOI_TOAN_LINKS, Subnav } from "@/components/divination/Subnav";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
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
