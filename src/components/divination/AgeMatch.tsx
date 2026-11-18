"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Compass, Heart, Sparkles, Users } from "lucide-react";
import type { Gender } from "@/types";
import { Field } from "@/components/divination/Field";
import { ResultActions } from "@/components/shared/ResultActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CHI_ANIMAL, CHI_VI, NGU_HANH_VI } from "@/lib/algorithms/calendar/constants";
import { getYearCanChi } from "@/lib/algorithms/calendar/can-chi";
import { compareChi, compareTuoi, weddingYears, type PersonProfile } from "@/lib/algorithms/divination/xem-tuoi";
import { getDirections } from "@/lib/algorithms/feng-shui/cung-phi";
import { parseBoundedInt } from "@/lib/divination/params";
import { useTodaySolar } from "@/lib/client/use-vn-today";
import { cn } from "@/lib/utils";

type Mode = "hop" | "vo-chong";

function scoreTone(score: number) {
  return score >= 2 ? "text-jade" : score >= 1 ? "text-wood" : "text-primary";
}

function GenderPick({ value, onChange, name }: { value: Gender; onChange: (value: Gender) => void; name: string }) {
  return (
    <div className="mt-2 grid grid-cols-2 gap-2">
      {(
        [
          ["nam", "Nam"],
          ["nu", "Nữ"],
        ] as const
      ).map(([key, label]) => (
        <label
          key={key}
          className={cn(
            "cursor-pointer rounded-xl border px-3 py-2 text-center text-sm transition",
            value === key ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-wood hover:border-accent",
          )}
        >
          <input type="radio" name={name} value={key} checked={value === key} onChange={() => onChange(key)} className="sr-only" />
          {label}
        </label>
      ))}
    </div>
  );
}

