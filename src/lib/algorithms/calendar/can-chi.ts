import type { Can, CanChiInfo, Chi, LunarDate, NguHanh, SolarDate } from "@/types";
import {
  CAN_ELEMENT,
  CAN_LIST,
  CAN_VI,
  CHI_LIST,
  CHI_VI,
  NAP_AM_60,
  NGUYET_KY_DAYS,
  NGU_HANH_VI,
  TAM_NUONG_DAYS,
  TIET_KHI,
  TRUC_12,
} from "./constants";
import { TRUC_EFFECT } from "@/data/calendar/tu-28";
import { getJulianDay, getSolarTermIndex, solarToLunar } from "./lunar";
import {
  getClashAges,
  getDayStars,
  getDirections,
  getHours,
  getLucDieu,
  getTu28,
  getTwelveGod,
  isDuongCongKy,
} from "./almanac";

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
  // Ngũ hổ độn: năm Giáp, Kỷ thì tháng Giêng là Bính Dần; các năm sau tịnh tiến 2 can.
  const monthCanIndex = (yearCanIndex * 2 + lunarMonth + 1) % 10;
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

/** Chi tháng theo tiết: tháng Dần bắt đầu từ Lập xuân, dùng để an 12 trực. */
export function getSolarMonthChi(solar: SolarDate): Chi {
  const term = getSolarTermIndex(solar.day, solar.month, solar.year);
  // Lập xuân có chỉ số 21; mỗi tháng tiết gồm hai khí.
  return CHI_LIST[(2 + Math.floor(((term + 3) % 24) / 2)) % 12];
}

/** Tên tiết khí đang hành, tính theo hoàng kinh Mặt Trời giờ Việt Nam. */
export function getTietKhi(solar: SolarDate): string {
  const term = getSolarTermIndex(solar.day, solar.month, solar.year);
  // TIET_KHI bắt đầu từ Tiểu hàn, chỉ số 19.
  return TIET_KHI[(term + 5) % 24];
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
  const truc = getTrucNgay(canChi.dayChi, getSolarMonthChi(solar));
  const dayGod = getTwelveGod(canChi.monthChi, canChi.dayChi);
  const hours = getHours(canChi.dayCan, canChi.dayChi);
  const stars = getDayStars(lunar.month, canChi.dayCan, canChi.dayChi);
  return {
    solar,
    lunar,
    canChi,
    tietKhi: getTietKhi(solar),
    truc,
    trucSummary: TRUC_EFFECT[truc]?.summary ?? "",
    saoTot: stars.filter((star) => star.kind === "good").map((star) => star.name),
    saoXau: stars.filter((star) => star.kind === "bad").map((star) => star.name),
    stars,
    dayGod: dayGod.name,
    isHoangDao: dayGod.good,
    isHacDao: !dayGod.good,
    hours,
    gioHoangDao: hours.filter((hour) => hour.isGood).map((hour) => hour.label),
    gioHacDao: hours.filter((hour) => !hour.isGood).map((hour) => hour.label),
    tu: getTu28(getJulianDay(solar.day, solar.month, solar.year)),
    directions: getDirections(canChi.dayCan, canChi.dayChi),
    clashAges: getClashAges(canChi.dayCan, canChi.dayChi),
    lucDieu: getLucDieu(lunar),
    isTamNuong: TAM_NUONG_DAYS.includes(lunar.day),
    isNguyetKy: NGUYET_KY_DAYS.includes(lunar.day),
    isSatChu: stars.some((star) => star.name === "Sát chủ"),
    isDuongCong: isDuongCongKy(lunar),
    napAm,
    nguHanh,
    nguHanhLabel: NGU_HANH_VI[nguHanh],
    festivals: getTraditionalFestivals(lunar),
    disclaimer:
      "Âm lịch, can chi, tiết khí và nạp âm được tính theo thuật toán lịch. Hoàng đạo, trực, sao tốt xấu, nhị thập bát tú và các ngày kỵ là quan niệm dân gian, ghi lại để tham khảo.",
  };
}

export function formatLunarLabel(lunar: LunarDate): string {
  const leap = lunar.leap ? " (nhuận)" : "";
  return `${lunar.day}/${lunar.month}${leap} âm lịch năm ${lunar.year}`;
}
