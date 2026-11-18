/** Diễn giải lá số Tử Vi thành các đoạn văn có thể đọc được. Nội dung phục vụ giải trí, tham khảo văn hóa. */

import type { LunarDate, SolarDate } from "@/types";
import { AUX_NOTES, CARE_NOTES, PALACE_TIP, PALACE_TOPIC, STAR_READINGS } from "@/data/tu-vi/star-readings";
import { closingGroup, lifeStage, PALACE_BY_STAGE, STAGE_CLOSING } from "@/data/tu-vi/life-stages";
import { PAIR_READINGS_1, type PairReading } from "@/data/tu-vi/pair-readings-1";
import { PAIR_READINGS_2 } from "@/data/tu-vi/pair-readings-2";

const PAIRS: Record<string, PairReading> = { ...PAIR_READINGS_1, ...PAIR_READINGS_2 };

/** Luận bộ đôi chính tinh đồng cung, tìm theo cả hai thứ tự. */
export function findPair(names: string[]): PairReading | null {
  if (names.length !== 2) return null;
  return PAIRS[`${names[0]} + ${names[1]}`] ?? PAIRS[`${names[1]} + ${names[0]}`] ?? null;
}
import { CAN_LIST, CAN_VI, CHI_VI, NGU_HANH_VI } from "@/lib/algorithms/calendar/constants";
import { buildDaySummary, getYearCanChi } from "@/lib/algorithms/calendar/can-chi";
import { solarToLunar } from "@/lib/algorithms/calendar/lunar";
import { relation } from "@/lib/algorithms/feng-shui/ngu-hanh";
import { move, tamPhuong, TU_HOA, type ChartStar, type LaSo, type Palace, type PalaceName } from "./la-so";

export type Tone = "sang" | "kha" | "vun";

export const TONE_LABEL: Record<Tone, string> = {
  sang: "Rất sáng",
  kha: "Khá tốt",
  vun: "Cần vun đắp",
};

export type PalaceReading = {
  palace: Palace;
  title: string;
  hint: string;
  tone: Tone;
  mains: { star: string; brightness?: string; text: string }[];
  borrowed: string | null;
  helpers: string | null;
  cares: string | null;
  seal: string | null;
  pair: { title: string; essence: string; text: string } | null;
  portrait: string | null;
  echoes: string[];
  tip: string;
};

const BRIGHT_WORD: Record<string, string> = {
  M: "miếu",
  V: "vượng",
  Đ: "đắc",
  B: "bình",
  H: "hãm",
};

export function brightnessWord(code?: string): string | undefined {
  return code ? BRIGHT_WORD[code] : undefined;
}

const mainStars = (palace: Palace) => palace.stars.filter((star) => star.kind === "chinh");
const majorAux = (palace: Palace, kind: ChartStar["kind"]) =>
  palace.stars.filter((star) => star.kind === kind && star.major);

export function palaceTone(palace: Palace): Tone {
  let score = 0;
  for (const star of mainStars(palace)) {
    score += { M: 2, V: 2, Đ: 1, B: 0, H: -1 }[star.brightness ?? "B"] ?? 0;
  }
  score += majorAux(palace, "cat").length * 0.7;
  score -= majorAux(palace, "hung").length * 0.7;
  return score >= 3 ? "sang" : score >= 0.5 ? "kha" : "vun";
}

const opposite = (chart: LaSo, palace: Palace) => chart.palaces[move(palace.position, 6) - 1];

