import type { DayAssessment, DayPurpose, Gender, SolarDate } from "@/types";
import { DAY_PURPOSES } from "@/data/calendar/day-purposes";
import { CHI_ANIMAL, CHI_LIST } from "./constants";
import { buildDaySummary, getYearCanChi } from "./can-chi";

const PURPOSE_PREF: Record<
  string,
  { preferHoang: boolean; preferTruc: string[]; avoidTruc: string[] }
> = {
  "cuoi-hoi": {
    preferHoang: true,
    preferTruc: ["Thành", "Khai", "Định"],
    avoidTruc: ["Phá", "Nguy", "Bế"],
  },
  "an-hoi": {
    preferHoang: true,
    preferTruc: ["Thành", "Mãn", "Định"],
    avoidTruc: ["Phá", "Bế"],
  },
  "khai-truong": {
    preferHoang: true,
    preferTruc: ["Khai", "Thành", "Định"],
    avoidTruc: ["Bế", "Phá"],
  },
  "dong-tho": {
    preferHoang: true,
    preferTruc: ["Kiến", "Định", "Thành"],
    avoidTruc: ["Phá", "Thu"],
  },
  "nhap-trach": {
    preferHoang: true,
    preferTruc: ["Thành", "Định", "Khai"],
    avoidTruc: ["Phá", "Nguy"],
  },
  "mua-nha": {
    preferHoang: true,
    preferTruc: ["Thành", "Định"],
    avoidTruc: ["Phá", "Bế"],
  },
  "mua-xe": {
    preferHoang: true,
    preferTruc: ["Khai", "Thành"],
    avoidTruc: ["Phá", "Nguy"],
  },
  "ky-hop-dong": {
    preferHoang: true,
    preferTruc: ["Định", "Thành", "Mãn"],
    avoidTruc: ["Phá", "Nguy"],
  },
  "xuat-hanh": {
    preferHoang: true,
    preferTruc: ["Khai", "Thành"],
    avoidTruc: ["Bế", "Phá"],
  },
  "khoi-cong": {
    preferHoang: true,
    preferTruc: ["Kiến", "Định", "Khai"],
    avoidTruc: ["Phá", "Thu"],
  },
  "an-tang": {
    preferHoang: true,
    preferTruc: ["Bế", "Định", "Thành"],
    avoidTruc: ["Phá"],
  },
  "khai-truong-cua-hang": {
    preferHoang: true,
    preferTruc: ["Khai", "Thành", "Định"],
    avoidTruc: ["Bế", "Phá"],
  },
};

function ageAnimal(birthYear: number): string {
  const { chi } = getYearCanChi(birthYear);
  return CHI_ANIMAL[chi];
}

function xungWithDay(birthYear: number, dayChiIndex: number): boolean {
  const { chi } = getYearCanChi(birthYear);
  const ageIdx = CHI_LIST.indexOf(chi);
  // Tứ hành xung: ±6
  return (ageIdx + 6) % 12 === dayChiIndex;
}

export function getPurpose(id: string): DayPurpose | undefined {
  return DAY_PURPOSES.find((p) => p.id === id);
}

export function assessDay(params: {
  date: SolarDate;
  purposeId: string;
  birthYear?: number;
  gender?: Gender;
}): DayAssessment {
  const purpose =
    getPurpose(params.purposeId) ??
    DAY_PURPOSES[0] ?? {
      id: params.purposeId,
      name: params.purposeId,
      description: "",
    };
  const summary = buildDaySummary(params.date);
  const pref = PURPOSE_PREF[purpose.id] ?? PURPOSE_PREF["xuat-hanh"];
  const reasons: string[] = [];
  let score = 50;

  if (summary.isHoangDao && pref.preferHoang) {
    score += 18;
    reasons.push("Ngày thuộc nhóm chi thường gọi là Hoàng đạo (quan niệm dân gian).");
  } else if (!summary.isHoangDao) {
    score -= 12;
    reasons.push("Ngày thuộc nhóm chi thường gọi là Hắc đạo (quan niệm dân gian).");
  }

  if (pref.preferTruc.includes(summary.truc)) {
    score += 14;
    reasons.push(`Trực ${summary.truc} được xem là thuận hơn với mục đích ${purpose.name}.`);
  }
  if (pref.avoidTruc.includes(summary.truc)) {
    score -= 16;
    reasons.push(`Trực ${summary.truc} thường được khuyến cáo thận trọng với mục đích này.`);
  }

  if (summary.isTamNuong) {
    score -= 10;
    reasons.push("Ngày Tam nương theo quan niệm dân gian — nên cân nhắc.");
  }
  if (summary.isNguyetKy) {
    score -= 8;
    reasons.push("Ngày Nguyệt kỵ theo quan niệm dân gian — nên cân nhắc.");
  }
  if (summary.festivals.length) {
    score += 4;
    reasons.push(`Trùng ngày lễ/truyền thống: ${summary.festivals.join(", ")}.`);
  }

  const dayChiIdx = CHI_LIST.indexOf(summary.canChi.dayChi);
  const hopTuoi: string[] = [];
  const xungTuoi: string[] = [];
  if (params.birthYear) {
    const animal = ageAnimal(params.birthYear);
    if (xungWithDay(params.birthYear, dayChiIdx)) {
      score -= 12;
      xungTuoi.push(animal);
      reasons.push(`Tuổi ${animal} xung với chi ngày theo quy ước ±6 chi.`);
    } else {
      hopTuoi.push(animal);
      score += 4;
      reasons.push(`Tuổi ${animal} không xung trực tiếp với chi ngày theo quy ước kiểm tra.`);
    }
  }

  score = Math.max(0, Math.min(100, score));
  const rating =
    score >= 75 ? "tot" : score >= 55 ? "trung-binh" : score >= 40 ? "nen-tranh" : "xau";

  const huongMap = ["Bắc", "Đông Bắc", "Đông", "Đông Nam", "Nam", "Tây Nam", "Tây", "Tây Bắc"];
  const huongXuatHanh = [
    huongMap[dayChiIdx % 8],
    huongMap[(dayChiIdx + 2) % 8],
  ];

  return {
    date: params.date,
    purpose,
    score,
    rating,
    reasons,
    dayDetail: {
      ...summary,
      disclaimer: summary.disclaimer,
    },
    goodHours: summary.gioHoangDao,
    badHours: summary.gioHacDao,
    hopTuoi,
    xungTuoi,
    huongXuatHanh,
    disclaimer:
      "Đánh giá tổng hợp từ thuật toán lịch (âm/dương, can chi) kết hợp quy ước dân gian (hoàng đạo, trực, tam nương). Đây là công cụ tham khảo văn hóa, không phải lời khuyên pháp lý hay định mệnh.",
  };
}

export function findGoodDaysInMonth(params: {
  year: number;
  month: number;
  purposeId: string;
  birthYear?: number;
  minScore?: number;
}) {
  const daysInMonth = new Date(params.year, params.month, 0).getDate();
  const results: DayAssessment[] = [];
  for (let d = 1; d <= daysInMonth; d += 1) {
    const a = assessDay({
      date: { day: d, month: params.month, year: params.year },
      purposeId: params.purposeId,
      birthYear: params.birthYear,
    });
    if (a.score >= (params.minScore ?? 65)) results.push(a);
  }
  return results.sort((a, b) => b.score - a.score);
}
