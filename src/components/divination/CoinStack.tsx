"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { nanoid } from "nanoid";
import { faceLabel, lineTitle, previewCoinCast, type RevealedToss } from "@/lib/divination/coins";
import { hexResultHref } from "@/lib/divination/params";
import type { HexagramResult } from "@/types";
import { HexagramView } from "@/components/divination/HexagramView";
import { Field } from "@/components/divination/Field";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function CoinStack() {
  const [question, setQuestion] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [seed, setSeed] = useState<string | null>(null);
  const [tosses, setTosses] = useState<RevealedToss[]>([]);
  const [result, setResult] = useState<HexagramResult | null>(null);
  const [line, setLine] = useState(0);
  const [open, setOpen] = useState<[boolean, boolean, boolean]>([false, false, false]);
  const [done, setDone] = useState(false);

  function start(event: FormEvent) {
    event.preventDefault();
    const text = question.trim();
    if (text.length < 2) {
      setError("Viết một câu để khóa seed, rồi hãy lật từng đồng.");
      return;
    }
    const nextSeed = `${nanoid()}|${text.slice(0, 80)}`;
    const cast = previewCoinCast(nextSeed);
    setError(null);
    setSeed(nextSeed);
    setTosses(cast.tosses);
    setResult(cast.result);
    setLine(0);
    setOpen([false, false, false]);
    setDone(false);
  }

  const current = tosses[line];
  const allOpen = open.every(Boolean);
  const href = seed ? hexResultHref({ phuong: "tung", seed, loi: question.trim() }) : null;

  return (
    <div className="space-y-8">
      <form onSubmit={start} className="mx-auto max-w-xl space-y-4 text-center">
        <Field label="Câu mang theo khi tung" htmlFor="cau-tung">
          <Textarea
            id="cau-tung"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ví dụ: có nên ký giấy vào thứ sáu?"
          />
        </Field>
        {error ? (
          <p className="text-sm text-primary" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit">Xếp sáu hào</Button>
      </form>

      {seed && current && result ? (
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-3">
            {tosses.map((toss, index) => (
              <div
                key={`${seed}-bar-${index}`}
                className={cn(
                  "flex h-8 w-56 items-center justify-center rounded-md border text-xs",
                  index < line || done ? "border-ink bg-ink text-paper" : "border-dashed border-bronze text-muted-foreground",
                )}
              >
                {index < line || done ? `Hào ${index + 1} · ${lineTitle(toss.value)}` : `Hào ${index + 1}`}
              </div>
            ))}
          </div>

          {!done ? (
            <div className="paper-card rounded-xl p-6 text-center">
              <p className="text-sm text-wood">Bấm từng đồng của hào {line + 1}. Mặt đồng đã nằm trong seed, lật để mở.</p>
              <div className="mt-5 flex justify-center gap-5">
                {current.faces.map((face, index) => (
                  <button
                    key={`${line}-${index}`}
                    type="button"
                    className={cn(
                      "grid size-24 place-items-center rounded-full border-2 text-sm shadow-sm",
                      open[index]
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-secondary bg-secondary text-secondary-foreground hover:border-accent",
                    )}
                    onClick={() =>
                      setOpen((prev) => {
                        const next: [boolean, boolean, boolean] = [prev[0], prev[1], prev[2]];
                        next[index] = true;
                        return next;
                      })
                    }
                    aria-pressed={open[index]}
                  >
                    {open[index] ? faceLabel(face) : "Lật"}
                  </button>
                ))}
              </div>
              <Button
                type="button"
                className="mt-5"
                onClick={() => {
                  if (!allOpen) {
                    setError("Hãy lật đủ ba đồng của hào này.");
                    return;
                  }
                  setError(null);
                  if (line === 5) {
                    setDone(true);
                    return;
                  }
                  setLine((value) => value + 1);
                  setOpen([false, false, false]);
                }}
              >
                {line === 5 ? "Xem quẻ" : "Sang hào trên"}
              </Button>
              {!allOpen ? (
                <p className="mt-2 text-xs text-muted-foreground">Lật đủ ba đồng rồi hãy sang hào tiếp.</p>
              ) : null}
            </div>
          ) : (
            <div className="space-y-4">
              {href ? (
                <Button asChild variant="outline">
                  <Link href={href}>Mở trang kết quả</Link>
                </Button>
              ) : null}
              <HexagramView result={result} question={question.trim()} caption="Tung từng đồng" />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
