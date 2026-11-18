"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { nanoid } from "nanoid";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Briefcase, Coins, Heart, HeartPulse, Home, Plane, RotateCcw, type LucideIcon } from "lucide-react";
import { ASPECT_LABELS, pickStick, STICK_LEVEL_LABEL, type FullStick } from "@/data/fortune-sticks";
import { ResultActions } from "@/components/shared/ResultActions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ASPECT_ICONS: LucideIcon[] = [Home, Briefcase, Coins, Heart, HeartPulse, Plane];

const LEVEL_CLASS = {
  cat: "bg-jade/10 text-jade border-jade/30",
  binh: "bg-accent/15 text-wood border-accent/40",
  hung: "bg-muted text-muted-foreground border-border",
} as const;

const STICKS = Array.from({ length: 15 }, (_, index) => ({
  left: 12 + (index * 76) / 14,
  height: 86 + ((index * 37) % 30),
  rotate: ((index * 53) % 11) - 5,
  delay: ((index * 29) % 17) / 100,
}));

function StickCard({ stick, kind, seed }: { stick: FullStick; kind: "am" | "thanh"; seed: string }) {
  const set = kind === "am" ? "Quan Âm" : "Quan Thánh";
  const share = [
    `Xăm ${set} số ${stick.number}: ${stick.title} (${STICK_LEVEL_LABEL[stick.level]})`,
    ...stick.verse,
    stick.meaning,
    ...ASPECT_LABELS.map((label, index) => `${label}: ${stick.aspects[index]}`),
  ].join("\n");

  return (
    <article className="paper-card mx-auto max-w-2xl overflow-hidden rounded-2xl">
      <header className="flex items-start justify-between gap-3 px-5 pt-5 pb-4 sm:px-7">
        <div>
          <p className="eyebrow">
            Xăm {set} · số {stick.number}
          </p>
          <h2 className="ink-heading mt-1 text-[1.5rem] leading-tight text-ink">{stick.title}</h2>
        </div>
        <span className={cn("shrink-0 rounded-full border px-3 py-1 text-xs font-semibold", LEVEL_CLASS[stick.level])}>
          {STICK_LEVEL_LABEL[stick.level]}
        </span>
      </header>

      <blockquote className="border-y border-accent/20 bg-accent/[0.07] px-3 py-4 text-center sm:py-5">
        {stick.verse.map((line, index) => (
          <p key={index} className={cn("ink-heading text-[15px] leading-8 text-ink italic sm:text-[16.5px]", index % 2 === 0 && "text-wood")}>
            {line}
          </p>
        ))}
      </blockquote>

      <div className="px-5 py-5 sm:px-7">
        <h3 className="eyebrow">Lời giải</h3>
        <p className="mt-2 text-[15.5px] leading-7 text-ink">{stick.meaning}</p>

        <dl className="mt-4 grid gap-x-6 gap-y-3 border-t border-border/60 pt-4 sm:grid-cols-2">
          {ASPECT_LABELS.map((label, index) => {
            const Icon = ASPECT_ICONS[index];
            return (
              <div key={label}>
                <dt className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                  <Icon className="size-4 text-bronze" aria-hidden="true" />
                  {label}
                </dt>
                <dd className="mt-0.5 text-[14.5px] leading-6 text-wood">{stick.aspects[index]}</dd>
              </div>
            );
          })}
        </dl>
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-3 bg-primary/[0.05] px-5 py-3 sm:px-7">
        <ResultActions title={`Xăm ${set} số ${stick.number}`} text={share} />
        {seed ? <span className="text-[11px] text-muted-foreground">Mở lại đường dẫn này sẽ thấy đúng quẻ vừa xin.</span> : null}
      </footer>
    </article>
  );
}

