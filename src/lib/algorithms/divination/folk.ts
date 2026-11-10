/**
 * Bói toán dân gian có seed.
 * Quan hệ tuổi và ngũ hành lấy từ dữ liệu có sẵn.
 * Câu chữ được chọn bằng createRng/hashSeed để cùng đầu vào ra cùng kết quả.
 */

import { createRng, hashSeed } from "@/lib/algorithms/kinh-dich/hexagram";
import { NGU_HANH_VI } from "@/lib/algorithms/calendar/constants";
import { getBanMenhByYear, relation } from "@/lib/algorithms/feng-shui/ngu-hanh";
import { compareAnimals, type AgeRelation } from "@/lib/zodiac/animal-year";
import type { NguHanh, ZodiacAnimal } from "@/types";

export const FOLK_LABEL = "quan niệm dân gian" as const;

export const FOLK_DISCLAIMER =
  "Đây là quan niệm dân gian, diễn giải có cấu trúc theo khóa seed để tham khảo văn hóa. Không phải lời tiên đoán và không thay cho quyết định thực tế.";

const DIGIT_ELEMENT: Record<string, NguHanh> = {
  "0": "Tho",
  "1": "Thuy",
  "2": "Tho",
  "3": "Moc",
  "4": "Moc",
  "5": "Tho",
  "6": "Kim",
  "7": "Kim",
  "8": "Tho",
  "9": "Hoa",
};

function pick<T>(seed: string, items: readonly T[]): T {
  if (items.length === 0) {
    throw new Error("Danh sách luận trống");
  }
  const rng = createRng(`${seed}#${hashSeed(seed).toString(16)}`);
  const index = Math.floor(rng() * items.length);
  return items[index] ?? items[0];
}

function norm(value: string): string {
  return value.normalize("NFC").trim().toLowerCase().replace(/\s+/g, " ");
}

export const CAREER_FIELDS = [
  { id: "hoc-hanh", label: "Học hành" },
  { id: "buon-ban", label: "Buôn bán" },
  { id: "viec-cong", label: "Việc công" },
  { id: "nghe-tay", label: "Nghề tay" },
  { id: "mo-nghiep", label: "Mở nghiệp" },
] as const;

export type CareerFieldId = (typeof CAREER_FIELDS)[number]["id"];

export const WEALTH_INTENTS = [
  { id: "giu-cua", label: "Giữ của" },
  { id: "mo-nguon", label: "Mở nguồn" },
  { id: "cho-thoi", label: "Chờ thời" },
] as const;

export type WealthIntentId = (typeof WEALTH_INTENTS)[number]["id"];

export const FORTUNE_CONCERNS = [
  { id: "tam", label: "Tâm trạng" },
  { id: "viec", label: "Việc đang làm" },
  { id: "nha", label: "Nhà cửa" },
  { id: "nguoi", label: "Người bên cạnh" },
] as const;

export type FortuneConcernId = (typeof FORTUNE_CONCERNS)[number]["id"];

export const FORTUNE_SECTORS = [
  { name: "Càn", hint: "Việc cần người đứng ra, nhưng giữ lưng cho thẳng." },
  { name: "Khảm", hint: "Nên chậm một nhịp và nghe cho rõ trước khi đáp." },
  { name: "Cấn", hint: "Dừng lại cũng là một cách đi. Chưa vội mở việc mới." },
  { name: "Chấn", hint: "Có chuyển động. Nên nói rõ ai làm phần nào." },
  { name: "Tốn", hint: "Vào bằng lời nhỏ và sự đều, không bằng ép." },
  { name: "Ly", hint: "Làm cho sáng việc đang mờ. Tránh nửa chừng." },
  { name: "Khôn", hint: "Nuôi việc cho bền, nhường một bước nếu đang căng." },
  { name: "Đoài", hint: "Giữ không khí vui, nhưng lời hứa phải vừa sức." },
] as const;

export type LoveReading = {
  label: typeof FOLK_LABEL;
  disclaimer: string;
  nameA: string;
  nameB: string;
  score: number;
  thread: "đỏ" | "hồng" | "vàng" | "bạc";
  bond: string;
  spark: string;
  household: string;
  advice: string;
};

