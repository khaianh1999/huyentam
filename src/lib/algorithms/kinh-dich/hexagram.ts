/**
 * I Ching (Kinh Dịch) coin-casting & lookup.
 * Randomness uses seeded PRNG so results are reproducible/testable.
 * Interpretations are loaded from structured data — folk/reference content labeled.
 */

import type { HexagramLine, HexagramResult } from "@/types";
import { HEXAGRAMS } from "@/data/hexagrams/hexagrams";

/** Mulberry32 — deterministic PRNG from seed string */
export function hashSeed(seed: string): number {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i += 1) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return (h >>> 0) || 1;
}

export function createRng(seed: string) {
  let t = hashSeed(seed);
  return function next() {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/** Classic 3-coin method: 6/7/8/9 → old yin / young yang / young yin / old yang */
export function tossThreeCoins(rng: () => number): {
  value: 6 | 7 | 8 | 9;
  yang: boolean;
  changing: boolean;
  faces: ("head" | "tail")[];
} {
  const faces: ("head" | "tail")[] = [];
  let sum = 0;
  for (let i = 0; i < 3; i += 1) {
    const head = rng() < 0.5;
    faces.push(head ? "head" : "tail");
    sum += head ? 3 : 2;
  }
  const value = sum as 6 | 7 | 8 | 9;
  return {
    value,
    yang: value === 7 || value === 9,
    changing: value === 6 || value === 9,
    faces,
  };
}

export function linesToBinary(lines: HexagramLine[]): string {
  // bottom to top, yang=1 yin=0
  return lines.map((l) => (l.yang ? "1" : "0")).join("");
}

export function binaryToNumber(binary: string): number {
  const map = HEXAGRAMS.find((h) => h.binary === binary);
  return map?.number ?? 1;
}

export function castHexagram(seed: string): HexagramResult {
  const rng = createRng(seed);
  const lines: HexagramLine[] = [];
  for (let i = 0; i < 6; i += 1) {
    const toss = tossThreeCoins(rng);
    lines.push({ yang: toss.yang, changing: toss.changing });
  }
  const primaryBinary = linesToBinary(lines);
  const primaryNumber = binaryToNumber(primaryBinary);
  const primary = HEXAGRAMS.find((h) => h.number === primaryNumber) ?? HEXAGRAMS[0];

  const changingLines = lines
    .map((l, idx) => (l.changing ? idx + 1 : -1))
    .filter((n) => n > 0);

  let changingNumber: number | null = null;
  let changingName: string | null = null;
  if (changingLines.length > 0) {
    const changed = lines.map((l) => ({
      yang: l.changing ? !l.yang : l.yang,
      changing: false,
    }));
    changingNumber = binaryToNumber(linesToBinary(changed));
    changingName =
      HEXAGRAMS.find((h) => h.number === changingNumber)?.nameVi ?? null;
  }

  return {
    primaryNumber,
    primaryName: primary.nameVi,
    changingNumber,
    changingName,
    lines,
    changingLines,
    interpretation: {
      overview: primary.overview,
      career: primary.career,
      wealth: primary.wealth,
      love: primary.love,
      family: primary.family,
      health: primary.health,
      advice: primary.advice,
      fortuneLevel: primary.fortuneLevel,
    },
    seed,
    disclaimer:
      "Kết quả gieo quẻ dùng phương pháp 3 đồng xu Kinh Dịch. Nội dung luận giải mang tính tham khảo văn hóa cổ học/dân gian, không thay thế quyết định thực tế.",
  };
}

export function pickRandomHexagram(seed: string): HexagramResult {
  const rng = createRng(seed);
  const idx = Math.floor(rng() * 64);
  const primary = HEXAGRAMS[idx] ?? HEXAGRAMS[0];
  const lines: HexagramLine[] = primary.binary.split("").map((b) => ({
    yang: b === "1",
    changing: false,
  }));
  return {
    primaryNumber: primary.number,
    primaryName: primary.nameVi,
    changingNumber: null,
    changingName: null,
    lines,
    changingLines: [],
    interpretation: {
      overview: primary.overview,
      career: primary.career,
      wealth: primary.wealth,
      love: primary.love,
      family: primary.family,
      health: primary.health,
      advice: primary.advice,
      fortuneLevel: primary.fortuneLevel,
    },
    seed,
    disclaimer:
      "Quẻ được chọn bằng RNG có seed (có thể kiểm thử). Luận giải mang tính tham khảo văn hóa.",
  };
}

export function getHexagramByNumber(n: number) {
  return HEXAGRAMS.find((h) => h.number === n) ?? null;
}
