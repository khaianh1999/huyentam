"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { nanoid } from "nanoid";
import { motion, useReducedMotion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { HEXAGRAMS } from "@/data/hexagrams";
import { pickRandomHexagram } from "@/lib/algorithms/kinh-dich/hexagram";
import { getRitual, RUT_QUE_TYPES, type RutFocus } from "@/data/divination/rituals";
import { hexResultHref } from "@/lib/divination/params";
import type { HexagramResult } from "@/types";
import { HexagramView } from "@/components/divination/HexagramView";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CARD_COUNT = 9;

/** Rút quẻ kiểu chọn bài: chọn chủ đề, chạm một lá úp để lật ra quẻ. */
export function RutQueStudio({ loai }: { loai: string }) {
  const reduceMotion = useReducedMotion();
  const [topic, setTopic] = useState<string>(getRitual(loai)?.id ?? "dau-nam");
  const [deckKey, setDeckKey] = useState(() => nanoid());
  const [picked, setPicked] = useState<number | null>(null);
  const [result, setResult] = useState<HexagramResult | null>(null);
  const [showReading, setShowReading] = useState(false);
  const timer = useRef<number | null>(null);
  const ritual = getRitual(topic) ?? RUT_QUE_TYPES[0];

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  function pick(index: number) {
    if (picked !== null) return;
    const next = pickRandomHexagram(`${deckKey}|${ritual.id}|${index}`);
    setPicked(index);
    setResult(next);
    navigator.vibrate?.(30);
    timer.current = window.setTimeout(() => setShowReading(true), reduceMotion ? 0 : 1100);
  }

  function reset(nextTopic?: string) {
    if (timer.current) window.clearTimeout(timer.current);
    if (nextTopic) setTopic(nextTopic);
    setDeckKey(nanoid());
    setPicked(null);
    setResult(null);
    setShowReading(false);
  }

  const hexagram = result ? HEXAGRAMS.find((item) => item.number === result.primaryNumber) : null;

  return (
    <div className="space-y-5">
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
        {RUT_QUE_TYPES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => reset(item.id)}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-sm whitespace-nowrap transition",
              item.id === ritual.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-wood hover:border-accent",
            )}
          >
            {item.eyebrow} · {item.title.replace("Rút quẻ ", "")}
          </button>
        ))}
      </div>

      {!showReading ? (
        <section className="lacquer relative mx-auto max-w-md overflow-hidden rounded-2xl border border-accent/30 px-5 py-6 text-center text-[#fff8ec]">
          <div className="cloud-motif pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative">
            <p className="text-xs tracking-[0.2em] text-accent uppercase">
              {picked === null ? "Tĩnh tâm, chạm vào một lá quẻ" : "Lá quẻ của bạn"}
            </p>
            <p className="mt-1 text-sm text-[#f1e5cb]/80">{ritual.title}</p>
            <div className="mx-auto mt-5 grid max-w-xs grid-cols-3 gap-3" style={{ perspective: 800 }}>
              {Array.from({ length: CARD_COUNT }, (_, index) => {
                const isPicked = picked === index;
                const faded = picked !== null && !isPicked;
                return (
                  <motion.button
                    key={`${deckKey}-${index}`}
                    type="button"
                    onClick={() => pick(index)}
                    disabled={picked !== null}
                    aria-label={`Lá quẻ ${index + 1}`}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{
                      opacity: faded ? 0.25 : 1,
                      y: 0,
                      rotateY: isPicked && !reduceMotion ? 180 : 0,
                      scale: isPicked ? 1.08 : 1,
                    }}
                    whileHover={picked === null && !reduceMotion ? { y: -6 } : undefined}
                    transition={{ duration: isPicked ? 0.7 : 0.3, delay: picked === null ? index * 0.04 : 0 }}
                    className="relative aspect-[3/4] rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <span
                      className="absolute inset-0 grid place-items-center rounded-xl border-2 border-accent/70 bg-[repeating-linear-gradient(45deg,#7a1f1b_0_6px,#8e2320_6px_12px)] shadow-[0_8px_16px_-8px_rgba(0,0,0,0.7)]"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <span className="ink-heading grid size-9 place-items-center rounded-full border border-accent/70 bg-[#2b1311] text-lg text-accent">
                        卦
                      </span>
                    </span>
                    <span
                      className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border-2 border-accent bg-[#fffdf8] text-primary"
                      style={{ backfaceVisibility: "hidden", transform: reduceMotion ? undefined : "rotateY(180deg)" }}
                    >
                      {isPicked && hexagram ? (
                        <>
                          <span className="ink-heading text-3xl leading-none">{hexagram.symbol}</span>
                          <span className="mt-1 px-1 text-[10px] leading-tight font-semibold text-ink">{hexagram.nameVi}</span>
                        </>
                      ) : null}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {showReading && result ? (
        <>
          <div className="flex flex-wrap justify-center gap-2">
            <Button type="button" variant="gold" size="sm" onClick={() => reset()}>
              <RotateCcw />
              Rút lá khác
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href={hexResultHref({ phuong: "chon", seed: result.seed, loai: ritual.id })}>Mở trang kết quả</Link>
            </Button>
          </div>
          <HexagramView result={result} focus={ritual.focus as RutFocus} caption={ritual.title} />
        </>
      ) : null}
    </div>
  );
}
