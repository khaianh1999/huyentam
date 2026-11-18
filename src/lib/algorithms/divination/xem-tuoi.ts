/**
 * Xem tuổi hai người theo năm tiêu chí quen dùng ở Việt Nam:
 * mệnh nạp âm, thiên can, địa chi, cung phi Bát trạch và ngũ hành cung phi.
 * Mỗi tiêu chí tối đa 2 điểm, tổng 10 điểm. Lời luận viết theo hướng động viên, tham khảo văn hóa.
 */

import type { Can, Chi, Gender, NguHanh } from "@/types";
import { CAN_ELEMENT, CAN_LIST, CAN_VI, CHI_ANIMAL, CHI_LIST, CHI_VI, NGU_HANH_VI } from "@/lib/algorithms/calendar/constants";
import { getYearCanChi } from "@/lib/algorithms/calendar/can-chi";
import { getBanMenhByYear, relation } from "@/lib/algorithms/feng-shui/ngu-hanh";
import { getCungPhi, getPairStar, STAR_MEANING, type CungPhi, type StarName } from "@/lib/algorithms/feng-shui/cung-phi";

export type PersonInput = { year: number; gender: Gender; label: string };

export type PersonProfile = PersonInput & {
  can: Can;
  chi: Chi;
  canChi: string;
  animal: string;
  napAm: string;
  menh: NguHanh;
  cung: CungPhi;
};

export type Criterion = {
  key: "menh" | "can" | "chi" | "cung" | "hanh-cung";
  title: string;
  verdict: string;
  score: number;
  detail: string;
  remedy?: string;
};

export function buildProfile(input: PersonInput): PersonProfile {
  const { can, chi } = getYearCanChi(input.year);
  const menh = getBanMenhByYear(input.year);
  return {
    ...input,
    can,
    chi,
    canChi: `${CAN_VI[can]} ${CHI_VI[chi]}`,
    animal: CHI_ANIMAL[chi],
    napAm: menh.napAm,
    menh: menh.element,
    cung: getCungPhi(input.year, input.gender),
  };
}

const CAN_HOP: [Can, Can][] = [
  ["Giap", "Ky"],
  ["At", "Canh"],
  ["Binh", "Tan"],
  ["Dinh", "Nham"],
  ["Mau", "Quy"],
];
const LUC_HAI: [Chi, Chi][] = [
  ["Ty", "Mui"],
  ["Suu", "Ngo"],
  ["Dan", "Ti"],
  ["Mao", "Thin"],
  ["Than", "Hoi"],
  ["Dau", "Tuat"],
];
const TUONG_HINH: Chi[][] = [
  ["Ty", "Mao"],
  ["Dan", "Ti", "Than"],
  ["Suu", "Tuat", "Mui"],
];
const TU_HINH: Chi[] = ["Thin", "Ngo", "Dau", "Hoi"];

const pairIn = <T,>(list: T[][], a: T, b: T) => list.some((group) => a !== b && group.includes(a) && group.includes(b));

function elementLine(a: NguHanh, b: NguHanh, nameA: string, nameB: string): { score: number; verdict: string; detail: string } {
  const rel = relation(a, b);
  const A = NGU_HANH_VI[a];
  const B = NGU_HANH_VI[b];
  if (rel === "sinh") return { score: 2, verdict: "Tương sinh", detail: `${A} sinh ${B}: ${nameA} là nguồn nâng đỡ cho ${nameB}, hai người bồi đắp cho nhau.` };
  if (rel === "duoc-sinh") return { score: 2, verdict: "Tương sinh", detail: `${B} sinh ${A}: ${nameB} là nguồn nâng đỡ cho ${nameA}, hai người bồi đắp cho nhau.` };
  if (rel === "cung") return { score: 1, verdict: "Bình hòa", detail: `Cùng hành ${A}: hai người hiểu nhau nhanh, dễ đồng điệu nhưng nên bổ sung cho nhau những điểm còn thiếu.` };
  const strong = rel === "khac" ? `${A} khắc ${B}` : `${B} khắc ${A}`;
  return { score: 0, verdict: "Tương khắc", detail: `${strong}: hai cá tính khác nhau, cần nhường nhịn và tôn trọng cách sống của người kia.` };
}

