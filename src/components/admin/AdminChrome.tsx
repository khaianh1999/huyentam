"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Bảng tin" },
  { href: "/admin/bai-viet", label: "Bài viết" },
  { href: "/admin/danh-muc", label: "Danh mục" },
  { href: "/admin/que-kinh-dich", label: "Quẻ Kinh Dịch" },
  { href: "/admin/xin-xam", label: "Xin xăm" },
  { href: "/admin/tu-vi", label: "Tử vi" },
  { href: "/admin/lich", label: "Lịch" },
  { href: "/admin/nguoi-dung", label: "Người dùng" },
  { href: "/admin/seo", label: "SEO" },
  { href: "/admin/cau-hinh", label: "Cấu hình" },
] as const;

function isCurrent(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f7f1e6] text-ink lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="border-b border-[#c9a227]/40 bg-[#1a120b] text-[#f3e6c8] lg:min-h-screen lg:border-r lg:border-b-0">
        <div className="flex items-center gap-3 px-4 py-4">
          <span className="grid size-10 place-items-center rounded-full border border-[#c9a227] bg-[#8b1e1e] text-xs tracking-widest text-[#f7f1e6]">
            玄
          </span>
          <span>
            <span className="ink-heading block text-lg leading-none text-[#fff8e7]">Huyền Tâm</span>
            <span className="mt-1 block text-[10px] tracking-[0.22em] text-[#c9a227] uppercase">
              Quản trị
            </span>
          </span>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible lg:px-3 lg:pb-4" aria-label="Mục quản trị">
          {LINKS.map((item) => {
            const active = isCurrent(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "shrink-0 rounded-lg px-3 py-2 text-sm text-[#f3e6c8]/80 hover:bg-white/5 hover:text-[#fff8e7]",
                  active && "bg-[#c9a227]/15 font-medium text-[#c9a227]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden px-4 pb-6 lg:block">
          <p className="text-xs leading-relaxed text-[#f3e6c8]/60">
            Giao diện soạn thảo. Phân quyền ADMIN / EDITOR trên model User sẽ khóa cửa này khi bật cơ sở dữ liệu.
          </p>
          <Link href="/" className="mt-3 inline-block text-sm text-[#c9a227] hover:underline">
            Về trang chủ
          </Link>
        </div>
      </aside>
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">{children}</div>
    </div>
  );
}
