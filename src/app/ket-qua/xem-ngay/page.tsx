import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { PageShell } from "@/components/layout/PageShell";
import { AssessmentPanel, assessmentPlainText } from "@/components/calendar/AssessmentPanel";
import { ResultActions } from "@/components/shared/ResultActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DAY_PURPOSES } from "@/data/calendar/day-purposes";
import { assessDay, getPurpose } from "@/lib/algorithms/calendar/day-assessment";
import {
  YEAR_MAX,
  YEAR_MIN,
  assessmentQuery,
  dayPath,
  formatSolarSlash,
  parseBirthYear,
  parseGender,
  parseSolarKey,
  readParam,
  solarKey,
  todayInVietnam,
} from "@/lib/calendar/dates";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Kết quả xem ngày",
  description:
    "Trang kết quả xem ngày theo mục đích, năm sinh và ngày dương lịch. Điểm số là tham khảo từ lịch âm và quan niệm dân gian.",
  path: "/ket-qua/xem-ngay",
});

type ResultQuery = {
  ngay?: string | string[];
  "muc-dich"?: string | string[];
  "nam-sinh"?: string | string[];
  "gioi-tinh"?: string | string[];
};

function ResultFallback() {
  return (
    <div className="paper-card gold-border h-72 animate-pulse rounded-2xl bg-card/70" aria-hidden="true" />
  );
}

function ResultForm({
  ngay,
  purposeId,
  birthYear,
  gender,
}: {
  ngay: string;
  purposeId: string;
  birthYear: string;
  gender: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chọn lại ngày và việc</CardTitle>
      </CardHeader>
      <CardContent>
        <form action="/ket-qua/xem-ngay" method="get" className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="ket-qua-ngay">Ngày dương lịch</Label>
            <Input
              id="ket-qua-ngay"
              name="ngay"
              type="date"
              required
              min={`${YEAR_MIN}-01-01`}
              max={`${YEAR_MAX}-12-31`}
              defaultValue={ngay}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="ket-qua-muc-dich">Mục đích</Label>
            <Select id="ket-qua-muc-dich" name="muc-dich" defaultValue={purposeId}>
              {DAY_PURPOSES.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="ket-qua-nam-sinh">Năm sinh</Label>
            <Input
              id="ket-qua-nam-sinh"
              name="nam-sinh"
              type="number"
              min={YEAR_MIN}
              max={YEAR_MAX}
              placeholder="Không bắt buộc"
              defaultValue={birthYear}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="ket-qua-gioi-tinh">Giới tính</Label>
            <Select id="ket-qua-gioi-tinh" name="gioi-tinh" defaultValue={gender}>
              <option value="">Không chọn</option>
              <option value="nam">Nam</option>
              <option value="nu">Nữ</option>
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Button type="submit">Xem kết quả</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

async function ResultBody({ searchParams }: { searchParams: Promise<ResultQuery> }) {
  await connection();
  const params = await searchParams;
  const today = todayInVietnam();
  const ngayRaw = readParam(params.ngay);
  const purposeRaw = readParam(params["muc-dich"]);
  const birthRaw = readParam(params["nam-sinh"]) ?? "";
  const genderRaw = readParam(params["gioi-tinh"]) ?? "";
  const solar = parseSolarKey(ngayRaw);
  const purpose = purposeRaw ? getPurpose(purposeRaw) : undefined;
  const fallbackPurpose = DAY_PURPOSES[0]?.id ?? "xuat-hanh";
  const gender = parseGender(genderRaw);
  const birthYear = parseBirthYear(birthRaw);

  if (!solar || !purpose) {
    return (
      <div className="grid gap-6">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {!ngayRaw && !purposeRaw
            ? "Chưa có ngày và mục đích trên đường dẫn. Chọn bên dưới để mở một kết quả có thể chia sẻ."
            : "Ngày hoặc mục đích trên đường dẫn chưa dùng được. Hãy chọn lại trong danh sách."}
        </p>
        <ResultForm
          ngay={solar ? solarKey(solar) : solarKey(today)}
          purposeId={purpose?.id ?? fallbackPurpose}
          birthYear={birthRaw}
          gender={gender ?? ""}
        />
        <Button asChild variant="outline" className="w-fit">
          <Link href="/xem-ngay-tot">Về trang xem ngày</Link>
        </Button>
      </div>
    );
  }

  const assessment = assessDay({
    date: solar,
    purposeId: purpose.id,
    birthYear,
    gender,
  });
  const query = assessmentQuery({
    ngay: solarKey(solar),
    purposeId: purpose.id,
    birthYear: birthYear ? String(birthYear) : undefined,
    gender,
  });

  return (
    <div className="grid gap-6">
      {birthRaw.trim() && birthYear === undefined ? (
        <p className="text-sm text-primary">
          Năm sinh không hợp lệ nên chưa được đưa vào đối chiếu tuổi.
        </p>
      ) : null}
      <ResultActions
        title={`Xem ngày ${purpose.name} ${formatSolarSlash(solar)}`}
        text={assessmentPlainText(assessment, gender)}
      />
      <AssessmentPanel assessment={assessment} gender={gender} />
      <div className="flex flex-wrap gap-2">
        <Button asChild variant="outline">
          <Link href={dayPath(solar)}>Mở lịch ngày này</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={`/xem-ngay-tot?${query}`}>Sửa trên trang xem ngày</Link>
        </Button>
      </div>
      <ResultForm
        ngay={solarKey(solar)}
        purposeId={purpose.id}
        birthYear={birthYear ? String(birthYear) : ""}
        gender={gender ?? ""}
      />
    </div>
  );
}

export default function DayResultPage({ searchParams }: { searchParams: Promise<ResultQuery> }) {
  return (
    <PageShell
      title="Kết quả xem ngày"
      description="Điểm, lý do, giờ hoàng đạo, hướng xuất hành và đủ thông tin can chi của ngày đã chọn."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Xem ngày tốt", href: "/xem-ngay-tot" },
        { label: "Kết quả" },
      ]}
    >
      <Suspense fallback={<ResultFallback />}>
        <ResultBody searchParams={searchParams} />
      </Suspense>
    </PageShell>
  );
}