const LOVE_BOND = [
  "Duyên được kể như hai người cùng giữ một việc nhỏ cho đều.",
  "Chuyện dân gian thấy cặp này hợp khi nói thẳng mà không nâng giọng.",
  "Sợi duyên bền nếu cả hai còn chỗ riêng, không ai phải biến mất.",
  "Quan niệm dân gian nhắc: hợp nhau ở cách xin lỗi, hơn là ở lời ngọt lúc đầu.",
] as const;

const LOVE_SPARK = [
  "Lửa dễ nhóm khi có một việc cùng làm, và dễ tắt nếu chỉ chờ cảm hứng.",
  "Sự hút nhau nằm ở tính đùa được với nhau, miễn là không đùa vào chỗ đau.",
  "Dân gian khuyên gặp ở chỗ đông trước, rồi mới tính chuyện ở riêng.",
  "Một cuộc đi bộ dài được kể là có ích hơn một lời hứa lớn.",
] as const;

const LOVE_HOME = [
  "Nhà cửa thuận khi tiền ăn và tiền cho vay được nói rõ.",
  "Gia đạo dễ ổn nếu việc nhà không bị xem là việc của một người.",
  "Khuyên để một góc yên trong nhà, dù chỉ là một ghế không mang việc vào.",
  "Khi bất đồng, dân gian khuyên hoãn quyết định qua một đêm.",
] as const;

const LOVE_ADVICE = [
  "Đừng lấy chỉ số này làm điều kiện cưới hay chia tay.",
  "Hãy hỏi người kia một câu cụ thể, thay vì đoán ý.",
  "Giữ một thói quen đều trong hai tuần rồi hãy bàn chuyện lớn.",
  "Nếu đang đau, hãy tìm người thân tin được, không chỉ tìm một quẻ.",
] as const;

export function readLove(nameA: string, nameB: string): LoveReading {
  const left = norm(nameA);
  const right = norm(nameB);
  const [x, y] = [left, right].sort();
  const seed = `tinh-yeu|${x}|${y}`;
  const score = 60 + (hashSeed(`score|${seed}`) % 36);
  const thread = pick(seed + "|chi", ["đỏ", "hồng", "vàng", "bạc"] as const);
  return {
    label: FOLK_LABEL,
    disclaimer: FOLK_DISCLAIMER,
    nameA: nameA.trim(),
    nameB: nameB.trim(),
    score,
    thread,
    bond: pick(seed + "|bond", LOVE_BOND),
    spark: pick(seed + "|spark", LOVE_SPARK),
    household: pick(seed + "|nha", LOVE_HOME),
    advice: pick(seed + "|loi", LOVE_ADVICE),
  };
}

export type CareerReading = {
  label: typeof FOLK_LABEL;
  disclaimer: string;
  name: string;
  birthYear: number;
  fieldLabel: string;
  elementLabel: string;
  rung: number;
  steps: { title: string; note: string }[];
  omen: string;
  caution: string;
};

const RUNGS = ["Giữ việc đang có", "Học thêm một kỹ", "Nhờ người chỉ", "Nhận việc khó hơn", "Đứng ra gánh"] as const;

const RUNG_NOTES = [
  "Dân gian khuyên làm cho xong phần đã nhận trước khi xin phần mới.",
  "Một kỹ năng nhỏ, học hết, đáng kể hơn một kế hoạch rộng.",
  "Nhờ người đã làm nghề ấy, và hỏi bằng việc cụ thể.",
  "Việc khó hơn chỉ nên nhận khi còn sức ngủ và còn người đỡ.",
  "Đứng ra gánh là khi đã có sổ, có hạn, có người cùng làm.",
] as const;

const CAREER_OMEN = [
  "Danh được kể là đến sau sự tin cậy, không đến trước.",
  "Cửa việc mở khi giấy tờ và lời hứa khớp nhau.",
  "Quan niệm dân gian không hứa thăng nhanh. Hứa một nhịp đều.",
  "Nếu đang phân vân hai ngả, hãy thử ngả nào viết được thành việc trong bảy ngày.",
] as const;

