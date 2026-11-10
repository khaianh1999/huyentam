import { PageShell } from "@/components/layout/PageShell";
import { RoomGuide } from "@/components/divination/RoomGuide";
import { PHONG_THUY_LINKS, Subnav } from "@/components/divination/Subnav";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Xây nhà",
  description: "Móng, mái, cửa và những điều nên chốt trước khi động thổ.",
  path: "/phong-thuy/xay-nha",
});

export default function BuildPage() {
  return (
    <PageShell
      title="Xây nhà"
      description="Giấy phép và kết cấu đi trước. Màu cửa hợp mệnh chỉ bàn khi bản vẽ đã đứng."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Phong thủy", href: "/phong-thuy" },
        { label: "Xây nhà" },
      ]}
    >
      <Subnav items={PHONG_THUY_LINKS} />
      <RoomGuide id="xay-nha" />
    </PageShell>
  );
}
