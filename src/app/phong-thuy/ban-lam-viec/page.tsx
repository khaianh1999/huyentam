import { PageShell } from "@/components/layout/PageShell";
import { RoomGuide } from "@/components/divination/RoomGuide";
import { PHONG_THUY_LINKS, Subnav } from "@/components/divination/Subnav";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Phong thủy bàn làm việc",
  description: "Tựa lưng, cửa sổ và mặt bàn làm việc.",
  path: "/phong-thuy/ban-lam-viec",
});

export default function DeskPage() {
  return (
    <PageShell
      title="Bàn làm việc"
      description="Lưng có điểm tựa, ánh sáng không chói màn hình, cuối ngày còn một chồng giấy."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Phong thủy", href: "/phong-thuy" },
        { label: "Bàn làm việc" },
      ]}
    >
      <Subnav items={PHONG_THUY_LINKS} />
      <RoomGuide id="ban-lam-viec" />
    </PageShell>
  );
}
