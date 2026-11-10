import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { PageShell } from "@/components/layout/PageShell";
import { HexagramView } from "@/components/divination/HexagramView";
import { GIEO_QUE_LINKS, Subnav } from "@/components/divination/Subnav";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { Button } from "@/components/ui/button";
import { pickRandomHexagram } from "@/lib/algorithms/kinh-dich/hexagram";
import { vnDateParts } from "@/lib/divination/vn-date";
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

async function TodayHex() {
  await connection();
  const today = vnDateParts(new Date());
  const result = pickRandomHexagram(`que-hom-nay:${today.key}`);
  return (
    <div className="space-y-6">
      <p className="text-sm text-wood">Ngày đang dùng: {today.label}.</p>
      <div className="flex flex-wrap gap-2">
        <Button asChild variant="outline">
          <Link href="/gieo-que/kinh-dich">Gieo một quẻ riêng</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/gieo-que/lac-que">Lắc ống</Link>
        </Button>
      </div>
      <HexagramView result={result} caption="Quẻ của ngày" />
    </div>
  );
}
