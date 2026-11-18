"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  CalendarCheck,
  CalendarDays,
  Compass,
  Hexagon,
  Home,
  Menu,
  Search,
  Sparkles,
  WandSparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { HeaderToday } from "@/components/layout/HeaderToday";
import { BrandMark } from "@/components/layout/Brand";

const NAV: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/lich-am-duong", label: "Lịch âm dương", icon: CalendarDays },
  { href: "/xem-ngay-tot", label: "Xem ngày tốt", icon: CalendarCheck },
  { href: "/tu-vi", label: "Tử vi", icon: Sparkles },
  { href: "/boi-toan", label: "Bói toán", icon: WandSparkles },
  { href: "/gieo-que", label: "Gieo quẻ", icon: Hexagon },
  { href: "/phong-thuy", label: "Phong thủy", icon: Compass },
  { href: "/kien-thuc", label: "Kiến thức", icon: BookOpen },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  const menu = (
    <nav className="mx-auto w-full max-w-7xl px-4 pt-3 pb-5 sm:px-6" aria-label="Menu di động">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {NAV.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2.5 rounded-xl border px-3 py-3 text-sm transition-colors",
                active
                  ? "border-primary/25 bg-primary/[0.07] font-medium text-primary"
                  : "border-border/80 bg-card text-wood hover:border-accent/60 hover:text-primary",
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="size-4 shrink-0 text-bronze" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <Link
          href="/tim-kiem"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5 rounded-xl border border-border/80 bg-card px-3 py-3 text-sm text-wood hover:border-accent/60 hover:text-primary"
        >
          <Search className="size-4 text-bronze" aria-hidden="true" />
          Tìm kiếm
        </Link>
      </div>
    </nav>
  );

  return (
    <header className="sticky top-0 z-40">
      <a
        href="#noi-dung"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-card focus:px-3 focus:py-2 focus:text-sm focus:text-ink focus:shadow-sm"
      >
        Tới nội dung
      </a>

      <div className="bg-secondary text-[12px] text-secondary-foreground/80">
        <div className="mx-auto flex h-8 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <HeaderToday />
          <div className="hidden shrink-0 items-center gap-4 md:flex">
            <Link href="/xem-ngay-tot/theo-thang" className="transition-colors hover:text-accent">
              Ngày tốt trong tháng
            </Link>
            <Link href="/gieo-que/que-hom-nay" className="transition-colors hover:text-accent">
              Quẻ hôm nay
            </Link>
          </div>
        </div>
      </div>

      <div className="border-b border-accent/25 bg-background/85 shadow-[0_6px_20px_-16px_rgba(31,23,18,0.4)] backdrop-blur-md">
        <div className="mx-auto flex h-[4.25rem] w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="shrink-0" aria-label="Huyền Tâm, về trang chủ">
            <BrandMark />
          </Link>

          <nav
            className="ml-4 hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex"
            aria-label="Điều hướng chính"
          >
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-3 py-2 text-[14px] text-wood transition-colors hover:bg-muted hover:text-primary",
                    active && "bg-primary/[0.07] font-medium text-primary",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1.5">
            <Link
              href="/tim-kiem"
              aria-label="Tìm kiếm"
              className={cn(
                "hidden h-10 items-center gap-2 rounded-full border border-border bg-card/80 pr-4 pl-3 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-primary sm:inline-flex",
                isActive(pathname, "/tim-kiem") && "border-accent text-primary",
              )}
            >
              <Search className="size-4" aria-hidden="true" />
              <span className="hidden lg:inline">Tìm kiếm</span>
            </Link>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card/80 text-wood transition-colors hover:border-accent hover:text-primary xl:hidden"
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Đóng menu" : "Mở menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open ? (
            reduceMotion ? (
              <div id="site-menu" className="border-t border-accent/20 xl:hidden">
                {menu}
              </div>
            ) : (
              <motion.div
                id="site-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="overflow-hidden border-t border-accent/20 xl:hidden"
              >
                {menu}
              </motion.div>
            )
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
