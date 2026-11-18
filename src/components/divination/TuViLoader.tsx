"use client";

import { TuViStudio } from "@/components/divination/TuViStudio";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { useVnToday } from "@/lib/client/use-vn-today";

export function TuViLoader({
  mode,
}: {
  mode: "studio" | "ngay" | "nam" | "thang";
}) {
  const today = useVnToday();
  if (!today) return <LoadingYinYang label="Đang mở lá số…" />;
  return <TuViStudio mode={mode} today={today} />;
}
