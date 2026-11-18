import type { ReactNode } from "react";
import { AlertTriangle, Compass, Sparkles, Star, Users } from "lucide-react";
import type { ActivityTag, AlmanacStar, DayAssessment, Gender } from "@/types";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ACTIVITY_LABEL } from "@/data/calendar/tu-28";
import { formatLunarLabel } from "@/lib/algorithms/calendar/can-chi";
import { formatSolarSlash, genderLabel, weekdayName } from "@/lib/calendar/dates";
import { dayPlainText } from "@/components/calendar/DaySummaryPanel";
import { cn } from "@/lib/utils";

const RATING_LABEL = {
  tot: "Tốt",
  "trung-binh": "Dùng được",
  "nen-tranh": "Nên đổi ngày",
  xau: "Xấu",
} as const;

const RATING_CLASS = {
  tot: "border-jade/40 bg-jade/10 text-jade",
  "trung-binh": "border-accent/50 bg-accent/15 text-wood",
  "nen-tranh": "border-primary/30 bg-primary/10 text-primary",
  xau: "border-destructive/30 bg-destructive/10 text-destructive",
} as const;

const RATING_COLOR = {
  tot: "#0f766e",
  "trung-binh": "#c49a3a",
  "nen-tranh": "#b4532a",
  xau: "#7f1d1d",
} as const;

const TU_TYPE = { cat: "Cát tú", binh: "Bình tú", hung: "Hung tú" } as const;

type AssessmentPanelProps = {
  assessment: DayAssessment;
  gender?: Gender;
};

function labels(tags: ActivityTag[]) {
  return tags.map((tag) => ACTIVITY_LABEL[tag]).join(", ");
}

function starNote(star: AlmanacStar): string {
  if (star.kind === "good") {
    if (star.all) return star.good.length ? `Tốt mọi việc, nhất là ${labels(star.good)}` : "Tốt mọi việc";
    if (star.good.length) return `Tốt cho ${labels(star.good)}`;
    return star.other ? `Tốt cho ${star.other}` : "Sao tốt";
  }
  if (star.all) return "Xấu với mọi việc lớn";
  if (star.bad.length) return `Kỵ ${labels(star.bad)}`;
  return star.other ? `Kỵ ${star.other}` : "Sao xấu";
}

export function assessmentPlainText(assessment: DayAssessment, gender?: Gender): string {
  const day = assessment.dayDetail;
  const lines = [
    `Xem ngày ${formatSolarSlash(assessment.date)} — ${assessment.purpose.name}`,
    `Kết luận: ${RATING_LABEL[assessment.rating]} (${assessment.score}/100). ${assessment.verdict}`,
    ...assessment.warnings.map((warning) => `Lưu ý: ${warning}`),
    ...assessment.reasons,
    `Giờ nên chọn: ${assessment.bestHours.join(", ")}`,
    `Hỷ thần: ${day.directions.hyThan}. Tài thần: ${day.directions.taiThan}. Hạc thần: ${day.directions.hacThan}.`,
    day.clashAges.length ? `Tuổi xung khắc ngày: ${day.clashAges.join(", ")}` : "",
    gender ? `Giới tính: ${genderLabel(gender)}` : "",
    assessment.disclaimer,
    dayPlainText(day),
  ];
  return lines.filter(Boolean).join("\n");
}

