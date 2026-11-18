/**
 * Lập lá số Tử Vi Đẩu Số: an 12 cung, Cục, 14 chính tinh, vòng Lộc Tồn, Thái Tuế, Tràng Sinh,
 * các phụ tinh, Tứ Hóa, Tuần, Triệt, đại hạn, tiểu hạn và lưu niên.
 *
 * Quy tắc an sao đối chiếu từ dự án mã nguồn mở lasotuvi
 * (Copyright (c) 2016 doanguyen, MIT License, https://github.com/doanguyen/lasotuvi),
 * có chỉnh lại Khôi Việt, Phá Toái, Mệnh Chủ, Thân Chủ và Âm Dương thuận lý theo cách an phổ biến.
 *
 * Trong tệp này cung được đánh số 1–12 từ Tý đến Hợi, can 1–10 từ Giáp đến Quý.
 */

import type { Can, Chi, Gender, LunarDate, NguHanh, TuViProfile } from "@/types";
import { CAN_LIST, CAN_VI, CHI_LIST, CHI_VI } from "@/lib/algorithms/calendar/constants";
import { getNapAm, getYearCanChi } from "@/lib/algorithms/calendar/can-chi";
import { julianToSolar, getJulianDay, solarToLunar } from "@/lib/algorithms/calendar/lunar";

export type StarKind = "chinh" | "cat" | "hung";
export type Brightness = "M" | "V" | "Đ" | "B" | "H";

export type ChartStar = {
  name: string;
  kind: StarKind;
  element: NguHanh;
  brightness?: Brightness;
  /** Sao thường được đọc đầu tiên; sao vòng phụ chỉ hiện trong phần chi tiết. */
  major: boolean;
};

export const PALACE_NAMES = [
  "Mệnh",
  "Phụ Mẫu",
  "Phúc Đức",
  "Điền Trạch",
  "Quan Lộc",
  "Nô Bộc",
  "Thiên Di",
  "Tật Ách",
  "Tài Bạch",
  "Tử Tức",
  "Phu Thê",
  "Huynh Đệ",
] as const;
export type PalaceName = (typeof PALACE_NAMES)[number];

export type Palace = {
  /** 1 = Tý ... 12 = Hợi */
  position: number;
  chi: Chi;
  chiLabel: string;
  canChiLabel: string;
  name: PalaceName;
  isThan: boolean;
  tuan: boolean;
  triet: boolean;
  /** Tuổi bắt đầu đại hạn. */
  daiHan: number;
  /** Năm có chi này thì tiểu hạn vào cung. */
  tieuHanChi: Chi;
  stars: ChartStar[];
};

export type LaSo = {
  profile: TuViProfile;
  lunar: LunarDate;
  /** Tháng dùng để an sao, đã xử lý tháng nhuận. */
  usedMonth: number;
  lateTy: boolean;
  yearCan: Can;
  yearChi: Chi;
  yearLabel: string;
  hourChi: Chi;
  hourPosition: number;
  amDuongNamNu: string;
  thuanLy: boolean;
  thuanHan: boolean;
  banMenh: string;
  banMenhElement: NguHanh;
  cucName: string;
  cucSo: number;
  cucElement: NguHanh;
  menhChu: string;
  thanChu: string;
  menhPosition: number;
  thanPosition: number;
  palaces: Palace[];
};

const ELEMENT_OF_WORD: Record<string, NguHanh> = {
  Kim: "Kim",
  Mộc: "Moc",
  Thủy: "Thuy",
  Hỏa: "Hoa",
  Thổ: "Tho",
};

export function napAmElement(napAm: string): NguHanh {
  return ELEMENT_OF_WORD[napAm.split(" ").at(-1) ?? ""] ?? "Tho";
}

const CUC: Record<NguHanh, { so: number; name: string }> = {
  Thuy: { so: 2, name: "Thủy nhị cục" },
  Moc: { so: 3, name: "Mộc tam cục" },
  Kim: { so: 4, name: "Kim tứ cục" },
  Tho: { so: 5, name: "Thổ ngũ cục" },
  Hoa: { so: 6, name: "Hỏa lục cục" },
};

type Meta = [string, NguHanh, StarKind, boolean];

const M = (name: string, element: NguHanh, kind: StarKind, major = false): Meta => [name, element, kind, major];