export function readPalace(chart: LaSo, palace: Palace): PalaceReading {
  const topic = PALACE_TOPIC[palace.name];
  const mains = mainStars(palace).map((star) => {
    const base = STAR_READINGS[star.name]?.palaces[palace.name] ?? "";
    return {
      star: star.name,
      brightness: brightnessWord(star.brightness),
      text:
        star.brightness === "H"
          ? `${base} Sao ở thế hãm nên thành quả thường đến muộn hơn một chút, đổi lại bạn bền bỉ hơn người.`
          : base,
    };
  });

  let borrowed: string | null = null;
  if (mains.length === 0) {
    const other = opposite(chart, palace);
    const lines = mainStars(other).map((star) => STAR_READINGS[star.name]?.palaces[palace.name]);
    borrowed = `Cung này không có chính tinh nên mượn sao từ cung ${other.name} đối diện. ${lines.join(" ")}`.trim();
  }

  const good = majorAux(palace, "cat").filter((star) => AUX_NOTES[star.name]);
  const bad = majorAux(palace, "hung").filter((star) => CARE_NOTES[star.name]);
  const helpers = good.length
    ? good.map((star) => `${star.name}: ${AUX_NOTES[star.name]}`).join("; ") + "."
    : null;
  const cares = bad.length
    ? bad.map((star) => `${star.name}: ${CARE_NOTES[star.name]}`).join("; ") + "."
    : null;
  const seal = palace.triet
    ? "Có Triệt án ngữ: tuổi trẻ công việc của cung này hơi chậm, sau 30 tuổi sẽ thông thoáng dần."
    : palace.tuan
      ? "Có Tuần án ngữ: cả điều thuận lẫn điều khó đều dịu đi, cuộc sống ở mặt này khá êm."
      : null;

  const pairData = findPair(mainStars(palace).map((star) => star.name));
  const pair = pairData
    ? { title: pairData.title, essence: pairData.essence, text: pairData.palaces[palace.name] }
    : null;
  const portrait =
    palace.name === "Mệnh"
      ? mainStars(palace)
          .map((star) => STAR_READINGS[star.name]?.portrait)
          .filter(Boolean)
          .join(" ") || null
      : null;
  const echoes = tamPhuong(palace.position)
    .slice(1)
    .flatMap((position) => {
      const other = chart.palaces[position - 1];
      const stars = mainStars(other);
      if (stars.length === 0) return [];
      const gifts = stars.map((star) => STAR_READINGS[star.name]?.gift.replace(/\.$/, "").toLowerCase()).join(", ");
      return [`Cung ${other.name} có ${stars.map((star) => star.name).join(", ")} soi về, đem đến ${gifts}.`];
    });

  return {
    palace,
    title: topic.title,
    hint: topic.hint,
    tone: palaceTone(palace),
    mains,
    borrowed,
    helpers,
    cares,
    seal,
    pair,
    portrait,
    echoes,
    tip: PALACE_TIP[palace.name],
  };
}

const CUC_MENH: Record<string, string> = {
  sinh: "Cục sinh Mệnh: hoàn cảnh sống nâng đỡ bạn, đi đâu cũng dễ gặp môi trường hợp với mình.",
  cung: "Cục hòa Mệnh: bạn và hoàn cảnh cùng một nhịp, cuộc sống thường êm và ít xáo trộn.",
  "duoc-sinh": "Mệnh sinh Cục: bạn chủ động tạo ra môi trường cho mình, nhiều việc nhờ sức bạn mà thành.",
  khac: "Cục khắc Mệnh: hoàn cảnh rèn giũa bạn từ sớm, nên càng trải nghiệm càng trở nên vững vàng.",
  "bi-khac": "Mệnh khắc Cục: bạn có sức làm chủ hoàn cảnh, biết xoay chuyển mọi việc bằng nỗ lực của mình.",
};

const THAN_TEXT: Partial<Record<PalaceName, string>> = {
  Mệnh: "Mệnh và Thân đồng cung: trước sau như một, tính cách nhất quán, tuổi nào cũng là chính mình.",
  "Phúc Đức": "Thân cư Phúc Đức: nửa đời sau coi trọng sự an yên, được hưởng phúc của gia đình.",
  "Quan Lộc": "Thân cư Quan Lộc: nửa đời sau gắn với sự nghiệp, càng lớn tuổi càng có vị thế.",
  "Thiên Di": "Thân cư Thiên Di: đời bạn gắn với di chuyển, ra ngoài mới phát huy hết mình.",
  "Tài Bạch": "Thân cư Tài Bạch: nửa đời sau coi trọng tài chính và rất biết làm giàu.",
  "Phu Thê": "Thân cư Phu Thê: tình cảm, gia đình là tâm điểm; người bạn đời ảnh hưởng lớn đến vận của bạn.",
};

