import { PageShell } from "@/components/layout/PageShell";
import { RoomGuide } from "@/components/divination/RoomGuide";
import { PHONG_THUY_LINKS, Subnav } from "@/components/divination/Subnav";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Phong thủy phòng khách",
  description: "Chỗ ngồi, bàn nước và ánh sáng phòng khách.",
  path: "/phong-thuy/phong-khach",
});

export default function LivingPage() {
  return (
    <PageShell
      title="Phòng khách"
      description="Ghế có tựa, khách không ngồi lưng ra cửa, bàn không chặn lối bếp."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Phong thủy", href: "/phong-thuy" },
        { label: "Phòng khách" },
      ]}
    >
      <Subnav items={PHONG_THUY_LINKS} />
      <RoomGuide id="phong-khach" />
    </PageShell>
  );
}