const STAR = {
  tuVi: M("Tử Vi", "Tho", "chinh"),
  liemTrinh: M("Liêm Trinh", "Hoa", "chinh"),
  thienDong: M("Thiên Đồng", "Thuy", "chinh"),
  vuKhuc: M("Vũ Khúc", "Kim", "chinh"),
  thaiDuong: M("Thái Dương", "Hoa", "chinh"),
  thienCo: M("Thiên Cơ", "Moc", "chinh"),
  thienPhu: M("Thiên Phủ", "Tho", "chinh"),
  thaiAm: M("Thái Âm", "Thuy", "chinh"),
  thamLang: M("Tham Lang", "Thuy", "chinh"),
  cuMon: M("Cự Môn", "Thuy", "chinh"),
  thienTuong: M("Thiên Tướng", "Thuy", "chinh"),
  thienLuong: M("Thiên Lương", "Moc", "chinh"),
  thatSat: M("Thất Sát", "Kim", "chinh"),
  phaQuan: M("Phá Quân", "Thuy", "chinh"),
  locTon: M("Lộc Tồn", "Tho", "cat", true),
  hoaLoc: M("Hóa Lộc", "Moc", "cat", true),
  hoaQuyen: M("Hóa Quyền", "Thuy", "cat", true),
  hoaKhoa: M("Hóa Khoa", "Thuy", "cat", true),
  hoaKy: M("Hóa Kỵ", "Thuy", "hung", true),
  taPhu: M("Tả Phù", "Tho", "cat", true),
  huuBat: M("Hữu Bật", "Tho", "cat", true),
  vanXuong: M("Văn Xương", "Kim", "cat", true),
  vanKhuc: M("Văn Khúc", "Thuy", "cat", true),
  thienKhoi: M("Thiên Khôi", "Hoa", "cat", true),
  thienViet: M("Thiên Việt", "Hoa", "cat", true),
  thienMa: M("Thiên Mã", "Hoa", "cat", true),
  longTri: M("Long Trì", "Thuy", "cat", true),
  phuongCac: M("Phượng Các", "Tho", "cat", true),
  thaiPhu: M("Thai Phụ", "Kim", "cat", true),
  phongCao: M("Phong Cáo", "Tho", "cat", true),
  tamThai: M("Tam Thai", "Moc", "cat", true),
  batToa: M("Bát Tọa", "Thuy", "cat", true),
  anQuang: M("Ân Quang", "Moc", "cat", true),
  thienQuy: M("Thiên Quý", "Tho", "cat", true),
  thienQuan: M("Thiên Quan", "Hoa", "cat", true),
  thienPhuc: M("Thiên Phúc", "Hoa", "cat", true),
  daoHoa: M("Đào Hoa", "Moc", "cat", true),
  hongLoan: M("Hồng Loan", "Thuy", "cat", true),
  thienHy: M("Thiên Hỷ", "Thuy", "cat", true),
  thienDuc: M("Thiên Đức", "Hoa", "cat", true),
  nguyetDuc: M("Nguyệt Đức", "Hoa", "cat", true),
  giaiThan: M("Giải Thần", "Moc", "cat"),
  thienGiai: M("Thiên Giải", "Hoa", "cat"),
  diaGiai: M("Địa Giải", "Tho", "cat"),
  thienY: M("Thiên Y", "Thuy", "cat"),
  quocAn: M("Quốc Ấn", "Tho", "cat", true),
  duongPhu: M("Đường Phù", "Moc", "cat"),
  vanTinh: M("Văn Tinh", "Hoa", "cat"),
  thienTai: M("Thiên Tài", "Tho", "cat"),
  thienTho: M("Thiên Thọ", "Tho", "cat"),
  thienTru: M("Thiên Trù", "Tho", "cat"),
  dauQuan: M("Đẩu Quân", "Hoa", "cat"),
  bacSy: M("Bác Sỹ", "Thuy", "cat"),
  lucSi: M("Lực Sĩ", "Hoa", "cat"),
  thanhLong: M("Thanh Long", "Thuy", "cat"),
  tuongQuan: M("Tướng Quân", "Moc", "cat"),
  tauThu: M("Tấu Thư", "Kim", "cat"),
  phiLiem: M("Phi Liêm", "Hoa", "cat"),
  hyThan: M("Hỷ Thần", "Hoa", "cat"),
  thieuDuong: M("Thiếu Dương", "Hoa", "cat"),
  thieuAm: M("Thiếu Âm", "Thuy", "cat"),
  longDuc: M("Long Đức", "Thuy", "cat"),
  phucDuc: M("Phúc Đức", "Tho", "cat"),
  trangSinh: M("Tràng Sinh", "Thuy", "cat"),
  quanDoi: M("Quan Đới", "Kim", "cat"),
  lamQuan: M("Lâm Quan", "Kim", "cat"),
  deVuong: M("Đế Vượng", "Kim", "cat"),
  mo: M("Mộ", "Tho", "cat"),
  duong: M("Dưỡng", "Moc", "cat"),
  kinhDuong: M("Kình Dương", "Kim", "hung", true),
  daLa: M("Đà La", "Kim", "hung", true),
  diaKhong: M("Địa Không", "Hoa", "hung", true),
  diaKiep: M("Địa Kiếp", "Hoa", "hung", true),
  hoaTinh: M("Hỏa Tinh", "Hoa", "hung", true),
  linhTinh: M("Linh Tinh", "Hoa", "hung", true),
  thienHinh: M("Thiên Hình", "Hoa", "hung", true),
  thienRieu: M("Thiên Riêu", "Thuy", "hung", true),
  thienKhoc: M("Thiên Khốc", "Thuy", "hung", true),
  thienHu: M("Thiên Hư", "Thuy", "hung", true),
  tangMon: M("Tang Môn", "Moc", "hung", true),
  bachHo: M("Bạch Hổ", "Kim", "hung", true),
  coThan: M("Cô Thần", "Tho", "hung", true),
  quaTu: M("Quả Tú", "Tho", "hung", true),
  thaiTue: M("Thái Tuế", "Hoa", "hung"),
  quanPhu: M("Quan Phù", "Hoa", "hung"),
  tuPhu: M("Tử Phù", "Kim", "hung"),
  tuePha: M("Tuế Phá", "Hoa", "hung"),
  dieuKhach: M("Điếu Khách", "Hoa", "hung"),
  trucPhu: M("Trực Phù", "Kim", "hung"),
  tieuHao: M("Tiểu Hao", "Hoa", "hung"),
  daiHao: M("Đại Hao", "Hoa", "hung"),
  benhPhu: M("Bệnh Phù", "Tho", "hung"),
  phucBinh: M("Phục Binh", "Hoa", "hung"),
  mocDuc: M("Mộc Dục", "Thuy", "hung"),
  suy: M("Suy", "Thuy", "hung"),
  benh: M("Bệnh", "Hoa", "hung"),
  tu: M("Tử", "Hoa", "hung"),
  tuyet: M("Tuyệt", "Tho", "hung"),
  thai: M("Thai", "Tho", "hung"),
  kiepSat: M("Kiếp Sát", "Hoa", "hung"),
  phaToai: M("Phá Toái", "Hoa", "hung"),
  hoaCai: M("Hoa Cái", "Kim", "hung"),
  thienKhong: M("Thiên Không", "Thuy", "hung"),
  thienLa: M("Thiên La", "Tho", "hung"),
  diaVong: M("Địa Võng", "Tho", "hung"),
  thienThuong: M("Thiên Thương", "Tho", "hung"),
  thienSu: M("Thiên Sứ", "Thuy", "hung"),
  luuHa: M("Lưu Hà", "Thuy", "hung"),
} as const;