type Pattern = { name: string; text: string };

function findPatterns(chart: LaSo): Pattern[] {
  const positions = tamPhuong(chart.menhPosition);
  const stars = positions.flatMap((position) => chart.palaces[position - 1].stars.map((star) => star.name));
  const has = (...names: string[]) => names.every((name) => stars.includes(name));
  const count = (...names: string[]) => names.filter((name) => stars.includes(name)).length;
  const list: Pattern[] = [];
  if (mainStars(chart.palaces[chart.menhPosition - 1]).length === 0) {
    list.push({ name: "Mệnh vô chính diệu", text: "Cung Mệnh không bị một sao nào chi phối, bạn rất linh hoạt và có thể sống nhiều vai trong đời." });
  }
  if (has("Thất Sát", "Phá Quân", "Tham Lang")) {
    list.push({ name: "Sát Phá Tham", text: "Cách của người khai phá: đời nhiều biến động nhưng thành tựu lớn thường đến từ những lần dám thay đổi." });
  }
  if (count("Tử Vi", "Thiên Phủ", "Vũ Khúc", "Thiên Tướng") >= 3) {
    list.push({ name: "Tử Phủ Vũ Tướng", text: "Cách của người trụ cột: vững vàng, có tổ chức, rất hợp quản lý và làm việc lớn." });
  }
  if (count("Thiên Cơ", "Thái Âm", "Thiên Đồng", "Thiên Lương") >= 3) {
    list.push({ name: "Cơ Nguyệt Đồng Lương", text: "Cách của người trí thức: hợp chuyên môn, công việc ổn định và được nhiều người tin cậy." });
  }
  if (has("Cự Môn", "Thái Dương")) {
    list.push({ name: "Cự Nhật", text: "Cách của người có tiếng nói: danh tiếng đến từ lời nói và học vấn của bạn." });
  }
  if (has("Thái Dương", "Thái Âm")) {
    list.push({ name: "Nhật Nguyệt chiếu mệnh", text: "Mặt trời và mặt trăng cùng soi cung Mệnh: bạn có cả nhiệt huyết lẫn sự tinh tế." });
  }
  if (has("Hóa Lộc", "Hóa Quyền", "Hóa Khoa")) {
    list.push({ name: "Tam kỳ gia hội", text: "Lộc, Quyền, Khoa cùng hội về Mệnh: một trong những cách đẹp nhất, danh và lợi đi cùng nhau." });
  }
  if (has("Lộc Tồn", "Hóa Lộc")) {
    list.push({ name: "Song Lộc", text: "Hai sao lộc cùng chiếu: nguồn tài chính dồi dào và bền bỉ." });
  }
  if (has("Thiên Mã") && (has("Lộc Tồn") || has("Hóa Lộc"))) {
    list.push({ name: "Lộc Mã giao trì", text: "Lộc đi cùng ngựa: càng năng động, càng đi xa thì tiền càng về." });
  }
  if (has("Văn Xương", "Văn Khúc")) {
    list.push({ name: "Xương Khúc", text: "Có đủ đôi sao văn: thông minh, học giỏi, chữ nghĩa và thi cử đều thuận." });
  }
  if (has("Tả Phù", "Hữu Bật")) {
    list.push({ name: "Tả Hữu", text: "Luôn có người phò trợ: việc lớn của bạn ít khi phải làm một mình." });
  }
  if (has("Thiên Khôi", "Thiên Việt")) {
    list.push({ name: "Khôi Việt", text: "Quý nhân hai phía: gặp khó thường có người lớn đứng ra giúp." });
  }
  return list;
}

