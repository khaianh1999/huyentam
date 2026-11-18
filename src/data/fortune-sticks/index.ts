/** Bộ xăm đầy đủ: Quan Âm 100 quẻ, Quan Thánh 20 quẻ, mỗi quẻ có thơ, lời giải và sáu việc. */

import { createRng, hashSeed } from "@/lib/algorithms/kinh-dich/hexagram";
import { QUAN_AM_ASPECTS_1, QUAN_THANH_ASPECTS } from "./aspects";
import { QUAN_AM_STICKS, type FortuneStick } from "./quan-am";
import { QUAN_AM_21_40 } from "./quan-am-21-40";
import { QUAN_AM_41_60 } from "./quan-am-41-60";
import { QUAN_AM_61_80 } from "./quan-am-61-80";
import { QUAN_AM_81_100 } from "./quan-am-81-100";
import { QUAN_THANH_STICKS } from "./quan-thanh";
import type { FullStick } from "./types";

export type { FullStick } from "./types";
export { ASPECT_LABELS } from "./aspects";

function upgrade(stick: FortuneStick, aspects: FullStick["aspects"]): FullStick {
  const lines = stick.verse.split("\n");
  return {
    number: stick.number,
    title: stick.title,
    level: stick.level,
    verse: [lines[0] ?? "", lines[1] ?? "", lines[2] ?? "", lines[3] ?? ""],
    meaning: stick.meaning,
    aspects,
  };
}

export const QUAN_AM_FULL: FullStick[] = [
  ...QUAN_AM_STICKS.map((stick) => upgrade(stick, QUAN_AM_ASPECTS_1[stick.number])),
  ...QUAN_AM_21_40,
  ...QUAN_AM_41_60,
  ...QUAN_AM_61_80,
  ...QUAN_AM_81_100,
];

export const QUAN_THANH_FULL: FullStick[] = QUAN_THANH_STICKS.map((stick) =>
  upgrade(stick, QUAN_THANH_ASPECTS[stick.number]),
);

/** Trang xin xăm phục vụ giải trí nên quẻ thượng có cơ hội rơi ra cao hơn. */
const WEIGHT = { cat: 3, binh: 2, hung: 0.8 } as const;

export function pickStick(kind: "quan-am" | "quan-thanh", seed: string): FullStick {
  const list = kind === "quan-am" ? QUAN_AM_FULL : QUAN_THANH_FULL;
  const rng = createRng(`${kind}|${hashSeed(seed).toString(16)}|${seed}`);
  const total = list.reduce((sum, stick) => sum + WEIGHT[stick.level], 0);
  let remaining = rng() * total;
  for (const stick of list) {
    remaining -= WEIGHT[stick.level];
    if (remaining < 0) return stick;
  }
  return list[0];
}

export const STICK_LEVEL_LABEL = {
  cat: "Thượng quẻ",
  binh: "Trung quẻ",
  hung: "Quẻ lời nhắc",
} as const;