const ELEMENT_COLOR: Record<NguHanh, string> = {
  Kim: "trắng, ánh kim",
  Moc: "xanh lá",
  Thuy: "xanh dương, đen",
  Hoa: "đỏ, hồng",
  Tho: "vàng, nâu đất",
};

/** Hành trung gian để hóa giải: hành được bên khắc sinh ra và sinh cho bên bị khắc. */
function bridgeOf(a: NguHanh, b: NguHanh): NguHanh {
  const rel = relation(a, b);
  const strong = rel === "khac" ? a : b;
  const order: NguHanh[] = ["Kim", "Thuy", "Moc", "Hoa", "Tho"];
  return order[(order.indexOf(strong) + 1) % 5];
}

export function compareCan(a: Can, b: Can): { score: number; verdict: string; detail: string } {
  const A = CAN_VI[a];
  const B = CAN_VI[b];
  if (CAN_HOP.some(([x, y]) => (x === a && y === b) || (x === b && y === a))) {
    return { score: 2, verdict: "Tương hợp", detail: `${A} và ${B} là cặp thiên can ngũ hợp: tâm ý dễ gặp nhau, cùng chí hướng trong việc lớn.` };
  }
  if (a === b) return { score: 1, verdict: "Bình hòa", detail: `Cùng can ${A}: cách nghĩ giống nhau, dễ đồng thuận nhưng đôi khi cùng cứng.` };
  const rel = relation(CAN_ELEMENT[a], CAN_ELEMENT[b]);
  if (rel === "sinh" || rel === "duoc-sinh") {
    return { score: 1.5, verdict: "Tương sinh", detail: `${A} (${NGU_HANH_VI[CAN_ELEMENT[a]]}) và ${B} (${NGU_HANH_VI[CAN_ELEMENT[b]]}) tương sinh: một người khởi xướng, một người tiếp sức rất ăn ý.` };
  }
  if (rel === "cung") return { score: 1, verdict: "Bình hòa", detail: `${A} và ${B} cùng hành, quan hệ êm và ít va chạm.` };
  return { score: 0.5, verdict: "Tương khắc", detail: `${A} và ${B} có thiên can khắc nhau: đôi lúc khác ý về cách làm, nên thống nhất trước mục tiêu chung.` };
}

export function compareChi(a: Chi, b: Chi): { score: number; verdict: string; detail: string } {
  const A = `${CHI_VI[a]} (${CHI_ANIMAL[a]})`;
  const B = `${CHI_VI[b]} (${CHI_ANIMAL[b]})`;
  const ia = CHI_LIST.indexOf(a);
  const ib = CHI_LIST.indexOf(b);
  if ((ia + ib) % 12 === 1) return { score: 2, verdict: "Lục hợp", detail: `${A} và ${B} là cặp lục hợp (nhị hợp): rất hợp nhau, bổ sung cho nhau như hai nửa.` };
  if (ia !== ib && (ia - ib) % 4 === 0) return { score: 2, verdict: "Tam hợp", detail: `${A} và ${B} cùng một bộ tam hợp: chung chí hướng, làm việc gì cũng dễ nên.` };
  if (Math.abs(ia - ib) === 6) return { score: 0, verdict: "Lục xung", detail: `${A} và ${B} là cặp lục xung: tính cách đối lập, cần nhiều nhẫn nại; ngược lại cũng là hai người bù trừ cho nhau.` };
  if (LUC_HAI.some(([x, y]) => (x === a && y === b) || (x === b && y === a))) {
    return { score: 0.5, verdict: "Lục hại", detail: `${A} và ${B} thuộc lục hại: dễ có hiểu lầm nhỏ, nên nói rõ với nhau thay vì đoán ý.` };
  }
  if (pairIn(TUONG_HINH, a, b)) return { score: 0.5, verdict: "Tương hình", detail: `${A} và ${B} thuộc tương hình: đôi khi góp ý hơi gắt, nên mềm mỏng hơn trong lời nói.` };
  if (ia === ib) {
    return TU_HINH.includes(a)
      ? { score: 0.5, verdict: "Tự hình", detail: `Cùng tuổi ${A} (tự hình): rất hiểu nhau nhưng dễ cùng nóng; nên nhường nhau một nhịp.` }
      : { score: 1, verdict: "Cùng tuổi", detail: `Cùng tuổi ${A}: hiểu nhau từ cách nghĩ đến thói quen.` };
  }
  return { score: 1, verdict: "Bình hòa", detail: `${A} và ${B} không hợp không xung: quan hệ bình ổn, tốt xấu tùy vào cách hai người vun đắp.` };
}

