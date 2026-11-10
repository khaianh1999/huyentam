import { ZODIAC_ANIMALS } from "@/data/zodiac";
import { getYearCanChi } from "@/lib/algorithms/calendar/can-chi";
import type { ZodiacAnimal } from "@/types";

export type AgeRelation =
  | "cung-tuoi"
  | "tam-hop"
  | "luc-hop"
  | "luc-xung"
  | "tu-hanh-xung"
  | "binh-hoa";

export function animalFromYear(year: number): ZodiacAnimal {
  const { chi } = getYearCanChi(year);
  return ZODIAC_ANIMALS.find((animal) => animal.chi === chi) ?? ZODIAC_ANIMALS[0];
}

export function compareAnimals(yearA: number, yearB: number) {
  const first = animalFromYear(yearA);
  const second = animalFromYear(yearB);
  const tamHop = first.tamHop.includes(second.name) || second.tamHop.includes(first.name);
  const tuHanhXung =
    first.tuHanhXung.includes(second.name) || second.tuHanhXung.includes(first.name);
  const lucHop = first.hop.includes(second.name) || second.hop.includes(first.name);
  const lucXung = first.khac.includes(second.name) || second.khac.includes(first.name);

  let relation: AgeRelation = "binh-hoa";
  if (first.id === second.id) relation = "cung-tuoi";
  else if (lucHop) relation = "luc-hop";
  else if (tamHop) relation = "tam-hop";
  else if (lucXung) relation = "luc-xung";
  else if (tuHanhXung) relation = "tu-hanh-xung";

  return { first, second, tamHop, tuHanhXung, lucHop, lucXung, relation };
}
