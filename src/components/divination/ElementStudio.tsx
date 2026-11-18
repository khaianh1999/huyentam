"use client";

import { useState, type FormEvent } from "react";
import {
  COLOR_BY_ELEMENT,
  getFengShuiProfile,
  NGU_HANH_ORDER,
  relation,
  tuongKhac,
  tuongSinh,
} from "@/lib/algorithms/feng-shui/ngu-hanh";
import { getCungPhi, getDirections, type Direction } from "@/lib/algorithms/feng-shui/cung-phi";
import { NGU_HANH_VI } from "@/lib/algorithms/calendar/constants";
import { relationLabel } from "@/lib/divination/labels";
import { parseBoundedInt } from "@/lib/divination/params";
import { getFengShuiGuide } from "@/data/feng-shui/guides";
import type { Gender, NguHanh } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/divination/Field";
import { cn } from "@/lib/utils";

const SWATCH: Record<string, string> = {
  Trắng: "#f5f5f4",
  Bạc: "#d4d4d8",
  "Vàng kim": "#e7d7a1",
  Xám: "#a8a29e",
  "Xanh lá": "#4d7c0f",
  "Xanh lục": "#166534",
  "Nâu gỗ": "#7c5a3a",
  Đen: "#1c1917",
  "Xanh dương": "#1d4ed8",
  "Xanh navy": "#1e3a8a",
  Đỏ: "#b91c1c",
  Cam: "#ea580c",
  Hồng: "#fb7185",
  Tím: "#7e22ce",
  "Vàng đất": "#d6b25e",
  Nâu: "#8a5a44",
  Be: "#e7d7c3",
  "Cam đất": "#c2410c",
};

/** Bố cục la bàn 3×3, ô giữa là tâm nhà. */
const COMPASS: (Direction | null)[] = ["Tây Bắc", "Bắc", "Đông Bắc", "Tây", null, "Đông", "Tây Nam", "Nam", "Đông Nam"];

const ORDER: NguHanh[] = ["Kim", "Thuy", "Moc", "Hoa", "Tho"];
const motherOf = (element: NguHanh) => ORDER[(ORDER.indexOf(element) + 4) % 5];

function Swatches({ colors }: { colors: string[] }) {
  return (
    <ul className="mt-2 flex flex-wrap gap-2">
      {colors.map((color) => (
        <li key={color} className="flex items-center gap-1.5 rounded-full border border-border bg-card py-1 pr-3 pl-1 text-[13px] text-ink">
          <span className="size-5 rounded-full border border-black/10" style={{ background: SWATCH[color] ?? "#e7d7c3" }} />
          {color}
        </li>
      ))}
    </ul>
  );
}

