/**
 * Tử vi overview engine — structured cultural readings keyed by year/month/day stems.
 * This is NOT a full Zi Wei Dou Shu palace chart engine.
 * Content is clearly labeled as folk/reference synthesized from deterministic keys.
 */

import type { Gender, SolarDate, TuViProfile } from "@/types";
import { CHI_ANIMAL, NGU_HANH_VI } from "@/lib/algorithms/calendar/constants";
import { getCanChiInfo, getNapAm } from "@/lib/algorithms/calendar/can-chi";
import { solarToLunar } from "@/lib/algorithms/calendar/lunar";
import { getBanMenhByYear } from "@/lib/algorithms/feng-shui/ngu-hanh";
import { ZODIAC_ANIMALS } from "@/data/zodiac/animals";

function hourChiIndex(hour: number): number {
  // 23-1 Tý=0 ...
  if (hour === 23 || hour === 0) return 0;
  return Math.floor(((hour + 1) % 24) / 2);
}

const LIFE_THEMES = [
  "Công danh cần kiên trì và tích lũy uy tín.",
  "Tài lộc đến từ sự ổn định hơn là rủi ro ngắn hạn.",
  "Tình duyên đề cao sự chân thành và lắng nghe.",
  "Gia đạo thuận khi giữ hòa khí và trách nhiệm.",
  "Sức khỏe cần nhịp sống điều độ, tránh lao lực.",
  "Hậu vận tốt hơn nếu biết tiết chế và tích đức.",
] as const;

function pickTheme(seed: number, offset: number): string {
  return LIFE_THEMES[(seed + offset) % LIFE_THEMES.length];
}

export function buildTuViTronDoi(profile: TuViProfile) {
  const lunar = solarToLunar(
    profile.birth.day,
    profile.birth.month,
    profile.birth.year,
  );
  const canChi = getCanChiInfo(profile.birth, lunar);
  const menh = getBanMenhByYear(profile.birth.year);
  const napAm = getNapAm(canChi.yearCan, canChi.yearChi);
  const animal = CHI_ANIMAL[canChi.yearChi];
  const seed =
    profile.birth.year * 10000 +
    profile.birth.month * 100 +
    profile.birth.day +
    hourChiIndex(profile.birthHour) +
    (profile.gender === "nam" ? 1 : 2);

  return {
    profile,
    lunar,
    canChi,
    menh,
    napAm,
    animal,
    cungMenh: `Cung Mệnh tham chiếu theo chi năm ${canChi.yearLabel} và giờ sinh (chỉ số ${hourChiIndex(profile.birthHour)}).`,
    cungThan: `Cung Thân mang tính tham khảo theo quy ước dân gian kết hợp giới tính ${profile.gender === "nam" ? "Nam" : "Nữ"}.`,
    overview: `${profile.fullName} sinh năm ${canChi.yearLabel} (${animal}), nạp âm ${napAm}, ngũ hành bản mệnh ${NGU_HANH_VI[menh.element]}. Luận giải dưới đây là tổng hợp có cấu trúc theo khóa ngày sinh, mang tính tham khảo văn hóa — chưa phải lá số Tử Vi Đẩu Số đầy đủ các chính tinh.`,
    career: pickTheme(seed, 0),
    wealth: pickTheme(seed, 1),
    love: pickTheme(seed, 2),
    family: pickTheme(seed, 3),
    health: pickTheme(seed, 4),
    lateLife: pickTheme(seed, 5),
    dataStatus: "cau-truc-san-sang" as const,
    missingNote:
      "Cần bổ sung dữ liệu chính tinh/phụ tinh Đẩu Số nếu muốn luận cung chuẩn. Hiện tại dùng khung tổng quan định tính có seed.",
    disclaimer:
      "Phân biệt: đây là tử vi phương Đông mang tính tham khảo văn hóa. Không đồng nhất với cung hoàng đạo phương Tây.",
  };
}

export function buildTuViNam(profile: TuViProfile, year: number) {
  const base = buildTuViTronDoi(profile);
  const yearCC = getCanChiInfo({ day: 1, month: 1, year });
  const seed = profile.birth.year + year + hourChiIndex(profile.birthHour);
  const months = Array.from({ length: 12 }, (_, i) => {
    const s = (seed + i * 7) % 100;
    return {
      month: i + 1,
      rating: (s >= 70 ? "tot" : s >= 45 ? "trung-binh" : "can-than") as
        | "tot"
        | "trung-binh"
        | "can-than",
      note: pickTheme(seed, i),
    };
  });
  return {
    ...base,
    viewYear: year,
    yearCanChi: yearCC.yearLabel,
    yearOverview: `Năm ${year} (${yearCC.yearLabel}): nhịp vận được tổng hợp định tính theo khóa năm xem và năm sinh.`,
    work: pickTheme(seed, 0),
    finance: pickTheme(seed, 1),
    relationship: pickTheme(seed, 2),
    familyYear: pickTheme(seed, 3),
    healthYear: pickTheme(seed, 4),
    months,
  };
}

export function buildTuViThang(profile: TuViProfile, year: number, month: number) {
  const yearView = buildTuViNam(profile, year);
  const m = yearView.months[month - 1];
  return {
    profile,
    year,
    month,
    overview: m?.note ?? "Tháng mang tính ổn định, nên giữ nhịp đều.",
    rating: m?.rating ?? "trung-binh",
    disclaimer: yearView.disclaimer,
  };
}

export function buildTuViNgay(profile: TuViProfile, date: SolarDate) {
  const summarySeed =
    date.year * 10000 + date.month * 100 + date.day + profile.birth.year;
  return {
    profile,
    date,
    overview: pickTheme(summarySeed, 0),
    focus: pickTheme(summarySeed, 2),
    caution: pickTheme(summarySeed, 4),
    disclaimer:
      "Tử vi hàng ngày mang tính gợi ý văn hóa theo khóa ngày, không phải dự báo khoa học.",
  };
}

export function getTuViByAnimal(animalId: string) {
  return ZODIAC_ANIMALS.find((a) => a.id === animalId) ?? null;
}

export function getTuViByAgeGender(birthYear: number, gender: Gender) {
  const menh = getBanMenhByYear(birthYear);
  const { yearChi } = getCanChiInfo({ day: 1, month: 1, year: birthYear });
  // Year branch follows the lunar year of 1 January, so a birthday before Tết can differ.
  const animal = CHI_ANIMAL[yearChi];
  return {
    birthYear,
    gender,
    animal,
    menh,
    overview: `Tuổi ${animal}, bản mệnh ${NGU_HANH_VI[menh.element]}, giới tính ${gender === "nam" ? "Nam" : "Nữ"} — luận giải tổng quan theo quan niệm dân gian.`,
    disclaimer:
      "Nội dung theo khung tuổi/giới tính dân gian, cần bổ sung chuyên luận chi tiết nếu triển khai dịch vụ cao cấp.",
  };
}
