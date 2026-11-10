"use client";

import { useState } from "react";
import {
  CAREER_FIELDS,
  FORTUNE_CONCERNS,
  FORTUNE_SECTORS,
  readAgePair,
  readCareer,
  readFortune,
  readLove,
  readMarriage,
  readPhone,
  readPlate,
  readWealth,
  WEALTH_INTENTS,
  type CareerFieldId,
  type FortuneConcernId,
  type WealthIntentId,
} from "@/lib/algorithms/divination/folk";
import { ageRelationLabel } from "@/lib/divination/labels";
import { parseBoundedInt } from "@/lib/divination/params";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { ResultActions } from "@/components/shared/ResultActions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/divination/Field";
import { cn } from "@/lib/utils";

function FolkFoot({ text }: { text: string }) {
  return (
    <div className="space-y-3">
      <Badge variant="gold">Quan niệm dân gian</Badge>
      <Disclaimer type="quan-niem-dan-gian" />
      <ResultActions title="Bói toán dân gian" text={text} />
    </div>
  );
}

export function LoveStudio() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [reading, setReading] = useState<ReturnType<typeof readLove> | null>(null);

  return (
    <div className="space-y-8">
      <form
        className="grid items-end gap-4 md:grid-cols-[1fr_auto_1fr]"
        onSubmit={(event) => {
          event.preventDefault();
          if (left.trim().length < 2 || right.trim().length < 2) {
            setError("Viết đủ hai tên, mỗi tên ít nhất hai ký tự.");
            setReading(null);
            return;
          }
          setError(null);
          setReading(readLove(left, right));
        }}
      >
        <Field label="Người thứ nhất" htmlFor="ten-a">
          <Input id="ten-a" value={left} onChange={(event) => setLeft(event.target.value)} />
        </Field>
        <div className="hidden h-px w-16 bg-primary md:block" aria-hidden="true" />
        <Field label="Người thứ hai" htmlFor="ten-b">
          <Input id="ten-b" value={right} onChange={(event) => setRight(event.target.value)} />
        </Field>
        <div className="md:col-span-3">
          <Button type="submit">Se sợi duyên</Button>
          {error ? <p className="mt-2 text-sm text-primary">{error}</p> : null}
        </div>
      </form>
      {reading ? (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <article className="rounded-2xl border border-rose-300 bg-rose-50 p-5 text-center">
              <p className="text-xs text-rose-800">Một đầu sợi</p>
              <h2 className="ink-heading mt-2 text-2xl text-ink">{reading.nameA}</h2>
            </article>
            <div className="text-center">
              <p className="ink-heading text-4xl text-primary">{reading.score}</p>
              <p className="text-xs text-muted-foreground">chỉ số duyên · sợi {reading.thread}</p>
            </div>
            <article className="rounded-2xl border border-rose-300 bg-rose-50 p-5 text-center">
              <p className="text-xs text-rose-800">Đầu kia</p>
              <h2 className="ink-heading mt-2 text-2xl text-ink">{reading.nameB}</h2>
            </article>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <p className="rounded-xl bg-card p-4 text-sm leading-relaxed">{reading.bond}</p>
            <p className="rounded-xl bg-card p-4 text-sm leading-relaxed">{reading.spark}</p>
            <p className="rounded-xl bg-card p-4 text-sm leading-relaxed">{reading.household}</p>
          </div>
          <p className="text-sm text-wood">{reading.advice}</p>
          <FolkFoot text={`${reading.nameA} – ${reading.nameB}\n${reading.bond}\n${reading.disclaimer}`} />
        </div>
      ) : null}
    </div>
  );
}

