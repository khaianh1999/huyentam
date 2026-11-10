import Link from "next/link";
import { AdminHeading, DataTable, SchemaNote } from "@/components/admin/AdminBits";
import { DAY_PURPOSES } from "@/data/calendar/day-purposes";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Lịch",
  description: "Mục đích xem ngày và ghi chú thuật toán lịch.",
  path: "/admin/lich",
});

export default function AdminCalendarPage() {
  return (
    <>
      <AdminHeading
        eyebrow="Lịch pháp"
        title="Lịch âm dương"
        description="Can chi, tiết khí và âm lịch tính bằng thuật toán. Mục đích xem ngày là lớp quan niệm dân gian."
      />
      <SchemaNote>
        Không có bảng lịch trong Prisma. Thuật toán nằm ở src/lib/algorithms/calendar. Lễ tiết muốn ghi đè có thể để trong SiteSetting, khóa lich.le-tet. Trang công khai: /lich-am-duong và /xem-ngay-tot.
      </SchemaNote>
      <DataTable
        headers={["Mã", "Mục đích", "Trang xem"]}
        rows={DAY_PURPOSES.map((item) => [
          item.id,
          item.name,
          <Link key={item.id} href={`/xem-ngay-tot?muc-dich=${item.id}`} className="text-primary hover:underline">
            Xem ngày
          </Link>,
        ])}
      />
    </>
  );
}
