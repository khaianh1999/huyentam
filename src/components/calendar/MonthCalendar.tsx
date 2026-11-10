import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buildDaySummary } from "@/lib/algorithms/calendar/can-chi";
import { daysInSolarMonth, getMonthGrid, solarToLunar } from "@/lib/algorithms/calendar/lunar";
import {
  WEEKDAY_HEADERS,
  dayPath,
  inYearRange,
  sameSolar,
  shiftMonth,
  solarKey,
  weekdayMondayIndex,
} from "@/lib/calendar/dates";
import type { SolarDate } from "@/types";
import { cn } from "@/lib/utils";

type MonthCalendarProps = {
  year: number;
  month: number;
  today: SolarDate;
};

type Cell = {
  solar: SolarDate;
  inMonth: boolean;
};

function monthHref(year: number, month: number): string {
  return `/lich-am-duong?nam=${year}&thang=${month}`;
}

/** Đủ 6 hàng: ngày tháng trước + tháng này + tháng sau (không để ô trống). */
function buildMonthCells(year: number, month: number): Cell[] {
  const days = getMonthGrid(year, month);
  const lead = days[0] ? weekdayMondayIndex(days[0]) : 0;
  const prev = shiftMonth(year, month, -1);
  const next = shiftMonth(year, month, 1);
  const prevDays = daysInSolarMonth(prev.month, prev.year);
  const trailing = (7 - ((lead + days.length) % 7)) % 7;

  const cells: Cell[] = [];

  for (let i = lead - 1; i >= 0; i -= 1) {
    cells.push({
      solar: { day: prevDays - i, month: prev.month, year: prev.year },
      inMonth: false,
    });
  }

  for (const solar of days) {
    cells.push({ solar, inMonth: true });
  }

  for (let d = 1; d <= trailing; d += 1) {
    cells.push({
      solar: { day: d, month: next.month, year: next.year },
      inMonth: false,
    });
  }

  return cells;
}

