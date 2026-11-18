import { Suspense } from "react";
import Link from "next/link";
import { YearNote } from "./YearNote";
import { PageShell } from "@/components/layout/PageShell";
import { Subnav, TU_VI_LINKS } from "@/components/divination/Subnav";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { ZODIAC_ANIMALS, ZODIAC_NOTE } from "@/data/zodiac";
import { NGU_HANH_VI } from "@/lib/algorithms/calendar/constants";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "12 con giáp",
  description: "Tra cứu tính cách, tam hợp, tứ hành xung và các năm của mười hai con giáp.",
  path: "/12-con-giap",
});

export default function ZodiacPage() {
  return (
    <PageShell
      title="12 con giáp"
      description="Mỗi tuổi một trang. Ngũ hành ghi ở đây là ngũ hành của địa chi, không phải nạp âm của từng năm."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Tử vi", href: "/tu-vi" },
        { label: "12 con giáp" },
      ]}
    >
      <Subnav items={TU_VI_LINKS} />
      <Suspense fallback={<LoadingYinYang label="Đang lấy năm…" />}>
        <YearNote />
      </Suspense>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ZODIAC_ANIMALS.map((animal) => (
          <Link key={animal.id} href={`/12-con-giap/${animal.id}`} className="paper-card gold-border rounded-xl p-5">
            <p className="text-xs tracking-[0.16em] text-bronze uppercase">{NGU_HANH_VI[animal.element]}</p>
            <h2 className="ink-heading mt-2 text-2xl text-ink">Tuổi {animal.name}</h2>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{animal.overview}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <Disclaimer type="quan-niem-dan-gian" />
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{ZODIAC_NOTE}</p>
      </div>
    </PageShell>
  );
}
