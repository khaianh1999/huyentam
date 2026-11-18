"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { buildLaSo } from "@/lib/algorithms/astrology/la-so";
import {
  BIRTH_HOURS,
  isRealDate,
  parseBoundedInt,
  tuViResultHref,
  type CheDoTuVi,
} from "@/lib/divination/params";
import type { VnDate } from "@/lib/divination/vn-date";
import type { Gender, TuViProfile } from "@/types";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Field } from "@/components/divination/Field";
import { LaSoView, LuuNhatPanel, LuuNienPanel } from "@/components/divination/LaSoView";
import { cn } from "@/lib/utils";

type Mode = "studio" | "ngay" | "nam" | "thang";

export function TuViStudio({ mode, today }: { mode: Mode; today: VnDate }) {
  const reduceMotion = useReducedMotion();
  const [name, setName] = useState("");
  const [year, setYear] = useState(String(today.year - 30));
  const [month, setMonth] = useState("6");
  const [day, setDay] = useState("15");
  const [hour, setHour] = useState("8");
  const [gender, setGender] = useState<Gender | "">("");
  const [viewYear, setViewYear] = useState(String(today.year));
  const [viewMonth, setViewMonth] = useState(String(today.month));
  const [viewDay, setViewDay] = useState(String(today.day));
  const [pickedMonth, setPickedMonth] = useState<number | null>(mode === "thang" ? today.month : null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [profile, setProfile] = useState<TuViProfile | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const cheDo: CheDoTuVi = mode === "ngay" ? "ngay" : mode === "nam" ? "nam" : mode === "thang" ? "thang" : "tron-doi";

  const chart = useMemo(() => (profile ? buildLaSo(profile) : null), [profile]);
  const yearNumber = parseBoundedInt(viewYear, 1900, 2200);
  const monthNumber = parseBoundedInt(viewMonth, 1, 12);
  const dayNumber = parseBoundedInt(viewDay, 1, 31);
  const viewDate =
    yearNumber !== null && monthNumber !== null && dayNumber !== null && isRealDate(yearNumber, monthNumber, dayNumber)
      ? { year: yearNumber, month: monthNumber, day: dayNumber }
      : null;

  function readProfile(): TuViProfile | null {
    const fullName = name.trim();
    const birthYear = parseBoundedInt(year, 1900, 2100);
    const birthMonth = parseBoundedInt(month, 1, 12);
    const birthDay = parseBoundedInt(day, 1, 31);
    const birthHour = parseBoundedInt(hour, 0, 23);
    if (fullName.length < 2) {
      setError("Nhập họ tên, ít nhất hai ký tự.");
      return null;
    }
    if (birthYear === null || birthMonth === null || birthDay === null || birthHour === null) {
      setError("Ngày sinh hoặc giờ sinh chưa đúng.");
      return null;
    }
    if (!isRealDate(birthYear, birthMonth, birthDay)) {
      setError("Ngày dương lịch không có thật.");
      return null;
    }
    if (gender !== "nam" && gender !== "nu") {
      setError("Chọn giới tính để lập lá số.");
      return null;
    }
    if (yearNumber === null || (cheDo !== "tron-doi" && monthNumber === null)) {
      setError("Năm hoặc tháng muốn xem chưa đúng.");
      return null;
    }
    if (cheDo === "ngay" && (dayNumber === null || monthNumber === null || !isRealDate(yearNumber, monthNumber, dayNumber))) {
      setError("Ngày muốn xem không có thật.");
      return null;
    }
    setError(null);
    return {
      fullName,
      birth: { year: birthYear, month: birthMonth, day: birthDay },
      birthHour,
      gender,
    };
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const next = readProfile();
    if (!next) {
      setProfile(null);
      return;
    }
    setPending(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setProfile(next);
      if (cheDo === "thang" && monthNumber) setPickedMonth(monthNumber);
      setPending(false);
    }, reduceMotion ? 0 : 650);
  }

  const href = profile
    ? tuViResultHref(profile, {
        cheDo,
        namXem: yearNumber ?? undefined,
        thangXem: monthNumber ?? undefined,
        ngayXem: cheDo === "ngay" ? (dayNumber ?? undefined) : undefined,
      })
    : null;

  return (
    <div className="space-y-8">
      <form
        onSubmit={onSubmit}
        className="grid gap-6 rounded-2xl border border-accent/35 bg-[#fffaf2] p-5 shadow-[0_12px_36px_rgba(26,18,11,0.07)] lg:grid-cols-[1.35fr_1fr] sm:p-6"
      >
        <div className="space-y-4">
          <Field label="Họ và tên" htmlFor="tu-vi-ten">
            <Input id="tu-vi-ten" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Năm" htmlFor="tu-vi-nam">
              <Input id="tu-vi-nam" inputMode="numeric" value={year} onChange={(event) => setYear(event.target.value)} />
            </Field>
            <Field label="Tháng" htmlFor="tu-vi-thang">
              <Input id="tu-vi-thang" inputMode="numeric" value={month} onChange={(event) => setMonth(event.target.value)} />
            </Field>
            <Field label="Ngày" htmlFor="tu-vi-ngay">
              <Input id="tu-vi-ngay" inputMode="numeric" value={day} onChange={(event) => setDay(event.target.value)} />
            </Field>
          </div>
          <Field label="Giờ sinh" htmlFor="tu-vi-gio" hint="Giờ 24h — chi giờ đi kèm để đối chiếu.">
            <Select id="tu-vi-gio" value={hour} onChange={(event) => setHour(event.target.value)}>
              {BIRTH_HOURS.map((item) => (
                <option key={item.hour} value={item.hour}>
                  {item.label}
                </option>
              ))}
            </Select>
          </Field>
          <fieldset>
            <legend className="text-sm font-medium text-wood">Giới tính</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(
                [
                  ["nam", "Nam"],
                  ["nu", "Nữ"],
                ] as const
              ).map(([value, label]) => (
                <label
                  key={value}
                  className={cn(
                    "cursor-pointer rounded-xl border px-4 py-2.5 text-center text-sm transition",
                    gender === value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-white/50 text-wood hover:border-accent",
                  )}
                >
                  <input
                    type="radio"
                    name="gioi"
                    value={value}
                    checked={gender === value}
                    onChange={() => setGender(value)}
                    className="sr-only"
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
          {cheDo !== "tron-doi" ? (
            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="Năm muốn xem" htmlFor="tu-vi-nam-xem">
                <Input id="tu-vi-nam-xem" inputMode="numeric" value={viewYear} onChange={(event) => setViewYear(event.target.value)} />
              </Field>
              {cheDo === "thang" || cheDo === "ngay" ? (
                <Field label="Tháng muốn xem" htmlFor="tu-vi-thang-xem">
                  <Input
                    id="tu-vi-thang-xem"
                    inputMode="numeric"
                    value={viewMonth}
                    onChange={(event) => setViewMonth(event.target.value)}
                  />
                </Field>
              ) : null}
              {cheDo === "ngay" ? (
                <Field label="Ngày muốn xem" htmlFor="tu-vi-ngay-xem">
                  <Input
                    id="tu-vi-ngay-xem"
                    inputMode="numeric"
                    value={viewDay}
                    onChange={(event) => setViewDay(event.target.value)}
                  />
                </Field>
              ) : null}
            </div>
          ) : null}
          {error ? (
            <p className="text-sm text-primary" role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit">Lập lá số</Button>
        </div>

        <aside className="rounded-xl border border-accent/25 bg-gradient-to-b from-[#f8efd4]/80 to-[#fffaf2] p-4 lg:mt-1">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-bronze uppercase">
            Cách đọc
          </p>
          <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-wood">
            <li>Nhập ngày dương lịch, trang tự đổi sang âm lịch để an sao.</li>
            <li>Lá số có đủ 12 cung, 14 chính tinh, hơn 90 phụ tinh và Tứ Hóa.</li>
            <li>Giờ sinh càng đúng thì lá số càng chuẩn. Sinh sau 23 giờ được tính sang ngày hôm sau.</li>
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Lời luận mang tính giải trí và tham khảo văn hóa.
          </p>
        </aside>
      </form>

      {pending ? <LoadingYinYang label="Đang an sao…" /> : null}

      {profile && chart && !pending ? (
        <div className="space-y-4">
          {href ? (
            <div className="text-center">
              <Button asChild variant="outline" size="sm">
                <Link href={href}>Mở trang kết quả để lưu hoặc chia sẻ</Link>
              </Button>
            </div>
          ) : null}
          {mode === "studio" ? <LaSoView chart={chart} /> : null}
          {(mode === "nam" || mode === "thang") && yearNumber !== null ? (
            <div className="mx-auto max-w-4xl">
              <LuuNienPanel
                chart={chart}
                year={yearNumber}
                selectedMonth={mode === "thang" ? (pickedMonth ?? monthNumber) : null}
              />
            </div>
          ) : null}
          {(mode === "nam" || mode === "thang") && yearNumber === null ? (
            <p className="text-sm text-primary">Năm xem cần từ 1900 đến 2200.</p>
          ) : null}
          {mode === "ngay" && viewDate ? (
            <div className="mx-auto max-w-4xl">
              <LuuNhatPanel chart={chart} date={viewDate} />
            </div>
          ) : null}
          {mode === "ngay" && !viewDate ? <p className="text-sm text-primary">Ngày muốn xem không có thật.</p> : null}
        </div>
      ) : null}
    </div>
  );
}
