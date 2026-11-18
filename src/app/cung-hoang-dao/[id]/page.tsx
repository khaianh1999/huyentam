import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Periods } from "./Periods";
import { PageShell } from "@/components/layout/PageShell";
import { Subnav, TU_VI_LINKS } from "@/components/divination/Subnav";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { WESTERN_SIGNS } from "@/data/zodiac";
import { createPageMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return WESTERN_SIGNS.map((sign) => ({ id: sign.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sign = WESTERN_SIGNS.find((item) => item.id === id);
  return createPageMetadata({
    title: sign ? sign.name : "Cung hoàng đạo",
    description: sign ? `${sign.name} (${sign.dateRange}): tính cách, tình cảm và vận ngắn trong ngày.` : "Cung hoàng đạo.",
    path: `/cung-hoang-dao/${id}`,
  });
}

export default async function SignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sign = WESTERN_SIGNS.find((item) => item.id === id);
  if (!sign) notFound();

  return (
    <PageShell
      title={sign.name}
      description={`${sign.symbol} · ${sign.element} · ${sign.dateRange}`}
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Cung hoàng đạo", href: "/cung-hoang-dao" },
        { label: sign.name },
      ]}
    >
      <Subnav items={TU_VI_LINKS} />
      <p className="text-sm leading-relaxed text-wood">{sign.personality}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <article className="paper-card rounded-xl p-5">
          <h2 className="ink-heading text-xl">Tình cảm</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{sign.love}</p>
        </article>
        <article className="paper-card rounded-xl p-5">
          <h2 className="ink-heading text-xl">Công việc</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{sign.career}</p>
        </article>
        <article className="paper-card rounded-xl p-5">
          <h2 className="ink-heading text-xl">Tiền bạc</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{sign.finance}</p>
        </article>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <article className="rounded-xl bg-emerald-50/70 p-5">
          <h2 className="ink-heading text-xl">Hay được kể</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {sign.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-xl bg-rose-50/70 p-5">
          <h2 className="ink-heading text-xl">Cũng bị nhắc</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {sign.weaknesses.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">Hay được xếp cạnh: {sign.compatible.join(", ")}.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {WESTERN_SIGNS.map((item) => (
          <Link key={item.id} href={`/cung-hoang-dao/${item.id}`} className="text-sm text-primary underline-offset-4 hover:underline">
            {item.symbol} {item.name}
          </Link>
        ))}
      </div>
      <Suspense fallback={<LoadingYinYang label="Đang soạn vận ngắn…" />}>
        <Periods id={sign.id} />
      </Suspense>
      <div className="mt-6">
        <Disclaimer type="quan-niem-dan-gian" />
      </div>
    </PageShell>
  );
}
