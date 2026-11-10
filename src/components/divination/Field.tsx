import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

export function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      {htmlFor ? <Label htmlFor={htmlFor}>{label}</Label> : <Label>{label}</Label>}
      {children}
      {hint ? <p className="text-xs leading-relaxed text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
