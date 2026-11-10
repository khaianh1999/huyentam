"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultActions } from "@/components/shared/ResultActions";
import { DAY_PURPOSES } from "@/data/calendar/day-purposes";
import { assessDay, getPurpose } from "@/lib/algorithms/calendar/day-assessment";
import { AssessmentPanel, assessmentPlainText } from "@/components/calendar/AssessmentPanel";
import {
  YEAR_MAX,
  YEAR_MIN,
  assessmentQuery,
  parseBirthYear,
  parseGender,
  parseSolarKey,
} from "@/lib/calendar/dates";

export type AssessmentDraft = {
  ngay: string;
  purposeId: string;
  birthYear: string;
  gender: string;
  showResult: boolean;
};

type DayAssessmentFormProps = {
  initial: AssessmentDraft;
};

function validate(draft: AssessmentDraft): string | null {
  if (!parseSolarKey(draft.ngay)) {
    return `Hãy chọn ngày dương lịch từ ${YEAR_MIN} đến ${YEAR_MAX}.`;
  }
  if (!getPurpose(draft.purposeId)) {
    return "Hãy chọn một mục đích trong danh sách.";
  }
  if (draft.birthYear.trim() && parseBirthYear(draft.birthYear) === undefined) {
    return `Năm sinh để trống hoặc nhập đủ 4 chữ số, từ ${YEAR_MIN} đến ${YEAR_MAX}.`;
  }
  return null;
}

export function DayAssessmentForm({ initial }: DayAssessmentFormProps) {
  const router = useRouter();
  const initialError = initial.showResult ? validate(initial) : null;
  const [draft, setDraft] = useState(initial);
  const [active, setActive] = useState<AssessmentDraft | null>(
    initial.showResult && !initialError ? initial : null,
  );
  const [error, setError] = useState<string | null>(initialError);

  const purpose = getPurpose(draft.purposeId) ?? DAY_PURPOSES[0];
  const shareQuery = assessmentQuery({
    ngay: (active ?? draft).ngay,
    purposeId: (active ?? draft).purposeId,
    birthYear: (active ?? draft).birthYear,
    gender: (active ?? draft).gender,
  });

  const result = useMemo(() => {
    if (!active || validate(active)) return null;
    const date = parseSolarKey(active.ngay);
    if (!date) return null;
    return assessDay({
      date,
      purposeId: active.purposeId,
      birthYear: parseBirthYear(active.birthYear),
      gender: parseGender(active.gender),
    });
  }, [active]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = validate(draft);
    if (message) {
      setError(message);
      setActive(null);
      return;
    }
    setError(null);
    setActive(draft);
    const query = assessmentQuery(draft);
    router.replace(`/xem-ngay-tot?${query}`, { scroll: false });
  }

  const solar = parseSolarKey(draft.ngay);
  const monthHref = solar
    ? `/xem-ngay-tot/theo-thang?nam=${solar.year}&thang=${solar.month}&muc-dich=${draft.purposeId}${
        parseBirthYear(draft.birthYear) ? `&nam-sinh=${draft.birthYear.trim()}` : ""
      }`
    : `/xem-ngay-tot/theo-thang?muc-dich=${draft.purposeId}`;

  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Chọn ngày và việc</CardTitle>
        </CardHeader>
        <CardContent>
          <form action="/ket-qua/xem-ngay" method="get" className="grid gap-4" onSubmit={onSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="ngay">Ngày dương lịch</Label>
                <Input
                  id="ngay"
                  name="ngay"
                  type="date"
                  required
                  min={`${YEAR_MIN}-01-01`}
                  max={`${YEAR_MAX}-12-31`}
                  value={draft.ngay}
                  onChange={(event) => setDraft((current) => ({ ...current, ngay: event.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="muc-dich">Mục đích</Label>
                <Select
                  id="muc-dich"
                  name="muc-dich"
                  value={draft.purposeId}
                  onChange={(event) =>
                    setDraft((current) => ({ ...current, purposeId: event.target.value }))
                  }
                >
                  {DAY_PURPOSES.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nam-sinh">Năm sinh (không bắt buộc)</Label>
                <Input
                  id="nam-sinh"
                  name="nam-sinh"
                  type="number"
                  inputMode="numeric"
                  min={YEAR_MIN}
                  max={YEAR_MAX}
                  placeholder="Ví dụ 1990"
                  value={draft.birthYear}
                  onChange={(event) =>
                    setDraft((current) => ({ ...current, birthYear: event.target.value }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gioi-tinh">Giới tính (không bắt buộc)</Label>
                <Select
                  id="gioi-tinh"
                  name="gioi-tinh"
                  value={draft.gender}
                  onChange={(event) =>
                    setDraft((current) => ({ ...current, gender: event.target.value }))
                  }
                >
                  <option value="">Không chọn</option>
                  <option value="nam">Nam</option>
                  <option value="nu">Nữ</option>
                </Select>
              </div>
            </div>
            {purpose ? (
              <p className="text-sm leading-relaxed text-muted-foreground">{purpose.description}</p>
            ) : null}
            {error ? <p className="text-sm text-primary">{error}</p> : null}
            <div className="flex flex-wrap gap-2">
              <Button type="submit">Xem ngày</Button>
              <Button asChild variant="outline">
                <Link href={`/ket-qua/xem-ngay?${shareQuery}`}>Mở trang kết quả</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href={monthHref}>Ngày tốt trong tháng này</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {result ? (
        <div className="grid gap-4">
          <ResultActions
            title={`Xem ngày ${result.purpose.name}`}
            text={assessmentPlainText(result, parseGender(active?.gender))}
          />
          <AssessmentPanel assessment={result} gender={parseGender(active?.gender)} />
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-muted-foreground">
          Chọn ngày, mục đích rồi bấm Xem ngày. Kết quả hiện ngay tại trang này, và đường dẫn phía
          trên có thể gửi cho người khác.
        </p>
      )}
    </div>
  );
}
