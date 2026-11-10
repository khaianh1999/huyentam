import Link from "next/link";
import { HEXAGRAMS } from "@/data/hexagrams";
import { getHexagramByNumber } from "@/lib/algorithms/kinh-dich/hexagram";
import { fortuneLabel } from "@/lib/divination/labels";
import type { HexagramResult } from "@/types";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { ResultActions } from "@/components/shared/ResultActions";
import { Badge } from "@/components/ui/badge";

type FocusKey = "overview" | "career" | "wealth" | "love" | "family" | "health";

const SECTION_TITLES: Record<FocusKey | "advice", string> = {
  overview: "Tổng quát",
  career: "Công danh",
  wealth: "Tài lộc",
  love: "Tình duyên",
  family: "Gia đạo",
  health: "Sức khỏe",
  advice: "Lời nhắc",
};

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
  const sections: { key: FocusKey | "advice"; text: string }[] = [
    { key: "overview", text: result.interpretation.overview },
    { key: "career", text: result.interpretation.career },
    { key: "wealth", text: result.interpretation.wealth },
    { key: "love", text: result.interpretation.love },
    { key: "family", text: result.interpretation.family },
    { key: "health", text: result.interpretation.health },
    { key: "advice", text: result.interpretation.advice },
  ];
  const ordered = focus
    ? [...sections].sort((a, b) => Number(b.key === focus) - Number(a.key === focus))
    : sections;
  const share = [
    `Quẻ ${result.primaryNumber}. ${result.primaryName}`,
    question ? `Lời: ${question}` : "",
    result.interpretation.overview,
    result.disclaimer,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="space-y-6">
      <div className="paper-card gold-border rounded-xl p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            {caption ? (
              <p className="text-xs tracking-[0.18em] text-bronze uppercase">{caption}</p>
            ) : null}
            <p className="ink-heading mt-2 text-6xl text-ink" aria-hidden="true">
              {primary?.symbol ?? "䷀"}
            </p>
            <h2 className="ink-heading mt-3 text-3xl text-ink">
              Quẻ {result.primaryNumber}. {result.primaryName}
            </h2>
            {primary ? <p className="mt-1 text-sm text-muted-foreground">{primary.nameCn}</p> : null}
          </div>
          <Badge variant="gold">{fortuneLabel(result.interpretation.fortuneLevel)}</Badge>
        </div>
        {question ? (
          <p className="mt-4 text-sm leading-relaxed text-wood">Lời đem vào quẻ: {question}</p>
        ) : null}
        <div className="mt-6 space-y-2" aria-label="Sáu hào, hào sơ ở dưới">
          {result.lines
            .map((line, index) => ({ line, hao: index + 1 }))
            .reverse()
            .map(({ line, hao }) => (
              <div key={hao} className="flex items-center gap-3">
                <span className="w-14 text-xs text-muted-foreground">Hào {hao}</span>
                <span className="flex h-3 flex-1 items-center gap-2">
                  {line.yang ? (
                    <span className="h-full flex-1 rounded-sm bg-ink" />
                  ) : (
                    <>
                      <span className="h-full flex-1 rounded-sm bg-ink" />
                      <span className="h-full w-6" />
                      <span className="h-full flex-1 rounded-sm bg-ink" />
                    </>
                  )}
                </span>
                {line.changing ? <Badge variant="outline">Động</Badge> : <span className="w-12" />}
              </div>
            ))}
        </div>
        {changing ? (
          <p className="mt-4 text-sm leading-relaxed text-wood">
            Hào động {result.changingLines.join(", ")} mở sang quẻ {changing.number}. {changing.nameVi}{" "}
            <span aria-hidden="true">{changing.symbol}</span>
            {result.changingName ? "" : ""}.
          </p>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">Không có hào động. Giữ quẻ chủ.</p>
        )}
      </div>

      <div className="grid gap-4">
        {ordered.map((section) => (
          <article
            key={section.key}
            className={
              section.key === focus
                ? "rounded-xl border border-accent bg-accent/10 p-5"
                : "paper-card rounded-xl p-5"
            }
          >
            <h3 className="ink-heading text-xl text-ink">{SECTION_TITLES[section.key]}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.text}</p>
          </article>
        ))}
      </div>

      <Disclaimer type="quan-niem-dan-gian" />
      <p className="text-xs leading-relaxed text-muted-foreground">{result.disclaimer}</p>
      <ResultActions title={result.primaryName} text={share} />
      <p className="text-xs text-muted-foreground">
        Seed để đối chiếu: <span className="break-all font-mono">{result.seed}</span>
      </p>
      <Link href="/gieo-que" className="text-sm text-primary underline-offset-4 hover:underline">
        Các lối gieo khác
      </Link>
    </div>
  );
}
