import { cn } from "@/lib/utils";

export function YinSeal({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="28" fill="#1a130e" />
      <path d="M32 6a26 26 0 0 1 0 52 13 13 0 0 1 0-26 13 13 0 0 0 0-26z" fill="#f8f3ea" />
      <circle cx="32" cy="19" r="3.2" fill="#1a130e" />
      <circle cx="32" cy="45" r="3.2" fill="#f8f3ea" />
    </svg>
  );
}

export function BrandMark({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span className="flex items-center gap-3">
      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-accent/70 bg-primary shadow-[0_0_0_4px_rgba(196,154,58,0.14)]">
        <YinSeal />
      </span>
      <span className="flex flex-col">
        <span
          className={cn(
            "ink-heading text-[1.4rem] leading-none",
            tone === "light" ? "text-ink" : "text-[#fff8ec]",
          )}
        >
          Huyền Tâm
        </span>
        <span className="mt-1 text-[10.5px] tracking-[0.18em] text-bronze uppercase">
          Lịch pháp · Phong thủy
        </span>
      </span>
    </span>
  );
}
