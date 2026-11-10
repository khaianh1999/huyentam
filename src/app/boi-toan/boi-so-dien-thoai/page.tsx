import { PageShell } from "@/components/layout/PageShell";
import { PhoneStudio } from "@/components/divination/FolkStudios";
import { BOI_TOAN_LINKS, Subnav } from "@/components/divination/Subnav";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Bói số điện thoại",
  description: "Luận dãy số điện thoại theo tổng, số rút gọn và quy ước ngũ hành dân gian.",
  path: "/boi-toan/boi-so-dien-thoai",
});

export default function PhonePage() {
  return (
    <PageShell
      title="Bói số điện thoại"
      description="Gõ số vào mặt máy. Trang tính tổng các chữ số và một mức cát, bình hoặc hung theo quy ước riêng của Huyền Tâm."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Bói toán", href: "/boi-toan" },
        { label: "Số điện thoại" },
      ]}
    >
      <Subnav items={BOI_TOAN_LINKS} />
      <PhoneStudio />
    </PageShell>
  );
}
