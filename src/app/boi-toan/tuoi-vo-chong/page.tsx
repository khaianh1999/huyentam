import { PageShell } from "@/components/layout/PageShell";
import { MarriageStudio } from "@/components/divination/FolkStudios";
import { BOI_TOAN_LINKS, Subnav } from "@/components/divination/Subnav";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Tuổi vợ chồng",
  description: "Xem tuổi và bản mệnh của vợ chồng theo quan niệm dân gian.",
  path: "/boi-toan/tuoi-vo-chong",
});

export default function MarriagePage() {
  return (
    <PageShell
      title="Tuổi vợ chồng"
      description="Khác trang tuổi hợp: ở đây có vai chồng, vai vợ, bản mệnh ngũ hành và lời về nhà cùng hai họ."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Bói toán", href: "/boi-toan" },
        { label: "Vợ chồng" },
      ]}
    >
      <Subnav items={BOI_TOAN_LINKS} />
      <MarriageStudio />
    </PageShell>
  );
}
