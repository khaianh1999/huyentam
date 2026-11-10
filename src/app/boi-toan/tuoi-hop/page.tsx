import { PageShell } from "@/components/layout/PageShell";
import { AgeStudio } from "@/components/divination/FolkStudios";
import { BOI_TOAN_LINKS, Subnav } from "@/components/divination/Subnav";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Xem tuổi hợp",
  description: "Đối chiếu tam hợp, lục hợp, tứ hành xung và lục xung giữa hai năm sinh.",
  path: "/boi-toan/tuoi-hop",
});

export default function AgePage() {
  return (
    <PageShell
      title="Tuổi hợp nhau"
      description="Hai năm sinh, hai con giáp. Bốn mối tam hợp, lục hợp, tứ hành xung và lục xung được kê từng dòng."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Bói toán", href: "/boi-toan" },
        { label: "Tuổi hợp" },
      ]}
    >
      <Subnav items={BOI_TOAN_LINKS} />
      <AgeStudio />
    </PageShell>
  );
}
