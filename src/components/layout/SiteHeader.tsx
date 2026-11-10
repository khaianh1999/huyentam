"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Search, User, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Trang chủ" },
  { href: "/lich-am-duong", label: "Lịch âm dương" },
  { href: "/xem-ngay-tot", label: "Xem ngày tốt" },
  { href: "/tu-vi", label: "Tử vi" },
  { href: "/boi-toan", label: "Bói toán" },
  { href: "/gieo-que", label: "Gieo quẻ" },
  { href: "/phong-thuy", label: "Phong thủy" },
  { href: "/kien-thuc", label: "Kiến thức" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function YinSeal() {
  return (
    <svg viewBox="0 0 64 64" className="size-6" aria-hidden="true">
      <circle cx="32" cy="32" r="28" fill="#1a120b" />
      <path
        d="M32 6a26 26 0 0 1 0 52 13 13 0 0 1 0-26 13 13 0 0 0 0-26z"
        fill="#f7f1e6"
      />
      <circle cx="32" cy="19" r="3.2" fill="#1a120b" />
      <circle cx="32" cy="45" r="3.2" fill="#f7f1e6" />
    </svg>
  );
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
    <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Menu di động">
      {NAV.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              "rounded-lg px-3 py-2.5 text-sm text-wood transition-colors hover:bg-muted hover:text-primary",
              active && "bg-muted font-medium text-primary",
            )}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
      <Link
        href="/tim-kiem"
        onClick={() => setOpen(false)}
        className="mt-1 rounded-lg px-3 py-2.5 text-sm text-wood hover:bg-muted hover:text-primary"
      >
        Tìm kiếm
      </Link>
      <Link
        href="/tai-khoan"
        onClick={() => setOpen(false)}
        className="rounded-lg px-3 py-2.5 text-sm text-wood hover:bg-muted hover:text-primary"
      >
        Tài khoản
      </Link>
    </nav>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-accent/30 bg-background/90 backdrop-blur-md">
      <a
        href="#noi-dung"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-card focus:px-3 focus:py-2 focus:text-sm focus:text-ink focus:shadow-sm"
      >
        Tới nội dung
      </a>
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Huyền Tâm, về trang chủ">
          <span className="grid size-11 place-items-center rounded-full border border-accent bg-primary shadow-[0_0_0_4px_rgba(201,162,39,0.16)]">
            <YinSeal />
          </span>
          <span className="flex flex-col">
            <span className="ink-heading text-[1.35rem] leading-none text-ink">Huyền Tâm</span>
            <span className="mt-1 hidden text-[11px] tracking-[0.16em] text-bronze uppercase sm:block">
              Lịch pháp · Phong thủy
            </span>
          </span>
        </Link>

        <nav className="ml-2 hidden min-w-0 flex-1 items-center justify-center gap-x-3.5 xl:flex" aria-label="Điều hướng chính">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative py-1 text-[14px] tracking-wide text-wood transition-colors hover:text-primary",
                  active && "font-medium text-primary",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
                {active ? (
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-accent" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Link
            href="/tim-kiem"
            aria-label="Tìm kiếm"
            className={cn(
              "hidden size-10 items-center justify-center rounded-full text-wood transition-colors hover:bg-muted hover:text-primary sm:inline-flex",
              isActive(pathname, "/tim-kiem") && "text-primary",
            )}
          >
            <Search className="size-4" />
          </Link>
          <Link
            href="/tai-khoan"
            aria-label="Tài khoản"
            className={cn(
              "hidden size-10 items-center justify-center rounded-full text-wood transition-colors hover:bg-muted hover:text-primary sm:inline-flex",
              isActive(pathname, "/tai-khoan") && "text-primary",
            )}
          >
            <User className="size-4" />
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-wood transition-colors hover:bg-muted hover:text-primary xl:hidden"
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
    </header>
  );
}
