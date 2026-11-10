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
};

export function ToolCard({ title, description, href, iconName, className }: ToolCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "paper-card gold-border group block rounded-xl p-5 transition duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <span className="mb-4 flex size-11 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-primary">
        <DynamicIcon name={resolveIconName(iconName)} className="size-5" />
      </span>
      <span className="ink-heading block text-lg text-ink transition-colors group-hover:text-primary">
        {title}
      </span>
      <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
        {description}
      </span>
      <span className="mt-4 inline-flex items-center gap-1 text-sm text-bronze">
        Khám phá
        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
