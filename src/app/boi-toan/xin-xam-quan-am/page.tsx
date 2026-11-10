import { Suspense } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { StickDraw } from "@/components/divination/StickDraw";
import { BOI_TOAN_LINKS, Subnav } from "@/components/divination/Subnav";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { QUAN_AM_NOTE } from "@/data/fortune-sticks/quan-am";
import { firstParam, type SearchRecord } from "@/lib/divination/params";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Xin xăm Quan Âm",
  description: "Lắc ống và mở một quẻ xăm Quan Âm trong bộ 20 thẻ biên soạn.",
  path: "/boi-toan/xin-xam-quan-am",
});

export default function QuanAmPage({ searchParams }: { searchParams: Promise<SearchRecord> }) {
  return (
    <PageShell
      title="Xin xăm Quan Âm"
      description="Ống tròn, thẻ rơi sau khi lắc. Bộ xăm này được biên soạn cho trang, không phải bản của một ngôi chùa."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Bói toán", href: "/boi-toan" },
        { label: "Xăm Quan Âm" },
      ]}
    >
      <Subnav items={BOI_TOAN_LINKS} />
      <Disclaimer type="quan-niem-dan-gian" />
      <p className="mt-4 mb-8 text-sm leading-relaxed text-muted-foreground">{QUAN_AM_NOTE}</p>
      <Suspense fallback={<LoadingYinYang label="Đang mở ống xăm…" />}>
        <Draw searchParams={searchParams} />
      </Suspense>
    </PageShell>
  );
}

async function Draw({ searchParams }: { searchParams: Promise<SearchRecord> }) {
  const seed = firstParam((await searchParams).seed);
  return <StickDraw tone="am" initialSeed={seed} />;
}
