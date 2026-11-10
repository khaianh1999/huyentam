import { parseInline, type MarkdownBlock } from "@/lib/blog/markdown";

function InlineText({ text }: { text: string }) {
  const parts = parseInline(text);
  if (parts.length === 0) return text;
  return parts.map((part, index) =>
    part.type === "strong" ? (
      <strong key={index} className="font-semibold text-ink">
        {part.value}
      </strong>
    ) : (
      <span key={index}>{part.value}</span>
    ),
  );
}

export function MarkdownBody({ blocks }: { blocks: MarkdownBlock[] }) {
  return (
    <div className="space-y-4 text-base leading-relaxed text-wood">
      {blocks.map((block, index) => {
        if (block.type === "heading" && block.level === 2) {
          return (
            <h2
              key={block.id}
              id={block.id}
              className="ink-heading scroll-mt-24 pt-4 text-2xl text-ink"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "heading") {
          return (
            <h3
              key={block.id}
              id={block.id}
              className="ink-heading scroll-mt-24 pt-2 text-xl text-ink"
            >
              {block.text}
            </h3>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={index} className="list-disc space-y-2 pl-5">
              {block.items.map((item, itemIndex) => (
                <li key={`${itemIndex}-${item}`}>
                  <InlineText text={item} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={index}>
            <InlineText text={block.text} />
          </p>
        );
      })}
    </div>
  );
}
