import Link from "next/link";
import { TOOL_CATALOG } from "@/data/tools/catalog";
import { cn } from "@/lib/utils";

type RelatedToolsProps = {
  /** Loại trừ đường dẫn hiện tại */
  excludeHref?: string;
  title?: string;
  limit?: number;
  className?: string;
};

/** Khối nội dung phụ cho cột trái — giúp trang form ngắn không bị lệch phải. */
export function RelatedTools({
  excludeHref,
  title = "Công cụ liên quan",
  limit = 6,
  className,
}: RelatedToolsProps) {
  const items = TOOL_CATALOG.filter((tool) => {
    if (!excludeHref) return true;
    return tool.href !== excludeHref && !tool.href.startsWith(`${excludeHref}?`);
  }).slice(0, limit);

  if (items.length === 0) return null;

  return (
    <section className={cn("space-y-3", className)}>
      <h2 className="ink-heading text-xl text-ink">{title}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((tool) => (
          <Link
            key={tool.href + tool.title}
            href={tool.href}
            className="rounded-xl border border-accent/30 bg-[#fffaf2]/90 p-3.5 transition hover:-translate-y-0.5 hover:border-accent/50"
          >
            <span className="text-[10px] font-semibold tracking-wide text-bronze uppercase">
              {tool.category}
            </span>
            <span className="ink-heading mt-1 block text-[15px] text-ink">{tool.title}</span>
            <span className="mt-1 block text-xs leading-relaxed text-muted-foreground line-clamp-2">
              {tool.description}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
