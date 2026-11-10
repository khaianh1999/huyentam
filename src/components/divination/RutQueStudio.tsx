"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { nanoid } from "nanoid";
import { useReducedMotion } from "framer-motion";
import { pickRandomHexagram } from "@/lib/algorithms/kinh-dich/hexagram";
import { getRitual, RUT_QUE_TYPES, type RutFocus } from "@/data/divination/rituals";
import { hexResultHref } from "@/lib/divination/params";
import type { HexagramResult } from "@/types";
import { HexagramView } from "@/components/divination/HexagramView";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/divination/Field";

const ACCENT: Record<string, string> = {
  "dau-nam": "from-amber-100 to-card",
  "tinh-duyen": "from-rose-100 to-card",
  "cong-danh": "from-stone-200 to-card",
  "tai-loc": "from-yellow-100 to-card",
  "gia-dao": "from-orange-100 to-card",
  "binh-an": "from-emerald-50 to-card",
};

export function RutQueStudio({ loai }: { loai: string }) {
  const ritual = getRitual(loai);
  const reduceMotion = useReducedMotion();
  const [wish, setWish] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<HexagramResult | null>(null);
  const timer = useRef<number | null>(null);

  if (!ritual) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {RUT_QUE_TYPES.map((item) => (
          <Link
            key={item.id}
            href={`/gieo-que/rut-que?loai=${item.id}`}
            className={`rounded-2xl border border-accent/40 bg-gradient-to-br ${ACCENT[item.id]} p-6 transition hover:-translate-y-0.5`}
          >
            <p className="text-xs tracking-[0.18em] text-bronze uppercase">{item.eyebrow}</p>
            <h2 className="ink-heading mt-2 text-2xl text-ink">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.lede}</p>
          </Link>
        ))}
      </div>
    );
  }

  function draw(event: FormEvent) {
    event.preventDefault();
    if (!ritual) return;
    event.preventDefault();
    const text = wish.trim();
    if (text.length < 2) {
      setError("Viết điều muốn hỏi, ít nhất hai ký tự.");
      setResult(null);
      return;
    }
    const seed = `${nanoid()}|${ritual.id}|${text.slice(0, 80)}`;
    setError(null);
    setPending(true);
    setResult(null);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setResult(pickRandomHexagram(seed));
      setPending(false);
    }, reduceMotion ? 0 : 800);
  }

  const href = result
    ? hexResultHref({
        phuong: "chon",
        seed: result.seed,
        loi: wish.trim(),
        loai: ritual.id,
      })
    : null;

  return (
    <div className="space-y-8">
      <div className={`rounded-3xl border border-accent/40 bg-gradient-to-br ${ACCENT[ritual.id]} p-6 sm:p-8`}>
        <p className="text-xs tracking-[0.2em] text-bronze uppercase">{ritual.eyebrow}</p>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-wood">{ritual.lede}</p>
        <form onSubmit={draw} className="mt-6 space-y-4">
          <Field label={ritual.prompt} htmlFor="loi-rut">
            <Textarea
              id="loi-rut"
              value={wish}
              onChange={(event) => setWish(event.target.value)}
              placeholder={ritual.placeholder}
            />
          </Field>
          {error ? (
            <p className="text-sm text-primary" role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit" disabled={pending}>
            Rút quẻ
          </Button>
        </form>
      </div>
      <div className="flex flex-wrap gap-2">
        {RUT_QUE_TYPES.map((item) => (
          <Button key={item.id} asChild variant={item.id === ritual.id ? "gold" : "outline"} size="sm">
            <Link href={`/gieo-que/rut-que?loai=${item.id}`}>{item.title}</Link>
          </Button>
        ))}
      </div>
      {pending ? <LoadingYinYang label="Đang mở quẻ…" /> : null}
      {result && href ? (
        <div className="space-y-4">
          <p className="text-sm text-wood">{ritual.closing}</p>
          <Button asChild variant="outline">
            <Link href={href}>Mở trang kết quả</Link>
          </Button>
          <HexagramView
            result={result}
            question={wish.trim()}
            focus={ritual.focus as RutFocus}
            caption={ritual.title}
          />
        </div>
      ) : null}
    </div>
  );
}