const CAREER_CAUTION = [
  "Đừng nghỉ việc chỉ vì một câu luận.",
  "Tránh góp danh vào việc chưa có giấy.",
  "Nóng lúc bị chê dễ làm hỏng một mối đang lành.",
  "Giữ một khoản ăn trong lúc thử việc mới.",
] as const;

export function readCareer(name: string, birthYear: number, fieldId: CareerFieldId): CareerReading {
  const field = CAREER_FIELDS.find((item) => item.id === fieldId) ?? CAREER_FIELDS[0];
  const seed = `cong-danh|${norm(name)}|${birthYear}|${field.id}`;
  const rung = (hashSeed(seed) % 5) + 1;
  const menh = getBanMenhByYear(birthYear);
  const steps = RUNGS.map((title, index) => ({
    title,
    note: index + 1 === rung ? pick(`${seed}|note`, RUNG_NOTES) : "Bậc này là mốc tham khảo, chưa phải việc phải làm ngay.",
  }));
  return {
    label: FOLK_LABEL,
    disclaimer: FOLK_DISCLAIMER,
    name: name.trim(),
    birthYear,
    fieldLabel: field.label,
    elementLabel: NGU_HANH_VI[menh.element],
    rung,
    steps,
    omen: pick(`${seed}|diem`, CAREER_OMEN),
    caution: pick(`${seed}|can`, CAREER_CAUTION),
  };
}

export type WealthReading = {
  label: typeof FOLK_LABEL;
  disclaimer: string;
  birthYear: number;
  intentLabel: string;
  elementLabel: string;
  doors: { name: string; open: boolean; note: string }[];
  verse: string;
  advice: string;
};

const DOOR_NOTES = {
  open: [
    "Cửa này được kể là hé, nếu việc có sổ và có hạn.",
    "Dân gian gọi là thuận để giữ, không phải thuận để vay nóng.",
    "Có thể bàn một khoản nhỏ, rồi dừng lại xem ba ngày.",
  ],
  shut: [
    "Cửa này đang khép trong cách luận dân gian. Chưa phải lúc bung.",
    "Nên giữ nguyên, đừng vì nể mà mở thêm.",
    "Khoản chưa rõ giấy thì để ngoài cửa.",
  ],
} as const;

const WEALTH_VERSE = [
  "Của vào cửa hẹp, của ra cửa rộng.",
  "Giữ một phần, mới bàn phần muốn thêm.",
  "Chờ cho sổ khớp, rồi hãy gọi là thuận.",
  "Mở nguồn bằng nghề đang có, không bằng lời đồn.",
] as const;

export function readWealth(birthYear: number, intentId: WealthIntentId): WealthReading {
  const intent = WEALTH_INTENTS.find((item) => item.id === intentId) ?? WEALTH_INTENTS[0];
  const seed = `tai-loc|${birthYear}|${intent.id}`;
  const menh = getBanMenhByYear(birthYear);
  const mask = hashSeed(seed) % 8;
  const names = ["Cửa giữ", "Cửa làm", "Cửa chờ"] as const;
  const doors = names.map((name, index) => {
    const open = ((mask >> index) & 1) === 1 || (mask === 0 && index === 0);
    return {
      name,
      open,
      note: pick(`${seed}|${name}`, open ? DOOR_NOTES.open : DOOR_NOTES.shut),
    };
  });
  return {
    label: FOLK_LABEL,
    disclaimer: FOLK_DISCLAIMER,
    birthYear,
    intentLabel: intent.label,
    elementLabel: NGU_HANH_VI[menh.element],
    doors,
    verse: pick(`${seed}|verse`, WEALTH_VERSE),
    advice:
      intent.id === "giu-cua"
        ? "Ý giữ của được luận theo hướng chừa phần dự phòng trước khi chi cho việc mới."
        : intent.id === "mo-nguon"
          ? "Ý mở nguồn chỉ được kể là thuận với khoản viết được ra giấy và chịu dừng được."
          : "Ý chờ thời là hoãn một quyết định tiền bạc, không phải ngồi không.",
  };
}

