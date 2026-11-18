"use client";

import { StickDraw } from "@/components/divination/StickDraw";
import { firstParam, type SearchRecord } from "@/lib/divination/params";
import { useSearchRecord } from "@/lib/client/use-search-record";

export function Draw() {
  const searchRecord = useSearchRecord<SearchRecord>();
  const seed = firstParam(searchRecord.seed);
  return <StickDraw tone="thanh" initialSeed={seed} />;
}
