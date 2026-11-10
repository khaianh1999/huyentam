import type { ReactNode } from "react";

export function AdminHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="mb-6 max-w-3xl">
      {eyebrow ? (
        <p className="text-xs font-medium tracking-[0.22em] text-bronze uppercase">{eyebrow}</p>
      ) : null}
      <h1 className="ink-heading mt-2 text-3xl text-ink">{title}</h1>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </header>
  );
}

export function SchemaNote({ children }: { children: ReactNode }) {
  return (
    <p className="mb-6 rounded-xl border border-[#c9a227]/50 bg-[#fff8e7] px-4 py-3 text-sm leading-relaxed text-wood">
      {children}
    </p>
  );
}

export function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
      <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
        <thead className="bg-[#1a120b] text-[#f3e6c8]">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-3 py-2.5 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-t border-border/80 odd:bg-card even:bg-[#fffaf2]">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-3 py-2.5 align-top text-wood">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