export type FortuneReading = {
  label: typeof FOLK_LABEL;
  disclaimer: string;
  name: string;
  concernLabel: string;
  dateKey: string;
  sectorIndex: number;
  sector: string;
  hint: string;
  omen: string;
  caution: string;
};

const FORTUNE_OMEN = [
  "Trong ngày này, dân gian khuyên làm một việc đã hẹn và bỏ một việc chỉ để chứng tỏ.",
  "Vận được kể là vừa, hợp với việc giấy tờ ngắn và một cuộc nói chuyện rõ.",
  "Nên chọn việc nhìn thấy kết quả trước tối, đừng mở việc chưa có điểm dừng.",
  "Quan niệm dân gian gọi hôm nay là ngày giữ nhịp, không phải ngày đánh cược.",
] as const;

const FORTUNE_CAUTION = [
  "Đừng đổi một kế hoạch lớn chỉ vì ô này.",
  "Nếu cơ thể đang mệt, hãy nghỉ. Quẻ không thay cho việc khám.",
  "Tránh cãi để thắng trong nhà.",
  "Khoản tiền chưa hiểu thì chưa chuyển.",
] as const;

export function readFortune(
  name: string,
  concernId: FortuneConcernId,
  dateKey: string,
): FortuneReading {
  const concern = FORTUNE_CONCERNS.find((item) => item.id === concernId) ?? FORTUNE_CONCERNS[0];
  const seed = `van-may|${norm(name)}|${concern.id}|${dateKey}`;
  const sectorIndex = hashSeed(seed) % FORTUNE_SECTORS.length;
  const sector = FORTUNE_SECTORS[sectorIndex] ?? FORTUNE_SECTORS[0];
  return {
    label: FOLK_LABEL,
    disclaimer: FOLK_DISCLAIMER,
    name: name.trim(),
    concernLabel: concern.label,
    dateKey,
    sectorIndex,
    sector: sector.name,
    hint: sector.hint,
    omen: pick(`${seed}|diem`, FORTUNE_OMEN),
    caution: pick(`${seed}|can`, FORTUNE_CAUTION),
  };
}

export type PhoneReading = {
  label: typeof FOLK_LABEL;
  disclaimer: string;
  display: string;
  digits: string;
  sum: number;
  reduced: number;
  element: NguHanh;
  elementLabel: string;
  tone: "cat" | "binh" | "hung";
  marks: string[];
  reading: string;
  advice: string;
};

const PHONE_TEXT = {
  cat: [
    "Theo quy ước số của trang, dãy này được kể là dễ nhớ và hợp việc liên lạc đều.",
    "Dân gian hay quý dãy gọn, dễ đọc. Điều đó không làm máy giàu thêm.",
  ],
  binh: [
    "Dãy ở mức bình trong quy ước đang dùng. Hợp để dùng, không cần đổi số vì một câu luận.",
    "Quan niệm dân gian gọi đây là số làm việc được, nếu chủ máy giữ lời khi nghe máy.",
  ],
  hung: [
    "Quy ước trang này thấy dãy nặng số 4 lặp. Đó là kiêng khem dân gian, không phải sự cố.",
    "Nếu muốn đổi, hãy đổi vì dễ nhớ hoặc vì công việc, đừng đổi vì sợ.",
  ],
} as const;

function reduceDigits(sum: number): number {
  let value = sum;
  while (value > 9) {
    value = String(value)
      .split("")
      .reduce((total, digit) => total + Number(digit), 0);
  }
  return value;
}

