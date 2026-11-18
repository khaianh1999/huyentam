import type {
  ActivityTag,
  AssessmentFactor,
  Chi,
  DayAssessment,
  DayPurpose,
  Gender,
  NguHanh,
  SolarDate,
} from "@/types";
import { DAY_PURPOSES } from "@/data/calendar/day-purposes";
import { ACTIVITY_LABEL, TRUC_EFFECT } from "@/data/calendar/tu-28";
import { relation } from "@/lib/algorithms/feng-shui/ngu-hanh";
import { assessHouseYear } from "@/lib/algorithms/feng-shui/tuoi-lam-nha";
import { CAN_VI, CHI_LIST, CHI_VI } from "./constants";
import { buildDaySummary, getNapAm, getYearCanChi } from "./can-chi";

const PURPOSE_TAG: Record<string, ActivityTag> = {
  "cuoi-hoi": "cuoi",
  "an-hoi": "cuoi",
  "khai-truong": "giao-dich",
  "khai-truong-cua-hang": "giao-dich",
  "ky-hop-dong": "giao-dich",
  "mua-nha": "giao-dich",
  "mua-xe": "giao-dich",
  "dong-tho": "xay",
  "khoi-cong": "xay",
  "nhap-trach": "nhap-trach",
  "xuat-hanh": "xuat-hanh",
  "an-tang": "an-tang",
};

const NAP_AM_ELEMENT: Record<string, NguHanh> = {
  Kim: "Kim",
  Mộc: "Moc",
  Thủy: "Thuy",
  Hỏa: "Hoa",
  Thổ: "Tho",
};

function napAmElement(napAm: string): NguHanh {
  return NAP_AM_ELEMENT[napAm.split(" ").at(-1) ?? ""] ?? "Tho";
}

export function getPurpose(id: string): DayPurpose | undefined {
  return DAY_PURPOSES.find((p) => p.id === id);
}

const RATING_TEXT = {
  tot: "Ngày tốt",
  "trung-binh": "Ngày dùng được",
  "nen-tranh": "Nên chọn ngày khác",
  xau: "Ngày xấu",
} as const;