function ProfileCard({ person }: { person: PersonProfile }) {
  const rows: [string, string][] = [
    ["Năm sinh", `${person.year} · ${person.canChi}`],
    ["Con giáp", person.animal],
    ["Mệnh", `${person.napAm} (${NGU_HANH_VI[person.menh]})`],
    ["Cung phi", `${person.cung.name} · ${person.cung.group}`],
  ];
  return (
    <article className="paper-card rounded-2xl p-4">
      <p className="eyebrow">{person.label}</p>
      <dl className="mt-2 space-y-1.5 text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-3">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="text-right font-medium text-ink">{value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export function AgeMatch({ mode }: { mode: Mode }) {
  const today = useTodaySolar();
  const marriage = mode === "vo-chong";
  const [yearA, setYearA] = useState(marriage ? "1990" : "1990");
  const [yearB, setYearB] = useState(marriage ? "1992" : "1992");
  const [genderA, setGenderA] = useState<Gender>("nam");
  const [genderB, setGenderB] = useState<Gender>(marriage ? "nu" : "nam");
  const [input, setInput] = useState<{ a: number; b: number; ga: Gender; gb: Gender } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const result = useMemo(() => {
    if (!input) return null;
    return compareTuoi(
      { year: input.a, gender: input.ga, label: marriage ? "Chồng" : "Người thứ nhất" },
      { year: input.b, gender: input.gb, label: marriage ? "Vợ" : "Người thứ hai" },
    );
  }, [input, marriage]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const a = parseBoundedInt(yearA, 1920, 2030);
    const b = parseBoundedInt(yearB, 1920, 2030);
    if (a === null || b === null) {
      setError("Nhập năm sinh từ 1920 đến 2030.");
      setInput(null);
      return;
    }
    setError(null);
    setInput({ a, b, ga: marriage ? "nam" : genderA, gb: marriage ? "nu" : genderB });
  }

  // Năm hiện tại lấy ở trình duyệt; khi chưa có thì chưa liệt kê năm cưới, năm sinh con.
  const thisYear = today?.year ?? 0;
  const wedding = result && marriage && thisYear ? weddingYears(result.b.year, thisYear, 8) : [];
  const children =
    result && marriage && thisYear
      ? Array.from({ length: 8 }, (_, index) => {
          const year = thisYear + index;
          const { chi } = getYearCanChi(year);
          const withFather = compareChi(chi, result.a.chi).score >= 2;
          const withMother = compareChi(chi, result.b.chi).score >= 2;
          return { year, label: `${CHI_VI[chi]} (${CHI_ANIMAL[chi]})`, both: withFather && withMother, one: withFather || withMother };
        }).filter((item) => item.one)
      : [];
  const host = result?.a;
  const directions = host ? getDirections(host.cung.name) : [];
  const share = result
    ? [
        `Xem tuổi ${result.a.canChi} và ${result.b.canChi}: ${result.total}/10 · ${result.level}`,
        result.summary,
        ...result.criteria.map((item) => `${item.title}: ${item.verdict} (${item.score}/2). ${item.detail}`),
      ].join("\n")
    : "";

  return (
    <div className="space-y-6">
      <form onSubmit={submit} className="paper-card mx-auto grid max-w-2xl gap-4 rounded-2xl p-5 sm:grid-cols-2 sm:p-6">
        <div>
          <Field label={marriage ? "Năm sinh chồng" : "Năm sinh người thứ nhất"} htmlFor="tuoi-a">
            <Input id="tuoi-a" inputMode="numeric" value={yearA} onChange={(event) => setYearA(event.target.value)} />
          </Field>
          {marriage ? null : <GenderPick name="gioi-a" value={genderA} onChange={setGenderA} />}
        </div>
        <div>
          <Field label={marriage ? "Năm sinh vợ" : "Năm sinh người thứ hai"} htmlFor="tuoi-b">
            <Input id="tuoi-b" inputMode="numeric" value={yearB} onChange={(event) => setYearB(event.target.value)} />
          </Field>
          {marriage ? null : <GenderPick name="gioi-b" value={genderB} onChange={setGenderB} />}
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground sm:col-span-2">
          Nhập năm âm lịch. Người sinh trước Tết Nguyên đán thì lấy năm trước, ví dụ sinh 20/1/1991 trước Tết thì nhập 1990.
        </p>
        {error ? <p className="text-sm text-primary sm:col-span-2">{error}</p> : null}
        <div className="sm:col-span-2">
          <Button type="submit" className="w-full sm:w-auto">
            {marriage ? <Heart /> : <Users />}
            {marriage ? "Xem tuổi vợ chồng" : "Xem tuổi hợp"}
          </Button>
        </div>
      </form>

      {result ? (
        <div className="mx-auto max-w-2xl space-y-4">
          <section className="lacquer relative overflow-hidden rounded-2xl border border-accent/30 p-6 text-center text-[#fff8ec]">
            <div className="cloud-motif pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative">
              <p className="text-xs tracking-[0.18em] text-accent uppercase">
                {result.a.canChi} · {result.b.canChi}
              </p>
              <p className="ink-heading mt-2 text-5xl">
                {result.total}
                <span className="text-xl text-[#f1e5cb]/70">/10</span>
              </p>
              <p className="mt-1 inline-flex rounded-full bg-[#fffdf8] px-3 py-1 text-sm font-semibold text-primary">
                {result.level}
              </p>
              <p className="mx-auto mt-3 max-w-md text-[15px] leading-7 text-[#fff8ec]">{result.summary}</p>
            </div>
          </section>

          <div className="grid gap-3 sm:grid-cols-2">
            <ProfileCard person={result.a} />
            <ProfileCard person={result.b} />
          </div>

          <article className="paper-card overflow-hidden rounded-2xl">
            <p className="eyebrow px-5 pt-5 sm:px-6">Năm tiêu chí đối chiếu</p>
            <ol className="mt-2 divide-y divide-border/60">
              {result.criteria.map((item) => (
                <li key={item.key} className="px-5 py-3.5 sm:px-6">
                  <p className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-ink">
                      {item.title}
                      <span className="ml-2 rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-medium text-wood">{item.verdict}</span>
                    </span>
                    <span className={cn("text-sm font-semibold tabular-nums", scoreTone(item.score))}>{item.score}/2</span>
                  </p>
                  <p className="mt-1 text-[14.5px] leading-6 text-wood">{item.detail}</p>
                  {item.remedy ? (
                    <p className="mt-1 text-[13.5px] leading-6 text-jade">
                      <span className="font-medium">Hóa giải. </span>
                      {item.remedy}
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          </article>

          {marriage ? (
            <article className="paper-card rounded-2xl p-5 sm:p-6">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                <Sparkles className="size-4 text-accent" aria-hidden="true" />
                Năm cưới cho cô dâu
              </p>
              <p className="mt-1 text-[13px] text-muted-foreground">
                Tránh năm phạm Kim lâu (tính theo tuổi mụ cô dâu), Tam tai và năm xung tuổi.
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {wedding.map((item) => (
                  <li
                    key={item.year}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-center",
                      item.good ? "border-jade/30 bg-jade/10" : "border-border bg-muted/50",
                    )}
                  >
                    <p className="text-sm font-semibold text-ink">{item.year}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {item.label} · tuổi {item.age}
                    </p>
                    <p className={cn("mt-0.5 text-[12px] font-medium", item.good ? "text-jade" : "text-bronze")}>
                      {item.good ? "Năm đẹp" : item.notes.join(", ")}
                    </p>
                  </li>
                ))}
              </ul>
              {children.length ? (
                <div className="mt-4 border-t border-border/60 pt-3">
                  <p className="text-sm font-semibold text-ink">Năm sinh con hợp tuổi bố mẹ</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {children.map((item) => (
                      <li
                        key={item.year}
                        className={cn(
                          "rounded-full border px-3 py-1 text-[13px]",
                          item.both ? "border-jade/40 bg-jade/10 text-jade" : "border-border bg-card text-wood",
                        )}
                      >
                        {item.year} · {item.label}
                        {item.both ? " · hợp cả hai" : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </article>
          ) : null}

          {host ? (
            <article className="paper-card rounded-2xl p-5 sm:p-6">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                <Compass className="size-4 text-bronze" aria-hidden="true" />
                Hướng nhà theo cung {host.cung.name} của {host.label.toLowerCase()}
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {directions.map((item) => (
                  <li
                    key={item.star}
                    className={cn("rounded-xl px-3 py-2", item.good ? "bg-jade/10" : "bg-muted/50")}
                  >
                    <p className="flex justify-between gap-2 text-sm font-medium text-ink">
                      {item.direction}
                      <span className={item.good ? "text-jade" : "text-muted-foreground"}>{item.star}</span>
                    </p>
                    <p className="mt-0.5 text-[12.5px] leading-5 text-wood">{item.good ? item.meaning : item.use}</p>
                  </li>
                ))}
              </ul>
            </article>
          ) : null}

          <ResultActions title={`Xem tuổi ${result.a.canChi} và ${result.b.canChi}`} text={share} />
          <p className="text-xs leading-relaxed text-muted-foreground">
            Xem tuổi là quan niệm dân gian, mang tính tham khảo. Tình cảm chân thành và sự vun đắp của hai người quan trọng hơn mọi con số.
          </p>
        </div>
      ) : null}
    </div>
  );
}
