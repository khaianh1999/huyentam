"use client";

import Link from "next/link";
import { LunarConverter } from "@/components/calendar/LunarConverter";
import { MonthCalendar } from "@/components/calendar/MonthCalendar";
import { TodayBrief } from "@/components/calendar/TodayBrief";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { readParam, resolveYearMonth, solarKey, YEAR_MAX, YEAR_MIN } from "@/lib/calendar/dates";
import Form from "next/form";
import { useSearchRecord } from "@/lib/client/use-search-record";
import { useTodaySolar } from "@/lib/client/use-vn-today";

type CalendarQuery = {
  nam?: string | string[];
  thang?: string | string[];
};

export function CalendarFallback() {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
      <div className="h-72 animate-pulse rounded-2xl bg-muted/50" />
      <div className="h-72 animate-pulse rounded-2xl bg-muted/40" />
    </div>
  );
}

export function CalendarBody() {
  const searchRecord = useSearchRecord<CalendarQuery>();
  const params = searchRecord;
  const today = useTodaySolar();
  if (!today) return <CalendarFallback />;
  const { year, month } = resolveYearMonth(
    readParam(params.nam),
    readParam(params.thang),
    today,
  );

  return (
    <div className="space-y-8">
      {/* Hàng trên: lịch + panel phụ — lấp ngang, cao tương đương */}
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(17rem,1fr)]">
        <MonthCalendar year={year} month={month} today={today} />

        <div className="space-y-4">
          <div className="rounded-2xl border border-accent/35 bg-[#fffaf2] p-4 shadow-[0_8px_24px_rgba(26,18,11,0.05)]">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-bronze uppercase">
              Chọn tháng
            </p>
            <Form
              key={JSON.stringify(searchRecord)}
              action="/lich-am-duong"
              className="mt-3 flex flex-wrap items-end gap-2"
            >
              <div className="grid min-w-[7.5rem] flex-1 gap-1">
                <Label htmlFor="thang" className="text-xs">
                  Tháng
                </Label>
                <Select id="thang" name="thang" defaultValue={String(month)}>
                  {Array.from({ length: 12 }, (_, index) => index + 1).map((value) => (
                    <option key={value} value={value}>
                      Tháng {value}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="grid w-24 gap-1">
                <Label htmlFor="nam" className="text-xs">
                  Năm
                </Label>
                <Input
                  id="nam"
                  name="nam"
                  type="number"
                  inputMode="numeric"
                  min={YEAR_MIN}
                  max={YEAR_MAX}
                  defaultValue={year}
                  required
                />
              </div>
              <Button type="submit" size="sm" variant="gold">
                Xem
              </Button>
            </Form>
          </div>

          <TodayBrief solar={today} />
        </div>
      </div>

      <section>
        <div className="mb-4">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-bronze uppercase">
            Đổi lịch
          </p>
          <h2 className="ink-heading mt-1 text-2xl text-ink">Dương ↔ Âm</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Lịch Việt Nam, GMT+7. Tháng nhuận được đối chiếu lại.
          </p>
        </div>
        <LunarConverter initialSolar={solarKey(today)} />
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        {[
          {
            href: "/xem-ngay-tot",
            title: "Xem ngày tốt",
            body: "Đánh giá theo mục đích và tuổi.",
          },
          {
            href: "/xem-ngay-tot/theo-thang",
            title: "Ngày tốt trong tháng",
            body: "Lọc các ngày đạt điểm cao.",
          },
          {
            href: "/gieo-que/que-hom-nay",
            title: "Quẻ hôm nay",
            body: "Một quẻ theo seed ngày.",
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl border border-accent/30 bg-[#fffaf2]/90 p-4 transition hover:border-accent/55 hover:bg-accent/10"
          >
            <span className="ink-heading block text-[15px] text-ink">{item.title}</span>
            <span className="mt-1 block text-xs text-muted-foreground">{item.body}</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
