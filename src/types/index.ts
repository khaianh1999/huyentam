export type NguHanh = "Kim" | "Moc" | "Thuy" | "Hoa" | "Tho";
export type YinYang = "Am" | "Duong";
export type Gender = "nam" | "nu";

export type Can =
  | "Giap"
  | "At"
  | "Binh"
  | "Dinh"
  | "Mau"
  | "Ky"
  | "Canh"
  | "Tan"
  | "Nham"
  | "Quy";

export type Chi =
  | "Ty"
  | "Suu"
  | "Dan"
  | "Mao"
  | "Thin"
  | "Ti"
  | "Ngo"
  | "Mui"
  | "Than"
  | "Dau"
  | "Tuat"
  | "Hoi";

export interface SolarDate {
  day: number;
  month: number;
  year: number;
}

export interface LunarDate {
  day: number;
  month: number;
  year: number;
  leap: boolean;
}

export interface CanChiInfo {
  dayCan: Can;
  dayChi: Chi;
  monthCan: Can;
  monthChi: Chi;
  yearCan: Can;
  yearChi: Chi;
  dayLabel: string;
  monthLabel: string;
  yearLabel: string;
}

export interface DayDetail {
  solar: SolarDate;
  lunar: LunarDate;
  canChi: CanChiInfo;
  tietKhi: string;
  truc: string;
  saoTot: string[];
  saoXau: string[];
  isHoangDao: boolean;
  isHacDao: boolean;
  gioHoangDao: string[];
  gioHacDao: string[];
  isTamNuong: boolean;
  isNguyetKy: boolean;
  isSatChu: boolean;
  napAm: string;
  nguHanh: NguHanh;
  festivals: string[];
  disclaimer: string;
}

export interface ToolCard {
  title: string;
  description: string;
  href: string;
  icon: string;
  category: string;
}

export interface HexagramLine {
  yang: boolean;
  changing: boolean;
}

export interface HexagramResult {
  primaryNumber: number;
  primaryName: string;
  changingNumber: number | null;
  changingName: string | null;
  lines: HexagramLine[];
  changingLines: number[];
  interpretation: HexagramInterpretation;
  seed: string;
  disclaimer: string;
}

export interface HexagramInterpretation {
  overview: string;
  career: string;
  wealth: string;
  love: string;
  family: string;
  health: string;
  advice: string;
  fortuneLevel: "cat" | "binh" | "hung" | "dai-cat" | "dai-hung";
}

export interface NumerologyResult {
  fullName: string;
  birthDate: SolarDate;
  gender: Gender;
  lifePath: number;
  soul: number;
  personality: number;
  destiny: number;
  nameElement: NguHanh;
  birthElement: NguHanh;
  harmony: "hao-hoa" | "trung-tinh" | "xung-khac";
  meaning: string;
  overview: string;
  disclaimer: string;
}

export interface ZodiacAnimal {
  id: string;
  name: string;
  chi: Chi;
  element: NguHanh;
  years: number[];
  overview: string;
  personality: string;
  career: string;
  love: string;
  wealth: string;
  tamHop: string[];
  tuHanhXung: string[];
  hop: string[];
  khac: string[];
}

export interface WesternSign {
  id: string;
  name: string;
  symbol: string;
  element: string;
  dateRange: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  personality: string;
  love: string;
  career: string;
  finance: string;
  strengths: string[];
  weaknesses: string[];
  compatible: string[];
}

export interface DayPurpose {
  id: string;
  name: string;
  description: string;
}

export interface DayAssessment {
  date: SolarDate;
  purpose: DayPurpose;
  score: number;
  rating: "tot" | "trung-binh" | "nen-tranh" | "xau";
  reasons: string[];
  dayDetail: DayDetail;
  goodHours: string[];
  badHours: string[];
  hopTuoi: string[];
  xungTuoi: string[];
  huongXuatHanh: string[];
  disclaimer: string;
}

export interface TuViProfile {
  fullName: string;
  birth: SolarDate;
  birthHour: number;
  gender: Gender;
  place?: string;
}

export type ContentDisclaimer =
  | "thuat-toan"
  | "quan-niem-dan-gian"
  | "du-lieu-tham-khao"
  | "can-bo-sung";
