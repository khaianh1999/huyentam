import Link from "next/link";
import { Suspense } from "react";
import { POPULAR_TOOLS } from "@/data/tools/catalog";
import { SidebarToday, TodayFallback } from "@/components/layout/SidebarToday";
import { cn } from "@/lib/utils";

const QUICK_LINKS = [
  { href: "/lich-am-duong", label: "Lịch âm dương" },
  { href: "/xem-ngay-tot", label: "Xem ngày tốt" },
  { href: "/tu-vi", label: "Tử vi" },
  { href: "/boi-ten", label: "Bói tên" },
  { href: "/gieo-que", label: "Gieo quẻ" },
  { href: "/phong-thuy", label: "Phong thủy" },
  { href: "/12-con-giap", label: "12 con giáp" },
  { href: "/kien-thuc", label: "Kiến thức" },
];

const DAY_SHORTCUTS = [
  { href: "/xem-ngay-tot?muc-dich=cuoi-hoi", label: "Ngày cưới hỏi" },
  { href: "/xem-ngay-tot?muc-dich=khai-truong", label: "Ngày khai trương" },
  { href: "/xem-ngay-tot?muc-dich=xuat-hanh", label: "Ngày xuất hành" },
  { href: "/xem-ngay-tot/theo-thang", label: "Lọc ngày trong tháng" },
];

type SiteSidebarProps = {
  className?: string;
  children?: React.ReactNode;
};

/** Cột phải đủ thẻ để không để khoảng trống trắng. */
export function SiteSidebar({ className, children }: SiteSidebarProps) {
  return (
    <aside className={cn("space-y-3.5", className)}>
      {children}

      <Suspense fallback={<TodayFallback />}>
        <SidebarToday />
      </Suspense>

      <div className="paper-card rounded-2xl p-4">
        <p className="px-0.5 eyebrow">
          Mục lục
        </p>
        <nav aria-label="Lối tắt" className="mt-2">
          <ul className="space-y-0.5">
            {QUICK_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 text-[13px] text-wood transition hover:bg-accent/15 hover:text-primary"
                >
                  {item.label}
                  <span className="text-accent/55" aria-hidden="true">
                    ›
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="paper-card rounded-2xl p-4">
        <p className="eyebrow">
          Xem ngày
        </p>
        <ul className="mt-2 space-y-1">
          {DAY_SHORTCUTS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-lg border border-transparent px-2 py-1.5 text-[13px] text-wood transition hover:border-accent/35 hover:bg-white/60 hover:text-primary"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="paper-card rounded-2xl p-4">
        <p className="eyebrow">
          Hay dùng
        </p>
        <ul className="mt-2.5 space-y-2">
          {POPULAR_TOOLS.slice(0, 4).map((tool) => (
            <li key={tool.href + tool.title}>
              <Link
                href={tool.href}
                className="block rounded-xl border border-border/60 bg-white/55 px-2.5 py-2 transition hover:border-accent/45 hover:bg-accent/10"
              >
                <span className="ink-heading block text-[13px] leading-snug text-ink">
                  {tool.title}
                </span>
                <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground line-clamp-2">
                  {tool.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-dashed border-accent/40 bg-[#f8efd4]/70 px-3.5 py-3">
        <p className="text-[10px] font-semibold tracking-[0.18em] text-bronze uppercase">
          Lưu ý
        </p>
        <p className="mt-1.5 text-[11px] leading-relaxed text-wood">
          Can chi và âm lịch tính theo thuật toán. Hoàng đạo, trực, xin xăm là quan niệm
          dân gian tham khảo — không thay quyết định thực tế.
        </p>
      </div>
    </aside>
  );
}
