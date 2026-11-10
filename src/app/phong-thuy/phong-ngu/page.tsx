import { PageShell } from "@/components/layout/PageShell";
import { RoomGuide } from "@/components/divination/RoomGuide";
import { PHONG_THUY_LINKS, Subnav } from "@/components/divination/Subnav";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Phong thủy phòng ngủ",
  description: "Đầu giường, gương và ánh sáng phòng ngủ theo cách nói dân gian.",
  path: "/phong-thuy/phong-ngu",
});

export default function BedroomPage() {
  return (
    <PageShell
      title="Phòng ngủ"
      description="Đầu giường có tường phía sau, cửa không chiếu thẳng gối, đêm tắt được đèn mạnh."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Phong thủy", href: "/phong-thuy" },
        { label: "Phòng ngủ" },
      ]}
    >
      <Subnav items={PHONG_THUY_LINKS} />
      <RoomGuide id="phong-ngu" />
    </PageShell>
  );
}
