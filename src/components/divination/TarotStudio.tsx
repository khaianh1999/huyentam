"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import { readTarot } from "@/lib/algorithms/divination/folk";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { ResultActions } from "@/components/shared/ResultActions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/divination/Field";
import { cn } from "@/lib/utils";

export function TarotStudio() {
  const [question, setQuestion] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [reading, setReading] = useState<ReturnType<typeof readTarot> | null>(null);
  const [flipping, setFlipping] = useState(false);

  return (
    <div className="space-y-8">
      <form
        className="space-y-4 rounded-2xl border border-accent/40 bg-gradient-to-br from-[#1a120b] to-[#3b1d1d] p-6 text-[#fff8e7]"
        onSubmit={(event) => {
          event.preventDefault();
          if (question.trim().length < 4) {
            setError("Viết câu hỏi rõ hơn, ít nhất bốn ký tự.");
            setReading(null);
            return;
          }
          setError(null);
          setFlipping(true);
          const seed = `${nanoid()}|tarot|${question.trim().slice(0, 80)}`;
          window.setTimeout(() => {
            setReading(readTarot(question, seed));
            setFlipping(false);
          }, 700);
        }}
      >
        <p className="text-xs tracking-[0.2em] text-accent uppercase">Ba lá · Major Arcana</p>
        <h2 className="ink-heading text-2xl text-[#fff8e7]">Trải bài trên bàn gỗ tối</h2>
        <Field label="Câu hỏi của bạn" htmlFor="cau-hoi-bai">
          <Textarea
            id="cau-hoi-bai"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ví dụ: Tôi nên xử lý việc đang dang dở thế nào trong tuần này?"
            className="border-[#f3e6c8]/30 bg-black/20 text-[#fff8e7] placeholder:text-[#f3e6c8]/50"
          />
        </Field>
        {error ? <p className="text-sm text-accent">{error}</p> : null}
        <Button type="submit" variant="gold" disabled={flipping}>
          {flipping ? "Đang lật bài…" : "Rút ba lá"}
        </Button>
      </form>

      {reading ? (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            {reading.cards.map((card) => (
              <article
                key={`${card.position}-${card.name}`}
                className={cn(
                  "paper-card gold-border rounded-2xl p-5",
                  !card.upright && "opacity-90",
                )}
              >
                <p className="text-xs tracking-wider text-bronze uppercase">{card.position}</p>
                <h3 className="ink-heading mt-2 text-xl text-ink">{card.vi}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{card.name}</p>
                <Badge variant={card.upright ? "gold" : "secondary"} className="mt-3">
                  {card.upright ? "Lá xuôi" : "Lá ngược"}
                </Badge>
                <p className="mt-3 text-sm leading-relaxed text-wood">{card.note}</p>
              </article>
            ))}
          </div>
          <p className="text-base leading-relaxed text-muted-foreground">{reading.overview}</p>
          <Badge variant="outline">Seed: {reading.seed.slice(0, 24)}…</Badge>
          <Disclaimer type="quan-niem-dan-gian" />
          <ResultActions
            title="Bói bài Tây"
            text={`${reading.question} — ${reading.cards.map((c) => c.vi).join(", ")}`}
          />
        </div>
      ) : null}
    </div>
  );
}
