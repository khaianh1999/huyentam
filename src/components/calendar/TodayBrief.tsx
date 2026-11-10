import Link from "next/link";
import { buildDaySummary, formatLunarLabel } from "@/lib/algorithms/calendar/can-chi";
import { NGU_HANH_VI } from "@/lib/algorithms/calendar/constants";
import { dayPath } from "@/lib/calendar/dates";
import type { SolarDate } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function TodayBrief({ solar }: { solar: SolarDate }) {
  const day = buildDaySummary(solar);

  return (
    <div className="rounded-3xl bg-white/90 p-4 shadow-[0_20px_50px_rgba(26,18,11,0.08)] ring-1 ring-[#e8dcc8] sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#0f766e] uppercase">
            Hôm nay
          </p>
          <h3 className="ink-heading mt-1 text-2xl text-[#1a120b]">
            {solar.day}/{solar.month}/{solar.year}
          </h3>
          <p className="mt-1 text-sm text-[#6b5848]">{formatLunarLabel(day.lunar)}</p>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold",
            day.isHoangDao
              ? "bg-[#fff4d6] text-[#8a6a12]"
              : "bg-[#eef2f6] text-[#475569]",
          )}
        >
          <span
            className={cn(
              "size-1.5 rounded-full",
              day.isHoangDao ? "bg-[#c9a227]" : "bg-[#64748b]",
            )}
          />
          {day.isHoangDao ? "Hoàng đạo" : "Hắc đạo"}
        </span>
      </div>

      <dl className="mt-4 grid gap-2 text-sm">
        {[
          ["Can chi", day.canChi.dayLabel],
          ["Trực / Nạp âm", `${day.truc} · ${day.napAm}`],
          ["Ngũ hành", NGU_HANH_VI[day.nguHanh]],
          ["Giờ hoàng đạo", day.gioHoangDao[0] ?? "—"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between gap-3 rounded-2xl bg-[#f7f1e6] px-3 py-2.5"
          >
            <dt className="text-xs text-[#6b5848]">{label}</dt>
            <dd className="text-right text-sm font-medium text-[#1a120b]">{value}</dd>
          </div>
        ))}
      </dl>

      <Button asChild variant="outline" size="sm" className="mt-4 w-full rounded-xl">
        <Link href={dayPath(solar)}>Xem chi tiết ngày</Link>
      </Button>
      <p className="mt-2 text-[11px] leading-relaxed text-[#6b5848]">
        Can chi & âm lịch theo thuật toán. Hoàng đạo mang tính quan niệm dân gian.
      </p>
    </div>
  );
}