export function StickDraw({ tone, initialSeed }: { tone: "am" | "thanh"; initialSeed?: string }) {
  const reduceMotion = useReducedMotion();
  const kind = tone === "am" ? "quan-am" : "quan-thanh";
  const [phase, setPhase] = useState<"idle" | "drawing" | "done">(initialSeed ? "done" : "idle");
  const [stick, setStick] = useState<FullStick | null>(() => (initialSeed ? pickStick(kind, initialSeed) : null));
  const [seed, setSeed] = useState(initialSeed ?? "");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  function draw() {
    if (phase === "drawing") return;
    const nextSeed = nanoid();
    setPhase("drawing");
    setStick(null);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setStick(pickStick(kind, nextSeed));
      setSeed(nextSeed);
      setPhase("done");
      navigator.vibrate?.([40, 30, 90]);
      const url = new URL(window.location.href);
      url.searchParams.set("seed", nextSeed);
      window.history.replaceState(null, "", url);
    }, reduceMotion ? 0 : 1700);
  }

  function reset() {
    setPhase("idle");
    setStick(null);
  }

  if (phase === "done" && stick) {
    return (
      <div className="space-y-4">
        <div className="flex justify-center">
          <Button type="button" variant="gold" size="sm" onClick={reset}>
            <RotateCcw />
            Xin quẻ khác
          </Button>
        </div>
        <StickCard stick={stick} kind={tone} seed={seed} />
        <p className="mx-auto max-w-2xl text-xs leading-relaxed text-muted-foreground">
          Bộ xăm biên soạn riêng cho Huyền Tâm theo tinh thần xăm dân gian, không phải bản xăm gốc của đền chùa nào. Lời
          xăm mang tính giải trí và tham khảo văn hóa.
        </p>
      </div>
    );
  }

  const drawing = phase === "drawing";
  return (
    <section className="lacquer relative mx-auto max-w-md overflow-hidden rounded-2xl border border-accent/30 px-5 pt-5 pb-5 text-center text-primary-foreground">
      <div className="cloud-motif pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative">
        <p className="text-xs tracking-[0.2em] text-accent uppercase">
          {drawing ? (tone === "am" ? "Ống xăm đang lắc" : "Ấn son đang đóng") : tone === "am" ? "Chạm vào ống xăm để lắc" : "Chạm vào ấn son để rút thẻ"}
        </p>

        <button type="button" onClick={draw} disabled={drawing} aria-label={tone === "am" ? "Lắc ống xăm" : "Đóng ấn rút thẻ"} className="relative mx-auto mt-3 block h-48 w-40 cursor-pointer rounded-2xl outline-none select-none focus-visible:ring-2 focus-visible:ring-accent">
          {tone === "am" ? (
            <div className={cn("absolute inset-x-0 bottom-0 mx-auto h-44 w-24", drawing && !reduceMotion && "animate-shake-tube")}>
              {STICKS.map((item, index) => (
                <span
                  key={index}
                  className={cn("tube-stick absolute bottom-12 w-[3.5px] rounded-t-full", drawing && "is-rattling")}
                  style={{ left: `${item.left}%`, height: item.height, "--r": `${item.rotate}deg`, "--energy": 0.8, animationDelay: `${item.delay}s` } as CSSProperties}
                />
              ))}
              <div className="absolute inset-x-0 bottom-0 h-28 overflow-hidden rounded-b-2xl rounded-t-md border border-black/40 bg-[linear-gradient(90deg,#3b1a12_0%,#7c3a1d_22%,#b26a33_46%,#7c3a1d_72%,#2d140e_100%)]">
                <span className="ink-heading absolute inset-0 grid place-items-center text-3xl text-accent/90">籤</span>
              </div>
              <div className="absolute inset-x-[-4px] bottom-[6.6rem] h-3 rounded-full border border-black/40 bg-[linear-gradient(90deg,#55291a,#c58a4b,#55291a)]" />
            </div>
          ) : (
            <motion.div
              animate={drawing && !reduceMotion ? { scale: [1, 0.86, 1.04, 0.92, 1], rotate: [0, -3, 2, 0] } : { scale: 1 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
              className="absolute inset-0 m-auto grid size-32 place-items-center rounded-md border-4 border-[#f1e5cb]/60 bg-primary text-5xl text-[#fff8ec] shadow-[0_18px_30px_-12px_rgba(0,0,0,0.6)]"
            >
              <span className="ink-heading">義</span>
            </motion.div>
          )}
          <AnimatePresence>
            {drawing && !reduceMotion ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.6 }}
                className="absolute inset-x-0 -bottom-1 text-[11px] text-[#f1e5cb]/70"
              >
                Thành tâm, thành tâm…
              </motion.span>
            ) : null}
          </AnimatePresence>
        </button>

        <div className="mx-auto mt-4 max-w-sm space-y-3">
          <Button type="button" onClick={draw} variant="gold" className="w-full" disabled={drawing}>
            {tone === "am" ? "Lắc ống xin xăm" : "Đóng ấn và rút thẻ"}
          </Button>
          <p className="text-center text-[11.5px] leading-relaxed text-[#f1e5cb]/70">
            {tone === "am" ? "Bộ 100 quẻ Quan Âm" : "Bộ 20 quẻ Quan Thánh"}, mỗi quẻ có thơ, lời giải và sáu việc: gia đạo,
            công danh, tài lộc, tình duyên, sức khỏe, xuất hành.
          </p>
        </div>
      </div>
    </section>
  );
}
