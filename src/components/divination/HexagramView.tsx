import Link from "next/link";
import { Briefcase, Coins, Heart, HeartPulse, Home, Sparkles, type LucideIcon } from "lucide-react";
import { HEXAGRAMS } from "@/data/hexagrams";
import { HEXAGRAM_DETAILS_1 } from "@/data/hexagrams/details-1";
import { HEXAGRAM_DETAILS_2 } from "@/data/hexagrams/details-2";
import { getLuckyHints, HEXAGRAM_BRIGHT, HEXAGRAM_GENTLE } from "@/data/hexagrams/details-gentle";
import { HEXAGRAM_LINES_1 } from "@/data/hexagrams/lines-1";
import { HEXAGRAM_LINES_2 } from "@/data/hexagrams/lines-2";
import { HEXAGRAM_LINES_3 } from "@/data/hexagrams/lines-3";
import { HEXAGRAM_LINES_4 } from "@/data/hexagrams/lines-4";
import { getTrigrams, HEXAGRAM_VERSES } from "@/data/hexagrams/verses";
import { getHexagramByNumber } from "@/lib/algorithms/kinh-dich/hexagram";
import { FRIENDLY_FORTUNE } from "@/lib/divination/labels";
import type { HexagramResult } from "@/types";
import { ResultActions } from "@/components/shared/ResultActions";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type FocusKey = "overview" | "career" | "wealth" | "love" | "family" | "health";
type AspectKey = Exclude<FocusKey, "overview">;

const ASPECTS: { key: AspectKey; label: string; icon: LucideIcon; parts?: [string, string] }[] = [
  { key: "career", label: "Công danh", icon: Briefcase, parts: ["Đi làm", "Kinh doanh"] },
  { key: "wealth", label: "Tài lộc", icon: Coins, parts: ["Thu chi", "Đầu tư, vay mượn"] },
  { key: "love", label: "Tình duyên", icon: Heart, parts: ["Chưa có đôi", "Đã có đôi"] },
  { key: "family", label: "Gia đạo", icon: Home },
  { key: "health", label: "Sức khỏe", icon: HeartPulse },
];

const DETAILS = { ...HEXAGRAM_DETAILS_1, ...HEXAGRAM_DETAILS_2, ...HEXAGRAM_GENTLE };
const LINES = { ...HEXAGRAM_LINES_1, ...HEXAGRAM_LINES_2, ...HEXAGRAM_LINES_3, ...HEXAGRAM_LINES_4 };

/** Tên hào truyền thống: Sơ, Nhị, Tam, Tứ, Ngũ, Thượng kèm Cửu (dương) hoặc Lục (âm). */
function lineName(index: number, yang: boolean): string {
  const kind = yang ? "Cửu" : "Lục";
  if (index === 0) return `Hào Sơ ${kind}`;
  if (index === 5) return `Hào Thượng ${kind}`;
  return `Hào ${kind} ${["", "Nhị", "Tam", "Tứ", "Ngũ"][index]}`;
}