export function buildOverview(chart: LaSo) {
  const menh = chart.palaces[chart.menhPosition - 1];
  const than = chart.palaces[chart.thanPosition - 1];
  const stars = mainStars(menh).length ? mainStars(menh) : mainStars(opposite(chart, menh));
  const pairData = findPair(stars.map((star) => star.name));
  const pair = pairData ? { title: pairData.title, essence: pairData.essence, text: pairData.palaces.Mệnh } : null;
  const portraits = stars.map((star) => ({
    star: star.name,
    portrait: STAR_READINGS[star.name]?.portrait ?? "",
    gift: STAR_READINGS[star.name]?.gift ?? "",
  }));
  return {
    pair,
    portraits,
    cucMenh: CUC_MENH[relation(chart.cucElement, chart.banMenhElement)],
    thuanLy: chart.thuanLy
      ? "Âm dương thuận lý: âm dương của tuổi và cung Mệnh cùng một chiều, việc thường đi đúng nhịp."
      : "Âm dương nghịch lý: âm dương của tuổi và cung Mệnh khác chiều, nên bạn hay tự vạch lối đi riêng và rất có bản sắc.",
    than: THAN_TEXT[than.name] ?? "",
    patterns: findPatterns(chart),
    element: NGU_HANH_VI[chart.banMenhElement],
  };
}

export type DecadeReading = {
  from: number;
  to: number;
  palace: Palace;
  tone: Tone;
  mains: string[];
  text: string;
};

export function buildDecades(chart: LaSo): DecadeReading[] {
  return [...chart.palaces]
    .sort((a, b) => a.daiHan - b.daiHan)
    .filter((palace) => palace.daiHan < 96)
    .map((palace) => {
      const tone = palaceTone(palace);
      const stars = mainStars(palace);
      const source = stars.length ? stars : mainStars(opposite(chart, palace));
      const gift = source[0] ? STAR_READINGS[source[0].name]?.gift : undefined;
      // Lấy tuổi giữa đại hạn để chọn giai đoạn đời.
      const stage = lifeStage(palace.daiHan + 4);
      const closing = STAGE_CLOSING[closingGroup(stage)][tone];
      const showGift = gift && stage !== "lao" && stage !== "tho";
      return {
        from: palace.daiHan,
        to: palace.daiHan + 9,
        palace,
        tone,
        mains: source.map((star) => star.name),
        text: `${PALACE_BY_STAGE[palace.name][stage]}${showGift ? ` Điểm mạnh được phát huy: ${gift.toLowerCase()}` : ""} ${closing}`,
      };
    });
}

export type MonthReading = { month: number; palace: Palace; tone: Tone; text: string };

function findStarPalace(chart: LaSo, name: string): Palace | undefined {
  return chart.palaces.find((palace) => palace.stars.some((star) => star.name === name));
}

