import { PageShell } from "@/components/layout/PageShell";
import { AgeMatch } from "@/components/divination/AgeMatch";
import { BOI_TOAN_LINKS, Subnav } from "@/components/divination/Subnav";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Xem tuổi hợp",
  description: "Xem hai tuổi có hợp nhau không theo mệnh, thiên can, địa chi, cung phi và ngũ hành cung phi, có điểm số và cách hóa giải.",
  path: "/boi-toan/tuoi-hop",
});

export default function AgePage() {
  return (
    <PageShell
      title="Tuổi hợp nhau"
      description="Dùng cho bạn bè, đối tác làm ăn hay người yêu: chấm điểm theo 5 tiêu chí, kèm cách hóa giải và hướng tốt."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Bói toán", href: "/boi-toan" },
        { label: "Tuổi hợp" },
      ]}
    >
      <Subnav items={BOI_TOAN_LINKS} />
      <AgeMatch mode="hop" />
    </PageShell>
  );
}
