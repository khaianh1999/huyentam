import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
      description="Bản mệnh tính theo nạp âm năm sinh, hướng nhà theo cung phi Bát trạch. Phần bày phòng là kinh nghiệm dân gian, ghi trong từng trang."
      breadcrumbs={[{ label: "Trang chủ", href: "/" }, { label: "Phong thủy" }]}
    >
      <Subnav items={PHONG_THUY_LINKS} />
      <div className="grid gap-4 md:grid-cols-2">
        {TOOLS.map((tool) => (
          <Link key={tool.href} href={tool.href} className="paper-card group rounded-2xl p-6 hover:-translate-y-0.5">
            <span className="flex items-center justify-between gap-3">
              <h2 className="ink-heading text-2xl text-ink transition-colors group-hover:text-primary">{tool.title}</h2>
              <ArrowRight className="size-4 shrink-0 text-bronze transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tool.body}</p>
          </Link>
        ))}
      </div>
      <div className="mt-12 flex items-center gap-3">
        <h2 className="ink-heading text-2xl text-ink">Trong nhà</h2>
        <span className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" aria-hidden="true" />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FENG_SHUI_GUIDES.filter((guide) => guide.id !== "nha-o").map((guide) => (
          <Link key={guide.id} href={`/phong-thuy/${guide.id}`} className="paper-card group rounded-2xl p-5 hover:-translate-y-0.5">
            <p className="text-xs tracking-[0.16em] text-bronze uppercase">{guide.eyebrow}</p>
            <h3 className="ink-heading mt-2 text-xl text-ink transition-colors group-hover:text-primary">{guide.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{guide.lede}</p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
