import { connection } from "next/server";
import { TuViStudio } from "@/components/divination/TuViStudio";
import { vnDateParts } from "@/lib/divination/vn-date";

export async function TuViLoader({
  mode,
}: {
  mode: "studio" | "ngay" | "nam" | "thang";
}) {
  await connection();
  return <TuViStudio mode={mode} today={vnDateParts(new Date())} />;
}
