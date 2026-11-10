import type { NguHanh } from "@/types";
import { NGU_HANH_VI } from "@/lib/algorithms/calendar/constants";
import { getYearCanChi, getNguHanhFromCan } from "@/lib/algorithms/calendar/can-chi";

export const NGU_HANH_ORDER: NguHanh[] = ["Kim", "Thuy", "Moc", "Hoa", "Tho"];

const SINH: Record<NguHanh, NguHanh> = {
  Kim: "Thuy",
  Thuy: "Moc",
  Moc: "Hoa",
  Hoa: "Tho",
  Tho: "Kim",
};

const KHAC: Record<NguHanh, NguHanh> = {
  Kim: "Moc",
  Moc: "Tho",
  Tho: "Thuy",
  Thuy: "Hoa",
  Hoa: "Kim",
};

export function tuongSinh(a: NguHanh): NguHanh {
  return SINH[a];
}

export function tuongKhac(a: NguHanh): NguHanh {
  return KHAC[a];
}

export function relation(a: NguHanh, b: NguHanh): "sinh" | "duoc-sinh" | "khac" | "bi-khac" | "cung" {
  if (a === b) return "cung";
  if (SINH[a] === b) return "sinh";
  if (SINH[b] === a) return "duoc-sinh";
  if (KHAC[a] === b) return "khac";
  return "bi-khac";
}

/** Cung mệnh / nạp âm năm sinh — deterministic from year can */
export function getBanMenhByYear(year: number): {
  canChi: string;
  element: NguHanh;
  label: string;
} {
  const { can, chi } = getYearCanChi(year);
  const element = getNguHanhFromCan(can);
  return {
    canChi: `${can}-${chi}`,
    element,
    label: NGU_HANH_VI[element],
  };
}

export const COLOR_BY_ELEMENT: Record<NguHanh, string[]> = {
  Kim: ["Trắng", "Bạc", "Vàng kim", "Xám"],
  Moc: ["Xanh lá", "Xanh lục", "Nâu gỗ"],
  Thuy: ["Đen", "Xanh dương", "Xanh navy"],
  Hoa: ["Đỏ", "Cam", "Hồng", "Tím"],
  Tho: ["Vàng đất", "Nâu", "Be", "Cam đất"],
};

export const DIRECTION_BY_ELEMENT: Record<NguHanh, string[]> = {
  Kim: ["Tây", "Tây Bắc"],
  Moc: ["Đông", "Đông Nam"],
  Thuy: ["Bắc"],
  Hoa: ["Nam"],
  Tho: ["Đông Bắc", "Tây Nam"],
};

export const LUCKY_NUMBERS: Record<NguHanh, number[]> = {
  Kim: [4, 7, 9],
  Moc: [3, 4, 8],
  Thuy: [1, 6],
  Hoa: [2, 7, 9],
  Tho: [2, 5, 8],
};

export function getFengShuiProfile(year: number) {
  const menh = getBanMenhByYear(year);
  return {
    ...menh,
    colors: COLOR_BY_ELEMENT[menh.element],
    directions: DIRECTION_BY_ELEMENT[menh.element],
    numbers: LUCKY_NUMBERS[menh.element],
    sinh: NGU_HANH_VI[tuongSinh(menh.element)],
    khac: NGU_HANH_VI[tuongKhac(menh.element)],
    disclaimer:
      "Ngũ hành bản mệnh theo can năm là quy ước phổ biến trong phong thủy dân gian Việt Nam, mang tính tham khảo văn hóa.",
  };
}
