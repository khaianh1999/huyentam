"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signFromMonthDay } from "@/lib/algorithms/astrology/cung-reading";
import { isRealDate, parseBoundedInt } from "@/lib/divination/params";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/divination/Field";

export function SignFinder() {
  const router = useRouter();
  const [month, setMonth] = useState("11");
  const [day, setDay] = useState("10");
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="paper-card grid gap-4 rounded-xl p-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
      onSubmit={(event) => {
        event.preventDefault();
        const monthNumber = parseBoundedInt(month, 1, 12);
        const dayNumber = parseBoundedInt(day, 1, 31);
        if (monthNumber === null || dayNumber === null || !isRealDate(2024, monthNumber, dayNumber)) {
          setError("Chọn một ngày dương lịch có thật. Năm không cần, vì mốc cung lặp mỗi năm.");
          return;
        }
        const sign = signFromMonthDay(monthNumber, dayNumber);
        if (!sign) {
          setError("Chưa khớp được cung với ngày này.");
          return;
        }
        setError(null);
        router.push(`/cung-hoang-dao/${sign.id}`);
      }}
    >
      <Field label="Tháng sinh" htmlFor="thang-cung">
        <Input id="thang-cung" inputMode="numeric" value={month} onChange={(event) => setMonth(event.target.value)} />
      </Field>
      <Field label="Ngày sinh" htmlFor="ngay-cung">
        <Input id="ngay-cung" inputMode="numeric" value={day} onChange={(event) => setDay(event.target.value)} />
      </Field>
      <Button type="submit">Mở cung</Button>
      {error ? <p className="text-sm text-primary sm:col-span-3">{error}</p> : null}
    </form>
  );
}