export function readPhone(raw: string): PhoneReading | { error: string } {
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 9 || digits.length > 12) {
    return { error: "Nhập số điện thoại từ 9 đến 12 chữ số." };
  }
  const sum = digits.split("").reduce((total, digit) => total + Number(digit), 0);
  const reduced = reduceDigits(sum);
  const element = DIGIT_ELEMENT[String(reduced)] ?? "Tho";
  const count4 = digits.split("").filter((digit) => digit === "4").length;
  const count8 = digits.split("").filter((digit) => digit === "8").length;
  let tone: "cat" | "binh" | "hung" = "binh";
  if (reduced === 3 || reduced === 6 || reduced === 8 || reduced === 9) tone = "cat";
  if (reduced === 4) tone = "hung";
  if (count4 >= 4) tone = "hung";
  else if (count4 >= 3 && tone === "cat") tone = "binh";
  const marks: string[] = [];
  if (count8 >= 2) marks.push("Có từ hai số 8. Dân gian hay gọi là dễ nhớ, không phải bảo chứng tài lộc.");
  if (count4 >= 2) marks.push("Số 4 lặp. Một số nhà kiêng, một số nhà không. Đây chỉ là tập quán.");
  if (/(?:012|123|234|345|456|567|678|789)/.test(digits)) {
    marks.push("Có dãy tăng dần. Dễ đọc khi đọc thành tiếng.");
  }
  if (/(\d)\1\1/.test(digits)) marks.push("Có ba số giống nhau liền. Dễ nhớ, cũng dễ bị nhìn là số đẹp theo đồn.");
  if (marks.length === 0) marks.push("Không thấy kiểu lặp hay dãy tăng nổi bật. Số dùng được theo nghĩa thực dụng.");
  const seed = `so-may|${digits}`;
  const pretty = digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  return {
    label: FOLK_LABEL,
    disclaimer: FOLK_DISCLAIMER,
    display: pretty,
    digits,
    sum,
    reduced,
    element,
    elementLabel: NGU_HANH_VI[element],
    tone,
    marks,
    reading: pick(seed, PHONE_TEXT[tone]),
    advice: "Quy ước gán số với ngũ hành là cách chơi dân gian của trang, không phải chuẩn viễn thông.",
  };
}

export type PlateReading = {
  label: typeof FOLK_LABEL;
  disclaimer: string;
  plate: string;
  letters: string;
  digits: string;
  sum: number;
  reduced: number;
  elementLabel: string;
  tone: "cat" | "binh" | "hung";
  marks: string[];
  reading: string;
};

const PLATE_TEXT = {
  cat: [
    "Biển này đọc gọn trong quy ước dân gian đang dùng. Vẫn phải hợp đăng kiểm thật.",
    "Dân gian gọi là dễ nhìn. Việc đi đường vẫn do người lái và luật, không do biển.",
  ],
  binh: [
    "Biển ở mức bình. Hợp để dùng nếu giấy tờ xe đúng, không cần tìm biển khác vì câu luận.",
    "Quan niệm dân gian không thấy điểm phải kiêng nặng. Giữ biển đang có là đủ.",
  ],
  hung: [
    "Quy ước kiêng của một số nhà thấy biển này nặng số lặp không ưa. Đó là tập quán, không phải cấm đăng ký.",
    "Nếu đang phân vân đổi biển, hãy hỏi cơ quan đăng kiểm, đừng hỏi một quẻ.",
  ],
} as const;

export function readPlate(raw: string): PlateReading | { error: string } {
  const plate = raw.toUpperCase().replace(/[^0-9A-Z]/g, "");
  const letters = plate.replace(/[^A-Z]/g, "");
  const digits = plate.replace(/\D/g, "");
  if (letters.length < 1 || digits.length < 4 || plate.length > 12) {
    return { error: "Nhập biển số có ít nhất một chữ và bốn số. Ví dụ 51A12345." };
  }
  const sum = digits.split("").reduce((total, digit) => total + Number(digit), 0);
  const reduced = reduceDigits(sum);
  const element = DIGIT_ELEMENT[String(reduced)] ?? "Tho";
  const count4 = digits.split("").filter((digit) => digit === "4").length;
  let tone: "cat" | "binh" | "hung" = reduced === 4 ? "hung" : reduced % 2 === 0 ? "cat" : "binh";
  if (count4 >= 3) tone = "hung";
  const marks: string[] = [`Chữ trên biển: ${letters}.`, `Tổng các số là ${sum}, rút còn ${reduced}.`];
  if (/(\d)\1\1/.test(digits)) marks.push("Có cụm ba số giống nhau. Dân gian hay bàn, cơ quan đăng kiểm thì xét hồ sơ.");
  if (digits.endsWith("8") || digits.endsWith("6")) {
    marks.push("Tận cùng bằng 6 hoặc 8. Một số nhà gọi là dễ đọc khi trả tiền gửi xe.");
  }
  const seed = `bien-so|${plate}`;
  return {
    label: FOLK_LABEL,
    disclaimer: FOLK_DISCLAIMER,
    plate,
    letters,
    digits,
    sum,
    reduced,
    elementLabel: NGU_HANH_VI[element],
    tone,
    marks,
    reading: pick(seed, PLATE_TEXT[tone]),
  };
}

