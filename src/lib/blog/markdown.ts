import { slugifyVi } from "@/lib/utils";

export type InlinePart =
  | { type: "text"; value: string }
  | { type: "strong"; value: string };

export type MarkdownBlock =
  | { type: "heading"; level: 2 | 3; id: string; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export function parseInline(text: string): InlinePart[] {
  const parts: InlinePart[] = [];
  const pattern = /\*\*([^*]+)\*\*/g;
  let last = 0;

  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) {
      parts.push({ type: "text", value: text.slice(last, index) });
    }
    const value = match[1] ?? "";
    if (value) parts.push({ type: "strong", value });
    last = index + match[0].length;
  }

  if (last < text.length) {
    parts.push({ type: "text", value: text.slice(last) });
  }

  return parts.filter((part) => part.value.length > 0);
}

function headingLevel(line: string): 2 | 3 | null {
  if (line.startsWith("### ")) return 3;
  if (line.startsWith("## ")) return 2;
  return null;
}

function uniqueId(text: string, used: Map<string, number>): string {
  const base = slugifyVi(text) || "muc";
  const count = used.get(base) ?? 0;
  used.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
}

/** Headings, paragraphs, lists, and **bold**. No HTML pass-through. */
export function parseMarkdown(source: string): { blocks: MarkdownBlock[]; toc: TocItem[] } {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  const toc: TocItem[] = [];
  const used = new Map<string, number>();
  let index = 0;

  while (index < lines.length) {
    const line = (lines[index] ?? "").trim();
    if (!line) {
      index += 1;
      continue;
    }

    const level = headingLevel(line);
    if (level) {
      const text = line.slice(level === 2 ? 3 : 4).trim();
      const id = uniqueId(text, used);
      blocks.push({ type: "heading", level, id, text });
      toc.push({ id, text, level });
      index += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (index < lines.length && (lines[index] ?? "").trim().startsWith("- ")) {
        items.push((lines[index] ?? "").trim().slice(2).trim());
        index += 1;
      }
      if (items.length > 0) blocks.push({ type: "list", items });
      continue;
    }

    const paragraph: string[] = [];
    while (index < lines.length) {
      const current = (lines[index] ?? "").trim();
      if (!current || headingLevel(current) || current.startsWith("- ")) break;
      paragraph.push(current);
      index += 1;
    }
    if (paragraph.length > 0) {
      blocks.push({ type: "paragraph", text: paragraph.join(" ") });
    }
  }

  return { blocks, toc };
}