export function HexagramView({
  result,
  question,
  focus,
  caption,
}: {
  result: HexagramResult;
  question?: string;
  focus?: FocusKey;
  caption?: string;
}) {
  const primary = HEXAGRAMS.find((item) => item.number === result.primaryNumber) ?? null;
  const changing = result.changingNumber ? getHexagramByNumber(result.changingNumber) : null;
  const poem = HEXAGRAM_VERSES[result.primaryNumber];
  const trigrams = primary ? getTrigrams(primary.binary) : null;
  const gentle = HEXAGRAM_GENTLE[result.primaryNumber];
  const text = gentle
    ? { ...result.interpretation, overview: gentle.overview, advice: gentle.advice }
    : result.interpretation;
  const detail = DETAILS[result.primaryNumber];
  const bright = HEXAGRAM_BRIGHT[result.primaryNumber];
  const lineTexts = LINES[result.primaryNumber] ?? null;
  const lucky = trigrams ? getLuckyHints(trigrams.upper, trigrams.lower) : null;
  const bodyParts = trigrams
    ? [...new Set([trigrams.upper.body, trigrams.lower.body])].join(" và ")
    : null;
  const aspects = focus
    ? [...ASPECTS].sort((a, b) => Number(b.key === focus) - Number(a.key === focus))
    : ASPECTS;
  const share = [
    `Quẻ ${result.primaryNumber}. ${result.primaryName}`,
    question ? `Lời: ${question}` : "",
    ...(poem?.verse ?? []),
    bright ?? "",
    lucky ? `Màu hợp: ${lucky.color}. Số may: ${lucky.numbers}. Hướng lành: ${lucky.direction}.` : "",
    poem?.essence ?? "",
    text.overview,
    ...ASPECTS.flatMap((aspect) => {
      const value = detail?.[aspect.key] ?? text[aspect.key];
      if (typeof value === "string") return [`${aspect.label}: ${value}`];
      return value.map((item, index) => `${aspect.label} (${aspect.parts?.[index]}): ${item}`);
    }),
    detail ? `Nên làm: ${detail.do}` : "",
    detail ? `Nên tránh: ${detail.avoid}` : "",
    `Lời nhắc: ${text.advice}`,
    result.disclaimer,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <article className="paper-card overflow-hidden rounded-2xl">
        <header className="flex items-center gap-4 px-5 pt-5 pb-4 sm:px-7">
          <span className="ink-heading text-5xl leading-none text-primary" aria-hidden="true">
            {primary?.symbol ?? "䷀"}
          </span>
          <div className="min-w-0 flex-1">
            {caption ? <p className="eyebrow">{caption}</p> : null}
            <h2 className="ink-heading mt-0.5 text-[1.45rem] leading-tight text-ink">
              {result.primaryName}
            </h2>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Quẻ {result.primaryNumber}
              {primary ? ` · ${primary.nameCn}` : ""}
              {trigrams ? ` · ${trigrams.upper.image} trên ${trigrams.lower.image}` : ""}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <Badge variant="gold">{FRIENDLY_FORTUNE[text.fortuneLevel]}</Badge>
            <div className="w-12 space-y-[3px]" role="img" aria-label="Sáu hào, hào sơ ở dưới">
              {result.lines
                .map((line, index) => ({ line, hao: index + 1 }))
                .reverse()
                .map(({ line, hao }) => (
                  <span key={hao} className="flex h-[3px] gap-1.5">
                    <span className={cn("h-full flex-1 rounded-full", line.changing ? "bg-primary" : "bg-ink/80")} />
                    {line.yang ? null : (
                      <span className={cn("h-full flex-1 rounded-full", line.changing ? "bg-primary" : "bg-ink/80")} />
                    )}
                  </span>
                ))}
            </div>
          </div>
        </header>

        {poem ? (
          <blockquote className="border-y border-accent/20 bg-accent/[0.07] px-3 py-4 text-center sm:py-5">
            {poem.verse.map((line, index) => (
              <p key={line} className={cn("ink-heading text-[15px] leading-8 text-ink italic sm:text-[16.5px]", index % 2 === 0 && "text-wood")}>
                {line}
              </p>
            ))}
          </blockquote>
        ) : null}

        {bright ? (
          <div className="px-5 pt-4 sm:px-7">
            <p className="flex gap-2 text-[15.5px] leading-7 font-medium text-primary">
              <Sparkles className="mt-1.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              {bright}
            </p>
            {lucky ? (
              <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
                {[
                  ["Màu hợp", lucky.color],
                  ["Số may", lucky.numbers],
                  ["Hướng lành", lucky.direction],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-accent/10 px-2 py-2">
                    <dt className="text-[11px] text-muted-foreground">{label}</dt>
                    <dd className="mt-0.5 text-[13px] leading-snug font-medium text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        ) : null}

        <div className="px-5 py-5 sm:px-7">
          {question ? (
            <p className="mb-3 text-sm text-wood">
              <span className="text-muted-foreground">Điều hỏi:</span> {question}
            </p>
          ) : null}

          <h3 className="eyebrow">Tổng quan</h3>
          {poem ? <p className="mt-2 text-[15.5px] leading-7 text-ink">{poem.essence}</p> : null}
          <p className="mt-2 text-[15px] leading-7 text-wood">{text.overview}</p>

          {changing ? (
            <p className="mt-3 text-sm leading-relaxed text-wood">
              Hào {result.changingLines.join(", ")} động, quẻ biến thành{" "}
              <span className="font-medium text-primary">
                {changing.nameVi} {changing.symbol}
              </span>
              : việc đi từ thế này sang thế kia.
            </p>
          ) : null}

          <dl className="mt-4 divide-y divide-border/60 border-t border-border/60">
            {aspects.map(({ key, label, icon: Icon, parts }) => (
              <div
                key={key}
                className={cn(
                  "grid gap-1 py-3 sm:grid-cols-[7rem_1fr] sm:gap-3",
                  key === focus && "-mx-3 rounded-lg bg-accent/10 px-3",
                )}
              >
                <dt className="flex items-center gap-2 self-start text-sm font-medium text-ink sm:pt-0.5">
                  <Icon className="size-4 text-bronze" aria-hidden="true" />
                  {label}
                </dt>
                <dd className="space-y-2 text-[15px] leading-7 text-wood">
                  {(() => {
                    const value = detail?.[key] ?? text[key];
                    if (typeof value === "string") return <p>{value}</p>;
                    return value.map((item, index) => (
                      <p key={parts?.[index] ?? index}>
                        <span className="font-medium text-ink">{parts?.[index]}. </span>
                        {item}
                      </p>
                    ));
                  })()}
                  {key === "health" && bodyParts ? (
                    <p className="text-[13px] leading-6 text-muted-foreground">
                      Theo Thuyết Quái, quẻ này ứng với {bodyParts}. Đây là quan niệm cổ; có triệu chứng thì nên đi khám.
                    </p>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>

          {lineTexts ? (
            <details className="group mt-2 border-t border-border/60 pt-3" open={result.changingLines.length > 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-ink">
                Lời sáu hào
                <span className="text-xs font-normal text-bronze group-open:hidden">Mở xem</span>
                <span className="hidden text-xs font-normal text-bronze group-open:inline">Thu gọn</span>
              </summary>
              <ol className="mt-2 space-y-2">
                {result.lines
                  .map((line, index) => ({ line, index }))
                  .reverse()
                  .map(({ line, index }) => {
                    const moving = result.changingLines.includes(index + 1);
                    return (
                      <li
                        key={index}
                        className={cn("rounded-lg px-3 py-2", moving ? "bg-primary/[0.07] ring-1 ring-primary/25" : "bg-muted/40")}
                      >
                        <p className="flex items-center gap-2 text-[13px] font-semibold text-ink">
                          {lineName(index, line.yang)}
                          {moving ? <span className="text-[11px] font-medium text-primary">hào động</span> : null}
                        </p>
                        <p className="mt-0.5 text-[14.5px] leading-6 text-wood">{lineTexts[index]}</p>
                      </li>
                    );
                  })}
              </ol>
            </details>
          ) : null}
        </div>

        <footer className="space-y-3 bg-primary/[0.06] px-5 py-4 sm:px-7">
          {detail ? (
            <dl className="grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-semibold text-jade">Nên làm</dt>
                <dd className="mt-0.5 text-[15px] leading-7 text-ink">{detail.do}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-primary">Nên tránh</dt>
                <dd className="mt-0.5 text-[15px] leading-7 text-ink">{detail.avoid}</dd>
              </div>
            </dl>
          ) : null}
          <p className="text-[15px] leading-7 text-ink">
            <span className="ink-heading font-semibold text-primary">Lời nhắc. </span>
            {text.advice}
          </p>
        </footer>
      </article>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <ResultActions title={result.primaryName} text={share} />
        <Link href="/gieo-que" className="text-sm text-primary underline-offset-4 hover:underline">
          Các lối gieo khác
        </Link>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">{result.disclaimer}</p>
    </div>
  );
}
