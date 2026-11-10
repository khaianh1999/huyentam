"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { buildDaySummary, formatLunarLabel } from "@/lib/algorithms/calendar/can-chi";
import { lunarToSolar, solarToLunar } from "@/lib/algorithms/calendar/lunar";
import {
  YEAR_MAX,
  YEAR_MIN,
  dayPath,
  formatSolarLong,
  formatSolarSlash,
  parseSolarKey,
  solarKey,
  weekdayName,
} from "@/lib/calendar/dates";

type LunarConverterProps = {
  initialSolar: string;
  /** Gọn một cột — dùng trong sidebar */
  compact?: boolean;
};

type LunarDraft = {
  day: number;
  month: number;
  year: number;
  leap: boolean;
};

function lunarFromSolar(value: string): LunarDraft {
  const solar = parseSolarKey(value);
  if (!solar) return { day: 1, month: 1, year: 2000, leap: false };
  const lunar = solarToLunar(solar.day, solar.month, solar.year);
  return { day: lunar.day, month: lunar.month, year: lunar.year, leap: lunar.leap };
}

export function LunarConverter({ initialSolar, compact = false }: LunarConverterProps) {
  const [solarValue, setSolarValue] = useState(initialSolar);
  const [lunar, setLunar] = useState<LunarDraft>(() => lunarFromSolar(initialSolar));

  const solarResult = useMemo(() => {
    const solar = parseSolarKey(solarValue);
    if (!solar) return null;
    const converted = solarToLunar(solar.day, solar.month, solar.year);
    const summary = buildDaySummary(solar);
    return { solar, lunar: converted, summary };
  }, [solarValue]);

  const lunarResult = useMemo(() => {
    if (!Number.isInteger(lunar.year) || lunar.year < YEAR_MIN || lunar.year > YEAR_MAX) {
      return { error: `Năm âm nên từ ${YEAR_MIN} đến ${YEAR_MAX}.` };
    }
    const solar = lunarToSolar(lunar.day, lunar.month, lunar.year, lunar.leap);
    if (solar.day === 0 || solar.month === 0 || solar.year === 0) {
      return { error: "Năm này không có tháng nhuận khớp với tháng đã chọn." };
    }
    const check = solarToLunar(solar.day, solar.month, solar.year);
    const matches =
      check.day === lunar.day &&
      check.month === lunar.month &&
      check.year === lunar.year &&
      check.leap === lunar.leap;
    if (!matches) {
      return {
        error: "Ngày âm này không có trong tháng đã chọn. Tháng có thể chỉ 29 ngày, hoặc không phải tháng nhuận.",
      };
    }
    return { solar, lunar: check };
  }, [lunar]);

  return (
    <div className={compact ? "grid gap-3" : "grid gap-4 lg:grid-cols-2"}>
      <Card className={compact ? "shadow-none" : undefined}>
        <CardHeader className={compact ? "p-3 pb-2" : undefined}>
          <CardTitle className={`flex items-center gap-2 ${compact ? "text-sm" : ""}`}>
            <ArrowLeftRight className="size-4 text-bronze" aria-hidden="true" />
            Dương → âm
          </CardTitle>
        </CardHeader>
        <CardContent className={compact ? "p-3 pt-0" : undefined}>
          <form
            className="grid gap-3"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <div className="grid gap-1.5">
              <Label htmlFor="duong-ngay" className={compact ? "text-xs" : undefined}>
                Ngày dương
              </Label>
              <Input
                id="duong-ngay"
                type="date"
                min={`${YEAR_MIN}-01-01`}
                max={`${YEAR_MAX}-12-31`}
                value={solarValue}
                onChange={(event) => setSolarValue(event.target.value)}
                required
              />
            </div>
            {solarResult ? (
              <div className="rounded-lg border border-accent/40 bg-accent/10 px-3 py-2.5 text-xs sm:text-sm">
                <p className="font-medium text-ink">{formatLunarLabel(solarResult.lunar)}</p>
                {!compact ? (
                  <p className="mt-1 text-muted-foreground">
                    {weekdayName(solarResult.solar)}, {formatSolarLong(solarResult.solar)} · can chi{" "}
                    {solarResult.summary.canChi.dayLabel}
                  </p>
                ) : (
                  <p className="mt-1 text-muted-foreground">
                    {solarResult.summary.canChi.dayLabel}
                  </p>
                )}
                <Button asChild variant="link" className="mt-1 h-auto px-0 text-xs">
                  <Link href={dayPath(solarResult.solar)}>Chi tiết ngày</Link>
                </Button>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">Chọn ngày dương.</p>
            )}
          </form>
        </CardContent>
      </Card>

      <Card className={compact ? "shadow-none" : undefined}>
        <CardHeader className={compact ? "p-3 pb-2" : undefined}>
          <CardTitle className={`flex items-center gap-2 ${compact ? "text-sm" : ""}`}>
            <ArrowLeftRight className="size-4 text-bronze" aria-hidden="true" />
            Âm → dương
          </CardTitle>
        </CardHeader>
        <CardContent className={compact ? "p-3 pt-0" : undefined}>
          <form
            className="grid gap-3"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <div className={compact ? "grid gap-2" : "grid gap-3 sm:grid-cols-3"}>
              <div className="grid gap-1.5">
                <Label htmlFor="am-ngay" className={compact ? "text-xs" : undefined}>
                  Ngày âm
                </Label>
                <Select
                  id="am-ngay"
                  value={String(lunar.day)}
                  onChange={(event) =>
                    setLunar((current) => ({ ...current, day: Number(event.target.value) }))
                  }
                >
                  {Array.from({ length: 30 }, (_, index) => index + 1).map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="am-thang" className={compact ? "text-xs" : undefined}>
                  Tháng âm
                </Label>
                <Select
                  id="am-thang"
                  value={String(lunar.month)}
                  onChange={(event) =>
                    setLunar((current) => ({ ...current, month: Number(event.target.value) }))
                  }
                >
                  {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
                    <option key={month} value={month}>
                      Tháng {month}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="am-nam" className={compact ? "text-xs" : undefined}>
                  Năm âm
                </Label>
                <Input
                  id="am-nam"
                  type="number"
                  inputMode="numeric"
                  min={YEAR_MIN}
                  max={YEAR_MAX}
                  value={lunar.year}
                  onChange={(event) =>
                    setLunar((current) => ({
                      ...current,
                      year: Number(event.target.value),
                    }))
                  }
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-xs text-wood sm:text-sm" htmlFor="am-nhuan">
              <input
                id="am-nhuan"
                type="checkbox"
                className="size-4 accent-primary"
                checked={lunar.leap}
                onChange={(event) =>
                  setLunar((current) => ({ ...current, leap: event.target.checked }))
                }
              />
              Tháng nhuận
            </label>
            {"error" in lunarResult ? (
              <p className="text-xs leading-relaxed text-primary sm:text-sm">{lunarResult.error}</p>
            ) : (
              <div className="rounded-lg border border-accent/40 bg-accent/10 px-3 py-2.5 text-xs sm:text-sm">
                <p className="font-medium text-ink">
                  {weekdayName(lunarResult.solar)}, {formatSolarSlash(lunarResult.solar)}
                </p>
                {!compact ? (
                  <p className="mt-1 text-muted-foreground">{formatLunarLabel(lunarResult.lunar)}</p>
                ) : null}
                <Button asChild variant="link" className="mt-1 h-auto px-0 text-xs">
                  <Link href={dayPath(lunarResult.solar)}>Chi tiết ngày</Link>
                </Button>
                <button
                  type="button"
                  className="mt-1 block text-xs text-bronze underline-offset-4 hover:underline"
                  onClick={() => setSolarValue(solarKey(lunarResult.solar))}
                >
                  Đưa sang ô dương
                </button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
