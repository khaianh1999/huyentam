import { Suspense } from "react";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { HexagramView } from "@/components/divination/HexagramView";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { Button } from "@/components/ui/button";
import { getRitual } from "@/data/divination/rituals";
import { castHexagram, pickRandomHexagram } from "@/lib/algorithms/kinh-dich/hexagram";
import { firstParam, type SearchRecord } from "@/lib/divination/params";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Kết quả gieo quẻ",
  description: "Mở lại quẻ Kinh Dịch từ seed trên đường dẫn.",
  path: "/ket-qua/gieo-que",
});

export default function HexResultPage({
  searchParams,
}: {
  searchParams: Promise<SearchRecord>;
}) {
  return (
    <PageShell
      title="Kết quả gieo quẻ"
      description="Cùng seed và cùng cách gieo thì ra cùng quẻ."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Gieo quẻ", href: "/gieo-que" },
        { label: "Kết quả" },
      ]}
    >
      <Suspense fallback={<LoadingYinYang label="Đang mở quẻ…" />}>
        <Result searchParams={searchParams} />
      </Suspense>
    </PageShell>
  );
}

async function Result({ searchParams }: { searchParams: Promise<SearchRecord> }) {
  const sp = await searchParams;
  const seed = firstParam(sp.seed)?.slice(0, 240) ?? "";
  const phuong = firstParam(sp.phuong);
  const loi = firstParam(sp.loi)?.slice(0, 160);
  const ritual = getRitual(firstParam(sp.loai) ?? "");
  if (!seed || (phuong !== "tung" && phuong !== "chon")) {
    return (
      <EmptyState
        title="Chưa có seed quẻ"
        description="Hãy gieo, lắc hoặc rút một quẻ. Trang kết quả cần cách gieo và seed."
        action={
          <Button asChild>
            <Link href="/gieo-que">Chọn lối gieo</Link>
          </Button>
        }
      />
    );
  }
  const result = phuong === "tung" ? castHexagram(seed) : pickRandomHexagram(seed);
  return (
    <HexagramView
      result={result}
      question={loi}
      focus={ritual?.focus}
      caption={ritual?.title ?? (phuong === "tung" ? "Quẻ sáu lần tung" : "Quẻ được chọn")}
    />
  );
}
