import { PageShell } from "@/components/layout/PageShell";
import { ShakeTube } from "@/components/divination/ShakeTube";
import { GIEO_QUE_LINKS, Subnav } from "@/components/divination/Subnav";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Lắc quẻ",
  description: "Lắc ống xăm để chọn một quẻ trong 64 quẻ bằng seed có thể đối chiếu.",
  path: "/gieo-que/lac-que",
});

export default function ShakePage() {
  return (
    <PageShell
      title="Lắc quẻ"
      description="Cầm điện thoại lắc như lắc ống xăm, thẻ rơi ra thành một trong 64 quẻ. Trên máy tính thì giữ nút để lắc."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Gieo quẻ", href: "/gieo-que" },
        { label: "Lắc quẻ" },
      ]}
    >
      <Subnav items={GIEO_QUE_LINKS} />
      <ShakeTube />
    </PageShell>
  );
}
