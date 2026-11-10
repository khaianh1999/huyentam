"use client";

import { useState } from "react";
import { getTuViByAgeGender } from "@/lib/algorithms/astrology/tu-vi";
import { parseBoundedInt } from "@/lib/divination/params";
import type { Gender } from "@/types";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/divination/Field";
import { cn } from "@/lib/utils";

export function AnimalPeek({ animalName }: { animalName: string }) {
  const [year, setYear] = useState("1990");
  const [gender, setGender] = useState<Gender>("nu");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReturnType<typeof getTuViByAgeGender> | null>(null);

  return (
    <form
      className="paper-card space-y-4 rounded-xl p-5"
      onSubmit={(event) => {
        event.preventDefault();
        const birthYear = parseBoundedInt(year, 1900, 2100);
        if (birthYear === null) {
          setError("Năm sinh từ 1900 đến 2100.");
          setResult(null);
          return;
        }
        setError(null);
        setResult(getTuViByAgeGender(birthYear, gender));
      }}
    >
      <h2 className="ink-heading text-2xl text-ink">Xem nhanh theo năm và giới</h2>
      <Field label="Năm sinh" htmlFor="nam-peek">
        <Input id="nam-peek" inputMode="numeric" value={year} onChange={(event) => setYear(event.target.value)} />
      </Field>
      <div className="flex gap-2">
        {(
          [
            ["nu", "Nữ"],
            ["nam", "Nam"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={cn(
              "rounded-full border px-4 py-2 text-sm",
              gender === value ? "border-primary bg-primary text-primary-foreground" : "border-border",
            )}
            onClick={() => setGender(value)}
          >
            {label}
          </button>
        ))}
      </div>
      {error ? <p className="text-sm text-primary">{error}</p> : null}
      <Button type="submit">Lấy luận theo tuổi</Button>
      {result ? (
        <div className="space-y-2 text-sm leading-relaxed">
          <p>{result.overview}</p>
          {result.animal !== animalName ? (
            <p className="text-wood">
              Năm này thuộc tuổi {result.animal}, khác tuổi {animalName} của trang đang mở.
            </p>
          ) : (
            <p className="text-wood">Năm này thuộc đúng tuổi {animalName}.</p>
          )}
          <Disclaimer type="quan-niem-dan-gian" />
          <p className="text-xs text-muted-foreground">{result.disclaimer}</p>
        </div>
      ) : null}
    </form>
  );
}