export function MonthCalendar({ year, month, today }: MonthCalendarProps) {
  const cells = buildMonthCells(year, month);
  const monthCells = cells.filter((c) => c.inMonth);
  const enriched = cells.map((cell) => {
    const lunar = solarToLunar(cell.solar.day, cell.solar.month, cell.solar.year);
    const summary = buildDaySummary(cell.solar);
    return { ...cell, lunar, summary };
  });
  const hoangCount = monthCells.filter((cell) => {
    return buildDaySummary(cell.solar).isHoangDao;
  }).length;
  const prev = shiftMonth(year, month, -1);
  const next = shiftMonth(year, month, 1);
  const prevOk = inYearRange(prev.year);
  const nextOk = inYearRange(next.year);

  return (
    <section
      aria-labelledby="lich-thang"
      className="w-full rounded-3xl bg-white p-4 shadow-[0_18px_40px_rgba(26,18,11,0.07)] ring-1 ring-[#e8dcc8] sm:p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        {prevOk ? (
          <Link
            href={monthHref(prev.year, prev.month)}
            rel="prev"
            aria-label="Tháng trước"
            className="grid size-10 place-items-center rounded-2xl bg-[#f4ebe0] text-[#5c4033] transition hover:bg-[#eadfce]"
          >
            <ChevronLeft className="size-5" />
          </Link>
        ) : (
          <span className="size-10" />
        )}

        <div className="text-center">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-[#0f766e] uppercase">
            Lịch âm dương
          </p>
          <h2 id="lich-thang" className="ink-heading mt-1 text-2xl text-[#1a120b]">
            Tháng {month}
            <span className="mx-1.5 text-[#c9a227]">·</span>
            {year}
          </h2>
          <p className="mt-1 text-xs text-[#6b5848]">
            <span className="font-semibold text-[#a67c2d]">{hoangCount}</span> ngày đẹp
            <span className="mx-1.5 text-[#d6c4a4]">/</span>
            <span className="font-semibold text-[#5c4033]">
              {monthCells.length - hoangCount}
            </span>{" "}
            ngày thận trọng
          </p>
        </div>

        {nextOk ? (
          <Link
            href={monthHref(next.year, next.month)}
            rel="next"
            aria-label="Tháng sau"
            className="grid size-10 place-items-center rounded-2xl bg-[#f4ebe0] text-[#5c4033] transition hover:bg-[#eadfce]"
          >
            <ChevronRight className="size-5" />
          </Link>
        ) : (
          <span className="size-10" />
        )}
      </div>

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-[#f7f1e6] px-3 py-2.5">
        <div className="flex flex-wrap gap-4 text-xs text-[#5c4033]">
          <span className="inline-flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#c9a227]" />
            Hoàng đạo
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#64748b]" />
            Hắc đạo
          </span>
          <span className="text-[#8a7a68]">Ô mờ = tháng trước / tháng sau</span>
        </div>
        <Link
          href={monthHref(today.year, today.month)}
          className="rounded-full bg-[#8b1e1e] px-3 py-1 text-xs font-semibold text-[#fff8e7] transition hover:bg-[#6f1717]"
        >
          Hôm nay
        </Link>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1.5 sm:gap-2">
        {WEEKDAY_HEADERS.map((header) => (
          <div
            key={header.label}
            className={cn(
              "py-1.5 text-center text-[11px] font-bold tracking-wide text-[#6b5848]",
              header.label === "CN" && "text-[#8b1e1e]",
            )}
          >
            {header.label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {enriched.map(({ solar, lunar, summary, inMonth }) => {
          const isToday = sameSolar(solar, today);
          const isHoang = summary.isHoangDao;
          const lunarText =
            lunar.day === 1
              ? `${lunar.day}/${lunar.month}${lunar.leap ? "*" : ""}`
              : `${lunar.day}${lunar.leap ? "*" : ""}`;

          return (
            <Link
              key={`${solarKey(solar)}-${inMonth ? "cur" : "adj"}`}
              href={dayPath(solar)}
              aria-current={isToday ? "date" : undefined}
              aria-label={`${solar.day}/${solar.month}/${solar.year}, âm ${lunar.day}/${lunar.month}, ${isHoang ? "hoàng đạo" : "hắc đạo"}${inMonth ? "" : " (tháng khác)"}`}
              className={cn(
                "relative flex aspect-square flex-col items-center justify-center rounded-2xl transition",
                inMonth
                  ? isHoang
                    ? "bg-[#fff8e7] ring-1 ring-[#e2c86a]/80"
                    : "bg-[#faf6ef] ring-1 ring-[#eadfce]"
                  : "bg-[#f3ead9]/70 ring-1 ring-[#e8dcc8]/60",
                !isToday && "hover:-translate-y-0.5 hover:shadow-md hover:ring-[#c9a227]/55",
                isToday &&
                  "bg-[#8b1e1e] shadow-[0_10px_24px_rgba(139,30,30,0.28)] ring-2 ring-[#c9a227]",
              )}
            >
              <span
                className={cn(
                  "absolute top-1.5 right-1.5 size-2 rounded-full sm:top-2 sm:right-2",
                  isHoang ? "bg-[#c9a227]" : "bg-[#64748b]",
                  !inMonth && "opacity-45",
                  isToday && (isHoang ? "bg-[#f5d76e]" : "bg-[#cbd5e1]"),
                )}
                title={isHoang ? "Hoàng đạo" : "Hắc đạo"}
                aria-hidden="true"
              />

              <span
                className={cn(
                  "text-sm font-bold leading-none sm:text-base",
                  isToday
                    ? "text-[#fff8e7]"
                    : inMonth
                      ? "text-[#1a120b]"
                      : "text-[#9a8b7a]",
                )}
              >
                {solar.day}
              </span>
              <span
                className={cn(
                  "mt-1 text-[9px] font-medium leading-none sm:text-[10px]",
                  isToday
                    ? "text-[#f3e6c8]/90"
                    : inMonth
                      ? "text-[#0f766e]"
                      : "text-[#a89888]",
                )}
              >
                {lunarText}
              </span>

              {inMonth && summary.festivals.length ? (
                <span
                  className={cn(
                    "absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full",
                    isToday ? "bg-[#f5d76e]" : "bg-[#8b1e1e]",
                  )}
                  aria-hidden="true"
                />
              ) : null}
            </Link>
          );
        })}
      </div>

      <p className="mt-3 text-center text-[11px] leading-relaxed text-[#6b5848]">
        Chấm vàng = ngày đẹp · chấm xám = thận trọng. Ô mờ là ngày tháng trước/sau — bấm vẫn xem
        được chi tiết.
      </p>
    </section>
  );
}
