"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import { readTarot } from "@/lib/algorithms/divination/folk";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { ResultActions } from "@/components/shared/ResultActions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function TarotStudio() {
  const [reading, setReading] = useState<ReturnType<typeof readTarot> | null>(null);
  const [flipping, setFlipping] = useState(false);

  function draw() {
    if (flipping) return;
    setFlipping(true);
    setReading(null);
    navigator.vibrate?.(20);
    const seed = `${nanoid()}|tarot`;
    window.setTimeout(() => {
      setReading(readTarot("", seed));
      setFlipping(false);
    }, 900);
  }

  return (
    <div className="space-y-8">
      <section className="space-y-5 rounded-2xl border border-accent/40 bg-gradient-to-br from-[#1a120b] to-[#3b1d1d] p-6 text-center text-[#fff8e7]">
        <p className="text-xs tracking-[0.2em] text-accent uppercase">Ba lá · Major Arcana</p>
        <p className="text-sm text-[#f3e6c8]/80">{flipping ? "Đang xào bài…" : "Nghĩ về điều bạn muốn hỏi, rồi chạm vào bộ bài"}</p>
        <button type="button" onClick={draw} disabled={flipping} aria-label="Rút ba lá" className="mx-auto flex justify-center gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent">
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className={cn(
                "grid h-28 w-20 place-items-center rounded-lg border-2 border-accent/70 bg-[repeating-linear-gradient(45deg,#2b1311_0_6px,#3b1d1d_6px_12px)] text-2xl text-accent shadow-lg transition-transform duration-300 sm:h-36 sm:w-24",
                flipping ? "animate-pulse" : "hover:-translate-y-1.5",
              )}
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              ✦
            </span>
          ))}
        </button>
        <Button type="button" variant="gold" onClick={draw} disabled={flipping}>
          {flipping ? "Đang lật bài…" : reading ? "Rút lại ba lá" : "Rút ba lá"}
        </Button>
      </section>

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
            text={reading.cards.map((c) => `${c.position}: ${c.vi}`).join(", ")}
          />
        </div>
      ) : null}
    </div>
  );
}
