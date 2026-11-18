"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { nanoid } from "nanoid";
import { motion, useReducedMotion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { previewCoinCast, type CoinFace, type RevealedToss } from "@/lib/divination/coins";
import { hexResultHref } from "@/lib/divination/params";
import type { HexagramResult } from "@/types";
import { HexagramView } from "@/components/divination/HexagramView";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FLIP_MS = 900;

/** Đồng xu cổ: mặt ngửa có chữ, mặt sấp để trơn, lỗ vuông ở giữa. */
function Coin({ face, spinning, spinKey, delay }: { face: CoinFace | null; spinning: boolean; spinKey: number; delay: number }) {
  const reduceMotion = useReducedMotion();
  const head = face !== "tail";
  return (
    <motion.div
      key={spinKey}
      initial={spinning && !reduceMotion ? { rotateY: 0, y: 0 } : false}
      animate={spinning && !reduceMotion ? { rotateY: [0, 900, 1080], y: [0, -70, 0] } : { rotateY: 0, y: 0 }}
      transition={{ duration: FLIP_MS / 1000, delay, ease: "easeOut" }}
      className="relative grid size-20 place-items-center rounded-full border-[3px] border-[#7a5320] bg-[radial-gradient(circle_at_35%_30%,#f6dc95,#c8963f_60%,#8a5a24)] shadow-[0_10px_18px_-8px_rgba(0,0,0,0.6)] sm:size-24"
      style={{ transformStyle: "preserve-3d" }}
    >
      <span className="absolute size-6 rounded-[3px] border-2 border-[#7a5320] bg-[#2b1311] sm:size-7" />
      {face ? (
        head ? (
          <>
            <span className="ink-heading absolute top-1.5 text-[13px] text-[#5b3a14] sm:text-[15px]">通</span>
            <span className="ink-heading absolute bottom-1.5 text-[13px] text-[#5b3a14] sm:text-[15px]">寶</span>
            <span className="ink-heading absolute left-2 text-[13px] text-[#5b3a14] sm:text-[15px]">元</span>
            <span className="ink-heading absolute right-2 text-[13px] text-[#5b3a14] sm:text-[15px]">開</span>
          </>
        ) : (
          <span className="absolute inset-2 rounded-full border border-[#8a5a24]/60" />
        )
      ) : null}
    </motion.div>
  );
}

function LineSlot({ toss, index, active }: { toss?: RevealedToss; index: number; active: boolean }) {
  const color = toss?.changing ? "bg-primary" : "bg-[#fff8ec]";
  return (
    <div className={cn("flex h-5 items-center gap-3", active && "animate-pulse")}>
      <span className="w-12 text-right text-[11px] text-[#f1e5cb]/60">Hào {index + 1}</span>
      <span className="flex h-2.5 w-32 gap-3">
        {toss ? (
          toss.yang ? (
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className={cn("h-full flex-1 rounded-full", color)} />
          ) : (
            <>
              <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className={cn("h-full flex-1 rounded-full", color)} />
              <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className={cn("h-full flex-1 rounded-full", color)} />
            </>
          )
        ) : (
          <span className="h-full flex-1 rounded-full border border-dashed border-white/20" />
        )}
      </span>
      <span className="w-14 text-[11px] text-accent">{toss?.changing ? "động" : ""}</span>
    </div>
  );
}

/**
 * Trò tung ba đồng xu sáu lần. "manual": mỗi lần chạm tung một hào. "auto": một chạm tự tung đủ sáu hào.
 */
export function CoinGame({ mode }: { mode: "manual" | "auto" }) {
  const reduceMotion = useReducedMotion();
  const [seed, setSeed] = useState(() => "");
  const [tosses, setTosses] = useState<RevealedToss[]>([]);
  const [result, setResult] = useState<HexagramResult | null>(null);
  const [count, setCount] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [spinKey, setSpinKey] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), []);

  const done = count === 6;
  const shown = tosses.slice(0, count);
  const last = shown.at(-1);

  function ensureCast() {
    if (tosses.length) return tosses;
    const nextSeed = nanoid();
    const cast = previewCoinCast(nextSeed);
    setSeed(nextSeed);
    setTosses(cast.tosses);
    setResult(cast.result);
    return cast.tosses;
  }

  function tossOnce(from: number) {
    setSpinning(true);
    setSpinKey((key) => key + 1);
    const id = window.setTimeout(
      () => {
        setSpinning(false);
        setCount(from + 1);
        navigator.vibrate?.(from === 5 ? [40, 30, 80] : 15);
      },
      reduceMotion ? 0 : FLIP_MS + 150,
    );
    timers.current.push(id);
  }

  function onToss() {
    if (spinning || done) return;
    ensureCast();
    if (mode === "manual") {
      tossOnce(count);
      return;
    }
    // Tự tung đủ sáu lần liên tiếp.
    for (let step = count; step < 6; step += 1) {
      const id = window.setTimeout(() => tossOnce(step), (step - count) * (reduceMotion ? 0 : FLIP_MS + 350));
      timers.current.push(id);
    }
  }

  function reset() {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    setTosses([]);
    setResult(null);
    setCount(0);
    setSpinning(false);
    setSeed("");
  }

  const faces = spinning ? null : last?.faces;
  const status = done
    ? "Quẻ đã thành"
    : spinning
      ? "Xu đang bay…"
      : count === 0
        ? mode === "manual"
          ? "Chạm vào ba đồng xu để tung"
          : "Chạm để gieo quẻ"
        : `Đã tung ${count}/6 lần, chạm để tung tiếp`;

  return (
    <div className="space-y-5">
      {!done || !result ? (
        <section className="lacquer relative mx-auto max-w-md overflow-hidden rounded-2xl border border-accent/30 px-5 py-6 text-center text-[#fff8ec]">
          <div className="cloud-motif pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative">
            <p className="text-xs tracking-[0.2em] text-accent uppercase">{status}</p>

            <button
              type="button"
              onClick={onToss}
              disabled={spinning}
              aria-label={mode === "manual" ? "Tung ba đồng xu" : "Gieo quẻ"}
              className="mx-auto mt-6 flex h-36 items-end justify-center gap-3 rounded-2xl px-4 outline-none focus-visible:ring-2 focus-visible:ring-accent sm:gap-4"
            >
              {[0, 1, 2].map((index) => (
                <Coin key={index} face={faces?.[index] ?? (count === 0 ? "head" : null)} spinning={spinning} spinKey={spinKey * 3 + index} delay={index * 0.06} />
              ))}
            </button>

            {last && !spinning ? (
              <p className="mt-3 text-sm text-[#f1e5cb]/85">
                {last.faces.filter((face) => face === "head").length} ngửa, {last.faces.filter((face) => face === "tail").length} sấp ·{" "}
                {last.yang ? "hào dương" : "hào âm"}
                {last.changing ? " động" : ""}
              </p>
            ) : (
              <p className="mt-3 h-5" />
            )}

            <div className="mx-auto mt-4 flex w-fit flex-col-reverse gap-1.5">
              {Array.from({ length: 6 }, (_, index) => (
                <LineSlot key={index} index={index} toss={shown[index]} active={!done && index === count && !spinning && count > 0} />
              ))}
            </div>

            <Button type="button" variant="gold" className="mt-5 w-full max-w-xs" onClick={onToss} disabled={spinning || done}>
              {mode === "manual" ? (count === 0 ? "Tung xu" : `Tung lần ${Math.min(count + 1, 6)}`) : "Gieo quẻ"}
            </Button>
          </div>
        </section>
      ) : null}

      {done && result ? (
        <>
          <div className="flex flex-wrap justify-center gap-2">
            <Button type="button" variant="gold" size="sm" onClick={reset}>
              <RotateCcw />
              Gieo quẻ mới
            </Button>
            {seed ? (
              <Button asChild variant="outline" size="sm">
                <Link href={hexResultHref({ phuong: "tung", seed })}>Mở trang kết quả</Link>
              </Button>
            ) : null}
          </div>
          <HexagramView result={result} caption="Quẻ từ sáu lần tung xu" />
        </>
      ) : null}
    </div>
  );
}
