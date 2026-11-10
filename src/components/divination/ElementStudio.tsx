"use client";

import { useState, type FormEvent } from "react";
import {
  getFengShuiProfile,
  NGU_HANH_ORDER,
  relation,
  tuongKhac,
  tuongSinh,
} from "@/lib/algorithms/feng-shui/ngu-hanh";
import { NGU_HANH_VI } from "@/lib/algorithms/calendar/constants";
import { relationLabel } from "@/lib/divination/labels";
import { parseBoundedInt } from "@/lib/divination/params";
import { getFengShuiGuide } from "@/data/feng-shui/guides";
import type { NguHanh } from "@/types";
import { Disclaimer } from "@/components/shared/Disclaimer";
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

const DIRS = ["Bắc", "Đông Bắc", "Đông", "Đông Nam", "Nam", "Tây Nam", "Tây", "Tây Bắc"] as const;

export function ElementStudio({ mode }: { mode: "ngu-hanh" | "mau-huong" | "nha-o" }) {
  const [year, setYear] = useState("1990");
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<ReturnType<typeof getFengShuiProfile> | null>(null);
  const [picked, setPicked] = useState<NguHanh | null>(null);
  const [direction, setDirection] = useState<string | null>(null);
  const house = getFengShuiGuide("nha-o");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const birthYear = parseBoundedInt(year, 1900, 2100);
    if (birthYear === null) {
      setError("Nhập năm sinh từ 1900 đến 2100.");
      setProfile(null);
      return;
    }
    setError(null);
    setProfile(getFengShuiProfile(birthYear));
    setPicked(null);
    setDirection(null);
  }

  return (
    <div className="space-y-8">
      <form onSubmit={onSubmit} className="flex flex-wrap items-end gap-3">
        <div className="min-w-40 flex-1">
          <Field label="Năm sinh" htmlFor="nam-menh">
            <Input id="nam-menh" inputMode="numeric" value={year} onChange={(event) => setYear(event.target.value)} />
          </Field>
        </div>
        <Button type="submit">Xem bản mệnh</Button>
      </form>
      {error ? <p className="text-sm text-primary">{error}</p> : null}
      {profile ? (
        <div className="space-y-6">
          <div className="paper-card gold-border rounded-xl p-5">
            <p className="text-xs tracking-[0.16em] text-bronze uppercase">{profile.canChi}</p>
            <h2 className="ink-heading mt-2 text-3xl text-ink">Mệnh {profile.label}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tương sinh tới {profile.sinh}. Tương khắc tới {profile.khac}.
            </p>
          </div>

          {mode === "ngu-hanh" ? (
            <div className="grid gap-3 sm:grid-cols-5">
              {NGU_HANH_ORDER.map((element) => (
                <button
                  key={element}
                  type="button"
                  className={cn(
                    "rounded-xl border px-3 py-4 text-sm",
                    profile.element === element ? "border-accent bg-accent/20" : "border-border bg-card",
                    picked === element && "ring-2 ring-primary",
                  )}
                  onClick={() => setPicked(element)}
                >
                  {NGU_HANH_VI[element]}
                  <span className="mt-1 block text-xs text-muted-foreground">
                    sinh {NGU_HANH_VI[tuongSinh(element)]}
                  </span>
                </button>
              ))}
            </div>
          ) : null}

          {picked && mode === "ngu-hanh" ? (
            <p className="text-sm leading-relaxed text-wood">
              {NGU_HANH_VI[profile.element]} đối với {NGU_HANH_VI[picked]} là{" "}
              {relationLabel(relation(profile.element, picked))}. Hành này khắc {NGU_HANH_VI[tuongKhac(picked)]}.
            </p>
          ) : null}

          {mode === "mau-huong" ? (
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="ink-heading text-xl">Màu</h3>
                <div className="mt-3 flex flex-wrap gap-3">
                  {profile.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className="w-28 rounded-xl border border-border bg-card p-3 text-left text-sm"
                      onClick={() => setDirection(color)}
                    >
                      <span className="mb-2 block h-10 rounded-md border" style={{ background: SWATCH[color] ?? "#e7d7c3" }} />
                      {color}
                    </button>
                  ))}
                </div>
                {direction && profile.colors.includes(direction) ? (
                  <p className="mt-3 text-sm text-wood">
                    {direction} nằm trong nhóm màu hợp mệnh {profile.label} theo quy ước trang này.
                  </p>
                ) : null}
              </div>
              <div>
                <h3 className="ink-heading text-xl">Hướng</h3>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {DIRS.map((item) => {
                    const lucky = profile.directions.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        className={cn(
                          "rounded-lg border px-2 py-3 text-sm",
                          lucky ? "border-accent bg-accent/15" : "border-border",
                          direction === item && "ring-2 ring-primary",
                        )}
                        onClick={() => setDirection(item)}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
                {direction && DIRS.includes(direction as (typeof DIRS)[number]) ? (
                  <p className="mt-3 text-sm text-wood">
                    {profile.directions.includes(direction)
                      ? `${direction} thuộc nhóm hướng được kể là hợp mệnh ${profile.label}.`
                      : `${direction} không nằm trong nhóm hướng hợp mệnh theo quy ước đang dùng. Nhà vẫn dùng được nếu cửa sáng và lối thông.`}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}

          {mode === "nha-o" && house ? (
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-wood">{house.byElement[profile.element]}</p>
              <p className="text-sm text-muted-foreground">
                Số được nhắc theo mệnh: {profile.numbers.join(", ")}. Hướng: {profile.directions.join(", ")}. Màu:{" "}
                {profile.colors.join(", ")}.
              </p>
            </div>
          ) : null}

          <Disclaimer type="quan-niem-dan-gian" />
          <p className="text-xs leading-relaxed text-muted-foreground">{profile.disclaimer}</p>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Nhập năm sinh rồi bấm xem. Các ô màu và hướng mở sau khi có bản mệnh.</p>
      )}
    </div>
  );
}
