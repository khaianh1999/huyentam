import type { Can, CanChiInfo, Chi, LunarDate, NguHanh, SolarDate } from "@/types";
import {
  CAN_ELEMENT,
  CAN_LIST,
  CAN_VI,
  CHI_LIST,
  CHI_VI,
  GIO_CHI_LABELS,
  HOANG_DAO_CHI,
  NAP_AM_60,
  NGUYET_KY_DAYS,
  NGU_HANH_VI,
  TAM_NUONG_DAYS,
  TIET_KHI,
  TRUC_12,
} from "./constants";
import { getJulianDay, solarToLunar } from "./lunar";

export function getYearCanChi(year: number): { can: Can; chi: Chi } {
  // Year stem/branch: Giáp Tý = 1984 reference, also works with (year + 6) % 10 / (year + 8) % 12
  const can = CAN_LIST[(year + 6) % 10];
  const chi = CHI_LIST[(year + 8) % 12];
  return { can, chi };
}

export function getMonthCanChi(
  lunarMonth: number,
  yearCan: Can,
): { can: Can; chi: Chi } {
  const yearCanIndex = CAN_LIST.indexOf(yearCan);
  // Month branch: lunar month 1 = Dần
  const chi = CHI_LIST[(lunarMonth + 1) % 12];
  // Month stem depends on year stem
  const monthCanIndex = (yearCanIndex * 2 + lunarMonth) % 10;
  const can = CAN_LIST[monthCanIndex];
  return { can, chi };
}

export function getDayCanChi(solar: SolarDate): { can: Can; chi: Chi } {
  const jd = getJulianDay(solar.day, solar.month, solar.year);
  // Classic offsets used in VN calendars
  const can = CAN_LIST[(jd + 9) % 10];
  const chi = CHI_LIST[(jd + 1) % 12];
  return { can, chi };
}

export function getCanChiInfo(solar: SolarDate, lunar?: LunarDate): CanChiInfo {
  const l = lunar ?? solarToLunar(solar.day, solar.month, solar.year);
  const year = getYearCanChi(l.year);
  const month = getMonthCanChi(l.month, year.can);
  const day = getDayCanChi(solar);
  return {
    dayCan: day.can,
    dayChi: day.chi,
    monthCan: month.can,
    monthChi: month.chi,
    yearCan: year.can,
    yearChi: year.chi,
    dayLabel: `${CAN_VI[day.can]} ${CHI_VI[day.chi]}`,
    monthLabel: `${CAN_VI[month.can]} ${CHI_VI[month.chi]}`,
    yearLabel: `${CAN_VI[year.can]} ${CHI_VI[year.chi]}`,
  };
}

export function getNapAm(can: Can, chi: Chi): string {
  const idx =
    (CAN_LIST.indexOf(can) + CHI_LIST.indexOf(chi) * 0) % 60 ||
    ((CAN_LIST.indexOf(can) * 6 + CHI_LIST.indexOf(chi)) % 60);
  // Pair index in sexagenary cycle
  const sexagenary =
    (() => {
      for (let i = 0; i < 60; i += 1) {
        if (CAN_LIST[i % 10] === can && CHI_LIST[i % 12] === chi) return i;
      }
      return 0;
    })();
  return NAP_AM_60[sexagenary] ?? NAP_AM_60[idx];
}

export function getNguHanhFromCan(can: Can): NguHanh {
  return CAN_ELEMENT[can];
}

export function getTrucNgay(dayChi: Chi, monthChi: Chi): string {
  const dayIdx = CHI_LIST.indexOf(dayChi);
  const monthIdx = CHI_LIST.indexOf(monthChi);
  // Kiến day when day chi == month chi
  const offset = (dayIdx - monthIdx + 12) % 12;
  return TRUC_12[offset];
}

export function isHoangDaoDay(dayChi: Chi): boolean {
  return HOANG_DAO_CHI.includes(dayChi);
}

/** Giờ hoàng đạo theo chi ngày — quy ước dân gian phổ biến */
export function getGioHoangDao(dayChi: Chi): string[] {
  const map: Record<Chi, number[]> = {
    Ty: [0, 1, 4, 5, 7, 8],
    Suu: [2, 3, 5, 6, 9, 10],
    Dan: [0, 1, 4, 5, 7, 8],
    Mao: [2, 3, 5, 6, 9, 10],
    Thin: [0, 1, 4, 5, 7, 8],
    Ti: [2, 3, 5, 6, 9, 10],
    Ngo: [0, 1, 4, 5, 7, 8],
    Mui: [2, 3, 5, 6, 9, 10],
    Than: [0, 1, 4, 5, 7, 8],
    Dau: [2, 3, 5, 6, 9, 10],
    Tuat: [0, 1, 4, 5, 7, 8],
    Hoi: [2, 3, 5, 6, 9, 10],
  };
  return (map[dayChi] ?? []).map((i) => GIO_CHI_LABELS[i]);
}

