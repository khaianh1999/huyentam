import { Suspense } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { RutQueStudio } from "@/components/divination/RutQueStudio";
import { GIEO_QUE_LINKS, Subnav } from "@/components/divination/Subnav";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { getRitual } from "@/data/divination/rituals";
import { firstParam, type SearchRecord } from "@/lib/divination/params";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Rút quẻ",
  description: "Rút quẻ đầu năm, tình duyên, công danh, tài lộc, gia đạo hoặc bình an.",
  path: "/gieo-que/rut-que",
});

export default function RutQuePage({
  searchParams,
}: {
  searchParams: Promise<SearchRecord>;
}) {
  return (
    <PageShell
      title="Rút quẻ"
      description="Chọn một việc. Mỗi việc có lời dẫn và một mục của quẻ được đưa lên trước."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Gieo quẻ", href: "/gieo-que" },
        { label: "Rút quẻ" },
      ]}
    >
      <Subnav items={GIEO_QUE_LINKS} />
      <Suspense fallback={<LoadingYinYang label="Đang mở lối rút…" />}>
        <Body searchParams={searchParams} />
      </Suspense>
    </PageShell>
  );
}

async function Body({ searchParams }: { searchParams: Promise<SearchRecord> }) {
  const loai = firstParam((await searchParams).loai) ?? "";
  const ritual = getRitual(loai);
  return (
    <div className="space-y-6">
      {ritual ? <h2 className="ink-heading text-3xl text-ink">{ritual.title}</h2> : null}
      <RutQueStudio key={loai || "hub"} loai={loai} />
    </div>
  );
}
