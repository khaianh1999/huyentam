"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { nanoid } from "nanoid";
import { useReducedMotion } from "framer-motion";
import { QUAN_AM_STICKS } from "@/data/fortune-sticks/quan-am";
import { QUAN_THANH_STICKS } from "@/data/fortune-sticks/quan-thanh";
import { drawStickIndex } from "@/lib/algorithms/divination/folk";
import { stickLabel } from "@/lib/divination/labels";
import type { FortuneStick } from "@/data/fortune-sticks/quan-am";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { ResultActions } from "@/components/shared/ResultActions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/divination/Field";
import { cn } from "@/lib/utils";

export function StickDraw({
  tone,
  initialSeed,
}: {
  tone: "am" | "thanh";
  initialSeed?: string;
}) {
  const reduceMotion = useReducedMotion();
  const sticks = tone === "am" ? QUAN_AM_STICKS : QUAN_THANH_STICKS;
  const kind = tone === "am" ? "quan-am" : "quan-thanh";
  const [prayer, setPrayer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<"idle" | "drawing" | "done">(initialSeed ? "done" : "idle");
  const [stick, setStick] = useState<FortuneStick | null>(() => {
    if (!initialSeed) return null;
    return sticks[drawStickIndex(kind, initialSeed, sticks.length)] ?? null;
  });
  const [seed, setSeed] = useState(initialSeed ?? "");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  function draw(event: FormEvent) {
    event.preventDefault();
    const text = prayer.trim();
    if (text.length < 2) {
      setError(tone === "am" ? "Viết một lời nguyện ngắn trước khi xin xăm." : "Viết một lời giữ nghĩa trước khi xin xăm.");
      return;
    }
    const nextSeed = `${nanoid()}|${text.slice(0, 80)}`;
    setError(null);
    setPhase("drawing");
    setStick(null);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      const next = sticks[drawStickIndex(kind, nextSeed, sticks.length)] ?? sticks[0];
      setStick(next);
      setSeed(nextSeed);
      setPhase("done");
      const path = tone === "am" ? "/boi-toan/xin-xam-quan-am" : "/boi-toan/xin-xam-quan-thanh";
      window.history.replaceState(null, "", `${path}?seed=${encodeURIComponent(nextSeed)}`);
    }, reduceMotion ? 0 : tone === "am" ? 1500 : 900);
  }

  return (
    <div className="space-y-8">
      <form onSubmit={draw} className="space-y-4">
        <Field
          label={tone === "am" ? "Lời nguyện" : "Lời muốn giữ"}
          htmlFor="loi-xam"
          hint={
            tone === "am"
              ? "Ống xăm sẽ lắc rồi nhả một thẻ. Cùng seed cho cùng một quẻ."
              : "Một ấn son đóng xuống rồi mới mở thẻ. Đây là cách xem của lối Quan Thánh trên trang, khác ống xăm Quan Âm."
          }
        >
          <Textarea
            id="loi-xam"
            value={prayer}
            onChange={(event) => setPrayer(event.target.value)}
            placeholder={tone === "am" ? "Ví dụ: mong nhà năm nay được yên" : "Ví dụ: giữ chữ tín với người đã hứa"}
          />
        </Field>
        {error ? (
          <p className="text-sm text-primary" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" disabled={phase === "drawing"}>
          {phase === "done" ? "Xin quẻ khác" : tone === "am" ? "Lắc ống xăm" : "Đóng ấn và rút"}
        </Button>
      </form>

      <div className="flex justify-center">
        {tone === "am" ? (
          <div
            className={cn(
              "relative h-48 w-24 rounded-t-full rounded-b-2xl border-2 border-jade bg-emerald-950",
              phase === "drawing" && "animate-shake-tube",
            )}
            aria-hidden="true"
          >
            <span className="absolute inset-x-3 top-4 h-28 rounded-full bg-emerald-800" />
          </div>
        ) : (
          <div
            className={cn(
              "grid size-36 place-items-center rounded-md border-4 border-primary bg-primary text-4xl text-primary-foreground",
              phase === "drawing" && "scale-90",
            )}
            aria-hidden="true"
          >
            義
          </div>
        )}
      </div>

      {phase === "drawing" ? (
        <LoadingYinYang label={tone === "am" ? "Đang lắc ống…" : "Đang đóng ấn…"} />
      ) : null}

      {stick && phase === "done" ? (
        <article className="paper-card gold-border space-y-4 rounded-xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="ink-heading text-2xl text-ink">
              Xăm {stick.number}. {stick.title}
            </h2>
            <Badge variant={stick.level === "hung" ? "default" : "gold"}>{stickLabel(stick.level)}</Badge>
          </div>
          <pre className="whitespace-pre-wrap font-serif text-base leading-8 text-ink">{stick.verse}</pre>
          <p className="text-sm leading-relaxed text-muted-foreground">{stick.meaning}</p>
          <Disclaimer type="quan-niem-dan-gian" />
          <ResultActions
            title={stick.title}
            text={`Xăm ${stick.number}. ${stick.title}\n${stick.verse}\n${stick.meaning}`}
          />
          {seed ? <p className="break-all font-mono text-xs text-muted-foreground">Seed: {seed}</p> : null}
        </article>
      ) : null}
    </div>
  );
}