export function getGioHacDao(dayChi: Chi): string[] {
  const good = new Set(getGioHoangDao(dayChi));
  return GIO_CHI_LABELS.filter((g) => !good.has(g));
}

export function approximateTietKhi(solar: SolarDate): string {
  // Approximate solar term by day-of-year buckets — labeled as approximation
  const dayOfYear = Math.floor(
    (Date.UTC(solar.year, solar.month - 1, solar.day) -
      Date.UTC(solar.year, 0, 0)) /
      86400000,
  );
  const idx = Math.min(23, Math.floor(((dayOfYear + 10) % 365) / 15.2));
  return TIET_KHI[idx];
}

export function getSaoTotXau(truc: string, isHoang: boolean): {
  saoTot: string[];
  saoXau: string[];
} {
  const goodTruc = ["Kiến", "Trừ", "Mãn", "Định", "Thành", "Khai"];
  const saoTot: string[] = [];
  const saoXau: string[] = [];
  if (isHoang) saoTot.push("Hoàng đạo");
  else saoXau.push("Hắc đạo");
  if (goodTruc.includes(truc)) saoTot.push(`Trực ${truc} thuận`);
  else saoXau.push(`Trực ${truc} cần thận trọng`);
  return { saoTot, saoXau };
}

export function getTraditionalFestivals(lunar: LunarDate): string[] {
  const key = `${lunar.month}-${lunar.day}`;
  const map: Record<string, string> = {
    "1-1": "Tết Nguyên Đán",
    "1-15": "Rằm tháng Giêng / Tết Nguyên Tiêu",
    "3-3": "Tết Hàn Thực",
    "3-10": "Giỗ Tổ Hùng Vương (âm lịch gần đúng theo địa phương)",
    "4-15": "Phật Đản (một số niên lịch)",
    "5-5": "Tết Đoan Ngọ",
    "7-15": "Rằm tháng Bảy / Vu Lan",
    "8-15": "Tết Trung Thu",
    "12-23": "Ông Táo về trời",
    "12-30": "Tất Niên",
  };
  const list: string[] = [];
  if (map[key]) list.push(map[key]);
  return list;
}

export function buildDaySummary(solar: SolarDate) {
  const lunar = solarToLunar(solar.day, solar.month, solar.year);
  const canChi = getCanChiInfo(solar, lunar);
  const napAm = getNapAm(canChi.dayCan, canChi.dayChi);
  const nguHanh = getNguHanhFromCan(canChi.dayCan);
  const truc = getTrucNgay(canChi.dayChi, canChi.monthChi);
  const hoang = isHoangDaoDay(canChi.dayChi);
  const { saoTot, saoXau } = getSaoTotXau(truc, hoang);
  return {
    solar,
    lunar,
    canChi,
    tietKhi: approximateTietKhi(solar),
    truc,
    saoTot,
    saoXau,
    isHoangDao: hoang,
    isHacDao: !hoang,
    gioHoangDao: getGioHoangDao(canChi.dayChi),
    gioHacDao: getGioHacDao(canChi.dayChi),
    isTamNuong: TAM_NUONG_DAYS.includes(lunar.day),
    isNguyetKy: NGUYET_KY_DAYS.includes(lunar.day),
    isSatChu: lunar.day === 5 || lunar.day === 14 || lunar.day === 23, // folk; overlapped labeling noted in UI
    napAm,
    nguHanh,
    nguHanhLabel: NGU_HANH_VI[nguHanh],
    festivals: getTraditionalFestivals(lunar),
    disclaimer:
      "Can chi, âm lịch và nạp âm được tính theo thuật toán thiên văn/quy ước lịch Việt. Hoàng đạo, trực, tam nương, nguyệt kỵ mang tính quan niệm dân gian tham khảo, không phải kết luận khoa học.",
  };
}

export function formatLunarLabel(lunar: LunarDate): string {
  const leap = lunar.leap ? " (nhuận)" : "";
  return `${lunar.day}/${lunar.month}${leap} âm lịch năm ${lunar.year}`;
}
