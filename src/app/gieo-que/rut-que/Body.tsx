"use client";

import { RutQueStudio } from "@/components/divination/RutQueStudio";
import { firstParam, type SearchRecord } from "@/lib/divination/params";
import { useSearchRecord } from "@/lib/client/use-search-record";

export function Body() {
  const searchRecord = useSearchRecord<SearchRecord>();
  const loai = firstParam(searchRecord.loai) ?? "";
  return <RutQueStudio key={loai || "hub"} loai={loai} />;
}
