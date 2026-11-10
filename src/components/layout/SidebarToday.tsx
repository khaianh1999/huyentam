import Link from "next/link";
import { connection } from "next/server";
import { buildDaySummary, formatLunarLabel } from "@/lib/algorithms/calendar/can-chi";
import { dayPath, todayInVietnam } from "@/lib/calendar/dates";
import { Badge } from "@/components/ui/badge";

/** Thẻ “Hôm nay” cho cột phải — phải bọc Suspense vì dùng connection(). */
export async function SidebarToday() {
  await connection();
  const solar = todayInVietnam();
  const day = buildDaySummary(solar);

  return (
    <div className="overflow-hidden rounded-2xl border border-accent/40 bg-gradient-to-br from-[#2a1212] via-[#4a1818] to-[#1a120b] p-3.5 text-[#fff8e7] shadow-[0_10px_28px_rgba(26,18,11,0.18)]">
      <p className="text-[10px] font-semibold tracking-[0.2em] text-accent uppercase">
        Hôm nay
      </p>
      <p className="ink-heading mt-1 text-xl text-[#fff8e7]">
        {solar.day}/{solar.month}/{solar.year}
      </p>
      <p className="mt-1 text-[11px] leading-snug text-[#f3e6c8]/85">
        {formatLunarLabel(day.lunar)}
      </p>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        <Badge variant="gold" className="text-[10px]">
          {day.canChi.dayLabel}
        </Badge>
        <Badge
          variant="outline"
          className="border-[#f3e6c8]/30 text-[10px] text-[#f3e6c8]"
        >
          {day.isHoangDao ? "Hoàng đạo" : "Hắc đạo"}
        </Badge>
      </div>
      <p className="mt-2 text-[11px] text-[#f3e6c8]/75">
        Trực {day.truc} · {day.napAm}
      </p>
      <Link
        href={dayPath(solar)}
        className="mt-3 inline-flex text-xs font-medium text-accent underline-offset-4 hover:underline"
      >
        Chi tiết ngày ›
      </Link>
    </div>
  );
}
