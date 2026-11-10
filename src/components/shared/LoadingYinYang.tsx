import { cn } from "@/lib/utils";

type LoadingYinYangProps = {
  label?: string;
  className?: string;
};

export function LoadingYinYang({
  label = "Đang an bài…",
  className,
}: LoadingYinYangProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("flex flex-col items-center justify-center gap-4 py-12", className)}
    >
      <span className="relative size-16" aria-hidden="true">
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full">
          <circle cx="50" cy="50" r="47" fill="none" stroke="#c9a227" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="43" fill="none" stroke="#c9a227" strokeWidth="0.6" opacity="0.65" />
        </svg>
        <svg viewBox="0 0 100 100" className="animate-yin-yang absolute inset-2 size-[calc(100%-1rem)]">
          <circle cx="50" cy="50" r="46" fill="#1a120b" />
          <path
            d="M50 4a46 46 0 0 1 0 92 23 23 0 0 1 0-46 23 23 0 0 0 0-46z"
            fill="#f7f1e6"
          />
          <circle cx="50" cy="27" r="6" fill="#1a120b" />
          <circle cx="50" cy="73" r="6" fill="#f7f1e6" />
        </svg>
      </span>
      <p className="text-sm tracking-wide text-muted-foreground">{label}</p>
    </div>
  );
}
