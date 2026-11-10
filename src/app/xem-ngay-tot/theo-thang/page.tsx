import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { PageShell } from "@/components/layout/PageShell";
import { EmptyState } from "@/components/shared/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { DAY_PURPOSES } from "@/data/calendar/day-purposes";
import { findGoodDaysInMonth, getPurpose } from "@/lib/algorithms/calendar/day-assessment";
import { formatLunarLabel } from "@/lib/algorithms/calendar/can-chi";
import {
  YEAR_MAX,
  YEAR_MIN,
  assessmentQuery,
  dayPath,
  formatSolarSlash,
  parseBirthYear,
  readParam,
  resolveYearMonth,
  solarKey,
  todayInVietnam,
  weekdayName,
} from "@/lib/calendar/dates";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Ngày tốt trong tháng",
  description:
    "Lọc các ngày trong tháng đạt từ 65 điểm trở lên theo mục đích và năm sinh, dựa trên lịch âm và quy ước dân gian.",
  path: "/xem-ngay-tot/theo-thang",
});

type MonthQuery = {
  nam?: string | string[];
  thang?: string | string[];
  "muc-dich"?: string | string[];
  "nam-sinh"?: string | string[];
};

const MIN_SCORE = 65;

function ListFallback() {
  return (
    <div className="paper-card gold-border mt-8 h-72 animate-pulse rounded-2xl bg-card/70" aria-hidden="true" />
  );
}

async function MonthResults({ searchParams }: { searchParams: Promise<MonthQuery> }) {
  await connection();
  const params = await searchParams;
  const today = todayInVietnam();
  const { year, month } = resolveYearMonth(readParam(params.nam), readParam(params.thang), today);
  const purposeRaw = readParam(params["muc-dich"]);
  const purpose = purposeRaw ? getPurpose(purposeRaw) : DAY_PURPOSES[0];
  const purposeId = purpose?.id ?? DAY_PURPOSES[0]?.id ?? "xuat-hanh";
  const birthRaw = readParam(params["nam-sinh"]);
  const birthYear = parseBirthYear(birthRaw);
  const birthIgnored = Boolean(birthRaw?.trim()) && birthYear === undefined;
  const days = findGoodDaysInMonth({
    year,
    month,
    purposeId,
    birthYear,
    minScore: MIN_SCORE,
  });
  const purposeName = getPurpose(purposeId)?.name ?? purposeId;

  return (
    <div className="grid gap-8">
      <form action="/xem-ngay-tot/theo-thang" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="grid gap-2">
          <Label htmlFor="thang-tot">Tháng</Label>
          <Select id="thang-tot" name="thang" defaultValue={String(month)}>
            {Array.from({ length: 12 }, (_, index) => index + 1).map((value) => (
              <option key={value} value={value}>
                Tháng {value}
              </option>
            ))}
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="nam-tot">Năm</Label>
          <Input
            id="nam-tot"
            name="nam"
            type="number"
            min={YEAR_MIN}
            max={YEAR_MAX}
            defaultValue={year}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="muc-dich-thang">Mục đích</Label>
          <Select id="muc-dich-thang" name="muc-dich" defaultValue={purposeId}>
            {DAY_PURPOSES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="nam-sinh-thang">Năm sinh</Label>
          <Input
            id="nam-sinh-thang"
            name="nam-sinh"
            type="number"
            min={YEAR_MIN}
            max={YEAR_MAX}
            placeholder="Không bắt buộc"
            defaultValue={birthYear ?? ""}
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-4">
          <Button type="submit">Lọc ngày trong tháng</Button>
        </div>
      </form>

      {purposeRaw && !getPurpose(purposeRaw) ? (
        <p className="text-sm text-primary">
          Mục đích trên đường dẫn không có trong danh sách. Đang lọc theo {purposeName}.
        </p>
      ) : null}
      {birthIgnored ? (
        <p className="text-sm text-primary">
          Năm sinh không hợp lệ nên chưa được đưa vào đối chiếu tuổi.
        </p>
      ) : null}

      <section aria-labelledby="danh-sach-ngay">
        <h2 id="danh-sach-ngay" className="ink-heading text-2xl text-ink">
          Tháng {month} năm {year} · {purposeName}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {days.length} ngày đạt từ {MIN_SCORE} điểm trở lên
          {birthYear ? `, có đối chiếu năm sinh ${birthYear}` : ""}. Danh sách xếp ngày điểm cao
          hơn lên trước.
        </p>
        {getPurpose(purposeId) ? (
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {getPurpose(purposeId)?.description}
          </p>
        ) : null}

        {days.length === 0 ? (
          <EmptyState
            className="mt-6"
            title="Tháng này chưa có ngày đạt ngưỡng"
            description="Hãy đổi mục đích, bỏ năm sinh, hoặc sang tháng khác. Ngưỡng đang dùng là 65 điểm."
          />
        ) : (
          <ol className="mt-6 grid gap-3">
            {days.map((day) => {
              const query = assessmentQuery({
                ngay: solarKey(day.date),
                purposeId,
                birthYear: birthYear ? String(birthYear) : undefined,
              });
              return (
                <li key={solarKey(day.date)}>
                  <Card>
                    <CardHeader className="flex-row flex-wrap items-start justify-between gap-3">
                      <div>
                        <CardTitle className="text-xl">
                          <Link href={`/ket-qua/xem-ngay?${query}`} className="hover:text-primary">
                            {weekdayName(day.date)}, {formatSolarSlash(day.date)}
                          </Link>
                        </CardTitle>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {formatLunarLabel(day.dayDetail.lunar)}
                        </p>
                      </div>
                      <Badge variant={day.rating === "tot" ? "default" : "gold"}>{day.score} điểm</Badge>
                    </CardHeader>
                    <CardContent className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline">Trực {day.dayDetail.truc}</Badge>
                      <Badge variant={day.dayDetail.isHoangDao ? "gold" : "muted"}>
                        {day.dayDetail.isHoangDao ? "Hoàng đạo" : "Hắc đạo"}
                      </Badge>
                      <Button asChild variant="link" className="h-auto px-0">
                        <Link href={dayPath(day.date)}>Lịch ngày</Link>
                      </Button>
                      <Button asChild variant="link" className="h-auto px-0">
                        <Link href={`/ket-qua/xem-ngay?${query}`}>Xem đủ lý do</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </li>
              );
            })}
          </ol>
        )}
      </section>
    </div>
  );
}

export default function GoodDaysInMonthPage({
  searchParams,
}: {
  searchParams: Promise<MonthQuery>;
}) {
  return (
    <PageShell
      width="wide"
      title="Ngày tốt trong tháng"
      description="Chọn năm, tháng và mục đích. Trang liệt kê những ngày trong tháng đạt từ 65 điểm trở lên."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Xem ngày tốt", href: "/xem-ngay-tot" },
        { label: "Theo tháng" },
      ]}
    >
      <Suspense fallback={<ListFallback />}>
        <MonthResults searchParams={searchParams} />
      </Suspense>
    </PageShell>
  );
}
