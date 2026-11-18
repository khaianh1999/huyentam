"use client";

import Link from "next/link";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { signFromMonthDay } from "@/lib/algorithms/astrology/cung-reading";
import { useVnToday } from "@/lib/client/use-vn-today";

export function TodaySign() {
  const today = useVnToday();
  if (!today) return <LoadingYinYang label="Đang lấy ngày…" />;
  const sign = signFromMonthDay(today.month, today.day);
  if (!sign) return null;
  return (
    <p className="mt-4 text-sm text-wood">
      {today.label} nằm trong khoảng ngày của cung {sign.name}.{" "}
      <Link href={`/cung-hoang-dao/${sign.id}`} className="text-primary underline-offset-4 hover:underline">
        Đọc cung này
      </Link>
      .
    </p>
  );
}