/** Độ sáng từ Tý đến Hợi. */
const BRIGHTNESS: Record<string, string> = {
  "Tử Vi": "BĐMBVMMĐMBVB",
  "Liêm Trinh": "VĐVHMHVĐVHMH",
  "Thiên Đồng": "VHMĐHĐHHMHHĐ",
  "Vũ Khúc": "VMVĐMHVMVĐMH",
  "Thái Dương": "HĐVVVMMĐHHHH",
  "Thiên Cơ": "ĐĐHMMVĐĐVMMH",
  "Thái Âm": "VĐHHHHHĐVMMM",
  "Tham Lang": "HMĐHVHHMĐHVH",
  "Cự Môn": "VHVMHHVHĐMHĐ",
  "Thiên Tướng": "VĐMHVĐVĐMHVĐ",
  "Thiên Lương": "VĐVVMHMĐVHMH",
  "Thất Sát": "MĐMHHVMĐMHHV",
  "Phá Quân": "MVHHĐHMVHHĐH",
  "Đà La": "HĐHHĐHHĐHHĐH",
  "Kình Dương": "HĐHHĐHHĐHHĐH",
  "Linh Tinh": "HHĐĐĐĐĐHHHHH",
  "Hỏa Tinh": "HHĐĐĐĐĐHHHHH",
  "Văn Xương": "HĐHĐHĐHĐHHĐĐ",
  "Văn Khúc": "HĐHĐHĐHĐHHĐĐ",
  "Địa Không": "HHĐHHĐHHĐHHĐ",
  "Địa Kiếp": "HHĐHHĐHHĐHHĐ",
};

