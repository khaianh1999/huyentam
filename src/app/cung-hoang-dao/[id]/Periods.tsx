"use client";

import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { WESTERN_SIGNS } from "@/data/zodiac";
import { periodReading } from "@/lib/algorithms/astrology/cung-reading";
import { useVnToday } from "@/lib/client/use-vn-today";
import { monthKeyFromParts, weekKeyFromParts } from "@/lib/divination/vn-date";

export function Periods({ id }: { id: string }) {
  const today = useVnToday();
  const sign = WESTERN_SIGNS.find((item) => item.id === id);
  if (!sign) return null;
  if (!today) return <LoadingYinYang label="Đang soạn vận ngắn…" />;
  const readings = [
    periodReading(sign, "ngay", today.key),
    periodReading(sign, "tuan", weekKeyFromParts(today.year, today.month, today.day)),
    periodReading(sign, "thang", monthKeyFromParts(today.year, today.month)),
  ];
  const titles = ["Hôm nay", "Tuần này", "Tháng này"];
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-3">
      {readings.map((reading, index) => (
        <article key={reading.period} className="rounded-xl border border-accent/40 bg-accent/10 p-5">
          <h2 className="ink-heading text-xl text-ink">{titles[index]}</h2>
          <p className="mt-2 text-sm leading-relaxed">{reading.text}</p>
          <p className="mt-2 text-xs text-muted-foreground">Nên để mắt tới {reading.focus}.</p>
          <p className="mt-2 text-xs text-muted-foreground">{reading.disclaimer}</p>
        </article>
      ))}
    </div>
  );
}
