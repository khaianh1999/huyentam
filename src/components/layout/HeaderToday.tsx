"use client";

import Link from "next/link";
import { useTodaySolar } from "@/lib/client/use-vn-today";
import { buildDaySummary } from "@/lib/algorithms/calendar/can-chi";
import { dayPath } from "@/lib/calendar/dates";

const WEEKDAYS = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];

/** Dòng ngày âm dương trên thanh đầu trang. Ngày tính ở trình duyệt để build tĩnh được. */
export function HeaderToday() {
  const solar = useTodaySolar();
  if (!solar) {
    return <span className="h-3 w-56 animate-pulse rounded-full bg-white/10" aria-hidden="true" />;
  }
  const day = buildDaySummary(solar);
  const weekday = WEEKDAYS[new Date(Date.UTC(solar.year, solar.month - 1, solar.day)).getUTCDay()];

  return (
    <Link
      href={dayPath(solar)}
      className="flex min-w-0 items-center gap-2 truncate transition-colors hover:text-accent"
    >
      <span className="inline-block size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
      <span className="truncate">
        {weekday}, {solar.day}/{solar.month}/{solar.year}
        <span className="mx-1.5 text-secondary-foreground/40">·</span>
        Âm lịch {day.lunar.day}/{day.lunar.month}
        {day.lunar.leap ? " nhuận" : ""}
        <span className="mx-1.5 hidden text-secondary-foreground/40 sm:inline">·</span>
        <span className="hidden sm:inline">Ngày {day.canChi.dayLabel}</span>
        <span className="mx-1.5 hidden text-secondary-foreground/40 md:inline">·</span>
        <span className={day.isHoangDao ? "hidden text-accent md:inline" : "hidden md:inline"}>
          {day.isHoangDao ? "Hoàng đạo" : "Hắc đạo"}
        </span>
      </span>
    </Link>
  );
}