export function ElementStudio({ mode }: { mode: "ngu-hanh" | "mau-huong" | "nha-o" }) {
  const [year, setYear] = useState("1990");
  const [gender, setGender] = useState<Gender>("nam");
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState<{ year: number; gender: Gender } | null>(null);
  const [picked, setPicked] = useState<NguHanh | null>(null);
  const house = getFengShuiGuide("nha-o");

  const profile = input ? getFengShuiProfile(input.year) : null;
  const cung = input ? getCungPhi(input.year, input.gender) : null;
  const directions = cung ? getDirections(cung.name) : [];
  const byDirection = new Map(directions.map((item) => [item.direction, item]));

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const birthYear = parseBoundedInt(year, 1900, 2100);
    if (birthYear === null) {
      setError("Nhập năm sinh từ 1900 đến 2100.");
      setInput(null);
      return;
    }
    setError(null);
    setInput({ year: birthYear, gender });
    setPicked(null);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <form onSubmit={onSubmit} className="paper-card grid gap-4 rounded-2xl p-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end sm:p-6">
        <Field label="Năm sinh (âm lịch)" htmlFor="nam-menh">
          <Input id="nam-menh" inputMode="numeric" value={year} onChange={(event) => setYear(event.target.value)} />
        </Field>
        <fieldset>
          <legend className="text-sm font-medium text-wood">Giới tính</legend>
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
                  gender === key ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-wood",
                )}
              >
                <input type="radio" name="gioi-menh" checked={gender === key} onChange={() => setGender(key)} className="sr-only" />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
        <Button type="submit">Xem bản mệnh</Button>
        <p className="text-xs leading-relaxed text-muted-foreground sm:col-span-3">
          Sinh trước Tết Nguyên đán thì nhập năm trước. Giới tính dùng để tính cung phi Bát trạch, quyết định hướng tốt xấu.
        </p>
      </form>
      {error ? <p className="text-sm text-primary">{error}</p> : null}

      {profile && cung && input ? (
        <div className="space-y-4">
          <section className="lacquer relative overflow-hidden rounded-2xl border border-accent/30 p-6 text-[#fff8ec]">
            <div className="cloud-motif pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs tracking-[0.18em] text-accent uppercase">Bản mệnh</p>
                <p className="ink-heading mt-1 text-3xl">Mệnh {profile.label}</p>
                <p className="mt-1 text-sm text-[#f1e5cb]/85">{profile.napAm}</p>
                <p className="mt-2 text-[13.5px] text-[#f1e5cb]/75">
                  {NGU_HANH_VI[motherOf(profile.element)]} sinh {profile.label}, {profile.label} sinh {profile.sinh}, {profile.label} khắc{" "}
                  {profile.khac}.
                </p>
              </div>
              <div>
                <p className="text-xs tracking-[0.18em] text-accent uppercase">Cung phi</p>
                <p className="ink-heading mt-1 text-3xl">Cung {cung.name}</p>
                <p className="mt-1 text-sm text-[#f1e5cb]/85">
                  {cung.group} · hành {NGU_HANH_VI[cung.element]}
                </p>
                <p className="mt-2 text-[13.5px] text-[#f1e5cb]/75">
                  Hợp nhà hướng thuộc nhóm {cung.group === "Đông tứ mệnh" ? "Đông tứ trạch" : "Tây tứ trạch"}.
                </p>
              </div>
            </div>
          </section>

          {mode === "ngu-hanh" ? (
            <article className="paper-card rounded-2xl p-5 sm:p-6">
              <p className="text-sm font-semibold text-ink">Vòng ngũ hành</p>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {NGU_HANH_ORDER.map((element) => (
                  <button
                    key={element}
                    type="button"
                    className={cn(
                      "rounded-xl border px-2 py-3 text-sm",
                      profile.element === element ? "border-accent bg-accent/20 font-semibold" : "border-border bg-card",
                      picked === element && "ring-2 ring-primary",
                    )}
                    onClick={() => setPicked(element)}
                  >
                    {NGU_HANH_VI[element]}
                    <span className="mt-1 block text-[11px] text-muted-foreground">sinh {NGU_HANH_VI[tuongSinh(element)]}</span>
                  </button>
                ))}
              </div>
              <p className="mt-3 text-[14.5px] leading-6 text-wood">
                {picked
                  ? `${profile.label} đối với ${NGU_HANH_VI[picked]} là ${relationLabel(relation(profile.element, picked))}. ${NGU_HANH_VI[picked]} khắc ${NGU_HANH_VI[tuongKhac(picked)]}.`
                  : "Bấm một hành để xem quan hệ sinh khắc với mệnh của bạn."}
              </p>
            </article>
          ) : null}

          {mode !== "ngu-hanh" ? (
            <article className="paper-card rounded-2xl p-5 sm:p-6">
              <p className="text-sm font-semibold text-ink">Màu sắc hợp mệnh {profile.label}</p>
              <div className="mt-3 space-y-3">
                <div>
                  <p className="text-[13px] font-medium text-jade">Màu tương sinh (tốt nhất)</p>
                  <Swatches colors={COLOR_BY_ELEMENT[motherOf(profile.element)]} />
                </div>
                <div>
                  <p className="text-[13px] font-medium text-wood">Màu bản mệnh (hợp)</p>
                  <Swatches colors={COLOR_BY_ELEMENT[profile.element]} />
                </div>
                <div>
                  <p className="text-[13px] font-medium text-bronze">Màu nên hạn chế</p>
                  <Swatches colors={COLOR_BY_ELEMENT[ORDER.find((item) => tuongKhac(item) === profile.element) ?? profile.element]} />
                </div>
              </div>
            </article>
          ) : null}

          {mode !== "ngu-hanh" ? (
            <article className="paper-card rounded-2xl p-5 sm:p-6">
              <p className="text-sm font-semibold text-ink">Tám hướng theo cung {cung.name}</p>
              <div className="mx-auto mt-3 grid max-w-md grid-cols-3 gap-2">
                {COMPASS.map((dir, index) => {
                  if (!dir) {
                    return (
                      <div key={index} className="grid place-items-center rounded-xl bg-primary/10 p-2 text-center text-[12px] font-semibold text-primary">
                        Cung {cung.name}
                      </div>
                    );
                  }
                  const item = byDirection.get(dir);
                  return (
                    <div
                      key={dir}
                      className={cn("rounded-xl border p-2 text-center", item?.good ? "border-jade/30 bg-jade/10" : "border-border bg-muted/50")}
                    >
                      <p className="text-[13px] font-semibold text-ink">{dir}</p>
                      <p className={cn("text-[11.5px]", item?.good ? "text-jade" : "text-muted-foreground")}>{item?.star}</p>
                    </div>
                  );
                })}
              </div>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {directions.map((item) => (
                  <li key={item.star} className="text-[13.5px] leading-5 text-wood">
                    <span className={cn("font-semibold", item.good ? "text-jade" : "text-bronze")}>
                      {item.star} ({item.direction}).
                    </span>{" "}
                    {item.meaning} {item.use}
                  </li>
                ))}
              </ul>
            </article>
          ) : null}

          {mode === "nha-o" && house ? (
            <article className="paper-card rounded-2xl p-5 sm:p-6">
              <p className="text-sm font-semibold text-ink">Gợi ý cho nhà ở</p>
              <ul className="mt-2 space-y-1.5 text-[14.5px] leading-6 text-wood">
                <li>
                  Cửa chính nên quay về hướng {directions[0]?.direction} (Sinh Khí) hoặc {directions[2]?.direction} (Diên Niên).
                </li>
                <li>
                  Phòng ngủ vợ chồng hợp hướng {directions[2]?.direction}; phòng người lớn tuổi hợp hướng {directions[1]?.direction} (Thiên Y).
                </li>
                <li>
                  Bàn thờ, bàn học hợp hướng {directions[3]?.direction} (Phục Vị). Nhà vệ sinh, kho đặt ở hướng {directions[4]?.direction} (Tuyệt Mệnh).
                </li>
                <li>{house.byElement[profile.element]}</li>
              </ul>
            </article>
          ) : null}

          <p className="text-xs leading-relaxed text-muted-foreground">
            {profile.disclaimer} Hướng tính theo cung phi Bát trạch của người chủ nhà.
          </p>
        </div>
      ) : (
        <p className="text-center text-sm text-muted-foreground">Nhập năm sinh, chọn giới tính rồi bấm xem.</p>
      )}
    </div>
  );
}
