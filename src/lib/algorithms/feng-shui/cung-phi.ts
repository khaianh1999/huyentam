/**
 * Cung phi (cung mệnh Bát trạch) theo năm sinh âm lịch và giới tính,
 * cùng bảng tám hướng Sinh Khí, Thiên Y, Diên Niên, Phục Vị, Tuyệt Mệnh, Ngũ Quỷ, Lục Sát, Họa Hại.
 */

import type { Gender, NguHanh } from "@/types";

export type CungName = "Khảm" | "Khôn" | "Chấn" | "Tốn" | "Càn" | "Đoài" | "Cấn" | "Ly";
export type Direction = "Bắc" | "Đông Bắc" | "Đông" | "Đông Nam" | "Nam" | "Tây Nam" | "Tây" | "Tây Bắc";
export type StarName =
  | "Sinh Khí"
  | "Thiên Y"
  | "Diên Niên"
  | "Phục Vị"
  | "Tuyệt Mệnh"
  | "Ngũ Quỷ"
  | "Lục Sát"
  | "Họa Hại";

export type CungPhi = {
  name: CungName;
  element: NguHanh;
  group: "Đông tứ mệnh" | "Tây tứ mệnh";
  home: Direction;
};

const CUNG: Record<CungName, Omit<CungPhi, "name">> = {
  Khảm: { element: "Thuy", group: "Đông tứ mệnh", home: "Bắc" },
  Ly: { element: "Hoa", group: "Đông tứ mệnh", home: "Nam" },
  Chấn: { element: "Moc", group: "Đông tứ mệnh", home: "Đông" },
  Tốn: { element: "Moc", group: "Đông tứ mệnh", home: "Đông Nam" },
  Càn: { element: "Kim", group: "Tây tứ mệnh", home: "Tây Bắc" },
  Đoài: { element: "Kim", group: "Tây tứ mệnh", home: "Tây" },
  Khôn: { element: "Tho", group: "Tây tứ mệnh", home: "Tây Nam" },
  Cấn: { element: "Tho", group: "Tây tứ mệnh", home: "Đông Bắc" },
};

const BY_NUMBER: Record<number, CungName> = {
  1: "Khảm",
  2: "Khôn",
  3: "Chấn",
  4: "Tốn",
  6: "Càn",
  7: "Đoài",
  8: "Cấn",
  9: "Ly",
};

/** Năm âm lịch (người sinh trước Tết tính năm trước). Số 5: nam là Khôn, nữ là Cấn. */
export function getCungPhi(lunarYear: number, gender: Gender): CungPhi {
  const base = ((lunarYear % 9) + 9) % 9;
  let number = gender === "nam" ? (11 - base) % 9 : (base + 4) % 9;
  if (number === 0) number = 9;
  const name: CungName = number === 5 ? (gender === "nam" ? "Khôn" : "Cấn") : BY_NUMBER[number];
  return { name, ...CUNG[name] };
}

/** Tám hướng theo thứ tự Sinh Khí, Thiên Y, Diên Niên, Phục Vị, Tuyệt Mệnh, Ngũ Quỷ, Lục Sát, Họa Hại. */
const BAT_TRACH: Record<CungName, Direction[]> = {
  Khảm: ["Đông Nam", "Đông", "Nam", "Bắc", "Tây Nam", "Đông Bắc", "Tây Bắc", "Tây"],
  Ly: ["Đông", "Đông Nam", "Bắc", "Nam", "Tây Bắc", "Tây", "Tây Nam", "Đông Bắc"],
  Chấn: ["Nam", "Bắc", "Đông Nam", "Đông", "Tây", "Tây Bắc", "Đông Bắc", "Tây Nam"],
  Tốn: ["Bắc", "Nam", "Đông", "Đông Nam", "Đông Bắc", "Tây Nam", "Tây", "Tây Bắc"],
  Càn: ["Tây", "Đông Bắc", "Tây Nam", "Tây Bắc", "Nam", "Đông", "Bắc", "Đông Nam"],
  Khôn: ["Đông Bắc", "Tây", "Tây Bắc", "Tây Nam", "Bắc", "Đông Nam", "Nam", "Đông"],
  Cấn: ["Tây Nam", "Tây Bắc", "Tây", "Đông Bắc", "Đông Nam", "Bắc", "Đông", "Nam"],
  Đoài: ["Tây Bắc", "Tây Nam", "Đông Bắc", "Tây", "Đông", "Nam", "Đông Nam", "Bắc"],
};

const STAR_ORDER: StarName[] = [
  "Sinh Khí",
  "Thiên Y",
  "Diên Niên",
  "Phục Vị",
  "Tuyệt Mệnh",
  "Ngũ Quỷ",
  "Lục Sát",
  "Họa Hại",
];

export const STAR_MEANING: Record<StarName, { good: boolean; meaning: string; use: string }> = {
  "Sinh Khí": {
    good: true,
    meaning: "Hướng tốt nhất, chủ về tài lộc, danh tiếng và sức sống.",
    use: "Đặt cửa chính, bàn làm việc, quầy thu ngân.",
  },
  "Thiên Y": {
    good: true,
    meaning: "Chủ về sức khỏe, quý nhân và sự che chở.",
    use: "Hợp phòng ngủ người lớn tuổi, bếp hướng về, nơi đặt thuốc.",
  },
  "Diên Niên": {
    good: true,
    meaning: "Chủ về hòa thuận, tình cảm vợ chồng và các mối quan hệ bền lâu.",
    use: "Hợp phòng ngủ vợ chồng, phòng khách.",
  },
  "Phục Vị": {
    good: true,
    meaning: "Chủ về sự ổn định, tĩnh tâm và học hành.",
    use: "Hợp bàn thờ, bàn học, phòng đọc.",
  },
  "Tuyệt Mệnh": {
    good: false,
    meaning: "Hướng nên tránh nhất cho các việc quan trọng.",
    use: "Hợp đặt nhà vệ sinh, kho chứa đồ.",
  },
  "Ngũ Quỷ": {
    good: false,
    meaning: "Dễ gây thị phi, hao tổn; nên tránh cửa chính.",
    use: "Hợp đặt bếp đun (lấy lửa trấn), nhà kho.",
  },
  "Lục Sát": {
    good: false,
    meaning: "Dễ sinh chuyện tình cảm rắc rối, kiện tụng nhỏ.",
    use: "Hợp đặt nhà tắm, nhà vệ sinh.",
  },
  "Họa Hại": {
    good: false,
    meaning: "Dễ gặp phiền toái vặt, thất thoát nhỏ.",
    use: "Hợp đặt kho, phòng phụ.",
  },
};

export function getDirections(cung: CungName) {
  return STAR_ORDER.map((star, index) => ({ star, direction: BAT_TRACH[cung][index], ...STAR_MEANING[star] }));
}

/** Sao bát trạch giữa hai cung phi: lấy hướng gốc của cung người kia tra trong bảng của người này. */
export function getPairStar(a: CungName, b: CungName): StarName {
  const index = BAT_TRACH[a].indexOf(CUNG[b].home);
  return STAR_ORDER[index];
}
