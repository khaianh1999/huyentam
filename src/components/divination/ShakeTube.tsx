"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { nanoid } from "nanoid";
import { useReducedMotion } from "framer-motion";
import { pickRandomHexagram } from "@/lib/algorithms/kinh-dich/hexagram";
import { hexResultHref } from "@/lib/divination/params";
import type { HexagramResult } from "@/types";
import { HexagramView } from "@/components/divination/HexagramView";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/divination/Field";
import { cn } from "@/lib/utils";

export function ShakeTube() {
  const reduceMotion = useReducedMotion();
  const [intention, setIntention] = useState("");
  const [phase, setPhase] = useState<"idle" | "shaking" | "done">("idle");
  const [result, setResult] = useState<HexagramResult | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  function shake() {
    const text = intention.trim();
    const seed = text ? `${nanoid()}|${text.slice(0, 80)}` : nanoid();
    setPhase("shaking");
    setResult(null);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setResult(pickRandomHexagram(seed));
      setPhase("done");
    }, reduceMotion ? 0 : 1600);
  }

  const href =
    result && phase === "done"
      ? hexResultHref({ phuong: "chon", seed: result.seed, loi: intention.trim() || undefined })
      : null;

  return (
    <div className="space-y-8">
      <div className="mx-auto flex max-w-md flex-col items-center gap-6 text-center">
        <Field label="Điều muốn hỏi, có thể để trống" htmlFor="y-lac">
          <Input
            id="y-lac"
            value={intention}
            onChange={(event) => setIntention(event.target.value)}
            placeholder="Ví dụ: việc nhà tháng này"
          />
        </Field>
        <div
          className={cn(
            "relative grid h-52 w-28 place-items-end rounded-t-full rounded-b-3xl border-2 border-secondary bg-gradient-to-b from-amber-100 to-secondary pb-3",
            phase === "shaking" && "animate-shake-tube",
          )}
          aria-hidden="true"
        >
          <span className="mb-6 h-24 w-3 rounded-full bg-accent" />
          <span className="absolute -top-3 h-4 w-20 rounded-full border border-secondary bg-amber-200" />
        </div>
        {phase === "shaking" ? <LoadingYinYang label="Ống đang lắc…" /> : null}
        <Button type="button" onClick={shake} disabled={phase === "shaking"}>
          {phase === "done" ? "Lắc quẻ khác" : "Lắc ống"}
        </Button>
      </div>
      {result && href ? (
        <div className="space-y-4">
          <Button asChild variant="outline">
            <Link href={href}>Mở trang kết quả</Link>
          </Button>
          <HexagramView result={result} question={intention.trim() || undefined} caption="Quẻ rơi từ ống" />
        </div>
      ) : null}
    </div>
  );
}
