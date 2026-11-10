import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { PageShell } from "@/components/layout/PageShell";
import { DayAssessmentForm, type AssessmentDraft } from "@/components/calendar/DayAssessmentForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DAY_PURPOSES, DAY_PURPOSES_NOTE } from "@/data/calendar/day-purposes";
import { getPurpose } from "@/lib/algorithms/calendar/day-assessment";
import { parseSolarKey, readParam, solarKey, todayInVietnam } from "@/lib/calendar/dates";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Xem ngày tốt",
  description:
    "Xem một ngày dương lịch theo mục đích cưới hỏi, khai trương, động thổ, xuất hành và các việc khác. Kết quả trộn lịch âm với quy ước dân gian.",
  path: "/xem-ngay-tot",
});

type DayQuery = {
  ngay?: string | string[];
  "muc-dich"?: string | string[];
  "nam-sinh"?: string | string[];
  "gioi-tinh"?: string | string[];
};

function FormFallback() {
  return (
    <div className="paper-card gold-border h-64 animate-pulse rounded-2xl bg-card/70" aria-hidden="true" />
  );
}

async function AssessmentBody({ searchParams }: { searchParams: Promise<DayQuery> }) {
  await connection();
  const params = await searchParams;
  const today = todayInVietnam();
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

export default function GoodDayPage({ searchParams }: { searchParams: Promise<DayQuery> }) {
  return (
    <PageShell
      title="Xem ngày tốt"
      description="Chọn một ngày dương lịch và việc cần làm. Trang tính điểm tham khảo từ âm lịch, can chi và các quy ước dân gian như hoàng đạo, trực, tam nương."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Xem ngày tốt" },
      ]}
    >
      <Suspense fallback={<FormFallback />}>
        <AssessmentBody searchParams={searchParams} />
      </Suspense>
    </PageShell>
  );
}
