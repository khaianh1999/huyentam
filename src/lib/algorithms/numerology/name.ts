import type { Gender, NguHanh, NumerologyResult, SolarDate } from "@/types";
import { getBanMenhByYear, relation } from "@/lib/algorithms/feng-shui/ngu-hanh";
import { CAN_VI, CHI_VI, NGU_HANH_VI } from "@/lib/algorithms/calendar/constants";
import { getYearCanChi } from "@/lib/algorithms/calendar/can-chi";
import { solarToLunar } from "@/lib/algorithms/calendar/lunar";
import { lookupGivenName, type GivenName } from "@/data/name/given-names";

const LETTER_MAP: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
  s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
};

const VOWELS = new Set(["a", "e", "i", "o", "u", "y"]);

function normalizeName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .trim();
}

function reduceNumber(n: number): number {
  if (n === 11 || n === 22 || n === 33) return n;
  let x = n;
  while (x > 9) {
    x = String(x)
      .split("")
      .reduce((s, d) => s + Number(d), 0);
    if (x === 11 || x === 22 || x === 33) return x;
  }
  return x;
}

function sumLetters(text: string, predicate: (ch: string) => boolean): number {
  return text
    .replace(/\s/g, "")
    .split("")
    .filter(predicate)
    .reduce((s, ch) => s + (LETTER_MAP[ch] ?? 0), 0);
}

function lifePath(birth: SolarDate): number {
  const raw = birth.day + birth.month + birth.year
    .toString()
    .split("")
    .reduce((s, d) => s + Number(d), 0);
  return reduceNumber(raw);
}

function nameElementFromDestiny(destiny: number): NguHanh {
  const map: Record<number, NguHanh> = {
    1: "Thuy",
    2: "Tho",
    3: "Moc",
    4: "Kim",
    5: "Tho",
    6: "Kim",
    7: "Hoa",
    8: "Tho",
    9: "Hoa",
    11: "Thuy",
    22: "Tho",
    33: "Hoa",
  };
  return map[destiny] ?? "Tho";
}

const MEANINGS: Record<number, string> = {
  1: "Số 1: tinh thần tiên phong, độc lập, dẫn dắt.",
  2: "Số 2: hòa hợp, hợp tác, nhạy cảm.",
  3: "Số 3: sáng tạo, giao tiếp, lạc quan.",
  4: "Số 4: kỷ luật, nền tảng, thực tế.",
  5: "Số 5: tự do, thay đổi, khám phá.",
  6: "Số 6: trách nhiệm, yêu thương, gia đình.",
  7: "Số 7: nội tâm, phân tích, tâm linh.",
  8: "Số 8: quyền lực, thành tựu vật chất.",
  9: "Số 9: nhân ái, hoàn thiện, bao dung.",
  11: "Số 11: trực giác mạnh, cảm hứng.",
  22: "Số 22: xây dựng lớn, hiện thực hóa tầm nhìn.",
  33: "Số 33: phụng sự, chữa lành, dẫn dắt bằng trái tim.",
};

export function analyzeName(
  fullName: string,
  birthDate: SolarDate,
  gender: Gender,
): NumerologyResult {
  const normalized = normalizeName(fullName);
  const destiny = reduceNumber(sumLetters(normalized, () => true));
  const soul = reduceNumber(sumLetters(normalized, (c) => VOWELS.has(c)));
  const personality = reduceNumber(
    sumLetters(normalized, (c) => !VOWELS.has(c)),
  );
  const path = lifePath(birthDate);
  const nameElement = nameElementFromDestiny(destiny);
  const lunarYear = solarToLunar(birthDate.day, birthDate.month, birthDate.year).year;
  const birthElement = getBanMenhByYear(lunarYear).element;
  const rel = relation(nameElement, birthElement);
  const harmony =
    rel === "cung" || rel === "sinh" || rel === "duoc-sinh"
      ? "hao-hoa"
      : rel === "khac" || rel === "bi-khac"
        ? "xung-khac"
        : "trung-tinh";

  return {
    fullName,
    birthDate,
    gender,
    lifePath: path,
    soul,
    personality,
    destiny,
    nameElement,
    birthElement,
    harmony,
    meaning: MEANINGS[destiny] ?? "Chỉ số sứ mệnh mang tính tham khảo thần số học.",
    overview: `Tên "${fullName}" cho chỉ số sứ mệnh ${destiny}, linh hồn ${soul}, nhân cách ${personality}, số chủ đạo ${path}. Ngũ hành tên (${NGU_HANH_VI[nameElement]}) so với bản mệnh năm sinh (${NGU_HANH_VI[birthElement]}) được đánh giá ${harmony === "hao-hoa" ? "hài hòa" : harmony === "xung-khac" ? "cần cân nhắc" : "trung tính"} theo quy ước ngũ hành.`,
    disclaimer:
      "Thần số học Pythagore và đối chiếu ngũ hành tên là hệ thống diễn giải hiện đại/dân gian, mang tính tham khảo văn hóa, không phải kết luận khoa học hay định mệnh.",
  };
}

function digitSum(n: number): number {
  return String(n)
    .split("")
    .reduce((sum, d) => sum + Number(d), 0);
}

/** Rút về 1 đến 9, không giữ số bậc thầy (dùng cho năm cá nhân). */
function reduceSimple(n: number): number {
  let x = n;
  while (x > 9) x = digitSum(x);
  return x;
}

export interface NamePart {
  word: string;
  role: "ho" | "dem" | "ten";
  number: number;
  given: GivenName | null;
}

export interface NameDetail {
  maturity: number;
  parts: NamePart[];
  lunarYear: number;
  canChi: string;
  napAm: string;
  relation: ReturnType<typeof relation>;
  givenElement: NguHanh | null;
  givenRelation: ReturnType<typeof relation> | null;
}

/** Phần luận chi tiết thêm: số trưởng thành, số từng chữ, ý nghĩa tên chính, quan hệ ngũ hành. */
export function analyzeNameDetail(result: NumerologyResult): NameDetail {
  const words = result.fullName.trim().split(/\s+/).filter(Boolean);
  const parts: NamePart[] = words.map((word, index) => ({
    word,
    role: index === words.length - 1 ? "ten" : index === 0 && words.length > 1 ? "ho" : "dem",
    number: reduceNumber(sumLetters(normalizeName(word), () => true)),
    given: index === words.length - 1 ? lookupGivenName(word) : null,
  }));
  const { birthDate } = result;
  const lunarYear = solarToLunar(birthDate.day, birthDate.month, birthDate.year).year;
  const menh = getBanMenhByYear(lunarYear);
  const given = parts.at(-1)?.given ?? null;
  return {
    maturity: reduceNumber(result.lifePath + result.destiny),
    parts,
    lunarYear,
    canChi: `${CAN_VI[getYearCanChi(lunarYear).can]} ${CHI_VI[getYearCanChi(lunarYear).chi]}`,
    napAm: menh.napAm,
    relation: relation(result.nameElement, result.birthElement),
    givenElement: given?.element ?? null,
    givenRelation: given ? relation(given.element, result.birthElement) : null,
  };
}

/** Năm cá nhân trong chu kỳ 9 năm, tính theo ngày tháng sinh và năm đang xét. */
export function personalYear(birth: SolarDate, year: number): number {
  return reduceSimple(digitSum(birth.day) + digitSum(birth.month) + digitSum(year));
}