export function CareerStudio() {
  const [name, setName] = useState("");
  const [year, setYear] = useState("1992");
  const [field, setField] = useState<CareerFieldId>("hoc-hanh");
  const [error, setError] = useState<string | null>(null);
  const [reading, setReading] = useState<ReturnType<typeof readCareer> | null>(null);

  return (
    <div className="space-y-8">
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          const birthYear = parseBoundedInt(year, 1900, 2100);
          if (name.trim().length < 2 || birthYear === null) {
            setError("Cần tên và năm sinh từ 1900 đến 2100.");
            setReading(null);
            return;
          }
          setError(null);
          setReading(readCareer(name, birthYear, field));
        }}
      >
        <Field label="Tên người đang hỏi" htmlFor="ten-danh">
          <Input id="ten-danh" value={name} onChange={(event) => setName(event.target.value)} />
        </Field>
        <Field label="Năm sinh" htmlFor="nam-danh">
          <Input id="nam-danh" inputMode="numeric" value={year} onChange={(event) => setYear(event.target.value)} />
        </Field>
        <fieldset>
          <legend className="text-sm font-medium text-wood">Ngả đang đứng</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {CAREER_FIELDS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm",
                  field === item.id ? "border-ink bg-ink text-paper" : "border-border bg-card",
                )}
                onClick={() => setField(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>
        {error ? <p className="text-sm text-primary">{error}</p> : null}
        <Button type="submit">Xem bậc đang đứng</Button>
      </form>
      {reading ? (
        <div className="space-y-4">
          <p className="text-sm text-wood">
            {reading.name}, năm {reading.birthYear}, bản mệnh {reading.elementLabel}, ngả {reading.fieldLabel}. Bậc được
            đánh dấu là bậc {reading.rung}.
          </p>
          <ol className="space-y-2">
            {reading.steps.map((step, index) => (
              <li
                key={step.title}
                className={cn(
                  "rounded-xl border px-4 py-3",
                  index + 1 === reading.rung ? "border-accent bg-accent/15" : "border-border bg-card/60",
                )}
              >
                <p className="text-sm text-ink">
                  Bậc {index + 1}. {step.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{step.note}</p>
              </li>
            ))}
          </ol>
          <p className="text-sm leading-relaxed">{reading.omen}</p>
          <p className="text-sm text-wood">{reading.caution}</p>
          <FolkFoot text={`${reading.name}\n${reading.omen}\n${reading.disclaimer}`} />
        </div>
      ) : null}
    </div>
  );
}

export function WealthStudio() {
  const [year, setYear] = useState("1988");
  const [intent, setIntent] = useState<WealthIntentId>("giu-cua");
  const [error, setError] = useState<string | null>(null);
  const [reading, setReading] = useState<ReturnType<typeof readWealth> | null>(null);

  return (
    <div className="space-y-8">
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          const birthYear = parseBoundedInt(year, 1900, 2100);
          if (birthYear === null) {
            setError("Nhập năm sinh từ 1900 đến 2100.");
            setReading(null);
            return;
          }
          setError(null);
          setReading(readWealth(birthYear, intent));
        }}
      >
        <Field label="Năm sinh" htmlFor="nam-loc">
          <Input id="nam-loc" inputMode="numeric" value={year} onChange={(event) => setYear(event.target.value)} />
        </Field>
        <div className="grid gap-3 sm:grid-cols-3">
          {WEALTH_INTENTS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={cn(
                "rounded-2xl border px-4 py-6 text-left",
                intent === item.id ? "border-accent bg-accent/20" : "border-border bg-card",
              )}
              onClick={() => setIntent(item.id)}
            >
              <span className="ink-heading text-xl text-ink">{item.label}</span>
            </button>
          ))}
        </div>
        {error ? <p className="text-sm text-primary">{error}</p> : null}
        <Button type="submit">Mở ba cửa</Button>
      </form>
      {reading ? (
        <div className="space-y-4">
          <p className="ink-heading text-center text-2xl text-ink">{reading.verse}</p>
          <p className="text-center text-sm text-muted-foreground">
            Năm {reading.birthYear} · mệnh {reading.elementLabel} · ý {reading.intentLabel}
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            {reading.doors.map((door) => (
              <article
                key={door.name}
                className={cn(
                  "min-h-40 rounded-t-3xl rounded-b-lg border-x-8 border-b-8 px-4 py-5",
                  door.open ? "border-jade bg-emerald-50" : "border-stone-500 bg-stone-200",
                )}
              >
                <h3 className="ink-heading text-xl">{door.name}</h3>
                <p className="mt-1 text-xs tracking-wide uppercase">{door.open ? "Hé" : "Khép"}</p>
                <p className="mt-3 text-sm leading-relaxed">{door.note}</p>
              </article>
            ))}
          </div>
          <p className="text-sm text-wood">{reading.advice}</p>
          <FolkFoot text={`${reading.verse}\n${reading.advice}\n${reading.disclaimer}`} />
        </div>
      ) : null}
    </div>
  );
}