export type AgePairReading = {
  label: typeof FOLK_LABEL;
  disclaimer: string;
  yearA: number;
  yearB: number;
  first: ZodiacAnimal;
  second: ZodiacAnimal;
  tamHop: boolean;
  tuHanhXung: boolean;
  lucHop: boolean;
  lucXung: boolean;
  relation: AgeRelation;
  headline: string;
  note: string;
  nen: string;
  ne: string;
};

const AGE_NOTE: Record<AgeRelation, readonly string[]> = {
  "cung-tuoi": [
    "Cùng một con giáp là cùng một khuôn chuyện kể. Dân gian không gọi đó là tam hợp, cũng không gọi là xung.",
    "Hai người cùng tuổi thường bị ví như cùng một nhịp. Việc hợp hay không vẫn do cách sống.",
  ],
  "tam-hop": [
    "Tam hợp là bộ ba được dân gian xếp cùng một cục. Đây là quy ước xem tuổi, không phải bảo chứng tình bạn.",
    "Nằm trong tam hợp được kể là dễ bắt chuyện. Vẫn cần giữ lời trong việc chung.",
  ],
  "luc-hop": [
    "Lục hợp là cặp nhị hợp, một đôi được dân gian gọi tên riêng, khác với cả bộ tam hợp.",
    "Cặp lục hợp thường được nhắc khi xem tuổi. Đó là một lớp tham khảo sau khi hai người đã hiểu việc.",
  ],
  "luc-xung": [
    "Lục xung là cặp đối nhau trên vòng địa chi. Dân gian khuyên nói chậm khi cùng làm một việc nóng.",
    "Xung chiếu không có nghĩa phải tránh mặt. Có nghĩa là dễ cãi nếu cả hai cùng muốn nói cuối.",
  ],
  "tu-hanh-xung": [
    "Tứ hành xung là bộ bốn. Dân gian xếp vào nhóm dễ va khi cùng quyết một việc gấp.",
    "Có tên trong tứ hành xung là một quy ước. Nó không mô tả tính cách của hai người.",
  ],
  "binh-hoa": [
    "Không rơi vào tam hợp, lục hợp, lục xung hay tứ hành xung. Dân gian gọi là bình, tức là xem tiếp bằng việc làm.",
    "Bình hòa nghĩa là quy ước tuổi không kéo mạnh về bên nào. Câu chuyện nằm ở cách đối xử.",
  ],
};

export function readAgePair(yearA: number, yearB: number): AgePairReading {
  const pair = compareAnimals(yearA, yearB);
  const seed = `tuoi-hop|${yearA}|${yearB}|${pair.relation}`;
  const headline =
    pair.relation === "tam-hop"
      ? `${pair.first.name} và ${pair.second.name} nằm trong tam hợp`
      : pair.relation === "luc-hop"
        ? `${pair.first.name} và ${pair.second.name} là cặp lục hợp`
        : pair.relation === "tu-hanh-xung"
          ? `${pair.first.name} và ${pair.second.name} có mặt trong tứ hành xung`
          : pair.relation === "luc-xung"
            ? `${pair.first.name} và ${pair.second.name} là cặp lục xung`
            : pair.relation === "cung-tuoi"
              ? `Hai năm cùng tuổi ${pair.first.name}`
              : `${pair.first.name} và ${pair.second.name} không thuộc bộ hợp hay xung chính`;
  return {
    label: FOLK_LABEL,
    disclaimer: FOLK_DISCLAIMER,
    yearA,
    yearB,
    ...pair,
    headline,
    note: pick(seed, AGE_NOTE[pair.relation]),
    nen: pick(`${seed}|nen`, [
      "Nên giao việc có hạn và có người ghi.",
      "Nên nói rõ ai giữ tiền chung.",
      "Nên giữ một việc nhỏ làm đều trong một tuần trước khi bàn việc lớn.",
    ] as const),
    ne: pick(`${seed}|ne`, [
      "Không nên quyết khi cả hai đang nóng.",
      "Không nên lấy quy ước tuổi làm lý do từ chối một người.",
      "Không nên góp vốn chỉ vì nghe tuổi hợp.",
    ] as const),
  };
}

