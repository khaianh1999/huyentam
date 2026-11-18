import { Suspense } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { GIEO_QUE_LINKS, Subnav } from "@/components/divination/Subnav";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { Body } from "./Body";

export const metadata = createPageMetadata({
  title: "Rút quẻ",
  description: "Rút quẻ đầu năm, tình duyên, công danh, tài lộc, gia đạo hoặc bình an.",
  path: "/gieo-que/rut-que",
});

export default function RutQuePage() {
  return (
    <PageShell
      title="Rút quẻ"
      description="Chọn một việc. Mỗi việc có lời dẫn và một mục của quẻ được đưa lên trước."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Gieo quẻ", href: "/gieo-que" },
        { label: "Rút quẻ" },
      ]}
    >
      <Subnav items={GIEO_QUE_LINKS} />
      <Suspense fallback={<LoadingYinYang label="Đang mở lối rút…" />}>
        <Body />
      </Suspense>
    </PageShell>
  );
}