export function FortuneWheel({ todayKey, todayLabel }: { todayKey: string; todayLabel: string }) {
  const [name, setName] = useState("");
  const [concern, setConcern] = useState<FortuneConcernId>("tam");
  const [error, setError] = useState<string | null>(null);
  const [reading, setReading] = useState<ReturnType<typeof readFortune> | null>(null);
  const rotation = reading ? 1080 - reading.sectorIndex * 45 : 0;

  return (
    <div className="space-y-8">
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (name.trim().length < 2) {
            setError("Viết tên để khóa vận trong ngày.");
            setReading(null);
            return;
          }
          setError(null);
          setReading(readFortune(name, concern, todayKey));
        }}
      >
        <p className="text-sm text-muted-foreground">Mốc ngày: {todayLabel}. Cùng tên, cùng mối bận tâm, cùng ngày thì cùng ô.</p>
        <Field label="Tên" htmlFor="ten-van">
          <Input id="ten-van" value={name} onChange={(event) => setName(event.target.value)} />
        </Field>
        <div className="flex flex-wrap gap-2">
          {FORTUNE_CONCERNS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm",
                concern === item.id ? "border-primary bg-primary text-primary-foreground" : "border-border",
              )}
              onClick={() => setConcern(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        {error ? <p className="text-sm text-primary">{error}</p> : null}
        <Button type="submit">Xoay bàn</Button>
      </form>
      <div className="relative mx-auto size-72">
        <span className="absolute top-0 left-1/2 z-10 -translate-x-1/2 text-primary" aria-hidden="true">
          ▼
        </span>
        <div
          className="absolute inset-6 rounded-full border-4 border-accent bg-[conic-gradient(#8b1e1e,#c9a227,#1a120b,#0f766e,#8b1e1e,#c9a227,#1a120b,#0f766e,#8b1e1e)] transition-transform duration-1000"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {FORTUNE_SECTORS.map((sector, index) => {
            const angle = index * 45 - 90;
            const rad = (angle * Math.PI) / 180;
            return (
              <span
                key={sector.name}
                className="absolute text-xs text-white"
                style={{
                  left: `calc(50% + ${Math.cos(rad) * 78}px)`,
                  top: `calc(50% + ${Math.sin(rad) * 78}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {sector.name}
              </span>
            );
          })}
        </div>
      </div>
      {reading ? (
        <div className="space-y-3 text-center">
          <h2 className="ink-heading text-3xl text-ink">Ô {reading.sector}</h2>
          <p className="text-sm text-wood">{reading.hint}</p>
          <p className="text-sm leading-relaxed">{reading.omen}</p>
          <p className="text-sm text-muted-foreground">{reading.caution}</p>
          <p className="text-xs text-muted-foreground">
            Tám ô chỉ mượn tên bát quái cho dễ nhớ, không phải lập cực nhà.
          </p>
          <FolkFoot text={`${reading.name} · ${reading.sector}\n${reading.omen}\n${reading.disclaimer}`} />
        </div>
      ) : null}
    </div>
  );
}

export function PhoneStudio() {
  const [raw, setRaw] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [reading, setReading] = useState<Exclude<ReturnType<typeof readPhone>, { error: string }> | null>(null);

  return (
    <div className="space-y-8">
      <form
        className="mx-auto max-w-sm space-y-4 rounded-[2rem] border-8 border-ink bg-ink p-4 text-paper"
        onSubmit={(event) => {
          event.preventDefault();
          const next = readPhone(raw);
          if ("error" in next) {
            setError(next.error);
            setReading(null);
            return;
          }
          setError(null);
          setReading(next);
        }}
      >
        <p className="text-center text-xs tracking-[0.2em] text-amber-200 uppercase">Máy</p>
        <Input
          id="so-may"
          aria-label="Số điện thoại"
          inputMode="tel"
          value={raw}
          onChange={(event) => setRaw(event.target.value)}
          placeholder="0901234567"
          className="bg-paper text-center text-lg text-ink"
        />
        <Button type="submit" variant="gold" className="w-full">
          Luận dãy số
        </Button>
      </form>
      {error ? <p className="text-center text-sm text-primary">{error}</p> : null}
      {reading ? (
        <div className="space-y-4">
          <p className="text-center font-mono text-2xl tracking-widest text-ink">{reading.display}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {reading.digits.split("").map((digit, index) => (
              <span key={`${digit}-${index}`} className="grid size-10 place-items-center rounded-lg bg-secondary text-secondary-foreground">
                {digit}
              </span>
            ))}
          </div>
          <p className="text-sm text-center text-wood">
            Tổng {reading.sum}, rút còn {reading.reduced}, quy ước hành {reading.elementLabel}, mức {reading.tone}.
          </p>
          <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            {reading.marks.map((mark) => (
              <li key={mark}>{mark}</li>
            ))}
          </ul>
          <p className="text-sm">{reading.reading}</p>
          <p className="text-sm text-wood">{reading.advice}</p>
          <FolkFoot text={`${reading.display}\n${reading.reading}\n${reading.disclaimer}`} />
        </div>
      ) : null}
    </div>
  );
}

export function PlateStudio() {
  const [raw, setRaw] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [reading, setReading] = useState<Exclude<ReturnType<typeof readPlate>, { error: string }> | null>(null);

  return (
    <div className="space-y-8">
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          const next = readPlate(raw);
          if ("error" in next) {
            setError(next.error);
            setReading(null);
            return;
          }
          setError(null);
          setReading(next);
        }}
      >
        <label className="mx-auto block max-w-md rounded-xl border-4 border-ink bg-amber-50 px-4 py-6 text-center">
          <span className="text-xs tracking-[0.25em] text-bronze uppercase">Biển số</span>
          <input
            value={raw}
            onChange={(event) => setRaw(event.target.value.toUpperCase())}
            placeholder="51A-123.45"
            className="mt-2 w-full bg-transparent text-center font-mono text-3xl text-ink outline-none"
            aria-label="Biển số xe"
          />
        </label>
        {error ? <p className="text-center text-sm text-primary">{error}</p> : null}
        <div className="text-center">
          <Button type="submit">Xem biển</Button>
        </div>
      </form>
      {reading ? (
        <div className="space-y-3">
          <p className="text-center font-mono text-3xl text-ink">{reading.plate}</p>
          <p className="text-center text-sm text-wood">
            Chữ {reading.letters} · số {reading.digits} · hành {reading.elementLabel} · mức {reading.tone}
          </p>
          <ul className="space-y-2 text-sm leading-relaxed">
            {reading.marks.map((mark) => (
              <li key={mark}>{mark}</li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground">{reading.reading}</p>
          <FolkFoot text={`${reading.plate}\n${reading.reading}\n${reading.disclaimer}`} />
        </div>
      ) : null}
    </div>
  );
}

export function AgeStudio() {
  const [yearA, setYearA] = useState("1990");
  const [yearB, setYearB] = useState("1992");
  const [error, setError] = useState<string | null>(null);
  const [reading, setReading] = useState<ReturnType<typeof readAgePair> | null>(null);

  return (
    <div className="space-y-8">
      <form
        className="grid gap-4 sm:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          const a = parseBoundedInt(yearA, 1900, 2100);
          const b = parseBoundedInt(yearB, 1900, 2100);
          if (a === null || b === null) {
            setError("Cả hai năm cần từ 1900 đến 2100.");
            setReading(null);
            return;
          }
          setError(null);
          setReading(readAgePair(a, b));
        }}
      >
        <Field label="Năm sinh người thứ nhất" htmlFor="nam-a">
          <Input id="nam-a" inputMode="numeric" value={yearA} onChange={(event) => setYearA(event.target.value)} />
        </Field>
        <Field label="Năm sinh người thứ hai" htmlFor="nam-b">
          <Input id="nam-b" inputMode="numeric" value={yearB} onChange={(event) => setYearB(event.target.value)} />
        </Field>
        <div className="sm:col-span-2">
          {error ? <p className="mb-2 text-sm text-primary">{error}</p> : null}
          <Button type="submit">Đối chiếu tuổi</Button>
        </div>
      </form>
      {reading ? (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <article className="paper-card rounded-xl p-5">
              <p className="text-xs text-bronze">{reading.yearA}</p>
              <h2 className="ink-heading text-3xl">{reading.first.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">Tam hợp: {reading.first.tamHop.join(", ")}</p>
              <p className="text-sm text-muted-foreground">Tứ hành xung: {reading.first.tuHanhXung.join(", ")}</p>
            </article>
            <div className="text-center">
              <Badge variant="gold">{ageRelationLabel(reading.relation)}</Badge>
            </div>
            <article className="paper-card rounded-xl p-5">
              <p className="text-xs text-bronze">{reading.yearB}</p>
              <h2 className="ink-heading text-3xl">{reading.second.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">Lục hợp: {reading.second.hop.join(", ")}</p>
              <p className="text-sm text-muted-foreground">Lục xung: {reading.second.khac.join(", ")}</p>
            </article>
          </div>
          <h3 className="ink-heading text-2xl text-ink">{reading.headline}</h3>
          <ul className="grid gap-2 text-sm sm:grid-cols-2">
            <li className="rounded-lg bg-card px-3 py-2">Tam hợp: {reading.tamHop ? "Có" : "Không"}</li>
            <li className="rounded-lg bg-card px-3 py-2">Lục hợp: {reading.lucHop ? "Có" : "Không"}</li>
            <li className="rounded-lg bg-card px-3 py-2">Tứ hành xung: {reading.tuHanhXung ? "Có" : "Không"}</li>
            <li className="rounded-lg bg-card px-3 py-2">Lục xung: {reading.lucXung ? "Có" : "Không"}</li>
          </ul>
          <p className="text-sm leading-relaxed">{reading.note}</p>
          <p className="text-sm text-wood">Nên: {reading.nen}</p>
          <p className="text-sm text-wood">Không nên: {reading.ne}</p>
          <p className="text-xs text-muted-foreground">
            Ngũ hành ghi theo địa chi, không phải nạp âm từng năm. Người sinh trước Tết thuộc tuổi của năm âm trước.
          </p>
          <FolkFoot text={`${reading.headline}\n${reading.note}\n${reading.disclaimer}`} />
        </div>
      ) : null}
    </div>
  );
}

export function MarriageStudio() {
  const [husband, setHusband] = useState("1986");
  const [wife, setWife] = useState("1988");
  const [error, setError] = useState<string | null>(null);
  const [reading, setReading] = useState<ReturnType<typeof readMarriage> | null>(null);

  return (
    <div className="space-y-8">
      <form
        className="mx-auto max-w-xl space-y-4 rounded-3xl border border-rose-300 bg-rose-50/70 p-6"
        onSubmit={(event) => {
          event.preventDefault();
          const husbandYear = parseBoundedInt(husband, 1900, 2100);
          const wifeYear = parseBoundedInt(wife, 1900, 2100);
          if (husbandYear === null || wifeYear === null) {
            setError("Nhập năm sinh của cả hai, từ 1900 đến 2100.");
            setReading(null);
            return;
          }
          setError(null);
          setReading(readMarriage(husbandYear, wifeYear));
        }}
      >
        <p className="text-center font-serif text-4xl text-primary" aria-hidden="true">
          囍
        </p>
        <Field label="Năm sinh chồng" htmlFor="nam-chong">
          <Input id="nam-chong" inputMode="numeric" value={husband} onChange={(event) => setHusband(event.target.value)} />
        </Field>
        <Field label="Năm sinh vợ" htmlFor="nam-vo">
          <Input id="nam-vo" inputMode="numeric" value={wife} onChange={(event) => setWife(event.target.value)} />
        </Field>
        {error ? <p className="text-sm text-primary">{error}</p> : null}
        <Button type="submit">Xem tuổi vợ chồng</Button>
      </form>
      {reading ? (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-xl bg-card p-5">
              <p className="text-xs text-bronze">Chồng · {reading.husbandYear}</p>
              <h2 className="ink-heading text-3xl">Tuổi {reading.husbandAnimal}</h2>
              <p className="mt-2 text-sm">Bản mệnh {reading.husbandMenh}</p>
            </article>
            <article className="rounded-xl bg-card p-5">
              <p className="text-xs text-bronze">Vợ · {reading.wifeYear}</p>
              <h2 className="ink-heading text-3xl">Tuổi {reading.wifeAnimal}</h2>
              <p className="mt-2 text-sm">Bản mệnh {reading.wifeMenh}</p>
            </article>
          </div>
          <p className="text-sm text-wood">
            Tuổi: {ageRelationLabel(reading.relation)}. Tam hợp {reading.tamHop ? "có" : "không"}, lục hợp{" "}
            {reading.lucHop ? "có" : "không"}, tứ hành xung {reading.tuHanhXung ? "có" : "không"}, lục xung{" "}
            {reading.lucXung ? "có" : "không"}.
          </p>
          <p className="text-sm leading-relaxed">Ngũ hành bản mệnh: {reading.hanhLabel}.</p>
          <p className="text-sm leading-relaxed">{reading.household}</p>
          <p className="text-sm leading-relaxed">{reading.kin}</p>
          <p className="text-sm text-wood">{reading.advice}</p>
          <FolkFoot text={`${reading.husbandAnimal} và ${reading.wifeAnimal}\n${reading.hanhLabel}\n${reading.disclaimer}`} />
        </div>
      ) : null}
    </div>
  );
}