const MENH_CHU = ["Tham Lang", "Cự Môn", "Lộc Tồn", "Văn Khúc", "Liêm Trinh", "Vũ Khúc", "Phá Quân", "Vũ Khúc", "Liêm Trinh", "Văn Khúc", "Lộc Tồn", "Cự Môn"];
const THAN_CHU = ["Linh Tinh", "Thiên Tướng", "Thiên Lương", "Thiên Đồng", "Văn Xương", "Thiên Cơ", "Hỏa Tinh", "Thiên Tướng", "Thiên Lương", "Thiên Đồng", "Văn Xương", "Thiên Cơ"];

/** Vị trí Lộc Tồn theo can năm. */
const LOC_TON = [3, 4, 6, 7, 6, 7, 9, 10, 12, 1];
const KHOI = [2, 1, 12, 12, 2, 1, 7, 7, 4, 4];
const VIET = [8, 9, 10, 10, 8, 9, 3, 3, 6, 6];
const THIEN_QUAN = [8, 5, 6, 3, 4, 10, 12, 10, 11, 7];
const THIEN_PHUC = [10, 9, 1, 12, 4, 3, 7, 6, 7, 6];
const LUU_HA = [10, 11, 8, 5, 6, 7, 9, 4, 12, 3];
const THIEN_TRU = [6, 7, 1, 6, 7, 9, 3, 7, 10, 11];
const TRIET: [number, number][] = [
  [9, 10],
  [7, 8],
  [5, 6],
  [3, 4],
  [1, 2],
];

/** Tứ Hóa theo can: Lộc, Quyền, Khoa, Kỵ. */
export const TU_HOA: [string, string, string, string][] = [
  ["Liêm Trinh", "Phá Quân", "Vũ Khúc", "Thái Dương"],
  ["Thiên Cơ", "Thiên Lương", "Tử Vi", "Thái Âm"],
  ["Thiên Đồng", "Thiên Cơ", "Văn Xương", "Liêm Trinh"],
  ["Thái Âm", "Thiên Đồng", "Thiên Cơ", "Cự Môn"],
  ["Tham Lang", "Thái Âm", "Hữu Bật", "Thiên Cơ"],
  ["Vũ Khúc", "Tham Lang", "Thiên Lương", "Văn Khúc"],
  ["Thái Dương", "Vũ Khúc", "Thiên Đồng", "Thái Âm"],
  ["Cự Môn", "Thái Dương", "Văn Khúc", "Văn Xương"],
  ["Thiên Lương", "Tử Vi", "Thiên Phủ", "Vũ Khúc"],
  ["Phá Quân", "Cự Môn", "Thái Âm", "Tham Lang"],
];

export const move = (start: number, ...steps: number[]) => {
  const value = steps.reduce((sum, step) => sum + step, start);
  return ((value - 1) % 12 + 12) % 12 + 1;
};

function findTuVi(cuc: number, day: number): number {
  let total = cuc;
  let position = 3;
  while (total < day) {
    total += cuc;
    position += 1;
  }
  const gap = total - day;
  return move(position, gap % 2 === 1 ? -gap : gap);
}

function findHoaLinh(chiNam: number, hour: number, direction: number): [number, number] {
  let hoa: number;
  let linh: number;
  if ([3, 7, 11].includes(chiNam)) [hoa, linh] = [2, 4];
  else if ([1, 5, 9].includes(chiNam)) [hoa, linh] = [3, 11];
  else if ([6, 10, 2].includes(chiNam)) [hoa, linh] = [11, 4];
  else [hoa, linh] = [10, 11];
  return direction === 1
    ? [move(hoa - 1, hour), move(linh + 1, -hour)]
    : [move(hoa + 1, -hour), move(linh - 1, hour)];
}