function Section({
  icon,
  title,
  children,
  className,
}: {
  icon?: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {icon ? <span className="text-bronze">{icon}</span> : null}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function StarList({ stars }: { stars: AlmanacStar[] }) {
  if (stars.length === 0) {
    return <p className="text-sm text-muted-foreground">Ngày này không có sao trong nhóm này.</p>;
  }
  return (
    <ul className="grid gap-2">
      {stars.map((star) => (
        <li key={star.name} className="flex items-baseline justify-between gap-3 border-b border-border/50 pb-2 last:border-0 last:pb-0">
          <span className="text-sm font-medium text-ink">{star.name}</span>
          <span className="text-right text-xs leading-relaxed text-muted-foreground">{starNote(star)}</span>
        </li>
      ))}
    </ul>
  );
}

export function AssessmentPanel({ assessment, gender }: AssessmentPanelProps) {
  const day = assessment.dayDetail;
  const best = new Set(assessment.bestHours);
  const good = day.stars.filter((star) => star.kind === "good");
  const bad = day.stars.filter((star) => star.kind === "bad");
  const facts: [string, string][] = [
    ["Âm lịch", formatLunarLabel(day.lunar)],
    ["Ngày", day.canChi.dayLabel],
    ["Tháng", day.canChi.monthLabel],
    ["Năm", day.canChi.yearLabel],
    ["Nạp âm", day.napAm],
    ["Tiết khí", day.tietKhi],
    ["Thần trực", `${day.dayGod} (${day.isHoangDao ? "hoàng đạo" : "hắc đạo"})`],
    ["Lục diệu", day.lucDieu.name],
  ];

  return (
    <div className="grid gap-5">
      <section className="lacquer relative overflow-hidden rounded-2xl border border-accent/30 p-6 text-primary-foreground sm:p-8">
        <div className="cloud-motif pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative grid items-center gap-6 sm:grid-cols-[auto_1fr]">
          <div
            className="grid size-32 place-items-center rounded-full"
            style={{
              background: `conic-gradient(${RATING_COLOR[assessment.rating]} ${assessment.score * 3.6}deg, rgba(255,255,255,0.14) 0deg)`,
            }}
            role="img"
            aria-label={`${assessment.score} điểm trên 100`}
          >
            <div className="grid size-[6.75rem] place-items-center rounded-full bg-[#fffdf8] text-center">
              <span>
                <span className="ink-heading block text-4xl leading-none text-ink">{assessment.score}</span>
                <span className="text-[11px] text-muted-foreground">trên 100</span>
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-accent">{assessment.purpose.name}</p>
            <h2 className="ink-heading mt-1 text-2xl text-[#fff8ec] sm:text-3xl">
              {weekdayName(assessment.date)}, {formatSolarSlash(assessment.date)}
            </h2>
            <p className="mt-1 text-sm text-[#f1e5cb]/80">
              {formatLunarLabel(day.lunar)} · Ngày {day.canChi.dayLabel}
            </p>
            <p
              className={cn(
                "mt-3 inline-flex rounded-full border px-3 py-1 text-sm font-semibold",
                RATING_CLASS[assessment.rating],
                "bg-[#fffdf8]",
              )}
            >
              {RATING_LABEL[assessment.rating]}
            </p>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#fff8ec]">{assessment.verdict}</p>
          </div>
        </div>
      </section>

      {assessment.warnings.length ? (
        <div className="rounded-2xl border border-primary/25 bg-primary/[0.05] p-5">
          <p className="flex items-center gap-2 text-sm font-semibold text-primary">
            <AlertTriangle className="size-4" aria-hidden="true" />
            Cần lưu ý trước khi chốt ngày
          </p>
          <ul className="mt-2 grid list-disc gap-1.5 pl-5 text-sm leading-relaxed text-ink">
            {assessment.warnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <Section title="Điểm được tính như thế nào">
        <ul className="divide-y divide-border/60">
          <li className="flex items-center justify-between gap-4 pb-2.5 text-sm text-muted-foreground">
            <span>Điểm khởi đầu</span>
            <span className="tabular-nums">54</span>
          </li>
          {assessment.factors.map((factor) => (
            <li key={factor.label} className="flex items-start justify-between gap-4 py-2.5">
              <span className="min-w-0">
                <span className="block text-sm font-medium text-ink">{factor.label}</span>
                <span className="block text-xs leading-relaxed text-muted-foreground">{factor.detail}</span>
              </span>
              <span
                className={cn(
                  "shrink-0 text-sm font-semibold tabular-nums",
                  factor.delta > 0 ? "text-jade" : factor.delta < 0 ? "text-primary" : "text-muted-foreground",
                )}
              >
                {factor.delta > 0 ? "+" : ""}
                {factor.delta}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          Trực Phá, Nguy, Bế và các ngày Tam nương, Nguyệt kỵ, Dương công không được quá 59 điểm. Sát chủ,
          Thụ tử và tuổi xung khắc không được quá 49 điểm.
        </p>
      </Section>

      <Section title="12 giờ trong ngày">
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {day.hours.map((hour) => (
            <li
              key={hour.chi}
              className={cn(
                "rounded-xl border p-3",
                best.has(hour.label)
                  ? "border-accent/60 bg-accent/10"
                  : hour.isGood
                    ? "border-border bg-card"
                    : "border-transparent bg-muted/60",
              )}
            >
              <p className="flex items-center justify-between gap-1 text-sm font-medium text-ink">
                {hour.label}
                {best.has(hour.label) ? <Star className="size-3.5 fill-accent text-accent" aria-label="Nên chọn" /> : null}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">Giờ {hour.canChi}</p>
              <p className={cn("mt-0.5 text-xs", hour.isGood ? "text-jade" : "text-muted-foreground")}>
                {hour.god}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          Ô có dấu sao là giờ hoàng đạo{assessment.xungTuoi.length ? " và không xung với tuổi đã nhập" : ""}.
          Giờ Tý tính từ 23 giờ hôm trước theo cách chia giờ truyền thống.
        </p>
      </Section>

      <div className="grid gap-5 lg:grid-cols-2">
        <Section icon={<Sparkles className="size-4" />} title={`Trực ${day.truc}`}>
          <p className="text-sm leading-relaxed text-ink">{day.trucSummary}</p>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            An theo tháng tiết khí, đang ở tiết {day.tietKhi}.
          </p>
        </Section>
        <Section icon={<Star className="size-4" />} title={`Sao ${day.tu.fullName}`}>
          <p className="text-sm text-ink">
            {TU_TYPE[day.tu.type]}, tượng con {day.tu.animal.toLowerCase()}.
          </p>
          <dl className="mt-3 grid gap-2 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">Hợp</dt>
              <dd className="text-ink">{labels(day.tu.good) || "Không có việc lớn nào nổi bật"}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Kỵ</dt>
              <dd className="text-ink">{labels(day.tu.bad) || "Không kỵ việc lớn nào"}</dd>
            </div>
          </dl>
        </Section>
        <Section title={`Sao tốt (${good.length})`}>
          <StarList stars={good} />
        </Section>
        <Section title={`Sao xấu (${bad.length})`}>
          <StarList stars={bad} />
        </Section>
        <Section icon={<Compass className="size-4" />} title="Hướng xuất hành">
          <dl className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-jade/10 p-3">
              <dt className="text-xs text-muted-foreground">Hỷ thần</dt>
              <dd className="mt-1 text-sm font-medium text-ink">{day.directions.hyThan}</dd>
            </div>
            <div className="rounded-xl bg-accent/15 p-3">
              <dt className="text-xs text-muted-foreground">Tài thần</dt>
              <dd className="mt-1 text-sm font-medium text-ink">{day.directions.taiThan}</dd>
            </div>
            <div className="rounded-xl bg-muted p-3">
              <dt className="text-xs text-muted-foreground">Hạc thần (tránh)</dt>
              <dd className="mt-1 text-sm font-medium text-ink">{day.directions.hacThan}</dd>
            </div>
          </dl>
        </Section>
        <Section icon={<Users className="size-4" />} title="Tuổi xung khắc ngày">
          {day.clashAges.length ? (
            <ul className="flex flex-wrap gap-2">
              {day.clashAges.map((age) => (
                <li key={age}>
                  <Badge variant="outline">{age}</Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Lịch không ghi tuổi xung khắc cho ngày này.</p>
          )}
          {assessment.hopTuoi.length ? (
            <p className="mt-3 text-sm text-jade">Tuổi {assessment.hopTuoi.join(", ")} hợp với ngày này.</p>
          ) : null}
          {gender ? (
            <p className="mt-3 text-xs text-muted-foreground">Xét kim lâu theo giới tính {genderLabel(gender).toLowerCase()}.</p>
          ) : null}
        </Section>
      </div>

      <Section title="Thông số ngày">
        <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {facts.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-3 border-b border-border/50 pb-2">
              <dt className="text-sm text-muted-foreground">{label}</dt>
              <dd className="text-right text-sm font-medium text-ink">{value}</dd>
            </div>
          ))}
        </dl>
        {day.festivals.length ? (
          <p className="mt-3 text-sm text-wood">Trùng ngày: {day.festivals.join(", ")}.</p>
        ) : null}
      </Section>

      <Disclaimer type="thuat-toan" />
      <p className="text-sm leading-relaxed text-muted-foreground">{assessment.disclaimer}</p>
    </div>
  );
}
