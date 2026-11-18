"use client";

import { FortuneWheel } from "@/components/divination/FolkStudios";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { useVnToday } from "@/lib/client/use-vn-today";

export function Wheel() {
  const today = useVnToday();
  if (!today) return <LoadingYinYang label="Đang lấy ngày…" />;
  return <FortuneWheel todayKey={today.key} todayLabel={today.label} />;
}
