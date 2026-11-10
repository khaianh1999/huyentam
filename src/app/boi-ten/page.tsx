import { PageShell } from "@/components/layout/PageShell";
import { NameForm } from "@/components/divination/NameForm";
import { Subnav, BOI_TOAN_LINKS } from "@/components/divination/Subnav";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Bói tên",
  description: "Xem số chủ đạo, linh hồn, nhân cách, sứ mệnh và ngũ hành của tên.",
  path: "/boi-ten",
});

export default function NamePage() {
  return (
    <PageShell
      title="Bói theo tên"
      description="Bốn thẻ số cập nhật khi đủ họ tên, ngày sinh và giới tính. Cách tính theo thần số Pythagore đối chiếu ngũ hành năm sinh."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Bói toán", href: "/boi-toan" },
        { label: "Bói tên" },
      ]}
    >
      <Subnav items={BOI_TOAN_LINKS} />
      <NameForm />
    </PageShell>
  );
}