export function hourPositionOf(hour: number): number {
  return hour === 23 ? 1 : Math.floor((hour + 1) / 2) + 1;
}

function palaceCan(position: number, canNam: number): number {
  const first = (canNam * 2 + 1) % 10;
  const value = (((position - 3) % 12 + 12) % 12 + first) % 10;
  return value === 0 ? 10 : value;
}

export function buildLaSo(profile: TuViProfile): LaSo {
  // Giờ Tý muộn (từ 23 giờ) tính sang ngày hôm sau.
  const lateTy = profile.birthHour === 23;
  const birth = lateTy
    ? julianToSolar(getJulianDay(profile.birth.day, profile.birth.month, profile.birth.year) + 1)
    : profile.birth;
  const lunar = solarToLunar(birth.day, birth.month, birth.year);
  // Tháng nhuận: nửa đầu tính vào tháng đó, nửa sau tính sang tháng kế tiếp.
  const tt = lunar.leap && lunar.day > 15 ? (lunar.month % 12) + 1 : lunar.month;
  const nn = lunar.day;
  const gio = hourPositionOf(profile.birthHour);
  const { can, chi } = getYearCanChi(lunar.year);
  const canNam = CAN_LIST.indexOf(can) + 1;
  const chiNam = CHI_LIST.indexOf(chi) + 1;
  const gender = profile.gender === "nam" ? 1 : -1;
  const yang = canNam % 2 === 1 ? 1 : -1;
  const direction = gender * yang;

  const cungThan = move(3, tt - 1, gio - 1);
  const cungMenh = move(3, tt - 1, -gio + 1);

  const menhCan = CAN_LIST[palaceCan(cungMenh, canNam) - 1];
  const cucElement = napAmElement(getNapAm(menhCan, CHI_LIST[cungMenh - 1]));
  const cuc = CUC[cucElement];
  const banMenh = getNapAm(can, chi);

  const palaces: Palace[] = Array.from({ length: 12 }, (_, index) => {
    const position = index + 1;
    const palaceCanValue = CAN_LIST[palaceCan(position, canNam) - 1];
    const chiValue = CHI_LIST[index];
    const offset = (position - cungMenh + 12) % 12;
    const gap = direction === 1 ? (position - cungMenh + 12) % 12 : (cungMenh - position + 12) % 12;
    return {
      position,
      chi: chiValue,
      chiLabel: CHI_VI[chiValue],
      canChiLabel: `${CAN_VI[palaceCanValue]} ${CHI_VI[chiValue]}`,
      name: PALACE_NAMES[offset],
      isThan: position === cungThan,
      tuan: false,
      triet: false,
      daiHan: cuc.so + gap * 10,
      tieuHanChi: "Ty",
      stars: [],
    };
  });

  // Tiểu hạn: nam thuận, nữ nghịch, khởi theo tam hợp năm sinh.
  const khoiHan = move(11, -3 * (chiNam - 1));
  const tyPosition = move(khoiHan, -gender * (chiNam - 1));
  for (const palace of palaces) {
    const distance =
      gender === 1 ? (palace.position - tyPosition + 12) % 12 : (tyPosition - palace.position + 12) % 12;
    palace.tieuHanChi = CHI_LIST[distance];
  }

  const place = (position: number, meta: Meta) => {
    const [name, element, kind, major] = meta;
    const code = BRIGHTNESS[name]?.[position - 1] as Brightness | undefined;
    palaces[position - 1].stars.push({
      name,
      element,
      kind,
      major: kind === "chinh" ? true : major,
      ...(code ? { brightness: code } : {}),
    });
  };

  // Chòm Tử Vi
  const tuVi = findTuVi(cuc.so, nn);
  const where: Record<string, number> = {
    "Tử Vi": tuVi,
    "Liêm Trinh": move(tuVi, 4),
    "Thiên Đồng": move(tuVi, 7),
    "Vũ Khúc": move(tuVi, 8),
    "Thái Dương": move(tuVi, 9),
    "Thiên Cơ": move(tuVi, 11),
  };
  // Chòm Thiên Phủ
  const phu = move(3, 3 - tuVi);
  Object.assign(where, {
    "Thiên Phủ": phu,
    "Thái Âm": move(phu, 1),
    "Tham Lang": move(phu, 2),
    "Cự Môn": move(phu, 3),
    "Thiên Tướng": move(phu, 4),
    "Thiên Lương": move(phu, 5),
    "Thất Sát": move(phu, 6),
    "Phá Quân": move(phu, 10),
  });
  for (const key of [
    "tuVi",
    "liemTrinh",
    "thienDong",
    "vuKhuc",
    "thaiDuong",
    "thienCo",
    "thienPhu",
    "thaiAm",
    "thamLang",
    "cuMon",
    "thienTuong",
    "thienLuong",
    "thatSat",
    "phaQuan",
  ] as const) {
    place(where[STAR[key][0]], STAR[key]);
  }

  // Vòng Lộc Tồn
  const loc = LOC_TON[canNam - 1];
  place(loc, STAR.locTon);
  [
    STAR.bacSy,
    STAR.lucSi,
    STAR.thanhLong,
    STAR.tieuHao,
    STAR.tuongQuan,
    STAR.tauThu,
    STAR.phiLiem,
    STAR.hyThan,
    STAR.benhPhu,
    STAR.daiHao,
    STAR.phucBinh,
    STAR.quanPhu,
  ].forEach((meta, index) => place(move(loc, index * direction), meta));

  // Vòng Thái Tuế
  [
    [STAR.thaiTue],
    [STAR.thieuDuong, STAR.thienKhong],
    [STAR.tangMon],
    [STAR.thieuAm],
    [STAR.quanPhu],
    [STAR.tuPhu, STAR.nguyetDuc],
    [STAR.tuePha],
    [STAR.longDuc],
    [STAR.bachHo],
    [STAR.phucDuc, STAR.thienDuc],
    [STAR.dieuKhach],
    [STAR.trucPhu],
  ].forEach((list, index) => list.forEach((meta) => place(move(chiNam, index), meta)));

  // Vòng Tràng Sinh
  const trangSinh = { 6: 3, 4: 6, 2: 9, 5: 9, 3: 12 }[cuc.so] ?? 9;
  [
    STAR.trangSinh,
    STAR.mocDuc,
    STAR.quanDoi,
    STAR.lamQuan,
    STAR.deVuong,
    STAR.suy,
    STAR.benh,
    STAR.tu,
    STAR.mo,
    STAR.tuyet,
    STAR.thai,
    STAR.duong,
  ].forEach((meta, index) => place(move(trangSinh, index * direction), meta));

  // Lục sát và sao đôi
  const kinh = move(loc, 1);
  place(kinh, STAR.kinhDuong);
  place(move(loc, -1), STAR.daLa);
  const diaKiep = move(11, gio);
  place(diaKiep, STAR.diaKiep);
  place(move(12, 12 - diaKiep), STAR.diaKhong);
  const [hoa, linh] = findHoaLinh(chiNam, gio, direction);
  place(hoa, STAR.hoaTinh);
  place(linh, STAR.linhTinh);

  const longTri = move(5, chiNam - 1);
  place(longTri, STAR.longTri);
  const phuongCac = move(2, 2 - longTri);
  place(phuongCac, STAR.phuongCac);
  place(phuongCac, STAR.giaiThan);

  const taPhu = move(5, tt - 1);
  place(taPhu, STAR.taPhu);
  const huuBat = move(2, 2 - taPhu);
  place(huuBat, STAR.huuBat);
  const vanKhuc = move(5, gio - 1);
  place(vanKhuc, STAR.vanKhuc);
  const vanXuong = move(2, 2 - vanKhuc);
  place(vanXuong, STAR.vanXuong);

  const tamThai = move(5, tt + nn - 2);
  place(tamThai, STAR.tamThai);
  place(move(2, 2 - tamThai), STAR.batToa);
  const anQuang = move(vanXuong, nn - 2);
  place(anQuang, STAR.anQuang);
  place(move(2, 2 - anQuang), STAR.thienQuy);

  place(KHOI[canNam - 1], STAR.thienKhoi);
  place(VIET[canNam - 1], STAR.thienViet);
  place(move(7, chiNam - 1), STAR.thienHu);
  place(move(7, -chiNam + 1), STAR.thienKhoc);
  place(move(cungMenh, chiNam - 1), STAR.thienTai);
  place(move(cungThan, chiNam - 1), STAR.thienTho);
  const hongLoan = move(4, -chiNam + 1);
  place(hongLoan, STAR.hongLoan);
  place(move(hongLoan, 6), STAR.thienHy);
  place(THIEN_QUAN[canNam - 1], STAR.thienQuan);
  place(THIEN_PHUC[canNam - 1], STAR.thienPhuc);

  const thienHinh = move(10, tt - 1);
  place(thienHinh, STAR.thienHinh);
  place(move(thienHinh, 4), STAR.thienRieu);
  place(move(thienHinh, 4), STAR.thienY);

  const coThan = [12, 1, 2].includes(chiNam) ? 3 : [3, 4, 5].includes(chiNam) ? 6 : [6, 7, 8].includes(chiNam) ? 9 : 12;
  place(coThan, STAR.coThan);
  place(move(coThan, -4), STAR.quaTu);

  const vanTinh = move(kinh, 2);
  place(vanTinh, STAR.vanTinh);
  const duongPhu = move(vanTinh, 2);
  place(duongPhu, STAR.duongPhu);
  place(move(duongPhu, 3), STAR.quocAn);
  place(move(vanKhuc, 2), STAR.thaiPhu);
  place(move(vanKhuc, -2), STAR.phongCao);
  place(move(9, 2 * tt - 2), STAR.thienGiai);
  place(move(taPhu, 3), STAR.diaGiai);
  place(5, STAR.thienLa);
  place(11, STAR.diaVong);
  place(move(cungMenh, 5), STAR.thienThuong);
  place(move(cungMenh, 7), STAR.thienSu);

  const thienMa = [3, 12, 9, 6][(chiNam - 1) % 4];
  place(thienMa, STAR.thienMa);
  place(move(thienMa, 2), STAR.hoaCai);
  const kiepSat = move(thienMa, 3);
  place(kiepSat, STAR.kiepSat);
  place(move(kiepSat, 4), STAR.daoHoa);
  place([6, 10, 2][[1, 7, 4, 10].includes(chiNam) ? 0 : [3, 9, 6, 12].includes(chiNam) ? 1 : 2], STAR.phaToai);
  place(move(chiNam, -tt + gio), STAR.dauQuan);
  place(LUU_HA[canNam - 1], STAR.luuHa);
  place(THIEN_TRU[canNam - 1], STAR.thienTru);

  // Tứ Hóa
  const allPositions: Record<string, number> = {
    ...where,
    "Văn Xương": vanXuong,
    "Văn Khúc": vanKhuc,
    "Hữu Bật": huuBat,
  };
  TU_HOA[canNam - 1].forEach((name, index) => {
    place(allPositions[name], [STAR.hoaLoc, STAR.hoaQuyen, STAR.hoaKhoa, STAR.hoaKy][index]);
  });

  // Tuần, Triệt
  const endTuan = move(chiNam, 10 - canNam);
  palaces[move(endTuan, 1) - 1].tuan = true;
  palaces[move(endTuan, 2) - 1].tuan = true;
  for (const position of TRIET[(canNam - 1) % 5]) palaces[position - 1].triet = true;

  const palaceYang = cungMenh % 2 === 1;
  return {
    profile,
    lunar,
    usedMonth: tt,
    lateTy,
    yearCan: can,
    yearChi: chi,
    yearLabel: `${CAN_VI[can]} ${CHI_VI[chi]}`,
    hourChi: CHI_LIST[gio - 1],
    hourPosition: gio,
    amDuongNamNu: `${yang === 1 ? "Dương" : "Âm"} ${gender === 1 ? "Nam" : "Nữ"}`,
    thuanLy: palaceYang === (yang === 1),
    thuanHan: direction === 1,
    banMenh,
    banMenhElement: napAmElement(banMenh),
    cucName: cuc.name,
    cucSo: cuc.so,
    cucElement,
    menhChu: MENH_CHU[cungMenh - 1],
    thanChu: THAN_CHU[chiNam - 1],
    menhPosition: cungMenh,
    thanPosition: cungThan,
    palaces,
  };
}

/** Tam phương tứ chính của một cung: chính nó, xung chiếu và hai cung tam hợp. */
export function tamPhuong(position: number): number[] {
  return [position, move(position, 6), move(position, 4), move(position, 8)];
}

export function genderLabelOf(gender: Gender): string {
  return gender === "nam" ? "Nam" : "Nữ";
}
