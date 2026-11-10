import { AdminHeading, DataTable, SchemaNote } from "@/components/admin/AdminBits";
import { QUAN_AM_STICKS } from "@/data/fortune-sticks/quan-am";
import { QUAN_THANH_STICKS } from "@/data/fortune-sticks/quan-thanh";
import { createPageMetadata } from "@/lib/seo/metadata";

const LEVEL: Record<string, string> = { cat: "Cát", binh: "Bình", hung: "Hung" };

export const metadata = createPageMetadata({
  title: "Xin xăm",
  description: "Hai bộ xăm Quan Âm và Quan Thánh trong dữ liệu tĩnh.",
  path: "/admin/xin-xam",
});

function rows(sticks: { number: number; title: string; level: string; meaning: string }[]) {
  return sticks.map((stick) => [
    String(stick.number),
    stick.title,
    LEVEL[stick.level] ?? stick.level,
    stick.meaning.slice(0, 120),
  ]);
}

export default function AdminSticksPage() {
  return (
    <>
      <AdminHeading
        eyebrow="Xin xăm"
        title="Hai bộ xăm"
        description="Quan Âm và Quan Thánh là dữ liệu biên soạn, không phải bản xăm của một ngôi chùa."
      />
      <SchemaNote>
        Model <strong>FortuneStick</strong> có setKey, number, title, verse, meaning, level, unique theo cặp setKey + number. setKey gợi ý: quan-am, quan-thanh.
      </SchemaNote>
      <h2 className="ink-heading mb-3 text-2xl text-ink">Quan Âm · {QUAN_AM_STICKS.length} thẻ</h2>
      <DataTable headers={["Số", "Tên", "Mức", "Luận"]} rows={rows(QUAN_AM_STICKS)} />
      <h2 className="ink-heading mt-8 mb-3 text-2xl text-ink">Quan Thánh · {QUAN_THANH_STICKS.length} thẻ</h2>
      <DataTable headers={["Số", "Tên", "Mức", "Luận"]} rows={rows(QUAN_THANH_STICKS)} />
    </>
  );
}
