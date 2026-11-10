import type { Gender, SolarDate } from "@/types";
import { daysInSolarMonth } from "@/lib/algorithms/calendar/lunar";
import { pad2 } from "@/lib/utils";

export const YEAR_MIN = 1900;
export const YEAR_MAX = 2100;

const WEEKDAY_FULL = [
  "Chủ Nhật",
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
] as const;

export const WEEKDAY_HEADERS = [
  { label: "T2", long: "Thứ Hai" },
  { label: "T3", long: "Thứ Ba" },
  { label: "T4", long: "Thứ Tư" },
  { label: "T5", long: "Thứ Năm" },
  { label: "T6", long: "Thứ Sáu" },
  { label: "T7", long: "Thứ Bảy" },
  { label: "CN", long: "Chủ Nhật" },
] as const;

export function readParam(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export function todayInVietnam(now = new Date()): SolarDate {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);
  const day = Number(parts.find((part) => part.type === "day")?.value);
  return { year, month, day };
}

export function solarKey(date: SolarDate): string {
  return `${date.year}-${pad2(date.month)}-${pad2(date.day)}`;
}

export function formatSolarSlash(date: SolarDate): string {
  return `${pad2(date.day)}/${pad2(date.month)}/${date.year}`;
}

export function formatSolarLong(date: SolarDate): string {
  return `${date.day} tháng ${date.month} năm ${date.year}`;
}

export function parseSolarKey(value: string | undefined): SolarDate | null {
  if (!value) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (!Number.isInteger(year) || year < YEAR_MIN || year > YEAR_MAX) return null;
  if (!Number.isInteger(month) || month < 1 || month > 12) return null;
  const maxDay = daysInSolarMonth(month, year);
  if (!Number.isInteger(day) || day < 1 || day > maxDay) return null;
  return { day, month, year };
}

export function weekdayIndexSunday(date: SolarDate): number {
  return new Date(Date.UTC(date.year, date.month - 1, date.day)).getUTCDay();
}

export function weekdayName(date: SolarDate): string {
  return WEEKDAY_FULL[weekdayIndexSunday(date)];
}

/** Monday = 0, matching a Vietnamese week that starts on Thứ Hai. */
export function weekdayMondayIndex(date: SolarDate): number {
  return (weekdayIndexSunday(date) + 6) % 7;
}

export function sameSolar(a: SolarDate, b: SolarDate): boolean {
  return a.year === b.year && a.month === b.month && a.day === b.day;
}

export function shiftMonth(year: number, month: number, delta: number): {
  year: number;
  month: number;
} {
  const shifted = new Date(Date.UTC(year, month - 1 + delta, 1));
  return { year: shifted.getUTCFullYear(), month: shifted.getUTCMonth() + 1 };
}

export function resolveYearMonth(
  yearRaw: string | undefined,
  monthRaw: string | undefined,
  fallback: SolarDate,
): { year: number; month: number } {
  const yearNum = yearRaw === undefined || yearRaw === "" ? fallback.year : Number(yearRaw);
  const monthNum = monthRaw === undefined || monthRaw === "" ? fallback.month : Number(monthRaw);
  const year = Number.isInteger(yearNum)
    ? Math.min(YEAR_MAX, Math.max(YEAR_MIN, yearNum))
    : fallback.year;
  const month = Number.isInteger(monthNum) ? Math.min(12, Math.max(1, monthNum)) : fallback.month;
  return { year, month };
}

export function parseBirthYear(value: string | undefined): number | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  if (!/^\d{4}$/.test(trimmed)) return undefined;
  const year = Number(trimmed);
  if (year < YEAR_MIN || year > YEAR_MAX) return undefined;
  return year;
}

export function parseGender(value: string | undefined): Gender | undefined {
  if (value === "nam" || value === "nu") return value;
  return undefined;
}

export function genderLabel(gender: Gender): string {
  return gender === "nam" ? "Nam" : "Nữ";
}

export function assessmentQuery(input: {
  ngay: string;
  purposeId: string;
  birthYear?: string;
  gender?: string;
}): string {
  const query = new URLSearchParams();
  query.set("ngay", input.ngay);
  query.set("muc-dich", input.purposeId);
  const birthYear = input.birthYear?.trim();
  if (birthYear) query.set("nam-sinh", birthYear);
  if (input.gender === "nam" || input.gender === "nu") query.set("gioi-tinh", input.gender);
  return query.toString();
}

export function dayPath(date: SolarDate): string {
  return `/lich-am-duong/${solarKey(date)}`;
}

export function inYearRange(year: number): boolean {
  return year >= YEAR_MIN && year <= YEAR_MAX;
}
