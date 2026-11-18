"use client";

import Link from "next/link";
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
} from "@/lib/calendar/dates";
import Form from "next/form";
import { useSearchRecord } from "@/lib/client/use-search-record";
import { useTodaySolar } from "@/lib/client/use-vn-today";

type ResultQuery = {
  ngay?: string | string[];
  "muc-dich"?: string | string[];
  "nam-sinh"?: string | string[];
  "gioi-tinh"?: string | string[];
};

export function ResultFallback() {
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
        <Form action="/ket-qua/xem-ngay" className="grid gap-4 sm:grid-cols-2">
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
        </Form>
      </CardContent>
    </Card>
  );
}

export function ResultBody() {
  const searchRecord = useSearchRecord<ResultQuery>();
  const params = searchRecord;
  const today = useTodaySolar();
  if (!today) return <ResultFallback />;
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
          key={JSON.stringify(searchRecord)}
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
        key={JSON.stringify(searchRecord)}
        ngay={solarKey(solar)}
        purposeId={purpose.id}
        birthYear={birthYear ? String(birthYear) : ""}
        gender={gender ?? ""}
      />
    </div>
  );
}
