/**
 * Lớp lịch vạn sự: 12 thần, giờ hoàng đạo, sao theo ngày, nhị thập bát tú, hướng thần, lục diệu.
 * Đây là quy ước dân gian được mã hóa để tra cứu đúng như lịch vạn niên Việt Nam vẫn ghi.
 */

import type { AlmanacStar, Can, Chi, HourDetail, LunarDate } from "@/types";
import { CLASH_AGES, STAR_RULES, type StarRule } from "@/data/calendar/star-rules";
import { TU_28 } from "@/data/calendar/tu-28";
import { CAN_LIST, CAN_VI, CHI_LIST, CHI_VI, GIO_CHI_LABELS } from "./constants";

const TWELVE_GODS = [
  { name: "Thanh Long", good: true },
  { name: "Minh Đường", good: true },
  { name: "Thiên Hình", good: false },
  { name: "Chu Tước", good: false },
  { name: "Kim Quỹ", good: true },
  { name: "Kim Đường", good: true },
  { name: "Bạch Hổ", good: false },
  { name: "Ngọc Đường", good: true },
  { name: "Thiên Lao", good: false },
  { name: "Huyền Vũ", good: false },
  { name: "Tư Mệnh", good: true },
  { name: "Câu Trận", good: false },
] as const;

/** Vị trí khởi Thanh Long theo chi tháng hoặc chi ngày (Dần Thân tại Tý, Mão Dậu tại Dần, ...). */
const THANH_LONG_START = [8, 10, 0, 2, 4, 6];

/** Thần trực của `targetChi`, với chi gốc là chi tháng (cho ngày) hoặc chi ngày (cho giờ). */
export function getTwelveGod(baseChi: Chi, targetChi: Chi) {
  const start = THANH_LONG_START[CHI_LIST.indexOf(baseChi) % 6];
  return TWELVE_GODS[(CHI_LIST.indexOf(targetChi) - start + 12) % 12];
}

export function getHours(dayCan: Can, dayChi: Chi): HourDetail[] {
  const canIndex = CAN_LIST.indexOf(dayCan);
  return CHI_LIST.map((chi, index) => {
    const god = getTwelveGod(dayChi, chi);
    const can = CAN_LIST[(canIndex * 2 + index) % 10];
    return {
      chi,
      label: GIO_CHI_LABELS[index],
      canChi: `${CAN_VI[can]} ${CHI_VI[chi]}`,
      god: god.name,
      isGood: god.good,
    };
  });
}

/** Vị trí trong lục thập hoa giáp, 0 = Giáp Tý. */
export function sexagenaryIndex(can: Can, chi: Chi): number {
  const canIndex = CAN_LIST.indexOf(can);
  const chiIndex = CHI_LIST.indexOf(chi);
  for (let i = canIndex; i < 60; i += 10) {
    if (i % 12 === chiIndex) return i;
  }
  return 0;
}

export function getClashAges(can: Can, chi: Chi): string[] {
  return CLASH_AGES[sexagenaryIndex(can, chi)] ?? [];
}

function ruleMatches(rule: StarRule, lunarMonth: number, can: number, chi: number, c60: number) {
  const key =
    rule.key === "none" ? 0 : rule.key === "season" ? Math.floor((lunarMonth - 1) / 3) : lunarMonth;
  const values = rule.t[key];
  if (!values) return false;
  switch (rule.val) {
    case "chi":
      return values.includes(chi);
    case "can":
      return values.includes(can);
    case "c60":
      return values.includes(c60);
    case "m9":
      return values.includes(c60 % 9);
    case "token":
      return values.includes(`c${can}`) || values.includes(`z${chi}`);
  }
}

export function getDayStars(lunarMonth: number, dayCan: Can, dayChi: Chi): AlmanacStar[] {
  const can = CAN_LIST.indexOf(dayCan);
  const chi = CHI_LIST.indexOf(dayChi);
  const c60 = sexagenaryIndex(dayCan, dayChi);
  return STAR_RULES.filter((rule) => ruleMatches(rule, lunarMonth, can, chi, c60)).map((rule) => ({
    name: rule.name,
    kind: rule.kind,
    all: rule.all,
    good: rule.kind === "good" ? rule.tags : [],
    bad: rule.kind === "bad" ? rule.tags : [],
    resolves: rule.resolves,
    other: rule.other,
  }));
}

/** Mỗi ngày một sao, chu kỳ 28 ngày liên tục theo số ngày Julius. */
export function getTu28(julianDay: number) {
  return TU_28[(julianDay + 11) % 28];
}

const HY_THAN: Record<Can, string> = {
  Giap: "Đông Bắc",
  At: "Tây Bắc",
  Binh: "Tây Nam",
  Dinh: "Nam",
  Mau: "Đông Nam",
  Ky: "Đông Bắc",
  Canh: "Tây Bắc",
  Tan: "Tây Nam",
  Nham: "Nam",
  Quy: "Đông Nam",
};

const TAI_THAN: Record<Can, string> = {
  Giap: "Đông Nam",
  At: "Đông Nam",
  Binh: "Đông",
  Dinh: "Đông",
  Mau: "Bắc",
  Ky: "Nam",
  Canh: "Tây Nam",
  Tan: "Tây Nam",
  Nham: "Tây",
  Quy: "Tây Bắc",
};

/** Hạc thần đi theo chu kỳ 60 ngày; từ Quý Tỵ đến Mậu Thân ở trên trời nên không phạm hướng nào. */
function getHacThan(c60: number): string {
  const stages: [number, number, string][] = [
    [2, 6, "Nam"],
    [7, 12, "Tây Nam"],
    [13, 17, "Tây"],
    [18, 23, "Tây Bắc"],
    [24, 28, "Bắc"],
    [45, 50, "Đông Bắc"],
    [51, 55, "Đông"],
  ];
  const found = stages.find(([from, to]) => c60 >= from && c60 <= to);
  if (found) return found[2];
  if (c60 >= 29 && c60 <= 44) return "Trên trời (không phạm hướng)";
  return "Đông Nam"; // 56–59 và 0–1
}

export function getDirections(can: Can, chi: Chi) {
  return {
    hyThan: HY_THAN[can],
    taiThan: TAI_THAN[can],
    hacThan: getHacThan(sexagenaryIndex(can, chi)),
  };
}

const LUC_DIEU = [
  { name: "Đại An", good: true },
  { name: "Lưu Niên", good: false },
  { name: "Tốc Hỷ", good: true },
  { name: "Xích Khẩu", good: false },
  { name: "Tiểu Cát", good: true },
  { name: "Không Vong", good: false },
] as const;

/** Lục diệu Khổng Minh: khởi Đại An từ tháng, đếm tiếp theo ngày âm. */
export function getLucDieu(lunar: LunarDate) {
  return LUC_DIEU[(lunar.month + lunar.day - 2) % 6];
}

const DUONG_CONG: [number, number][] = [
  [1, 13],
  [2, 11],
  [3, 9],
  [4, 7],
  [5, 5],
  [6, 3],
  [7, 1],
  [7, 29],
  [8, 27],
  [9, 25],
  [10, 23],
  [11, 21],
  [12, 19],
];

export function isDuongCongKy(lunar: LunarDate): boolean {
  return DUONG_CONG.some(([month, day]) => month === lunar.month && day === lunar.day);
}
