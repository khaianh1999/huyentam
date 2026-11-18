"use client";

import Link from "next/link";
import { HexagramView } from "@/components/divination/HexagramView";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { Button } from "@/components/ui/button";
import { pickRandomHexagram } from "@/lib/algorithms/kinh-dich/hexagram";
import { useVnToday } from "@/lib/client/use-vn-today";

export function TodayHex() {
  const today = useVnToday();
  if (!today) return <LoadingYinYang label="Đang lấy quẻ ngày…" />;
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
