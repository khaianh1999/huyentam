import Link from "next/link";
import { AdminHeading, DataTable, SchemaNote } from "@/components/admin/AdminBits";
import { WESTERN_SIGNS, ZODIAC_ANIMALS } from "@/data/zodiac";
import { NGU_HANH_VI, CHI_VI } from "@/lib/algorithms/calendar/constants";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Tử vi",
  description: "Nơi quản lý văn bản con giáp và cung hoàng đạo.",
  path: "/admin/tu-vi",
});

export default function AdminTuViPage() {
  return (
    <>
      <AdminHeading
        eyebrow="Tử vi"
        title="Văn bản lá số"
        description="Chưa có model Prisma riêng cho lá số. Ngày sinh nằm trên User. Lời con giáp và cung hoàng đạo nằm trong dữ liệu tĩnh."
      />
      <SchemaNote>
        User có birthDay, birthMonth, birthYear, birthHour, gender. Thuật toán ở src/lib/algorithms/astrology/tu-vi.ts. Khi cần câu chữ theo mùa, có thể để trong SiteSetting theo khóa tu-vi.* thay vì thêm bảng mới.
      </SchemaNote>
      <h2 className="ink-heading mb-3 text-2xl text-ink">Mười hai con giáp</h2>
      <DataTable
        headers={["Tuổi", "Chi", "Hành của chi", "Trang"]}
        rows={ZODIAC_ANIMALS.map((animal) => [
          animal.name,
          CHI_VI[animal.chi],
          NGU_HANH_VI[animal.element],
          <Link key={animal.id} href={`/12-con-giap/${animal.id}`} className="text-primary hover:underline">
            /12-con-giap/{animal.id}
          </Link>,
        ])}
      />
      <h2 className="ink-heading mt-8 mb-3 text-2xl text-ink">Mười hai cung</h2>
      <DataTable
        headers={["Cung", "Khoảng ngày", "Nguyên tố", "Trang"]}
        rows={WESTERN_SIGNS.map((sign) => [
          `${sign.symbol} ${sign.name}`,
          sign.dateRange,
          sign.element,
          <Link key={sign.id} href={`/cung-hoang-dao/${sign.id}`} className="text-primary hover:underline">
            /cung-hoang-dao/{sign.id}
          </Link>,
        ])}
      />
    </>
  );
}
