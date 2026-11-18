"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DynamicIcon, iconNames, type IconName } from "lucide-react/dynamic";
import { cn } from "@/lib/utils";

const ICON_NAMES = new Set<string>(iconNames);

function resolveIconName(iconName: string): IconName {
  const kebab = iconName
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();

  if (ICON_NAMES.has(kebab)) {
    return kebab as IconName;
  }

  return "sparkles";
}

type ToolCardProps = {
  title: string;
  description: string;
  href: string;
  iconName: string;
  className?: string;
  /** "compact" lays the icon beside the text, for dense grids. */
  variant?: "default" | "compact";
};

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function ToolCard({
  title,
  description,
  href,
  iconName,
  className,
  variant = "default",
}: ToolCardProps) {
  const icon = <DynamicIcon name={resolveIconName(iconName)} className="size-5" />;

  if (variant === "compact") {
    return (
      <Link
        href={href}
        className={cn("paper-card group flex items-start gap-3.5 rounded-xl p-4 hover:-translate-y-0.5", FOCUS, className)}
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/12 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
          {icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center justify-between gap-2">
            <span className="ink-heading text-[1.02rem] leading-snug text-ink transition-colors group-hover:text-primary">
              {title}
            </span>
            <ArrowRight
              className="size-4 shrink-0 -translate-x-1 text-bronze opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
              aria-hidden="true"
            />
          </span>
          <span className="mt-1 line-clamp-2 block text-[13px] leading-relaxed text-muted-foreground">
            {description}
          </span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn("paper-card group flex flex-col rounded-2xl p-5 hover:-translate-y-0.5", FOCUS, className)}
    >
      <span className="mb-4 grid size-11 place-items-center rounded-xl bg-accent/12 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
        {icon}
      </span>
      <span className="ink-heading block text-lg text-ink transition-colors group-hover:text-primary">
        {title}
      </span>
      <span className="mt-2 block flex-1 text-sm leading-relaxed text-muted-foreground">
        {description}
      </span>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-bronze">
        Khám phá
        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
