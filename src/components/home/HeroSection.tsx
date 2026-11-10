import Link from "next/link";
import { connection } from "next/server";
import { Compass, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { buildDaySummary, formatLunarLabel } from "@/lib/algorithms/calendar/can-chi";
import { NGU_HANH_VI } from "@/lib/algorithms/calendar/constants";
import { pad2 } from "@/lib/utils";

export async function HeroSection() {
  await connection();
  const now = new Date();
  const solar = {
    day: now.getDate(),
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  };
  const day = buildDaySummary(solar);
  const detailHref = `/lich-am-duong/${solar.year}-${pad2(solar.month)}-${pad2(solar.day)}`;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-[#2a1212] via-[#4a1818] to-[#1a120b] px-6 py-12 text-primary-foreground shadow-[var(--shadow-soft)] sm:px-10 sm:py-16">
      <div className="pointer-events-none absolute -right-10 top-0 size-72 rounded-full bg-[radial-gradient(circle,rgba(201,162,39,0.35),transparent_70%)] blur-2xl animate-mist" />
      <div className="pointer-events-none absolute bottom-0 left-0 size-56 rounded-full bg-[radial-gradient(circle,rgba(15,118,110,0.25),transparent_70%)] blur-2xl" />

      <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="mb-3 text-sm font-medium tracking-[0.2em] text-accent uppercase">
            Huyền Tâm
          </p>
          <h1 className="ink-heading max-w-xl text-4xl leading-tight text-[#fff8e7] sm:text-5xl lg:text-6xl">
            Vạn sự khởi đầu từ ngày lành và tâm sáng
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-[#f3e6c8]/90">
            Nền tảng lịch âm dương, xem ngày tốt, tử vi và Kinh Dịch dành cho người Việt —
            sâu sắc, trang nhã, phân biệt rõ thuật toán với quan niệm dân gian.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="gold" size="lg">
              <Link href={detailHref}>
                Xem chi tiết ngày hôm nay
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-[#f3e6c8]/40 bg-transparent text-[#fff8e7] hover:bg-white/10"
            >
              <Link href="/xem-ngay-tot">Xem ngày tốt</Link>
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-full border border-accent/20 animate-yin-yang opacity-40" />
          <div className="paper-card gold-border relative rounded-2xl p-6 text-foreground">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Compass className="size-6" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">Lịch hôm nay</p>
                <p className="ink-heading text-xl text-ink">
                  {pad2(solar.day)}/{pad2(solar.month)}/{solar.year}
                </p>
              </div>
            </div>

            <dl className="grid gap-3 text-sm">
              <div className="flex justify-between gap-3 border-b border-border/60 pb-2">
                <dt className="text-muted-foreground">Âm lịch</dt>
                <dd className="font-medium text-right">{formatLunarLabel(day.lunar)}</dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-border/60 pb-2">
                <dt className="text-muted-foreground">Can chi ngày</dt>
                <dd className="font-medium">{day.canChi.dayLabel}</dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-border/60 pb-2">
                <dt className="text-muted-foreground">Tháng / Năm</dt>
                <dd className="font-medium text-right">
                  {day.canChi.monthLabel} · {day.canChi.yearLabel}
                </dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-border/60 pb-2">
                <dt className="text-muted-foreground">Trực / Nạp âm</dt>
                <dd className="font-medium text-right">
                  {day.truc} · {day.napAm}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Ngũ hành</dt>
                <dd className="font-medium">{NGU_HANH_VI[day.nguHanh]}</dd>
              </div>
            </dl>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant={day.isHoangDao ? "default" : "secondary"}>
                {day.isHoangDao ? "Hoàng đạo" : "Hắc đạo"}
              </Badge>
              <Badge variant="outline">Giờ HD: {day.gioHoangDao[0]}</Badge>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Can chi & âm lịch theo thuật toán. Hoàng đạo / trực mang tính quan niệm dân gian.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
