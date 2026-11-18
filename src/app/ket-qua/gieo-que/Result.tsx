"use client";

import Link from "next/link";
import { HexagramView } from "@/components/divination/HexagramView";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { getRitual } from "@/data/divination/rituals";
import { castHexagram, pickRandomHexagram } from "@/lib/algorithms/kinh-dich/hexagram";
import { firstParam, type SearchRecord } from "@/lib/divination/params";
import { useSearchRecord } from "@/lib/client/use-search-record";

export function Result() {
  const searchRecord = useSearchRecord<SearchRecord>();
  const sp = searchRecord;
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
