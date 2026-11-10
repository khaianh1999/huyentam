import { Suspense } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { StickDraw } from "@/components/divination/StickDraw";
import { BOI_TOAN_LINKS, Subnav } from "@/components/divination/Subnav";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { QUAN_THANH_NOTE } from "@/data/fortune-sticks/quan-thanh";
import { firstParam, type SearchRecord } from "@/lib/divination/params";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Xin xăm Quan Thánh",
  description: "Đóng ấn và mở một quẻ xăm Quan Thánh trong bộ 20 thẻ biên soạn.",
  path: "/boi-toan/xin-xam-quan-thanh",
});

export default function QuanThanhPage({ searchParams }: { searchParams: Promise<SearchRecord> }) {
  return (
    <PageShell
      title="Xin xăm Quan Thánh"
      description="Một ấn son, rồi mới mở thẻ. Lối này nói về chữ tín và việc nghĩa, khác ống xăm Quan Âm."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Bói toán", href: "/boi-toan" },
        { label: "Xăm Quan Thánh" },
      ]}
    >
      <Subnav items={BOI_TOAN_LINKS} />
      <Disclaimer type="quan-niem-dan-gian" />
      <p className="mt-4 mb-8 text-sm leading-relaxed text-muted-foreground">{QUAN_THANH_NOTE}</p>
      <Suspense fallback={<LoadingYinYang label="Đang mở ấn…" />}>
        <Draw searchParams={searchParams} />
      </Suspense>
    </PageShell>
  );
}

async function Draw({ searchParams }: { searchParams: Promise<SearchRecord> }) {
  const seed = firstParam((await searchParams).seed);
  return <StickDraw tone="thanh" initialSeed={seed} />;
}
