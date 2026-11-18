"use client";

import Link from "next/link";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { useVnToday } from "@/lib/client/use-vn-today";
import { animalFromYear } from "@/lib/zodiac/animal-year";

export function YearNote() {
  const today = useVnToday();
  if (!today) return <LoadingYinYang label="Đang lấy năm…" />;
  const animal = animalFromYear(today.year);
  return (
    <p className="rounded-xl border border-accent/40 bg-card/70 px-4 py-3 text-sm leading-relaxed text-wood">
      Năm dương lịch {today.year} mang can chi tương ứng tuổi {animal.name}.{" "}
      <Link href={`/12-con-giap/${animal.id}`} className="text-primary underline-offset-4 hover:underline">
        Mở tuổi {animal.name}
      </Link>
      . Người sinh trước Tết Nguyên đán thuộc tuổi của năm âm trước.
    </p>
  );
}
