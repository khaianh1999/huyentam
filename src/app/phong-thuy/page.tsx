import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { PHONG_THUY_LINKS, Subnav } from "@/components/divination/Subnav";
import { FENG_SHUI_GUIDES } from "@/data/feng-shui/guides";
import { createPageMetadata } from "@/lib/seo/metadata";

const TOOLS = [
  { href: "/phong-thuy/ngu-hanh", title: "Ngũ hành bản mệnh", body: "Năm sinh, vòng sinh khắc, bấm một hành để xem quan hệ với mệnh." },
  { href: "/phong-thuy/mau-huong", title: "Màu và hướng", body: "Ô màu và la bàn tám hướng. Bấm để biết hướng ấy có trong nhóm hợp mệnh hay không." },
  { href: "/phong-thuy/nha-o", title: "Nhà ở", body: "Cửa, lối đi, nền mái, rồi mới tới màu theo bản mệnh." },
  { href: "/phong-thuy/tuoi-lam-nha", title: "Tuổi làm nhà", body: "Kim lâu, tam tai và ngũ hành giữa tuổi gia chủ với năm xây." },
] as const;

export const metadata = createPageMetadata({
  title: "Phong thủy",
  description: "Ngũ hành, màu hướng, nhà ở, tuổi làm nhà và các không gian trong nhà.",
  path: "/phong-thuy",
});

export default function FengPage() {
  return (
    <PageShell
      title="Phong thủy"
      description="Phần tính theo can năm là quy ước ngũ hành. Phần bày phòng là kinh nghiệm dân gian, ghi trong từng trang."
      breadcrumbs={[{ label: "Trang chủ", href: "/" }, { label: "Phong thủy" }]}
    >
      <Subnav items={PHONG_THUY_LINKS} />
      <div className="grid gap-4 md:grid-cols-2">
        {TOOLS.map((tool) => (
          <Link key={tool.href} href={tool.href} className="paper-card gold-border rounded-xl p-5">
            <h2 className="ink-heading text-2xl text-ink">{tool.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tool.body}</p>
          </Link>
        ))}
      </div>
      <h2 className="ink-heading mt-10 text-2xl text-ink">Trong nhà</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FENG_SHUI_GUIDES.filter((guide) => guide.id !== "nha-o").map((guide) => (
          <Link key={guide.id} href={`/phong-thuy/${guide.id}`} className="rounded-xl border border-border bg-card/80 p-4">
            <p className="text-xs tracking-[0.16em] text-bronze uppercase">{guide.eyebrow}</p>
            <h3 className="ink-heading mt-2 text-xl text-ink">{guide.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{guide.lede}</p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
