"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { analyzeName } from "@/lib/algorithms/numerology/name";
import { isRealDate, nameResultHref, parseBoundedInt } from "@/lib/divination/params";
import type { Gender } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/divination/Field";
import { NameNumbers } from "@/components/divination/NameNumbers";
import { cn } from "@/lib/utils";

export function NameForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [year, setYear] = useState("1996");
  const [month, setMonth] = useState("6");
  const [day, setDay] = useState("15");
  const [gender, setGender] = useState<Gender | "">("");
  const [error, setError] = useState<string | null>(null);

  const parsed = useMemo(() => {
    const fullName = name.trim();
    const birthYear = parseBoundedInt(year, 1900, 2100);
    const birthMonth = parseBoundedInt(month, 1, 12);
    const birthDay = parseBoundedInt(day, 1, 31);
    if (fullName.length < 2 || birthYear === null || birthMonth === null || birthDay === null) return null;
    if (!isRealDate(birthYear, birthMonth, birthDay)) return null;
    if (gender !== "nam" && gender !== "nu") return null;
    return { fullName, year: birthYear, month: birthMonth, day: birthDay, gender };
  }, [name, year, month, day, gender]);

  const result = parsed
    ? analyzeName(parsed.fullName, { year: parsed.year, month: parsed.month, day: parsed.day }, parsed.gender)
    : null;
  const href = parsed ? nameResultHref(parsed) : null;

  return (
    <div className="space-y-8">
      <form
        className="grid gap-4 rounded-2xl border border-accent/35 bg-[#fffaf2] p-5 shadow-[0_12px_36px_rgba(26,18,11,0.07)] sm:grid-cols-2 lg:grid-cols-4 sm:p-6"
        onSubmit={(event) => {
          event.preventDefault();
          if (!href) {
            setError("Điền đủ tên, ngày sinh có thật và giới tính trước khi mở trang kết quả.");
            return;
          }
          setError(null);
          router.push(href);
        }}
      >
        <div className="sm:col-span-2 lg:col-span-4">
          <Field label="Họ và tên" htmlFor="boi-ten-ten" hint="Gõ tên để các thẻ số cập nhật ngay khi đủ ngày sinh và giới tính.">
            <Input id="boi-ten-ten" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
          </Field>
        </div>
        <Field label="Năm sinh" htmlFor="boi-ten-nam">
          <Input id="boi-ten-nam" inputMode="numeric" value={year} onChange={(event) => setYear(event.target.value)} />
        </Field>
        <Field label="Tháng" htmlFor="boi-ten-thang">
          <Input id="boi-ten-thang" inputMode="numeric" value={month} onChange={(event) => setMonth(event.target.value)} />
        </Field>
        <Field label="Ngày" htmlFor="boi-ten-ngay">
          <Input id="boi-ten-ngay" inputMode="numeric" value={day} onChange={(event) => setDay(event.target.value)} />
        </Field>
        <fieldset className="sm:col-span-2 lg:col-span-4">
          <legend className="text-sm font-medium text-wood">Giới tính</legend>
          <div className="mt-2 flex gap-2">
            {(
              [
                ["nam", "Nam"],
                ["nu", "Nữ"],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 text-sm",
                  gender === value ? "border-primary bg-primary text-primary-foreground" : "border-border",
                )}
              >
                <input
                  className="sr-only"
                  type="radio"
                  name="gioi-ten"
                  value={value}
                  checked={gender === value}
                  onChange={() => setGender(value)}
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
        {error ? (
          <p className="text-sm text-primary sm:col-span-2" role="alert">
            {error}
          </p>
        ) : null}
        <div className="sm:col-span-2">
          <Button type="submit">Mở trang kết quả</Button>
          {!href ? (
            <p className="mt-2 text-xs text-muted-foreground">
              Điền đủ tên, ngày dương lịch có thật và giới tính để mở trang kết quả. Các thẻ số hiện ngay khi đủ.
            </p>
          ) : null}
        </div>
      </form>
      {result && href ? <NameNumbers result={result} shareHref={href} /> : null}
      {name.trim().length >= 2 && !result ? (
        <p className="text-sm text-muted-foreground">Còn thiếu ngày sinh hợp lệ hoặc giới tính để tính các chỉ số.</p>
      ) : null}
      {href ? (
        <Link href={href} className="text-sm text-primary underline-offset-4 hover:underline">
          Giữ liên kết kết quả này
        </Link>
      ) : null}
    </div>
  );
}
