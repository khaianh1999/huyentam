import { Suspense } from "react";
import { TodayHex } from "./TodayHex";
import { PageShell } from "@/components/layout/PageShell";
import { GIEO_QUE_LINKS, Subnav } from "@/components/divination/Subnav";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Quẻ hôm nay",
  description: "Một quẻ Kinh Dịch cho ngày dương lịch hiện tại theo giờ Việt Nam.",
  path: "/gieo-que/que-hom-nay",
});

export default function TodayHexPage() {
  return (
    <PageShell
      title="Quẻ hôm nay"
      description="Seed là ngày theo múi giờ Asia/Ho_Chi_Minh. Trong cùng một ngày, quẻ không đổi."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Gieo quẻ", href: "/gieo-que" },
        { label: "Hôm nay" },
      ]}
    >
      <Subnav items={GIEO_QUE_LINKS} />
      <Suspense fallback={<LoadingYinYang label="Đang lấy quẻ ngày…" />}>
        <TodayHex />
      </Suspense>
    </PageShell>
  );
}
