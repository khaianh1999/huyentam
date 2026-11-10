"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import {
  buildTuViNam,
  buildTuViNgay,
  buildTuViTronDoi,
} from "@/lib/algorithms/astrology/tu-vi";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Field } from "@/components/divination/Field";
import { TuViDayView, TuViLifeView, TuViYearView } from "@/components/divination/TuViPanels";
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
  const [tab, setTab] = useState("tron-doi");
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

  const cheDo: CheDoTuVi =
    mode === "ngay" ? "ngay" : mode === "nam" ? "nam" : mode === "thang" ? "thang" : tab === "nam" ? "nam" : "tron-doi";

  const life = useMemo(() => (profile ? buildTuViTronDoi(profile) : null), [profile]);
  const yearNumber = parseBoundedInt(viewYear, 1900, 2200);
  const monthNumber = parseBoundedInt(viewMonth, 1, 12);
  const dayNumber = parseBoundedInt(viewDay, 1, 31);
  const yearView = useMemo(() => {
    if (!profile || yearNumber === null) return null;
    if (cheDo === "ngay") return null;
    return buildTuViNam(profile, yearNumber);
  }, [profile, yearNumber, cheDo]);
  const dayView = useMemo(() => {
    if (!profile || cheDo !== "ngay" || yearNumber === null || monthNumber === null || dayNumber === null) {
      return null;
    }
    if (!isRealDate(yearNumber, monthNumber, dayNumber)) return null;
    return buildTuViNgay(profile, { year: yearNumber, month: monthNumber, day: dayNumber });
  }, [profile, cheDo, yearNumber, monthNumber, dayNumber]);

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

  const shareText = life
    ? `${life.profile.fullName}\n${life.overview}\n${life.career}\n${life.disclaimer}`
    : "";

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
          <Button type="submit">Lập luận giải</Button>
        </div>

        <aside className="rounded-xl border border-accent/25 bg-gradient-to-b from-[#f8efd4]/80 to-[#fffaf2] p-4 lg:mt-1">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-bronze uppercase">
            Cách đọc
          </p>
          <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-wood">
            <li>Can chi lấy từ ngày giờ sinh theo lịch pháp.</li>
            <li>Phần cung mệnh là khung tham khảo, chưa phải lá số Đẩu Số đủ chính tinh.</li>
            <li>Phân biệt rõ tử vi phương Đông với cung hoàng đạo phương Tây.</li>
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Kết quả mang tính tham khảo văn hóa, không thay quyết định thực tế.
          </p>
        </aside>
      </form>

      {pending ? <LoadingYinYang label="Đang đối chiếu ngày giờ sinh…" /> : null}

      {profile && life && !pending ? (
        <div className="space-y-6">
          {href ? (
            <Button asChild variant="outline">
              <Link href={href}>Mở trang kết quả</Link>
            </Button>
          ) : null}
          {mode === "studio" ? (
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList>
                <TabsTrigger value="tron-doi">Trọn đời</TabsTrigger>
                <TabsTrigger value="nam">Theo năm</TabsTrigger>
              </TabsList>
              <TabsContent value="tron-doi">
                <TuViLifeView data={life} shareText={shareText} />
              </TabsContent>
              <TabsContent value="nam">
                <div className="mb-4 max-w-xs">
                  <Field label="Đổi năm xem" htmlFor="doi-nam">
                    <Input
                      id="doi-nam"
                      inputMode="numeric"
                      value={viewYear}
                      onChange={(event) => setViewYear(event.target.value)}
                    />
                  </Field>
                </div>
                {yearView ? (
                  <TuViYearView data={yearView} selectedMonth={pickedMonth} onSelectMonth={setPickedMonth} />
                ) : (
                  <p className="text-sm text-primary">Năm xem cần từ 1900 đến 2200.</p>
                )}
              </TabsContent>
            </Tabs>
          ) : null}
          {mode === "nam" && yearView ? (
            <TuViYearView data={yearView} selectedMonth={pickedMonth} onSelectMonth={setPickedMonth} />
          ) : null}
          {mode === "nam" && !yearView ? <p className="text-sm text-primary">Năm xem cần từ 1900 đến 2200.</p> : null}
          {mode === "thang" && yearView ? (
            <TuViYearView
              data={yearView}
              selectedMonth={pickedMonth ?? monthNumber}
              onSelectMonth={setPickedMonth}
            />
          ) : null}
          {mode === "thang" && !yearView ? <p className="text-sm text-primary">Năm xem cần từ 1900 đến 2200.</p> : null}
          {mode === "ngay" && dayView ? <TuViDayView data={dayView} /> : null}
          {mode === "ngay" && !dayView ? (
            <p className="text-sm text-primary">Ngày muốn xem không có thật.</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
