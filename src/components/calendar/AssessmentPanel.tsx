import type { DayAssessment, Gender } from "@/types";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DAY_PURPOSES_LABEL } from "@/data/calendar/day-purposes";
import { formatLunarLabel } from "@/lib/algorithms/calendar/can-chi";
import { formatSolarSlash, genderLabel, weekdayName } from "@/lib/calendar/dates";
import { DaySummaryPanel, dayPlainText } from "@/components/calendar/DaySummaryPanel";
import { cn } from "@/lib/utils";

const RATING_LABEL = {
  tot: "Tốt",
  "trung-binh": "Trung bình",
  "nen-tranh": "Nên tránh",
  xau: "Xấu",
} as const;

const RATING_CLASS = {
  tot: "border-jade/40 bg-jade/10 text-jade",
  "trung-binh": "border-accent/50 bg-accent/15 text-wood",
  "nen-tranh": "border-primary/30 bg-primary/10 text-primary",
  xau: "border-destructive/30 bg-destructive/10 text-destructive",
} as const;

type AssessmentPanelProps = {
  assessment: DayAssessment;
  gender?: Gender;
};

export function assessmentPlainText(assessment: DayAssessment, gender?: Gender): string {
  const lines = [
    `Xem ngày ${formatSolarSlash(assessment.date)} — ${assessment.purpose.name}`,
    `Đánh giá tham khảo: ${RATING_LABEL[assessment.rating]} (${assessment.score}/100)`,
    ...assessment.reasons,
    assessment.hopTuoi.length ? `Tuổi không xung trực tiếp: ${assessment.hopTuoi.join(", ")}` : "",
    assessment.xungTuoi.length ? `Tuổi xung: ${assessment.xungTuoi.join(", ")}` : "",
    `Giờ hoàng đạo: ${assessment.goodHours.join(", ")}`,
    `Giờ hắc đạo: ${assessment.badHours.join(", ")}`,
    `Hướng xuất hành gợi ý: ${assessment.huongXuatHanh.join(", ")}`,
    gender ? `Giới tính ghi nhận: ${genderLabel(gender)}` : "",
    assessment.disclaimer,
    dayPlainText(assessment.dayDetail),
  ];
  return lines.filter(Boolean).join("\n");
}

export function AssessmentPanel({ assessment, gender }: AssessmentPanelProps) {
  const tuoi = [...assessment.hopTuoi, ...assessment.xungTuoi];

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="gold" className="capitalize">
              {DAY_PURPOSES_LABEL}
            </Badge>
            <Badge variant="outline">{assessment.purpose.name}</Badge>
          </div>
          <CardTitle className="text-2xl">
            {weekdayName(assessment.date)}, {formatSolarSlash(assessment.date)}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{formatLunarLabel(assessment.dayDetail.lunar)}</p>
        </CardHeader>
        <CardContent className="grid items-center gap-6 sm:grid-cols-[auto_1fr]">
          <div
            className="grid size-28 place-items-center rounded-full"
            style={{
              background: `conic-gradient(#8b1e1e ${assessment.score * 3.6}deg, #ebe0d0 0deg)`,
            }}
            role="img"
            aria-label={`${assessment.score} điểm trên 100`}
          >
            <div className="grid size-[5.25rem] place-items-center rounded-full bg-card">
              <span className="ink-heading text-3xl text-ink">{assessment.score}</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Điểm tham khảo trên thang 100</p>
            <p
              className={cn(
                "mt-2 inline-flex rounded-full border px-3 py-1 text-sm font-medium",
                RATING_CLASS[assessment.rating],
              )}
            >
              {RATING_LABEL[assessment.rating]}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {assessment.purpose.description}
            </p>
            {tuoi.length || gender ? (
              <p className="mt-3 text-sm text-wood">
                {tuoi.length ? `Tuổi đối chiếu: ${tuoi.join(", ")}. ` : ""}
                {gender ? `Giới tính ghi nhận cùng yêu cầu: ${genderLabel(gender)}. Điểm số không đổi theo giới tính.` : ""}
              </p>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vì sao có điểm này</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="grid list-decimal gap-2 pl-5 text-sm leading-relaxed text-ink">
            {assessment.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Giờ và hướng</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <p className="mb-2 text-xs tracking-wide text-muted-foreground uppercase">
                Giờ hoàng đạo
              </p>
              <ul className="flex flex-wrap gap-2">
                {assessment.goodHours.map((hour) => (
                  <li key={hour}>
                    <Badge variant="gold">{hour}</Badge>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-xs tracking-wide text-muted-foreground uppercase">Giờ hắc đạo</p>
              <ul className="flex flex-wrap gap-2">
                {assessment.badHours.map((hour) => (
                  <li key={hour}>
                    <Badge variant="outline">{hour}</Badge>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-xs tracking-wide text-muted-foreground uppercase">
                Hướng xuất hành gợi ý
              </p>
              <ul className="flex flex-wrap gap-2">
                {assessment.huongXuatHanh.map((direction) => (
                  <li key={direction}>
                    <Badge variant="secondary">{direction}</Badge>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Hướng được suy từ chi ngày theo quy ước dân gian, dùng khi việc là xuất hành.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tuổi hợp và tuổi xung</CardTitle>
          </CardHeader>
          <CardContent>
            {assessment.hopTuoi.length === 0 && assessment.xungTuoi.length === 0 ? (
              <p className="text-sm leading-relaxed text-muted-foreground">
                Chưa có năm sinh để đối chiếu tứ hành xung với chi ngày. Thêm năm sinh nếu muốn xem
                tuổi có xung hay không.
              </p>
            ) : (
              <dl className="grid gap-3 text-sm">
                <div>
                  <dt className="text-muted-foreground">Không xung trực tiếp</dt>
                  <dd className="mt-1 font-medium text-ink">
                    {assessment.hopTuoi.join(", ") || "Không ghi nhận"}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Xung với chi ngày</dt>
                  <dd className="mt-1 font-medium text-ink">
                    {assessment.xungTuoi.join(", ") || "Không ghi nhận"}
                  </dd>
                </div>
              </dl>
            )}
          </CardContent>
        </Card>
      </div>

      <DaySummaryPanel summary={assessment.dayDetail} />

      <Disclaimer type="thuat-toan" />
      <p className="text-sm leading-relaxed text-muted-foreground">{assessment.disclaimer}</p>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Hoàng đạo, hắc đạo, trực, sao tốt, sao xấu, giờ hoàng đạo, giờ hắc đạo, tam nương, nguyệt
        kỵ, sát chủ và hướng xuất hành là phần quan niệm dân gian. Can chi, âm lịch và nạp âm là
        phần thuật toán lịch. Điểm số chỉ để tham khảo văn hóa.
      </p>
    </div>
  );
}
