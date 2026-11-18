"use client";

import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { useTodaySolar } from "@/lib/client/use-vn-today";
import { Button } from "@/components/ui/button";
import { buildDaySummary } from "@/lib/algorithms/calendar/can-chi";
import { NGU_HANH_VI } from "@/lib/algorithms/calendar/constants";
import { pad2 } from "@/lib/utils";
import type { SolarDate } from "@/types";

const WEEKDAYS = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];

const HIGHLIGHTS = [
  { value: "24", label: "công cụ tra cứu" },
  { value: "12", label: "con giáp & cung" },
  { value: "64", label: "quẻ Kinh Dịch" },
];

export function HeroSection() {
  const solar = useTodaySolar();
  const detailHref = solar
    ? `/lich-am-duong/${solar.year}-${pad2(solar.month)}-${pad2(solar.day)}`
    : "/lich-am-duong";

  return (
    <section className="lacquer relative overflow-hidden rounded-[1.75rem] border border-accent/30 px-6 py-10 text-primary-foreground shadow-[var(--shadow-lift)] sm:px-10 sm:py-14 lg:px-14">
      <div className="cloud-motif pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-24 -right-16 size-96 rounded-full bg-[radial-gradient(circle,rgba(196,154,58,0.3),transparent_68%)] blur-2xl animate-mist" />

      <div className="relative grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-white/5 px-3 py-1 text-xs font-medium tracking-[0.18em] text-accent uppercase">
            <span className="size-1.5 rotate-45 bg-accent" aria-hidden="true" />
            Lịch pháp · Phong thủy<span className="hidden sm:inline"> · Kinh Dịch</span>
          </p>
          <h1 className="ink-heading mt-5 max-w-xl text-[2.4rem] leading-[1.12] text-[#fff8ec] sm:text-5xl lg:text-[3.5rem]">
            Vạn sự khởi đầu từ <span className="text-accent">ngày lành</span> và tâm sáng
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-[#f1e5cb]/85">
            Lịch âm dương, xem ngày tốt, tử vi và Kinh Dịch dành cho người Việt — trang nhã,
            dễ tra, phân biệt rõ đâu là thuật toán, đâu là quan niệm dân gian.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="gold" size="lg">
              <Link href={detailHref}>
                Xem chi tiết hôm nay
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-[#f1e5cb]/35 bg-white/5 text-[#fff8ec] hover:border-accent hover:bg-white/10"
            >
              <Link href="/xem-ngay-tot">
                <CalendarCheck className="size-4" />
                Chọn ngày tốt
              </Link>
            </Button>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6">
            {HIGHLIGHTS.map((item) => (
              <div key={item.label}>
                <dt className="sr-only">{item.label}</dt>
                <dd className="ink-heading text-xl text-[#fff8ec] sm:text-2xl">{item.value}</dd>
                <dd className="mt-0.5 text-xs text-[#f1e5cb]/65">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="absolute -inset-5 rounded-[2rem] border border-accent/20" aria-hidden="true" />
          {solar ? (
            <TodayCard solar={solar} href={detailHref} />
          ) : (
            <div className="relative h-[27rem] animate-pulse rounded-2xl bg-[#fffdf8]/90" aria-hidden="true" />
          )}
        </div>
      </div>
    </section>
  );
}

/** Thẻ hôm nay dạng tờ lịch bóc: ngày dương lớn, âm lịch và can chi bên dưới. */
function TodayCard({ solar, href }: { solar: SolarDate; href: string }) {
  const day = buildDaySummary(solar);
  const weekday = WEEKDAYS[new Date(Date.UTC(solar.year, solar.month - 1, solar.day)).getUTCDay()];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#fffdf8] text-foreground shadow-[0_30px_60px_-24px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-between bg-primary px-5 py-2.5 text-primary-foreground">
        <span className="text-sm font-medium">
          Tháng {solar.month} · {solar.year}
        </span>
        <span className="text-xs tracking-[0.16em] text-accent uppercase">Hôm nay</span>
      </div>
      <div aria-hidden="true" className="flex justify-around px-8 pt-1.5">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} className="size-1.5 rounded-full bg-border" />
        ))}
      </div>

      <div className="px-6 pt-3 pb-5 text-center">
        <p className="text-sm font-medium tracking-wide text-muted-foreground">{weekday}</p>
        <p className="ink-heading text-[5.5rem] leading-none font-semibold text-primary">
          {solar.day}
        </p>
        <p className="mt-2 text-sm text-wood">
          Ngày <strong className="font-semibold text-ink">{day.lunar.day}</strong> tháng{" "}
          <strong className="font-semibold text-ink">
            {day.lunar.month}
            {day.lunar.leap ? " nhuận" : ""}
          </strong>{" "}
          âm lịch
        </p>
        <span
          className={
            day.isHoangDao
              ? "mt-3 inline-flex rounded-full bg-jade/10 px-3 py-1 text-xs font-medium text-jade"
              : "mt-3 inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
          }
        >
          {day.isHoangDao ? "Ngày Hoàng đạo" : "Ngày Hắc đạo"}
        </span>
      </div>

      <dl className="grid grid-cols-2 border-t border-dashed border-border text-sm">
        <Cell label="Ngày" value={day.canChi.dayLabel} />
        <Cell label="Tháng" value={day.canChi.monthLabel} border />
        <Cell label="Năm" value={day.canChi.yearLabel} top />
        <Cell label="Ngũ hành" value={NGU_HANH_VI[day.nguHanh]} border top />
        <Cell label="Trực" value={day.truc} top />
        <Cell label="Giờ tốt" value={day.gioHoangDao[0] ?? "—"} border top />
      </dl>

      <Link
        href={href}
        className="flex items-center justify-center gap-1.5 border-t border-border bg-muted/50 px-5 py-3 text-sm font-medium text-primary transition-colors hover:bg-muted"
      >
        Xem giờ tốt, việc nên làm
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </div>
  );
}

function Cell({
  label,
  value,
  border,
  top,
}: {
  label: string;
  value: string;
  border?: boolean;
  top?: boolean;
}) {
  return (
    <div className={`px-5 py-2.5 ${border ? "border-l border-border" : ""} ${top ? "border-t border-border" : ""}`}>
      <dt className="text-[11px] tracking-wide text-muted-foreground uppercase">{label}</dt>
      <dd className="mt-0.5 truncate font-medium text-ink">{value}</dd>
    </div>
  );
}
