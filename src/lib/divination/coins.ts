import { castHexagram, createRng, tossThreeCoins } from "@/lib/algorithms/kinh-dich/hexagram";
import type { HexagramResult } from "@/types";

export type CoinFace = "head" | "tail";

export type RevealedToss = {
  value: 6 | 7 | 8 | 9;
  yang: boolean;
  changing: boolean;
  faces: CoinFace[];
};

export function previewCoinCast(seed: string): {
  tosses: RevealedToss[];
  result: HexagramResult;
} {
  const rng = createRng(seed);
  const tosses: RevealedToss[] = [];
  for (let line = 0; line < 6; line += 1) {
    tosses.push(tossThreeCoins(rng));
  }
  const result = castHexagram(seed);
  return { tosses, result };
}

export function lineTitle(value: 6 | 7 | 8 | 9): string {
  switch (value) {
    case 6:
      return "Lão âm · 6";
    case 7:
      return "Thiếu dương · 7";
    case 8:
      return "Thiếu âm · 8";
    case 9:
      return "Lão dương · 9";
  }
}

export function faceLabel(face: CoinFace): string {
  return face === "head" ? "Ngửa · 3" : "Sấp · 2";
}
