"use client";

import { useState } from "react";
import { getFengShuiProfile } from "@/lib/algorithms/feng-shui/ngu-hanh";
import { getFengShuiGuide, type FengGuideId } from "@/data/feng-shui/guides";
import { parseBoundedInt } from "@/lib/divination/params";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/divination/Field";

function Diagram({ id }: { id: FengGuideId }) {
  if (id === "phong-ngu") {
    return (
      <div className="mx-auto grid h-40 w-64 grid-rows-[28px_1fr] overflow-hidden rounded-xl border border-wood bg-amber-50" aria-hidden="true">
        <div className="bg-wood" />
        <div className="m-4 rounded-md border border-dashed border-bronze" />
      </div>
    );
  }
  if (id === "phong-khach") {
    return (
      <div className="flex items-end justify-center gap-3" aria-hidden="true">
        <span className="h-16 w-20 rounded-t-lg bg-secondary" />
        <span className="mb-6 h-8 w-16 rounded bg-accent/70" />
        <span className="h-16 w-20 rounded-t-lg bg-secondary" />
      </div>
    );
  }
  if (id === "ban-lam-viec") {
    return (
      <div className="mx-auto w-64" aria-hidden="true">
        <div className="h-8 rounded-t-lg bg-sky-200" />
        <div className="mt-4 h-16 rounded-lg border-4 border-wood bg-amber-100" />
      </div>
    );
  }
  if (id === "ban-tho") {
    return (
      <div className="mx-auto flex w-48 flex-col gap-1" aria-hidden="true">
        <div className="h-6 rounded bg-primary" />
        <div className="h-8 rounded bg-secondary" />
        <div className="h-10 rounded bg-wood" />
      </div>
    );
  }
  return (
    <ol className="grid gap-2 sm:grid-cols-4" aria-hidden="true">
      {["Móng", "Tường", "Mái", "Cửa"].map((step, index) => (
        <li key={step} className="rounded-lg border border-accent/40 bg-card px-3 py-4 text-center text-sm">
          {index + 1}. {step}
        </li>
      ))}
    </ol>
  );
}

export function RoomGuide({ id }: { id: FengGuideId }) {
  const guide = getFengShuiGuide(id);
  const [year, setYear] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  if (!guide) return null;

  return (
    <div className="space-y-8">
      <Diagram id={id} />
      <p className="max-w-3xl text-base leading-relaxed text-wood">{guide.lede}</p>
      <div className="grid gap-4 md:grid-cols-3">
        {guide.principles.map((item) => (
          <article key={item.title} className="paper-card rounded-xl p-5">
            <h2 className="ink-heading text-xl text-ink">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
          </article>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-jade/30 bg-emerald-50/60 p-5">
          <h2 className="ink-heading text-xl">Nên</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed">
            {guide.dos.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-xl border border-primary/20 bg-rose-50/70 p-5">
          <h2 className="ink-heading text-xl">Nên tránh</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed">
            {guide.donts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
      <form
        className="flex flex-wrap items-end gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          const birthYear = parseBoundedInt(year, 1900, 2100);
          if (birthYear === null) {
            setError("Nhập năm sinh từ 1900 đến 2100.");
            setNote(null);
            return;
          }
          const profile = getFengShuiProfile(birthYear);
          setError(null);
          setNote(`Mệnh ${profile.label}: ${guide.byElement[profile.element]}`);
        }}
      >
        <div className="min-w-40 flex-1">
          <Field label="Đối chiếu theo năm sinh" htmlFor={`nam-${id}`}>
            <Input id={`nam-${id}`} inputMode="numeric" value={year} onChange={(event) => setYear(event.target.value)} />
          </Field>
        </div>
        <Button type="submit">Xem theo tuổi</Button>
      </form>
      {error ? <p className="text-sm text-primary">{error}</p> : null}
      {note ? <p className="paper-card rounded-xl p-5 text-sm leading-relaxed text-wood">{note}</p> : null}
      <Disclaimer type="quan-niem-dan-gian" />
    </div>
  );
}
