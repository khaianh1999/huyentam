/** Chèn dữ liệu có cấu trúc schema.org. Escape "<" để chuỗi không thoát khỏi thẻ script. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
