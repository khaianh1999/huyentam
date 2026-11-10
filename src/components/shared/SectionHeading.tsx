import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  id,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "max-w-2xl space-y-3",
        centered && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-medium tracking-[0.22em] text-bronze uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className="ink-heading text-3xl text-ink sm:text-4xl">
        {title}
      </h2>
      <div
        aria-hidden="true"
        className={cn(
          "h-px w-16 bg-gradient-to-r from-accent to-transparent",
          centered && "mx-auto w-24 bg-gradient-to-r from-transparent via-accent to-transparent",
        )}
      />
      {description ? (
        <p className="text-base leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