export type MarriageReading = {
  label: typeof FOLK_LABEL;
  disclaimer: string;
  husbandYear: number;
  wifeYear: number;
  husbandAnimal: string;
  wifeAnimal: string;
  relation: AgeRelation;
  tamHop: boolean;
  tuHanhXung: boolean;
  lucHop: boolean;
  lucXung: boolean;
  husbandMenh: string;
  wifeMenh: string;
  hanhLabel: string;
  household: string;
  kin: string;
  advice: string;
};

export function readMarriage(husbandYear: number, wifeYear: number): MarriageReading {
  const pair = compareAnimals(husbandYear, wifeYear);
  const husband = getBanMenhByYear(husbandYear);
  const wife = getBanMenhByYear(wifeYear);
  const hanh = relation(husband.element, wife.element);
  const seed = `vo-chong|${husbandYear}|${wifeYear}`;
  const hanhLabel = `${NGU_HANH_VI[husband.element]} với ${NGU_HANH_VI[wife.element]}`;
  return {
    label: FOLK_LABEL,
    disclaimer: FOLK_DISCLAIMER,
    husbandYear,
    wifeYear,
    husbandAnimal: pair.first.name,
    wifeAnimal: pair.second.name,
    relation: pair.relation,
    tamHop: pair.tamHop,
    tuHanhXung: pair.tuHanhXung,
    lucHop: pair.lucHop,
    lucXung: pair.lucXung,
    husbandMenh: `${husband.label} (${husband.canChi})`,
    wifeMenh: `${wife.label} (${wife.canChi})`,
    hanhLabel: `${hanhLabel}: ${
      hanh === "cung"
        ? "cùng hành"
        : hanh === "sinh"
          ? "mệnh chồng tương sinh mệnh vợ"
          : hanh === "duoc-sinh"
            ? "mệnh chồng được mệnh vợ sinh"
            : hanh === "khac"
              ? "mệnh chồng tương khắc mệnh vợ"
              : "mệnh chồng bị mệnh vợ khắc"
    }`,
    household: pick(`${seed}|nha`, [
      "Chuyện nhà được dân gian khuyên chia việc bếp núc và sổ chi thành hai phần nhìn thấy được.",
      "Gia đạo trong cách luận này trông ở giấc ngủ và bữa cơm, không trông ở tuổi.",
      "Nên có một khoản để riêng cho việc bất ngờ, ghi tên cả hai.",
      "Khi nhà có người lớn tuổi, dân gian khuyên hỏi cho đủ lễ rồi vẫn tự quyết việc của mình.",
    ] as const),
    kin: pick(`${seed}|ho`, [
      "Hai họ dễ êm nếu thiệp và lịch được nói trước, không bị bất ngờ ở cửa.",
      "Quan niệm dân gian không bắt hai họ phải cùng một tập quán. Bắt buộc là nói trước cách cưới.",
      "Việc biếu quà nên có mức cả hai cùng chịu, kẻo thành nợ miệng.",
    ] as const),
    advice:
      "Tuổi và bản mệnh là lớp tham khảo khi xem vợ chồng. Hôn nhân vẫn là việc hai người chọn và giữ.",
  };
}

export function drawStickIndex(kind: "quan-am" | "quan-thanh", seed: string, length: number): number {
  if (length < 1) return 0;
  const rng = createRng(`${kind}|${hashSeed(seed).toString(16)}|${seed}`);
  return Math.floor(rng() * length);
}