export function buildYearReading(chart: LaSo, year: number) {
  const { can, chi } = getYearCanChi(year);
  const age = year - chart.lunar.year + 1;
  const tieuHan = chart.palaces.find((palace) => palace.tieuHanChi === chi) ?? chart.palaces[0];
  const thaiTue = chart.palaces.find((palace) => palace.chi === chi) ?? chart.palaces[0];
  const daiHan = chart.palaces.find((palace) => age >= palace.daiHan && age < palace.daiHan + 10) ?? null;

  const hoa = TU_HOA[CAN_LIST.indexOf(can)].map((star, index) => {
    const palace = findStarPalace(chart, star);
    return { kind: ["Lộc", "Quyền", "Khoa", "Kỵ"][index], star, palace };
  });
  const HOA_TEXT: Record<string, string> = {
    Lộc: "tiền bạc và cơ hội thuận ở mặt này",
    Quyền: "bạn có tiếng nói và được giao trọng trách ở mặt này",
    Khoa: "danh tiếng và giấy tờ, học hành ở mặt này rất đẹp",
    Kỵ: "nên nói rõ và làm chậm lại ở mặt này để tránh hiểu lầm",
  };
  const stars = hoa
    .filter((item) => item.palace)
    .map((item) => ({
      label: `Lưu Hóa ${item.kind}`,
      palace: item.palace?.name ?? "",
      text: `${item.star} ở cung ${item.palace?.name}: ${HOA_TEXT[item.kind]}.`,
      good: item.kind !== "Kỵ",
    }));

  const months: MonthReading[] = Array.from({ length: 12 }, (_, index) => {
    const position = move(tieuHan.position, -(chart.usedMonth - 1), chart.hourPosition - 1, index);
    const palace = chart.palaces[position - 1];
    return {
      month: index + 1,
      palace,
      tone: palaceTone(palace),
      text: `Tháng này chuyện ${PALACE_TOPIC[palace.name].title.toLowerCase()} được chú ý nhiều hơn.`,
    };
  });

  const toneTieuHan = palaceTone(tieuHan);
  const elder = age >= 65;
  const opening =
    toneTieuHan === "sang"
      ? elder
        ? "Một năm an vui, nhiều phúc"
        : "Một năm rất sáng"
      : toneTieuHan === "kha"
        ? elder
          ? "Một năm bình yên"
          : "Một năm thuận lợi"
        : elder
          ? "Một năm nên giữ sức, sống chậm"
          : "Một năm để tích lũy và chuẩn bị";

  return {
    year,
    yearLabel: `${CAN_VI[can]} ${CHI_VI[chi]}`,
    age,
    tieuHan,
    thaiTue,
    daiHan,
    tone: toneTieuHan,
    summary: `${opening}. Tiểu hạn vào cung ${tieuHan.name} (${PALACE_TOPIC[tieuHan.name].title.toLowerCase()}): ${PALACE_BY_STAGE[tieuHan.name][lifeStage(age)].charAt(0).toLowerCase()}${PALACE_BY_STAGE[tieuHan.name][lifeStage(age)].slice(1, -1)}. Thái Tuế năm nay đóng ở cung ${thaiTue.name}, nên chuyện ${PALACE_TOPIC[thaiTue.name].title.toLowerCase()} sẽ được nhắc tới nhiều.`,
    stars,
    months,
  };
}

export function buildDayReading(chart: LaSo, date: SolarDate) {
  const lunar: LunarDate = solarToLunar(date.day, date.month, date.year);
  const year = buildYearReading(chart, lunar.year);
  const month = year.months[lunar.month - 1];
  const position = move(month.palace.position, lunar.day - 1);
  const palace = chart.palaces[position - 1];
  const summary = buildDaySummary(date);
  return {
    date,
    lunar,
    palace,
    tone: palaceTone(palace),
    monthPalace: month.palace,
    text: `Hôm nay vận vào cung ${palace.name}, chuyện ${PALACE_TOPIC[palace.name].title.toLowerCase()} được chú ý nhiều hơn.`,
    summary,
  };
}

export function laSoPlainText(chart: LaSo): string {
  const overview = buildOverview(chart);
  const lines = [
    `Lá số Tử Vi: ${chart.profile.fullName}`,
    `${chart.amDuongNamNu} · Tuổi ${chart.yearLabel} · Mệnh ${chart.banMenh} · ${chart.cucName}`,
    ...overview.portraits.map((item) => `${item.star}: ${item.portrait}`),
    overview.cucMenh,
    overview.than,
    ...overview.patterns.map((item) => `${item.name}: ${item.text}`),
    ...chart.palaces
      .slice()
      .sort((a, b) => ((a.position - chart.menhPosition + 12) % 12) - ((b.position - chart.menhPosition + 12) % 12))
      .map((palace) => {
        const reading = readPalace(chart, palace);
        return `${palace.name}: ${reading.pair ? `${reading.pair.title}. ${reading.pair.text} ` : ""}${reading.mains.map((item) => item.text).join(" ")}${reading.borrowed ?? ""}`;
      }),
  ];
  return lines.filter(Boolean).join("\n");
}
