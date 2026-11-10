import { PageShell } from "@/components/layout/PageShell";
import { ElementStudio } from "@/components/divination/ElementStudio";
import { PHONG_THUY_LINKS, Subnav } from "@/components/divination/Subnav";
import { getFengShuiGuide } from "@/data/feng-shui/guides";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Phong thủy nhà ở",
  description: "Gợi ý cửa, lối đi, nền mái và màu hướng theo bản mệnh.",
  path: "/phong-thuy/nha-o",
});

export default function HousePage() {
  const guide = getFengShuiGuide("nha-o");
  return (
    <PageShell
      title="Phong thủy nhà ở"
      description="Sửa chỗ thấm và lối đi trước. Màu hợp mệnh là lớp sau, khi nhà đã ở được."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Phong thủy", href: "/phong-thuy" },
        { label: "Nhà ở" },
      ]}
    >
      <Subnav items={PHONG_THUY_LINKS} />
      {guide ? (
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {guide.principles.map((item) => (
            <article key={item.title} className="paper-card rounded-xl p-5">
              <h2 className="ink-heading text-xl">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </div>
      ) : null}
      <ElementStudio mode="nha-o" />
    </PageShell>
  );
}
