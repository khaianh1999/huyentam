"use client";

import Link from "next/link";
import { DayAssessmentForm, type AssessmentDraft } from "@/components/calendar/DayAssessmentForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DAY_PURPOSES, DAY_PURPOSES_NOTE } from "@/data/calendar/day-purposes";
import { getPurpose } from "@/lib/algorithms/calendar/day-assessment";
import { parseSolarKey, readParam, solarKey } from "@/lib/calendar/dates";
import { useSearchRecord } from "@/lib/client/use-search-record";
import { useTodaySolar } from "@/lib/client/use-vn-today";

type DayQuery = {
  ngay?: string | string[];
  "muc-dich"?: string | string[];
  "nam-sinh"?: string | string[];
  "gioi-tinh"?: string | string[];
};

export function FormFallback() {
  return (
    <div className="paper-card gold-border h-64 animate-pulse rounded-2xl bg-card/70" aria-hidden="true" />
  );
}

export function AssessmentBody() {
  const searchRecord = useSearchRecord<DayQuery>();
  const params = searchRecord;
  const today = useTodaySolar();
  if (!today) return <FormFallback />;
  const ngayRaw = readParam(params.ngay);
  const purposeRaw = readParam(params["muc-dich"]);
  const birthRaw = readParam(params["nam-sinh"]) ?? "";
  const genderRaw = readParam(params["gioi-tinh"]) ?? "";
  const parsedDate = parseSolarKey(ngayRaw);
  const purpose = purposeRaw ? getPurpose(purposeRaw) : undefined;
  const purposeId = purpose?.id ?? DAY_PURPOSES[0]?.id ?? "xuat-hanh";
  const showResult = Boolean(ngayRaw || purposeRaw);
  const initial: AssessmentDraft = {
    ngay: parsedDate ? solarKey(parsedDate) : solarKey(today),
    purposeId,
    birthYear: birthRaw,
    gender: genderRaw === "nam" || genderRaw === "nu" ? genderRaw : "",
    showResult,
  };

  return (
    <div className="grid gap-10">
      {purposeRaw && !purpose ? (
        <p className="text-sm text-primary">
          Mục đích trên đường dẫn không có trong danh sách. Trang đang mở mục{" "}
          {DAY_PURPOSES.find((item) => item.id === purposeId)?.name ?? "đầu tiên"}.
        </p>
      ) : null}
      {ngayRaw && !parsedDate ? (
        <p className="text-sm text-primary">
          Ngày trên đường dẫn không hợp lệ. Trang đang dùng ngày hôm nay theo giờ Việt Nam.
        </p>
      ) : null}
      <DayAssessmentForm initial={initial} />
      <section>
        <h2 className="ink-heading text-2xl text-ink">Mục đích thường xem</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{DAY_PURPOSES_NOTE}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {DAY_PURPOSES.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className="text-lg">
                  <Link href={`/xem-ngay-tot?muc-dich=${item.id}`} className="hover:text-primary">
                    {item.name}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <Link
                  href={`/xem-ngay-tot/theo-thang?muc-dich=${item.id}`}
                  className="mt-3 inline-block text-sm text-bronze hover:text-primary"
                >
                  Xem cả tháng
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
