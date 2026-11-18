import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { DaySummaryPanel, dayPlainText } from "@/components/calendar/DaySummaryPanel";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { ResultActions } from "@/components/shared/ResultActions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildDaySummary, formatLunarLabel } from "@/lib/algorithms/calendar/can-chi";
import {
  dayPath,
  formatSolarLong,
  formatSolarSlash,
  parseSolarKey,
  solarKey,
  todayInVietnam,
  weekdayName,
} from "@/lib/calendar/dates";
import { createPageMetadata } from "@/lib/seo/metadata";

type DatePageProps = {
  params: Promise<{ date: string }>;
};

/**
 * Static export (GitHub Pages) cannot render dates on demand, so it prerenders
 * every day from STATIC_CALENDAR_YEARS_BEFORE years ago to
 * STATIC_CALENDAR_YEARS_AFTER years ahead. A server build prerenders only today.
 */
export function generateStaticParams(): { date: string }[] {
  const today = todayInVietnam();
  if (process.env.STATIC_EXPORT !== "1") return [{ date: solarKey(today) }];

  const before = Number(process.env.STATIC_CALENDAR_YEARS_BEFORE ?? 2);
  const after = Number(process.env.STATIC_CALENDAR_YEARS_AFTER ?? 3);
  const params: { date: string }[] = [];
  const cursor = new Date(Date.UTC(today.year - before, 0, 1));
  const end = Date.UTC(today.year + after, 11, 31);
  while (cursor.getTime() <= end) {
    params.push({
      date: solarKey({
        year: cursor.getUTCFullYear(),
        month: cursor.getUTCMonth() + 1,
        day: cursor.getUTCDate(),
      }),
    });
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return params;
}

export async function generateMetadata({ params }: DatePageProps): Promise<Metadata> {
  const { date } = await params;
  const solar = parseSolarKey(date);
  if (!solar) {
    return createPageMetadata({
      title: "Ngày không hợp lệ",
      description: "Đường dẫn ngày cần đúng dạng năm-tháng-ngày.",
      path: "/lich-am-duong",
    });
  }
  const summary = buildDaySummary(solar);
  return createPageMetadata({
    title: `${weekdayName(solar)} ${formatSolarSlash(solar)}`,
    description: `${formatLunarLabel(summary.lunar)}. Can chi ${summary.canChi.dayLabel}, trực ${summary.truc}, nạp âm ${summary.napAm}.`,
    path: dayPath(solar),
  });
}

function DayFallback() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <div className="paper-card gold-border h-72 animate-pulse rounded-2xl bg-card/70" />
    </div>
  );
}

async function DayDetailPage({ params }: DatePageProps) {
  const { date } = await params;
  const solar = parseSolarKey(date);
  if (!solar || solarKey(solar) !== date) notFound();

  const summary = buildDaySummary(solar);
  const assessHref = `/xem-ngay-tot?ngay=${solarKey(solar)}`;

  return (
    <PageShell
      title={`${weekdayName(solar)}, ${formatSolarLong(solar)}`}
      description={formatLunarLabel(summary.lunar)}
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Lịch âm dương", href: "/lich-am-duong" },
        { label: formatSolarSlash(solar) },
      ]}
    >
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Badge variant={summary.isHoangDao ? "default" : "secondary"}>
          {summary.isHoangDao ? "Hoàng đạo" : "Hắc đạo"}
        </Badge>
        <Badge variant="gold">Trực {summary.truc}</Badge>
        <Badge variant="outline">{summary.napAm}</Badge>
        {summary.festivals.map((festival) => (
          <Badge key={festival} variant="gold">
            {festival}
          </Badge>
        ))}
      </div>

      <ResultActions
        title={`Ngày ${formatSolarSlash(solar)}`}
        text={dayPlainText(summary)}
        className="mb-6"
      />

      <DaySummaryPanel summary={summary} />

      <div className="mt-6 grid gap-4">
        <Disclaimer type="thuat-toan" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          {summary.disclaimer} Giờ hoàng đạo, giờ hắc đạo, sao tốt, sao xấu và sát chủ cũng thuộc
          lớp quan niệm dân gian, không phải kết luận khoa học. Tiết khí trên trang là ước lượng
          theo khoảng ngày trong năm.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button asChild>
          <Link href={assessHref}>Xem ngày này theo mục đích</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={`/lich-am-duong?nam=${solar.year}&thang=${solar.month}`}>Về lịch tháng</Link>
        </Button>
      </div>
    </PageShell>
  );
}

export default function DayPage({ params }: DatePageProps) {
  return (
    <Suspense fallback={<DayFallback />}>
      <DayDetailPage params={params} />
    </Suspense>
  );
}
