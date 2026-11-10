"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { nanoid } from "nanoid";
import { useReducedMotion } from "framer-motion";
import { faceLabel, lineTitle, previewCoinCast, type RevealedToss } from "@/lib/divination/coins";
import { hexResultHref } from "@/lib/divination/params";
import type { HexagramResult } from "@/types";
import { HexagramView } from "@/components/divination/HexagramView";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/divination/Field";
import { cn } from "@/lib/utils";

export function KinhDichCast() {
  const reduceMotion = useReducedMotion();
  const [question, setQuestion] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [seed, setSeed] = useState<string | null>(null);
  const [tosses, setTosses] = useState<RevealedToss[]>([]);
  const [result, setResult] = useState<HexagramResult | null>(null);
  const [shown, setShown] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  function begin(event: FormEvent) {
    event.preventDefault();
    const text = question.trim();
    if (text.length < 2) {
      setError("Viết câu hỏi, ít nhất hai ký tự, rồi hãy tung.");
      return;
    }
    const nextSeed = `${nanoid()}|${text.slice(0, 80)}`;
    const cast = previewCoinCast(nextSeed);
    setError(null);
    setSeed(nextSeed);
    setTosses(cast.tosses);
    setResult(cast.result);
    setShown(0);
    setFlipping(false);
  }

  function tossNext() {
    if (!seed || shown >= 6 || flipping) return;
    setFlipping(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setShown((value) => value + 1);
      setFlipping(false);
    }, reduceMotion ? 0 : 700);
  }

  const href = seed ? hexResultHref({ phuong: "tung", seed, loi: question.trim() }) : null;

  return (
    <div className="space-y-8">
      <form onSubmit={begin} className="space-y-4">
        <Field
          label="Câu hỏi"
          htmlFor="cau-hoi-dich"
          hint="Sáu lần tung dùng một seed khóa từ câu hỏi và một mã ngẫu nhiên. Cùng seed sẽ ra cùng quẻ."
        >
          <Textarea
            id="cau-hoi-dich"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ví dụ: việc chuyển xưởng trong tháng này nên hoãn không?"
          />
        </Field>
        {error ? (
          <p className="text-sm text-primary" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit">Khóa seed và bắt đầu</Button>
      </form>

      {seed && result ? (
        <div className="space-y-5">
          <ol className="grid gap-2 sm:grid-cols-6">
            {tosses.map((toss, index) => {
              const open = index < shown;
              return (
                <li
                  key={`${seed}-${index}`}
                  className={cn(
                    "rounded-xl border px-3 py-3 text-center text-xs",
                    open ? "border-accent bg-accent/10" : "border-border bg-card/50 text-muted-foreground",
                  )}
                >
                  <span className="block">Hào {index + 1}</span>
                  <span className="mt-1 block">{open ? lineTitle(toss.value) : "Chưa tung"}</span>
                </li>
              );
            })}
          </ol>

          {shown < 6 ? (
            <div className="paper-card rounded-xl p-5">
              <p className="text-sm text-wood">
                Lần {shown + 1}/6 · tung ba đồng cho hào {shown + 1}, tính từ dưới lên.
              </p>
              <div className="mt-4 flex justify-center gap-4">
                {[0, 1, 2].map((coin) => (
                  <span
                    key={coin}
                    className={cn(
                      "grid size-16 place-items-center rounded-full border border-accent bg-secondary text-xs text-secondary-foreground",
                      flipping && "animate-coin-flip",
                    )}
                  >
                    {flipping ? "…" : "Đồng"}
                  </span>
                ))}
              </div>
              {flipping ? <LoadingYinYang label="Đồng đang xoay…" /> : null}
              <Button type="button" className="mt-4" onClick={tossNext} disabled={flipping}>
                Tung ba đồng
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                {tosses.map((toss, index) => (
                  <p key={`mat-${index}`} className="text-sm text-muted-foreground">
                    Hào {index + 1}: {toss.faces.map((face) => faceLabel(face)).join(" · ")} · {lineTitle(toss.value)}
                  </p>
                ))}
              </div>
              {href ? (
                <Button asChild variant="outline">
                  <Link href={href}>Mở trang kết quả</Link>
                </Button>
              ) : null}
              <HexagramView result={result} question={question.trim()} caption="Sáu hào Kinh Dịch" />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
