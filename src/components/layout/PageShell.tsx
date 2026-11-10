import type { ReactNode } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/shared/Breadcrumbs";
import { cn } from "@/lib/utils";

/** Khung rộng hơn để hai bên không bị “biển” khoảng trống. */
const WIDTH = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

const FOOT_LINKS = [
  { href: "/lich-am-duong", label: "Lịch âm" },
  { href: "/xem-ngay-tot", label: "Ngày tốt" },
  { href: "/tu-vi", label: "Tử vi" },
  { href: "/boi-ten", label: "Bói tên" },
  { href: "/gieo-que", label: "Gieo quẻ" },
  { href: "/phong-thuy", label: "Phong thủy" },
  { href: "/kien-thuc", label: "Kiến thức" },
];

type PageShellProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
  width?: keyof typeof WIDTH;
  withSidebar?: boolean;
  sidebar?: ReactNode;
  hideRail?: boolean;
};

export function PageShell({
  children,
  title,
  description,
  breadcrumbs,
  className,
  width = "default",
  hideRail = false,
}: PageShellProps) {
  return (
    <div className="relative z-[1] flex min-h-screen flex-col">
      <SiteHeader />
      <main
        id="noi-dung"
        className={cn(
          "mx-auto w-full flex-1 px-4 py-7 sm:px-6 lg:px-8 lg:py-9",
          WIDTH[width],
        )}
      >
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <Breadcrumbs items={breadcrumbs} className="mb-3" />
        ) : null}

        {title || description ? (
          <header className="mb-7 max-w-3xl">
            {title ? (
              <h1 className="ink-heading text-[1.85rem] leading-[1.15] text-ink sm:text-[2.15rem]">
                {title}
              </h1>
            ) : null}
            {description ? (
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                {description}
              </p>
            ) : null}
            <div
              aria-hidden="true"
              className="mt-4 h-px w-14 bg-gradient-to-r from-accent to-transparent"
            />
          </header>
        ) : null}

        <div className={cn(className)}>{children}</div>

        {!hideRail ? (
          <nav
            aria-label="Công cụ khác"
            className="mt-12 border-t border-accent/25 pt-5"
          >
            <p className="text-[10px] font-semibold tracking-[0.2em] text-bronze uppercase">
              Khám phá thêm
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {FOOT_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex rounded-full border border-accent/30 bg-[#fffaf2]/80 px-3.5 py-1.5 text-sm text-wood transition hover:border-accent hover:bg-accent/15 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </main>
      <SiteFooter />
    </div>
  );
}
