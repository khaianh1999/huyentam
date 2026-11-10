import type { ReactNode } from "react";
import { Inbox, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({
  title = "Chưa có nội dung",
  description = "Khi có dữ liệu phù hợp, nội dung sẽ hiện tại đây.",
  icon: Icon = Inbox,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "paper-card gold-border flex flex-col items-center rounded-xl px-6 py-12 text-center",
        className,
      )}
    >
      <span className="mb-4 flex size-12 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-primary">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h2 className="ink-heading text-xl text-ink">{title}</h2>
      {description ? (
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
