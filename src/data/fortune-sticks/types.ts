import type { StickAspects } from "./aspects";

export type StickLevel = "cat" | "binh" | "hung";

/** Một quẻ xăm đầy đủ: thơ bốn câu, lời giải chung và lời giải sáu việc. */
export type FullStick = {
  number: number;
  title: string;
  level: StickLevel;
  verse: [string, string, string, string];
  meaning: string;
  aspects: StickAspects;
};
