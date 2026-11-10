"use client";

import { useState } from "react";
import { assessHouseYear } from "@/lib/algorithms/feng-shui/tuoi-lam-nha";
import { parseBoundedInt } from "@/lib/divination/params";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/divination/Field";

export function HouseYearTool() {
  const [birth, setBirth] = useState("1984");
  const [build, setBuild] = useState("2026");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReturnType<typeof assessHouseYear> | null>(null);

  return (
    <div className="space-y-8">
      <form
        className="grid gap-4 sm:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          const birthYear = parseBoundedInt(birth, 1900, 2100);
          const buildYear = parseBoundedInt(build, 1900, 2200);
          if (birthYear === null || buildYear === null) {
            setError("Kiểm tra lại hai năm.");
            setResult(null);
            return;
          }
          const next = assessHouseYear(birthYear, buildYear);
          if (!next.ok) {
            setError(next.error);
            setResult(null);
            return;
          }
          setError(null);
          setResult(next);
        }}
      >
        <Field label="Năm sinh gia chủ" htmlFor="nam-gia-chu">
          <Input id="nam-gia-chu" inputMode="numeric" value={birth} onChange={(event) => setBirth(event.target.value)} />
        </Field>
        <Field label="Năm xây hoặc sửa lớn" htmlFor="nam-xay">
          <Input id="nam-xay" inputMode="numeric" value={build} onChange={(event) => setBuild(event.target.value)} />
        </Field>
        <div className="sm:col-span-2">
          <Button type="submit">Đối chiếu tuổi làm nhà</Button>
        </div>
      </form>
      {error ? <p className="text-sm text-primary">{error}</p> : null}
      {result && result.ok ? (
        <div className="grid gap-3">
          <article className="paper-card rounded-xl p-5">
            <h2 className="ink-heading text-2xl">Tuổi mụ {result.age}</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Gia chủ tuổi {result.owner.name}, mệnh {result.ownerElement}. Năm xây tuổi {result.build.name}, hành{" "}
              {result.buildElement}. Quan hệ ngũ hành: {result.hanhLabel}.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-card p-5 text-sm leading-relaxed">
            <p>Kim lâu: {result.kimLau ?? "Không phạm theo phép chia 9 đang dùng."}</p>
            <p className="mt-2">
              Tam tai của tuổi {result.owner.name} rơi vào các năm {result.tamTaiNames.join(", ")}. Năm xây{" "}
              {result.phamTamTai ? "nằm trong nhóm đó." : "không nằm trong nhóm đó."}
            </p>
            <p className="mt-2">
              Với vòng tuổi: {result.xungTuoi ? "năm xây thuộc nhóm xung của tuổi gia chủ." : "năm xây không thuộc nhóm xung chính của tuổi gia chủ."}
            </p>
          </article>
          <p className="text-xs leading-relaxed text-muted-foreground">{result.note}</p>
          <Disclaimer type="quan-niem-dan-gian" />
        </div>
      ) : null}
    </div>
  );
}
