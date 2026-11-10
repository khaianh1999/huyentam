import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { AnimalPeek } from "@/components/divination/AnimalPeek";
import { Subnav, TU_VI_LINKS } from "@/components/divination/Subnav";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { ZODIAC_ANIMALS } from "@/data/zodiac";
import { getTuViByAnimal } from "@/lib/algorithms/astrology/tu-vi";
import { NGU_HANH_VI } from "@/lib/algorithms/calendar/constants";
import { createPageMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return ZODIAC_ANIMALS.map((animal) => ({ id: animal.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const animal = getTuViByAnimal(id);
  return createPageMetadata({
    title: animal ? `Tuổi ${animal.name}` : "12 con giáp",
    description: animal?.overview.slice(0, 160) ?? "Trang tuổi trong mười hai con giáp.",
    path: `/12-con-giap/${id}`,
  });
}

export default async function AnimalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const animal = getTuViByAnimal(id);
  if (!animal) notFound();

  const blocks = [
    ["Tính cách", animal.personality],
    ["Việc làm", animal.career],
    ["Tình cảm", animal.love],
    ["Tiền của", animal.wealth],
  ] as const;

  return (
    <PageShell
      title={`Tuổi ${animal.name}`}
      description={animal.overview}
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "12 con giáp", href: "/12-con-giap" },
        { label: animal.name },
      ]}
    >
      <Subnav items={TU_VI_LINKS} />
      <p className="text-sm text-bronze">
        Chi {animal.chi} · hành {NGU_HANH_VI[animal.element]}
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {blocks.map(([title, body]) => (
          <article key={title} className="paper-card rounded-xl p-5">
            <h2 className="ink-heading text-xl text-ink">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
          </article>
        ))}
      </div>
      <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-xl bg-card px-4 py-3">
          <dt className="text-bronze">Tam hợp</dt>
          <dd>{animal.tamHop.join(", ")}</dd>
        </div>
        <div className="rounded-xl bg-card px-4 py-3">
          <dt className="text-bronze">Tứ hành xung</dt>
          <dd>{animal.tuHanhXung.join(", ")}</dd>
        </div>
        <div className="rounded-xl bg-card px-4 py-3">
          <dt className="text-bronze">Lục hợp</dt>
          <dd>{animal.hop.join(", ")}</dd>
        </div>
        <div className="rounded-xl bg-card px-4 py-3">
          <dt className="text-bronze">Lục xung</dt>
          <dd>{animal.khac.join(", ")}</dd>
        </div>
      </dl>
      <p className="mt-4 text-sm text-muted-foreground">Các mốc năm: {animal.years.join(", ")}.</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {ZODIAC_ANIMALS.map((item) => (
          <Link
            key={item.id}
            href={`/12-con-giap/${item.id}`}
            className="rounded-full border border-accent/40 px-3 py-1 text-sm text-wood hover:text-primary"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <AnimalPeek animalName={animal.name} />
      </div>
      <div className="mt-6">
        <Disclaimer type="quan-niem-dan-gian" />
      </div>
    </PageShell>
  );
}
