import type { Gender, TuViProfile } from "@/types";

export type SearchRecord = Record<string, string | string[] | undefined>;

export type CheDoTuVi = "tron-doi" | "nam" | "thang" | "ngay";

const CHI_GIO = [
  "Tý",
  "Sửu",
  "Dần",
  "Mão",
  "Thìn",
  "Tỵ",
  "Ngọ",
  "Mùi",
  "Thân",
  "Dậu",
  "Tuất",
  "Hợi",
] as const;

export function firstParam(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export function hourBranch(hour: number): string {
  if (hour === 23 || hour === 0) return "Tý";
  const index = Math.floor(((hour + 1) % 24) / 2);
  return CHI_GIO[index] ?? "Tý";
}

export const BIRTH_HOURS = Array.from({ length: 24 }, (_, hour) => ({
  hour,
  label: `${hour.toString().padStart(2, "0")}h · ${hourBranch(hour)}`,
}));

export function isRealDate(year: number, month: number, day: number): boolean {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return false;
  }
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

export function parseBoundedInt(
  value: string | undefined,
  min: number,
  max: number,
): number | null {
  if (!value || !/^\d+$/.test(value)) return null;
  const number = Number(value);
  if (!Number.isInteger(number) || number < min || number > max) return null;
  return number;
}

export function parseGender(value: string | undefined): Gender | null {
  if (value === "nam" || value === "nu") return value;
  return null;
}

export type ParsedProfile = {
  profile: TuViProfile;
  cheDo: CheDoTuVi;
  namXem: number | null;
  thangXem: number | null;
  ngayXem: number | null;
};

export function parseTuViQuery(sp: SearchRecord): ParsedProfile | null {
  const fullName = firstParam(sp.ten)?.trim() ?? "";
  const year = parseBoundedInt(firstParam(sp.nam), 1900, 2100);
  const month = parseBoundedInt(firstParam(sp.thang), 1, 12);
  const day = parseBoundedInt(firstParam(sp.ngay), 1, 31);
  const hour = parseBoundedInt(firstParam(sp.gio), 0, 23);
  const gender = parseGender(firstParam(sp.gioi));
  if (!fullName || fullName.length > 80 || year === null || month === null || day === null || hour === null || !gender) {
    return null;
  }
  if (!isRealDate(year, month, day)) return null;

  const cheDoRaw = firstParam(sp.cheDo);
  const cheDo: CheDoTuVi =
    cheDoRaw === "nam" || cheDoRaw === "thang" || cheDoRaw === "ngay" || cheDoRaw === "tron-doi"
      ? cheDoRaw
      : "tron-doi";

  return {
    profile: {
      fullName,
      birth: { year, month, day },
      birthHour: hour,
      gender,
    },
    cheDo,
    namXem: parseBoundedInt(firstParam(sp.namXem), 1900, 2200),
    thangXem: parseBoundedInt(firstParam(sp.thangXem), 1, 12),
    ngayXem: parseBoundedInt(firstParam(sp.ngayXem), 1, 31),
  };
}

export function tuViResultHref(
  profile: TuViProfile,
  extra: {
    cheDo: CheDoTuVi;
    namXem?: number;
    thangXem?: number;
    ngayXem?: number;
  },
): string {
  const query = new URLSearchParams();
  query.set("ten", profile.fullName);
  query.set("nam", String(profile.birth.year));
  query.set("thang", String(profile.birth.month));
  query.set("ngay", String(profile.birth.day));
  query.set("gio", String(profile.birthHour));
  query.set("gioi", profile.gender);
  query.set("cheDo", extra.cheDo);
  if (extra.namXem !== undefined) query.set("namXem", String(extra.namXem));
  if (extra.thangXem !== undefined) query.set("thangXem", String(extra.thangXem));
  if (extra.ngayXem !== undefined) query.set("ngayXem", String(extra.ngayXem));
  return `/ket-qua/tu-vi?${query.toString()}`;
}

export type ParsedName = {
  fullName: string;
  year: number;
  month: number;
  day: number;
  gender: Gender;
};

export function parseNameQuery(sp: SearchRecord): ParsedName | null {
  const fullName = firstParam(sp.ten)?.trim() ?? "";
  const year = parseBoundedInt(firstParam(sp.nam), 1900, 2100);
  const month = parseBoundedInt(firstParam(sp.thang), 1, 12);
  const day = parseBoundedInt(firstParam(sp.ngay), 1, 31);
  const gender = parseGender(firstParam(sp.gioi));
  if (!fullName || fullName.length > 80 || year === null || month === null || day === null || !gender) {
    return null;
  }
  if (!isRealDate(year, month, day)) return null;
  return { fullName, year, month, day, gender };
}

export function nameResultHref(input: ParsedName): string {
  const query = new URLSearchParams();
  query.set("ten", input.fullName);
  query.set("nam", String(input.year));
  query.set("thang", String(input.month));
  query.set("ngay", String(input.day));
  query.set("gioi", input.gender);
  return `/ket-qua/boi-ten?${query.toString()}`;
}

export function hexResultHref(input: {
  phuong: "tung" | "chon";
  seed: string;
  loi?: string;
  loai?: string;
}): string {
  const query = new URLSearchParams();
  query.set("phuong", input.phuong);
  query.set("seed", input.seed.slice(0, 240));
  if (input.loi?.trim()) query.set("loi", input.loi.trim().slice(0, 160));
  if (input.loai) query.set("loai", input.loai);
  return `/ket-qua/gieo-que?${query.toString()}`;
}
