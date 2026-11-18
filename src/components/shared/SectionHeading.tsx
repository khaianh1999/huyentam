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
        "max-w-2xl space-y-2.5",
        centered && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow flex items-center gap-2", centered && "justify-center")}>
          <span className="size-1.5 rotate-45 bg-primary" aria-hidden="true" />
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className="ink-heading text-[1.75rem] leading-tight text-ink sm:text-[2.1rem]">
        {title}
      </h2>
      {description ? (
        <p className="text-[15px] leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