export function assessDay(params: {
  date: SolarDate;
  purposeId: string;
  birthYear?: number;
  gender?: Gender;
}): DayAssessment {
  const purpose = getPurpose(params.purposeId) ??
    DAY_PURPOSES[0] ?? { id: params.purposeId, name: params.purposeId, description: "" };
  const tag = PURPOSE_TAG[purpose.id] ?? "xuat-hanh";
  const activity = ACTIVITY_LABEL[tag];
  const day = buildDaySummary(params.date);
  const factors: AssessmentFactor[] = [];
  const warnings: string[] = [];
  let ceiling = 100;
  const add = (group: AssessmentFactor["group"], label: string, delta: number, detail: string) =>
    factors.push({ group, label, delta, detail });

  add(
    "than",
    day.isHoangDao ? `Hoàng đạo: ${day.dayGod}` : `Hắc đạo: ${day.dayGod}`,
    day.isHoangDao ? 8 : -8,
    day.isHoangDao
      ? "Ngày có thần hoàng đạo trực nhật."
      : "Ngày có thần hắc đạo trực nhật, nên dựa vào giờ tốt và sao tốt.",
  );

  const truc = TRUC_EFFECT[day.truc];
  const trucGood = truc?.good === "all" || truc?.good.includes(tag);
  const trucBad = truc?.bad === "all" || truc?.bad.includes(tag);
  if (trucBad) {
    add("truc", `Trực ${day.truc}`, -12, `Kỵ với ${activity}. ${truc?.summary ?? ""}`);
    if (truc?.bad === "all") ceiling = Math.min(ceiling, 59);
  } else if (trucGood) {
    add("truc", `Trực ${day.truc}`, 10, `Hợp với ${activity}. ${truc?.summary ?? ""}`);
  } else {
    add("truc", `Trực ${day.truc}`, 0, truc?.summary ?? "");
  }

  const tuBase = day.tu.type === "cat" ? 6 : day.tu.type === "hung" ? -6 : 0;
  const tuExtra = day.tu.good.includes(tag) ? 4 : day.tu.bad.includes(tag) ? -8 : 0;
  const tuKind = day.tu.type === "cat" ? "Cát tú" : day.tu.type === "hung" ? "Hung tú" : "Bình tú";
  add(
    "tu",
    `Sao ${day.tu.fullName}`,
    tuBase + tuExtra,
    `${tuKind}${tuExtra > 0 ? `, hợp ${activity}` : tuExtra < 0 ? `, kỵ ${activity}` : ""}.`,
  );

  const MAJOR = new Set(["Thụ tử", "Sát chủ"]);
  const goodHits = day.stars.filter((s) => s.kind === "good" && (s.all || s.good.includes(tag)));
  const goodScore = goodHits.reduce(
    (sum, s) => sum + (s.all ? 2 : 0) + (s.good.includes(tag) ? 4 : 0),
    0,
  );
  if (goodHits.length) {
    add("sao", "Sao tốt", Math.min(goodScore, 20), goodHits.map((s) => s.name).join(", "));
  }
  const badHits = day.stars.filter(
    (s) => s.kind === "bad" && !MAJOR.has(s.name) && (s.all || s.bad.includes(tag)),
  );
  if (badHits.length) {
    const resolver = day.stars.find((s) => s.resolves);
    const raw = badHits.reduce((sum, s) => sum + (s.bad.includes(tag) ? 5 : 3), 0);
    const penalty = Math.min(resolver ? Math.round(raw * 0.6) : raw, 20);
    add(
      "sao",
      "Sao xấu",
      -penalty,
      `${badHits.map((s) => s.name).join(", ")}${resolver ? ` (có ${resolver.name} giải bớt)` : ""}`,
    );
  }

  const taboo = (label: string, detail: string, cap: number) => {
    add("ky", label, -10, detail);
    warnings.push(`${label}: ${detail}`);
    ceiling = Math.min(ceiling, cap);
  };
  if (day.isSatChu) taboo("Sát chủ", "Ngày kỵ khởi sự việc lớn.", 49);
  if (day.stars.some((s) => s.name === "Thụ tử")) taboo("Thụ tử", "Ngày xấu với mọi việc lớn.", 49);
  if (day.isTamNuong) taboo("Tam nương", `Ngày ${day.lunar.day} âm lịch, dân gian tránh việc lớn.`, 59);
  if (day.isNguyetKy) {
    taboo("Nguyệt kỵ", `Ngày ${day.lunar.day} âm lịch, dân gian tránh đi xa và khởi sự.`, 59);
  }
  if (day.isDuongCong) taboo("Dương công kỵ nhật", "Một trong 13 ngày đại kỵ trong năm.", 59);

  if (tag === "xuat-hanh") {
    add(
      "luc-dieu",
      `Lục diệu: ${day.lucDieu.name}`,
      day.lucDieu.good ? 6 : -6,
      day.lucDieu.good ? "Thuận đường đi." : "Dễ trắc trở khi đi xa.",
    );
  }

  const hopTuoi: string[] = [];
  const xungTuoi = [...day.clashAges];
  let birthChi: Chi | undefined;
  if (params.birthYear) {
    const birth = getYearCanChi(params.birthYear);
    birthChi = birth.chi;
    const label = `${CAN_VI[birth.can]} ${CHI_VI[birth.chi]}`;
    const a = CHI_LIST.indexOf(birth.chi);
    const b = CHI_LIST.indexOf(day.canChi.dayChi);
    if (day.clashAges.includes(label)) {
      add(
        "tuoi",
        `Tuổi ${label} xung khắc ngày`,
        -18,
        `Ngày ${day.canChi.dayLabel} xung khắc trực tiếp với tuổi này.`,
      );
      warnings.push(`Tuổi ${label} nằm trong nhóm tuổi xung khắc của ngày ${day.canChi.dayLabel}.`);
      ceiling = Math.min(ceiling, 49);
    } else if (Math.abs(a - b) === 6) {
      add(
        "tuoi",
        `Tuổi ${CHI_VI[birth.chi]} lục xung ngày`,
        -6,
        "Chi tuổi đối xung chi ngày, nhưng can không khắc nên nhẹ hơn.",
      );
    } else if ((a + b) % 12 === 1) {
      add("tuoi", `Lục hợp với tuổi ${CHI_VI[birth.chi]}`, 6, `Chi ngày ${CHI_VI[day.canChi.dayChi]} lục hợp chi tuổi.`);
      hopTuoi.push(label);
    } else if (a !== b && (a - b) % 4 === 0) {
      add("tuoi", `Tam hợp với tuổi ${CHI_VI[birth.chi]}`, 5, `Chi ngày ${CHI_VI[day.canChi.dayChi]} tam hợp chi tuổi.`);
      hopTuoi.push(label);
    }

    const birthNapAm = getNapAm(birth.can, birth.chi);
    const rel = relation(napAmElement(day.napAm), napAmElement(birthNapAm));
    const NAP: Record<string, [number, string]> = {
      sinh: [4, "Mệnh ngày sinh mệnh tuổi."],
      cung: [2, "Mệnh ngày cùng hành với mệnh tuổi."],
      khac: [-5, "Mệnh ngày khắc mệnh tuổi."],
    };
    const nap = NAP[rel];
    if (nap) add("tuoi", `Nạp âm: ${day.napAm} với ${birthNapAm}`, nap[0], nap[1]);

    // Hạn năm chỉ cảnh báo, không đổi điểm của một ngày cụ thể.
    if (tag === "xay" || tag === "nhap-trach" || tag === "cuoi") {
      const house = assessHouseYear(params.birthYear, day.lunar.year);
      if (house.ok) {
        if (house.kimLau && (tag !== "cuoi" || params.gender === "nu")) {
          warnings.push(`Năm ${day.lunar.year}, tuổi mụ ${house.age} phạm ${house.kimLau}.`);
        } else if (house.kimLau && !params.gender) {
          warnings.push(
            `Tuổi mụ ${house.age} rơi vào ${house.kimLau}; khi cưới, kim lâu thường xét cho cô dâu. Chọn giới tính để xét đúng.`,
          );
        }
        if (house.phamTamTai && tag !== "cuoi") {
          warnings.push(`Năm ${day.lunar.year} tuổi này phạm tam tai.`);
        }
      }
    }
  }

  const total = 54 + factors.reduce((sum, f) => sum + f.delta, 0);
  const score = Math.max(0, Math.min(ceiling, 100, total));
  const rating = score >= 70 ? "tot" : score >= 55 ? "trung-binh" : score >= 38 ? "nen-tranh" : "xau";

  const bestHours = day.hours
    .filter((hour) => {
      if (!hour.isGood) return false;
      if (!birthChi) return true;
      return Math.abs(CHI_LIST.indexOf(hour.chi) - CHI_LIST.indexOf(birthChi)) !== 6;
    })
    .map((hour) => hour.label);

  const plus = factors.filter((f) => f.delta > 0).sort((x, y) => y.delta - x.delta)[0];
  const minus = factors.filter((f) => f.delta < 0).sort((x, y) => x.delta - y.delta)[0];
  const caution = minus?.group === "sao" ? `các sao xấu ${minus.detail.split(" (")[0]}` : minus?.label;
  const verdict = `${RATING_TEXT[rating]} cho ${purpose.name.toLowerCase()}${
    plus ? `: mạnh nhất là ${plus.label}` : ""
  }${caution ? `${plus ? ", " : ": "}cần lưu ý ${caution}` : ""}.`;

  return {
    date: params.date,
    purpose,
    score,
    rating,
    verdict,
    reasons: factors.map((f) => `${f.label} (${f.delta >= 0 ? "+" : ""}${f.delta}): ${f.detail}`),
    factors,
    warnings,
    bestHours,
    dayDetail: day,
    goodHours: day.gioHoangDao,
    badHours: day.gioHacDao,
    hopTuoi,
    xungTuoi,
    huongXuatHanh: [`Hỷ thần: ${day.directions.hyThan}`, `Tài thần: ${day.directions.taiThan}`],
    disclaimer:
      "Điểm số tổng hợp các quy ước của lịch vạn sự để tiện so sánh giữa các ngày. Đây là tham khảo văn hóa, không phải lời khuyên pháp lý hay định mệnh.",
  };
}

export function findGoodDaysInMonth(params: {
  year: number;
  month: number;
  purposeId: string;
  birthYear?: number;
  gender?: Gender;
  minScore?: number;
}) {
  const daysInMonth = new Date(params.year, params.month, 0).getDate();
  const results: DayAssessment[] = [];
  for (let d = 1; d <= daysInMonth; d += 1) {
    const a = assessDay({
      date: { day: d, month: params.month, year: params.year },
      purposeId: params.purposeId,
      birthYear: params.birthYear,
      gender: params.gender,
    });
    if (a.score >= (params.minScore ?? 65)) results.push(a);
  }
  return results.sort((a, b) => b.score - a.score);
}
