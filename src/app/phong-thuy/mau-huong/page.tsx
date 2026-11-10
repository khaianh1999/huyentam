import { PageShell } from "@/components/layout/PageShell";
import { ElementStudio } from "@/components/divination/ElementStudio";
import { PHONG_THUY_LINKS, Subnav } from "@/components/divination/Subnav";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Màu và hướng hợp mệnh",
  description: "Xem màu và tám hướng theo ngũ hành bản mệnh của năm sinh.",
  path: "/phong-thuy/mau-huong",
});

export default function ColorPage() {
  return (
    <PageShell
      title="Màu và hướng"
      description="Ô màu bấm được. La bàn tám hướng cũng bấm được. Hướng không thuộc nhóm hợp mệnh vẫn dùng được nếu cửa sáng và lối thông."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Phong thủy", href: "/phong-thuy" },
        { label: "Màu và hướng" },
      ]}
    >
      <Subnav items={PHONG_THUY_LINKS} />
      <ElementStudio mode="mau-huong" />
    </PageShell>
  );
}
