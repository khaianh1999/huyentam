import * as React from "react";
import { cn } from "@/lib/utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}) {
  return (
    <div
      data-slot="separator"
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        "shrink-0",
        orientation === "horizontal"
          ? "h-px w-full bg-gradient-to-r from-transparent via-accent/70 to-transparent"
          : "h-full w-px bg-gradient-to-b from-transparent via-accent/70 to-transparent",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
