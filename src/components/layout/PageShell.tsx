import type { ReactNode } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import {
  Breadcrumbs,
  type BreadcrumbItem,
} from "@/components/shared/Breadcrumbs";
import {
  BookOpen,
  CalendarCheck,
  CalendarDays,
  Compass,
  Hexagon,
  PenLine,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SectionArt,
  guessArt,
  type ArtName,
} from "@/components/art/SectionArt";

/** Khung rộng hơn để hai bên không bị “biển” khoảng trống. */
const WIDTH = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

const FOOT_LINKS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/lich-am-duong", label: "Lịch âm", icon: CalendarDays },
  { href: "/xem-ngay-tot", label: "Ngày tốt", icon: CalendarCheck },
  { href: "/tu-vi", label: "Tử vi", icon: Sparkles },
  { href: "/boi-ten", label: "Bói tên", icon: PenLine },
  { href: "/gieo-que", label: "Gieo quẻ", icon: Hexagon },
  { href: "/phong-thuy", label: "Phong thủy", icon: Compass },
  { href: "/kien-thuc", label: "Kiến thức", icon: BookOpen },
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
  /** Hình minh họa ở banner; false để tắt, bỏ trống để tự chọn theo tiêu đề. */
  art?: ArtName | false;
};

export function PageShell({
  children,
  title,
  description,
  breadcrumbs,
  className,
  width = "default",
  hideRail = false,
  art,
}: PageShellProps) {
  const hasBanner = Boolean(title || description);
  const artName =
    art === false
      ? null
      : (art ??
        guessArt(
          title,
          (breadcrumbs ?? []).map((item) => item.href ?? "").join(" "),
        ));
  const container = cn("mx-auto w-full px-4 sm:px-6 lg:px-8", WIDTH[width]);

  return (
    <div className="relative z-[1] flex min-h-screen flex-col">
      <SiteHeader />

      {hasBanner ? (
        <section className="page-banner relative overflow-hidden border-b border-accent/20">
          {!artName ? (
            <svg
              viewBox="0 0 200 200"
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 -right-16 size-72 text-accent/15 sm:right-6"
            >
              <circle
                cx="100"
                cy="100"
                r="96"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle
                cx="100"
                cy="100"
                r="78"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="2 6"
              />
              <circle
                cx="100"
                cy="100"
                r="58"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path
                d="M100 42a58 58 0 0 1 0 116 29 29 0 0 1 0-58 29 29 0 0 0 0-58z"
                fill="currentColor"
              />
            </svg>
          ) : null}
          <div className={cn(container, "relative py-8 sm:py-10")}>
            {artName ? (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-4 hidden w-36 -translate-y-1/2 drop-shadow-[0_10px_18px_rgba(90,23,20,0.18)] sm:block md:w-48 lg:right-8 lg:w-60"
              >
                <SectionArt name={artName} />
              </div>
            ) : null}
            {breadcrumbs && breadcrumbs.length > 0 ? (
              <Breadcrumbs items={breadcrumbs} className="mb-4" />
            ) : null}
            <div
              className={cn(
                "max-w-3xl",
                artName && "sm:pr-44 md:pr-60 lg:pr-0",
              )}
            >
              {title ? (
                <h1 className="ink-heading text-[1.9rem] leading-[1.15] text-ink sm:text-[2.4rem]">
                  {title}
                </h1>
              ) : null}
              {description ? (
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                  {description}
                </p>
              ) : null}
              <div aria-hidden="true" className="mt-5 flex items-center gap-2">
                <span className="h-px w-10 bg-accent" />
                <span className="size-1.5 rotate-45 bg-primary" />
                <span className="h-px w-10 bg-gradient-to-r from-accent to-transparent" />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <main id="noi-dung" className={cn(container, "flex-1 py-8 lg:py-10")}>
        {!hasBanner && breadcrumbs && breadcrumbs.length > 0 ? (
          <Breadcrumbs items={breadcrumbs} className="mb-5" />
        ) : null}

        <div className={cn(className)}>{children}</div>

        {!hideRail ? (
          <nav
            aria-label="Công cụ khác"
            className="mt-14 border-t border-accent/20 pt-8"
          >
            <p className="eyebrow">Khám phá thêm</p>
            <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-7">
              {FOOT_LINKS.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="paper-card group flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-wood hover:text-primary"
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent/12 text-bronze transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}
      </main>
      <SiteFooter />
    </div>
  );
}