const CUNG_SCORE: Record<StarName, number> = {
  "Sinh Khí": 2,
  "Diên Niên": 2,
  "Thiên Y": 2,
  "Phục Vị": 1.5,
  "Họa Hại": 0.5,
  "Lục Sát": 0.5,
  "Ngũ Quỷ": 0,
  "Tuyệt Mệnh": 0,
};

const CUNG_DETAIL: Record<StarName, string> = {
  "Sinh Khí": "Sinh Khí: cặp đôi đem lại sinh lực và tài lộc cho nhau, càng ở cạnh càng làm ăn khấm khá.",
  "Diên Niên": "Diên Niên: tình cảm bền lâu, gia đạo hòa thuận, ăn đời ở kiếp.",
  "Thiên Y": "Thiên Y: hai người như thuốc quý của nhau, nâng đỡ sức khỏe và tinh thần.",
  "Phục Vị": "Phục Vị: cuộc sống ổn định, bình yên, cùng nhau gìn giữ.",
  "Họa Hại": "Họa Hại: hay gặp phiền toái vặt; chịu khó chia sẻ việc nhà sẽ yên ổn.",
  "Lục Sát": "Lục Sát: dễ có bất đồng nhỏ trong chuyện tình cảm; nên dành thời gian riêng cho nhau.",
  "Ngũ Quỷ": "Ngũ Quỷ: dễ sinh tranh cãi; chọn hướng nhà và giường theo cung tốt của người chồng sẽ giúp êm hơn.",
  "Tuyệt Mệnh": "Tuyệt Mệnh: cần nhiều vun đắp; chọn hướng nhà theo cung phi người chủ và sống chân thành sẽ hóa giải dần.",
};

export function compareTuoi(a: PersonInput, b: PersonInput) {
  const A = buildProfile(a);
  const B = buildProfile(b);
  const criteria: Criterion[] = [];

  const menh = elementLine(A.menh, B.menh, A.label, B.label);
  criteria.push({
    key: "menh",
    title: "Mệnh nạp âm",
    ...menh,
    detail: `${A.napAm} và ${B.napAm}. ${menh.detail}`,
    remedy:
      menh.score === 0
        ? `Dân gian hóa giải bằng hành ${NGU_HANH_VI[bridgeOf(A.menh, B.menh)]} làm trung gian: dùng màu ${ELEMENT_COLOR[bridgeOf(A.menh, B.menh)]} trong nhà và đồ dùng chung.`
        : undefined,
  });

  criteria.push({ key: "can", title: "Thiên can", ...compareCan(A.can, B.can) });
  const chi = compareChi(A.chi, B.chi);
  criteria.push({
    key: "chi",
    title: "Địa chi",
    ...chi,
    remedy:
      chi.score <= 0.5
        ? `Sinh con tuổi ${tamHopBridge(A.chi, B.chi)} được xem là cầu nối giúp gia đình thêm gắn kết.`
        : undefined,
  });

  const star = getPairStar(A.cung.name, B.cung.name);
  criteria.push({
    key: "cung",
    title: "Cung phi Bát trạch",
    score: CUNG_SCORE[star],
    verdict: star,
    detail: `${A.label} cung ${A.cung.name}, ${B.label} cung ${B.cung.name}, phối thành ${CUNG_DETAIL[star]}`,
    remedy: STAR_MEANING[star].good ? undefined : "Nên đặt cửa chính và đầu giường theo hướng tốt của người chủ nhà.",
  });

  const hanhCung = elementLine(A.cung.element, B.cung.element, A.label, B.label);
  criteria.push({
    key: "hanh-cung",
    title: "Ngũ hành cung phi",
    ...hanhCung,
    detail: `Cung ${A.cung.name} hành ${NGU_HANH_VI[A.cung.element]}, cung ${B.cung.name} hành ${NGU_HANH_VI[B.cung.element]}. ${hanhCung.detail}`,
  });

  const total = Math.round(criteria.reduce((sum, item) => sum + item.score, 0) * 10) / 10;
  const level =
    total >= 8 ? "Rất hợp" : total >= 6.5 ? "Hợp" : total >= 5 ? "Khá hợp" : total >= 3.5 ? "Bình hòa" : "Cần dung hòa";
  const summary =
    total >= 8
      ? "Một cặp rất đẹp: nhiều tiêu chí cùng tương hợp, hai người dễ nâng đỡ nhau trong cả tình cảm lẫn công việc."
      : total >= 6.5
        ? "Hai tuổi hợp nhau: điểm mạnh nhiều hơn điểm cần lưu ý, chỉ cần vun đắp là rất bền."
        : total >= 5
          ? "Hai tuổi khá hợp: có chỗ bổ sung tốt cho nhau, vài điểm cần nhường nhịn sẽ thành ưu thế."
          : total >= 3.5
            ? "Hai tuổi bình hòa: không xung mạnh, hạnh phúc phụ thuộc nhiều vào cách hai người cư xử."
            : "Hai tuổi cần dung hòa: khác biệt nhiều nhưng có cách hóa giải, và tình cảm chân thành luôn quan trọng hơn tuổi.";
  return { a: A, b: B, criteria, total, level, summary };
}

