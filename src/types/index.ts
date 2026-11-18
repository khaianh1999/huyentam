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

/** Nhóm việc dùng để đối chiếu sao, trực và nhị thập bát tú. */
export type ActivityTag = "cuoi" | "xay" | "an-tang" | "nhap-trach" | "xuat-hanh" | "giao-dich";

export interface AlmanacStar {
  name: string;
  kind: "good" | "bad";
  /** Tác động mọi việc, hay chỉ các nhóm việc trong good/bad. */
  all: boolean;
  good: ActivityTag[];
  bad: ActivityTag[];
  /** Sao tốt có khả năng giải bớt sao xấu. */
  resolves: boolean;
  /** Việc khác ngoài các nhóm chính, ví dụ lễ bái. */
  other?: string;
}

export interface HourDetail {
  chi: Chi;
  label: string;
  canChi: string;
  god: string;
  isGood: boolean;
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
  isDuongCong: boolean;
  /** Thần trực nhật trong 12 thần hoàng đạo, hắc đạo. */
  dayGod: string;
  trucSummary: string;
  tu: { name: string; fullName: string; type: "cat" | "binh" | "hung"; animal: string; good: ActivityTag[]; bad: ActivityTag[] };
  stars: AlmanacStar[];
  hours: HourDetail[];
  directions: { hyThan: string; taiThan: string; hacThan: string };
  /** Các tuổi (can chi) xung khắc với ngày. */
  clashAges: string[];
  lucDieu: { name: string; good: boolean };
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

export interface AssessmentFactor {
  group: "than" | "truc" | "tu" | "sao" | "ky" | "tuoi" | "luc-dieu";
  label: string;
  delta: number;
  detail: string;
}

export interface DayAssessment {
  date: SolarDate;
  purpose: DayPurpose;
  score: number;
  rating: "tot" | "trung-binh" | "nen-tranh" | "xau";
  reasons: string[];
  /** Từng yếu tố cộng trừ điểm, theo đúng thứ tự tính. */
  factors: AssessmentFactor[];
  /** Cảnh báo cấp năm hoặc ngày đại kỵ. */
  warnings: string[];
  verdict: string;
  /** Giờ nên chọn: hoàng đạo và không xung tuổi. */
  bestHours: string[];
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
