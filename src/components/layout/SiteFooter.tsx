import Link from "next/link";
import { FooterYear } from "@/components/layout/FooterYear";
import { BrandMark } from "@/components/layout/Brand";

const COLUMNS = [
  {
    title: "Lịch & ngày",
    links: [
      { href: "/lich-am-duong", label: "Lịch âm dương" },
      { href: "/xem-ngay-tot", label: "Xem ngày tốt" },
      { href: "/xem-ngay-tot/theo-thang", label: "Ngày tốt trong tháng" },
      { href: "/tu-vi/hang-ngay", label: "Tử vi hôm nay" },
      { href: "/12-con-giap", label: "12 con giáp" },
    ],
  },
  {
    title: "Bói & quẻ",
    links: [
      { href: "/tu-vi", label: "Lá số tử vi" },
      { href: "/boi-ten", label: "Bói tên" },
      { href: "/boi-toan", label: "Bói toán dân gian" },
      { href: "/gieo-que", label: "Gieo quẻ Kinh Dịch" },
      { href: "/cung-hoang-dao", label: "Cung hoàng đạo" },
    ],
  },
  {
    title: "Khám phá",
    links: [
      { href: "/phong-thuy", label: "Phong thủy" },
      { href: "/phong-thuy/ngu-hanh", label: "Ngũ hành bản mệnh" },
      { href: "/kien-thuc", label: "Kiến thức" },
      { href: "/tim-kiem", label: "Tìm kiếm" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="lacquer relative z-[1] mt-auto overflow-hidden text-secondary-foreground">
      <div className="cloud-motif pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 pt-14 pb-10 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" aria-label="Huyền Tâm, về trang chủ" className="inline-flex">
            <BrandMark tone="dark" />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-secondary-foreground/75">
            Gìn giữ lịch pháp, phong thủy và tri thức phương Đông bằng lời văn trong trẻo,
            tôn trọng nguồn gốc dân gian Việt.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2 text-[11px] text-secondary-foreground/70">
            <li className="rounded-full border border-accent/30 px-2.5 py-1">Thuật toán minh bạch</li>
            <li className="rounded-full border border-accent/30 px-2.5 py-1">Tôn trọng dân gian</li>
            <li className="rounded-full border border-accent/30 px-2.5 py-1">Dành cho người Việt</li>
          </ul>
        </div>

        {COLUMNS.map((column) => (
          <div key={column.title}>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-accent uppercase">
              {column.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-secondary-foreground/75 transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-5 text-xs leading-relaxed text-secondary-foreground/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © <FooterYear /> Huyền Tâm. Lịch pháp & văn hóa phương Đông.
          </p>
          <p className="max-w-xl sm:text-right">
            Nội dung trên trang được tạo với sự hỗ trợ của AI, chỉ mang tính giải trí và tham khảo văn hóa. Huyền Tâm không chịu trách nhiệm cho bất kỳ quyết định nào dựa trên nội dung này; với việc hệ trọng về sức khỏe, pháp lý, tài chính, hãy hỏi người có chuyên môn.
          </p>
        </div>
      </div>
    </footer>
  );
}
