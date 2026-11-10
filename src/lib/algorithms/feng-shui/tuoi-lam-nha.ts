import { NGU_HANH_VI } from "@/lib/algorithms/calendar/constants";
import { getBanMenhByYear, relation } from "@/lib/algorithms/feng-shui/ngu-hanh";
import { relationLabel } from "@/lib/divination/labels";
import { animalFromYear } from "@/lib/zodiac/animal-year";

const TAM_TAI: Record<string, readonly string[]> = {
  ty: ["Hổ", "Mèo", "Rồng"],
  thin: ["Hổ", "Mèo", "Rồng"],
  than: ["Hổ", "Mèo", "Rồng"],
  dan: ["Khỉ", "Gà", "Chó"],
  ngo: ["Khỉ", "Gà", "Chó"],
  tuat: ["Khỉ", "Gà", "Chó"],
  hoi: ["Rắn", "Ngựa", "Dê"],
  mao: ["Rắn", "Ngựa", "Dê"],
  mui: ["Rắn", "Ngựa", "Dê"],
  ti: ["Lợn", "Chuột", "Trâu"],
  dau: ["Lợn", "Chuột", "Trâu"],
  suu: ["Lợn", "Chuột", "Trâu"],
};

const KIM_LAU: Record<number, string> = {
  1: "Kim lâu thân",
  3: "Kim lâu thê",
  6: "Kim lâu tử",
  8: "Kim lâu lục súc",
};

export function assessHouseYear(birthYear: number, buildYear: number) {
  const age = buildYear - birthYear + 1;
  if (age < 1 || age > 130) {
    return {
      ok: false as const,
      error: "Năm xây cần sau năm sinh, và tuổi mụ không quá 130.",
    };
  }
  const owner = animalFromYear(birthYear);
  const build = animalFromYear(buildYear);
  const ownerMenh = getBanMenhByYear(birthYear);
  const buildMenh = getBanMenhByYear(buildYear);
  const hanh = relation(ownerMenh.element, buildMenh.element);
  const kimLau = KIM_LAU[age % 9] ?? null;
  const tamTaiNames = TAM_TAI[owner.id] ?? [];
  const phamTamTai = tamTaiNames.includes(build.name);
  const xungTuoi = owner.tuHanhXung.includes(build.name) || owner.khac.includes(build.name);

  return {
    ok: true as const,
    age,
    owner,
    build,
    ownerElement: NGU_HANH_VI[ownerMenh.element],
    buildElement: NGU_HANH_VI[buildMenh.element],
    hanhLabel: relationLabel(hanh),
    kimLau,
    phamTamTai,
    tamTaiNames,
    xungTuoi,
    note: "Tuổi mụ ở đây = năm xây − năm sinh + 1. Kim lâu và tam tai là quan niệm dân gian, mỗi vùng có thể kể khác một chi tiết. Không thay cho giấy phép xây dựng.",
  };
}