const TAROT_DECK = [
  { id: "fool", name: "The Fool", vi: "Kẻ Khờ" },
  { id: "magician", name: "The Magician", vi: "Nhà Ảo Thuật" },
  { id: "high-priestess", name: "The High Priestess", vi: "Nữ Tư Tế" },
  { id: "empress", name: "The Empress", vi: "Nữ Hoàng" },
  { id: "emperor", name: "The Emperor", vi: "Hoàng Đế" },
  { id: "hierophant", name: "The Hierophant", vi: "Giáo Hoàng" },
  { id: "lovers", name: "The Lovers", vi: "Người Tình" },
  { id: "chariot", name: "The Chariot", vi: "Cỗ Xe" },
  { id: "strength", name: "Strength", vi: "Sức Mạnh" },
  { id: "hermit", name: "The Hermit", vi: "Ẩn Sĩ" },
  { id: "wheel", name: "Wheel of Fortune", vi: "Bánh Xe Số Phận" },
  { id: "justice", name: "Justice", vi: "Công Lý" },
  { id: "hanged", name: "The Hanged Man", vi: "Người Treo" },
  { id: "death", name: "Death", vi: "Cái Chết (đổi mới)" },
  { id: "temperance", name: "Temperance", vi: "Tiết Chế" },
  { id: "devil", name: "The Devil", vi: "Ác Quỷ (ràng buộc)" },
  { id: "tower", name: "The Tower", vi: "Tòa Tháp" },
  { id: "star", name: "The Star", vi: "Ngôi Sao" },
  { id: "moon", name: "The Moon", vi: "Mặt Trăng" },
  { id: "sun", name: "The Sun", vi: "Mặt Trời" },
  { id: "judgement", name: "Judgement", vi: "Phán Xét" },
  { id: "world", name: "The World", vi: "Thế Giới" },
] as const;

const POSITIONS = ["Quá khứ / nền", "Hiện tại", "Lời khuyên"] as const;

/**
 * Rút 3 lá Major Arcana theo seed — quan niệm dân gian / giải trí văn hóa.
 * Không phải hệ thống Tarot chuyên nghiệp đầy đủ.
 */
export function readTarot(question: string, seedInput?: string) {
  const q = norm(question);
  const seed = seedInput?.trim() || `tarot|${q}|${hashSeed(q).toString(16)}`;
  const rng = createRng(seed);
  const pool = [...TAROT_DECK];
  const cards: {
    position: string;
    name: string;
    vi: string;
    upright: boolean;
    note: string;
  }[] = [];

  for (let i = 0; i < 3; i += 1) {
    const idx = Math.floor(rng() * pool.length);
    const card = pool.splice(idx, 1)[0] ?? TAROT_DECK[0];
    const upright = rng() >= 0.35;
    cards.push({
      position: POSITIONS[i],
      name: card.name,
      vi: card.vi,
      upright,
      note: pick(`${seed}|${card.id}|${i}`, [
        upright
          ? "Lá xuôi trong cách đọc dân gian gợi sự mở và thuận chiều với câu hỏi."
          : "Lá ngược được hiểu là cần nhìn lại, chậm lại hoặc điều chỉnh kỳ vọng.",
        upright
          ? "Hình ảnh này thường được dùng để nhắc giữ trung tâm trước khi quyết."
          : "Hình ảnh đảo chiều gợi trở ngại tạm thời hơn là kết cục cố định.",
        upright
          ? "Có thể đọc như lời khích lệ hành động có chủ đích."
          : "Có thể đọc như lời nhắc đừng vội kết luận từ một dấu hiệu.",
      ] as const),
    });
  }

  return {
    question: question.trim(),
    seed,
    cards,
    overview: pick(`${seed}|ov`, [
      "Ba lá tạo thành khung quá khứ – hiện tại – lời khuyên theo phong cách giải trí phổ biến.",
      "Cách trải này đơn giản hóa Tarot để dễ đọc; không thay thế tư vấn chuyên môn.",
      "Hãy đối chiếu với hoàn cảnh thực tế thay vì bám vào từng chữ trên lá.",
    ] as const),
    disclaimer: FOLK_DISCLAIMER,
  };
}
