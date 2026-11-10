import { PageShell } from "@/components/layout/PageShell";
import { RoomGuide } from "@/components/divination/RoomGuide";
import { PHONG_THUY_LINKS, Subnav } from "@/components/divination/Subnav";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Bàn thờ trong nhà",
  description: "Vị trí, lửa hương và cách bày bàn thờ cho gọn và an toàn.",
  path: "/phong-thuy/ban-tho",
});

export default function AltarPage() {
  return (
    <PageShell
      title="Bàn thờ"
      description="Trang này nói chỗ đặt, lửa hương và sự ngăn nắp. Nghi lễ vẫn theo tập quán của gia đình."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Phong thủy", href: "/phong-thuy" },
        { label: "Bàn thờ" },
      ]}
    >
      <Subnav items={PHONG_THUY_LINKS} />
      <RoomGuide id="ban-tho" />
    </PageShell>
  );
}
