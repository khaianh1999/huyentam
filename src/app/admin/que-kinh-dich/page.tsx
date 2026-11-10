import { AdminHeading, DataTable, SchemaNote } from "@/components/admin/AdminBits";
import { HEXAGRAMS } from "@/data/hexagrams";
import { createPageMetadata } from "@/lib/seo/metadata";

const LEVEL: Record<string, string> = {
  "dai-cat": "Đại cát",
  cat: "Cát",
  binh: "Bình",
  hung: "Hung",
  "dai-hung": "Đại hung",
};

export const metadata = createPageMetadata({
  title: "Quẻ Kinh Dịch",
  description: "64 quẻ Văn Vương trong dữ liệu tĩnh, sẵn model HexagramContent.",
  path: "/admin/que-kinh-dich",
});

export default function AdminHexagramsPage() {
  return (
    <>
      <AdminHeading
        eyebrow="Kinh Dịch"
        title="64 quẻ"
        description="Danh sách đọc từ HEXAGRAMS. Sửa lời quẻ trong src/data/hexagrams/hexagrams.ts cho đến khi bảng HexagramContent được nạp."
      />
      <SchemaNote>
        Model <strong>HexagramContent</strong> dùng id 1–64, nameVi, nameCn, binary, các đoạn overview / career / wealth / love / family / health / advice và fortuneLevel. Trang này chưa ghi đè từng quẻ.
      </SchemaNote>
      <DataTable
        headers={["Số", "Quẻ", "Tên", "Mức", "Tóm tắt"]}
        rows={HEXAGRAMS.map((item) => [
          String(item.number),
          item.symbol,
          `${item.nameVi} ${item.nameCn}`,
          LEVEL[item.fortuneLevel] ?? item.fortuneLevel,
          item.overview.slice(0, 110),
        ])}
      />
    </>
  );
}