/** Chi tạo tam hợp với ít nhất một người, ưu tiên chi hợp cả hai. */
function tamHopBridge(a: Chi, b: Chi): string {
  const ia = CHI_LIST.indexOf(a);
  const ib = CHI_LIST.indexOf(b);
  const good = CHI_LIST.filter((chi, index) => {
    const withA = (index - ia) % 4 === 0 || (index + ia) % 12 === 1;
    const withB = (index - ib) % 4 === 0 || (index + ib) % 12 === 1;
    return withA && withB && chi !== a && chi !== b;
  });
  const list = good.length ? good : CHI_LIST.filter((_, index) => index !== ia && (index - ia) % 4 === 0);
  return list.map((chi) => `${CHI_VI[chi]} (${CHI_ANIMAL[chi]})`).join(", ");
}

const TAM_TAI: Record<number, Chi[]> = {
  // nhóm tam hợp (theo chi sinh) -> 3 năm tam tai
  0: ["Dan", "Mao", "Thin"], // Thân Tý Thìn
  1: ["Hoi", "Ty", "Suu"], // Tỵ Dậu Sửu
  2: ["Than", "Dau", "Tuat"], // Dần Ngọ Tuất
  3: ["Ti", "Ngo", "Mui"], // Hợi Mão Mùi
};

function tamTaiOf(chi: Chi): Chi[] {
  return TAM_TAI[CHI_LIST.indexOf(chi) % 4];
}

/** Năm cưới cho cô dâu: tránh kim lâu, tam tai và năm xung tuổi. */
export function weddingYears(brideYear: number, fromYear: number, count = 10) {
  const bride = getYearCanChi(brideYear).chi;
  return Array.from({ length: count }, (_, index) => {
    const year = fromYear + index;
    const { can, chi } = getYearCanChi(year);
    const age = year - brideYear + 1;
    const kimLau = [1, 3, 6, 8].includes(age % 9);
    const tamTai = tamTaiOf(bride).includes(chi);
    const xung = Math.abs(CHI_LIST.indexOf(chi) - CHI_LIST.indexOf(bride)) === 6;
    const notes = [kimLau ? "Kim lâu" : "", tamTai ? "Tam tai" : "", xung ? "Xung tuổi" : ""].filter(Boolean);
    return { year, label: `${CAN_VI[can]} ${CHI_VI[chi]}`, age, good: notes.length === 0, notes };
  });
}

export { CAN_LIST };
