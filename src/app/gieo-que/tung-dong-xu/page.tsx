import { PageShell } from "@/components/layout/PageShell";
import { CoinStack } from "@/components/divination/CoinStack";
import { GIEO_QUE_LINKS, Subnav } from "@/components/divination/Subnav";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Tung đồng xu",
  description: "Lật từng đồng để dựng sáu hào Kinh Dịch từ dưới lên.",
  path: "/gieo-que/tung-dong-xu",
});

export default function CoinPage() {
  return (
    <PageShell
      title="Tung đồng xu"
      description="Khác với sáu nút tung một lần: ở đây mỗi đồng là một nút. Lật đủ ba mặt mới sang hào trên."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Gieo quẻ", href: "/gieo-que" },
        { label: "Tung đồng xu" },
      ]}
    >
      <Subnav items={GIEO_QUE_LINKS} />
      <CoinStack />
    </PageShell>
  );
}
