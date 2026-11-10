import Link from "next/link";
import { FooterYear } from "@/components/layout/FooterYear";
import { Separator } from "@/components/ui/separator";

const TOOLS = [
  { href: "/lich-am-duong", label: "Lịch âm dương" },
  { href: "/xem-ngay-tot", label: "Xem ngày tốt" },
  { href: "/tu-vi", label: "Tử vi" },
  { href: "/boi-toan", label: "Bói toán" },
  { href: "/gieo-que", label: "Gieo quẻ" },
  { href: "/phong-thuy", label: "Phong thủy" },
];

const EXPLORE = [
  { href: "/kien-thuc", label: "Kiến thức" },
  { href: "/tim-kiem", label: "Tìm kiếm" },
  { href: "/tai-khoan", label: "Tài khoản" },
];

export function SiteFooter() {
  return (
    <footer className="relative z-[1] mt-auto border-t border-accent/40 bg-secondary text-secondary-foreground">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="ink-heading text-2xl text-accent">Huyền Tâm</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-secondary-foreground/80">
            Gìn giữ lịch pháp, phong thủy và tri thức phương Đông bằng lời văn trong trẻo,
            tôn trọng nguồn gốc dân gian Việt.
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.18em] text-accent uppercase">Công cụ</p>
          <ul className="mt-4 space-y-2">
            {TOOLS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-secondary-foreground/80 transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.18em] text-accent uppercase">Khám phá</p>
          <ul className="mt-4 space-y-2">
            {EXPLORE.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-secondary-foreground/80 transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <Separator className="via-accent/50" />
        <div className="flex flex-col gap-2 py-6 text-xs leading-relaxed text-secondary-foreground/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <FooterYear /> Huyền Tâm.
          </p>
          <p className="max-w-xl sm:text-right">
            Nội dung mang tính văn hóa và tham khảo, không thay thế quyết định cá nhân hay tư vấn chuyên môn.
          </p>
        </div>
      </div>
    </footer>
  );
}
