import { NGU_HANH_VI } from "@/lib/algorithms/calendar/constants";
import { harmonyLabel } from "@/lib/divination/labels";
import type { NumerologyResult } from "@/types";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { ResultActions } from "@/components/shared/ResultActions";
import { Badge } from "@/components/ui/badge";

const CARDS: { key: "lifePath" | "soul" | "personality" | "destiny"; label: string; hint: string }[] = [
  { key: "lifePath", label: "Số chủ đạo", hint: "Từ ngày sinh" },
  { key: "soul", label: "Linh hồn", hint: "Từ nguyên âm" },
  { key: "personality", label: "Nhân cách", hint: "Từ phụ âm" },
  { key: "destiny", label: "Sứ mệnh", hint: "Từ cả tên" },
];

export function NameNumbers({ result, shareHref }: { result: NumerologyResult; shareHref?: string }) {
  const share = `${result.overview}\n${result.meaning}\n${result.disclaimer}`;
  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((card) => (
          <article key={card.key} className="paper-card gold-border rounded-2xl px-4 py-5 text-center">
            <p className="text-xs tracking-[0.16em] text-bronze uppercase">{card.label}</p>
            <p className="ink-heading mt-2 text-5xl text-primary">{result[card.key]}</p>
            <p className="mt-2 text-xs text-muted-foreground">{card.hint}</p>
          </article>
        ))}
      </div>
      <div className="paper-card rounded-xl p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="gold">{harmonyLabel(result.harmony)}</Badge>
          <Badge variant="outline">Tên: {NGU_HANH_VI[result.nameElement]}</Badge>
          <Badge variant="outline">Năm sinh: {NGU_HANH_VI[result.birthElement]}</Badge>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-wood">{result.meaning}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{result.overview}</p>
      </div>
      <Disclaimer type="quan-niem-dan-gian" />
      <p className="text-xs leading-relaxed text-muted-foreground">{result.disclaimer}</p>
      <ResultActions title={`Bói tên ${result.fullName}`} text={share} url={shareHref} />
    </div>
  );
}
