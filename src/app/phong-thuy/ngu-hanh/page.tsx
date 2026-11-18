import { PageShell } from "@/components/layout/PageShell";
import { ElementStudio } from "@/components/divination/ElementStudio";
import { PHONG_THUY_LINKS, Subnav } from "@/components/divination/Subnav";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Ngũ hành bản mệnh",
  description: "Tra ngũ hành theo năm sinh, tương sinh tương khắc.",
  path: "/phong-thuy/ngu-hanh",
});

export default function ElementPage() {
  return (
    <PageShell
      title="Ngũ hành bản mệnh"
      description="Bản mệnh lấy theo nạp âm năm sinh (ví dụ 1990 là Lộ Bàng Thổ). Bấm một hành trong vòng năm để xem nó sinh, khắc hay cùng hành với mệnh của bạn."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Phong thủy", href: "/phong-thuy" },
        { label: "Ngũ hành" },
      ]}
    >
      <Subnav items={PHONG_THUY_LINKS} />
      <ElementStudio mode="ngu-hanh" />
    </PageShell>
  );
}
