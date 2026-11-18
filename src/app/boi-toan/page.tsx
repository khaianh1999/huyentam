import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { BOI_TOAN_LINKS, Subnav } from "@/components/divination/Subnav";
import { createPageMetadata } from "@/lib/seo/metadata";

const GROUPS = [
  {
    title: "Xin xăm",
    items: [
      {
        href: "/boi-toan/xin-xam-quan-am",
        title: "Xin xăm Quan Âm",
        body: "Lắc ống, thẻ rơi. Lời vịnh là bản biên soạn để tham khảo văn hóa.",
      },
      {
        href: "/boi-toan/xin-xam-quan-thanh",
        title: "Xin xăm Quan Thánh",
        body: "Đóng một ấn son rồi mới mở thẻ. Khác ống xăm, nghiêng về chữ tín và việc nghĩa.",
      },
      {
        href: "/boi-toan/xin-xam-dau-nam",
        title: "Xin xăm đầu năm",
        body: "Nghi thức đầu năm với lời nguyện ngắn và thẻ xăm mang tính dân gian.",
      },
    ],
  },
  {
    title: "Tuổi",
    items: [
      {
        href: "/boi-toan/tuoi-hop",
        title: "Tuổi hợp nhau",
        body: "Đối chiếu tam hợp, lục hợp, tứ hành xung và lục xung giữa hai năm sinh.",
      },
      {
        href: "/boi-toan/tuoi-vo-chong",
        title: "Tuổi vợ chồng",
        body: "Thêm bản mệnh ngũ hành của hai người và lời về nhà cửa, hai họ.",
      },
    ],
  },
  {
    title: "Tên",
    items: [
      {
        href: "/boi-ten",
        title: "Bói tên",
        body: "Thần số và ngũ hành của họ tên, đối chiếu với năm sinh.",
      },
    ],
  },
] as const;

export const metadata = createPageMetadata({
  title: "Bói toán dân gian",
  description: "Xin xăm Quan Âm, Quan Thánh, xăm đầu năm, xem tuổi hợp, tuổi vợ chồng và bói tên.",
  path: "/boi-toan",
});

export default function BoiToanPage() {
  return (
    <PageShell
      title="Bói toán dân gian"
      description="Những phép xem có gốc trong văn hóa Việt: xin xăm, hợp tuổi, xem tên. Kết quả ghi rõ là quan niệm dân gian."
      breadcrumbs={[{ label: "Trang chủ", href: "/" }, { label: "Bói toán" }]}
    >
      <Subnav items={BOI_TOAN_LINKS} />
      <div className="space-y-10">
        {GROUPS.map((group) => (
          <section key={group.title}>
            <div className="flex items-center gap-3">
              <h2 className="ink-heading text-2xl text-ink">{group.title}</h2>
              <span className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" aria-hidden="true" />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <Link key={item.href} href={item.href} className="paper-card group flex flex-col rounded-2xl p-5 hover:-translate-y-0.5">
                  <span className="flex items-center justify-between gap-3">
                    <span className="ink-heading text-xl text-ink transition-colors group-hover:text-primary">{item.title}</span>
                    <ArrowRight className="size-4 shrink-0 text-bronze transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">{item.body}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
