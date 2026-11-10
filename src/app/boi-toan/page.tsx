import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { BOI_TOAN_LINKS, Subnav } from "@/components/divination/Subnav";
import { createPageMetadata } from "@/lib/seo/metadata";

const GROUPS = [
  {
    title: "Xăm & bài",
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
      {
        href: "/boi-toan/boi-bai-tay",
        title: "Bói bài Tây",
        body: "Ba lá Major Arcana trên bàn gỗ tối — giải trí văn hóa, có seed.",
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
    title: "Việc",
    items: [
      {
        href: "/boi-toan/boi-tinh-yeu",
        title: "Bói tình yêu",
        body: "Hai tên, một sợi chỉ số. Không hỏi năm sinh.",
      },
      {
        href: "/boi-toan/boi-cong-danh",
        title: "Bói công danh",
        body: "Một chiếc thang năm bậc. Bậc được đánh dấu tùy tên, năm và ngả đang đứng.",
      },
      {
        href: "/boi-toan/boi-tai-loc",
        title: "Bói tài lộc",
        body: "Ba cửa giữ, làm và chờ. Bạn chọn ý trước, quẻ quyết cửa nào hé.",
      },
      {
        href: "/boi-toan/boi-van-may",
        title: "Bói vận may",
        body: "Bàn tám ô xoay theo tên và mối bận tâm trong ngày.",
      },
    ],
  },
  {
    title: "Số",
    items: [
      {
        href: "/boi-toan/boi-so-dien-thoai",
        title: "Số điện thoại",
        body: "Luận trên dãy số, tổng và số rút gọn. Không cần tên.",
      },
      {
        href: "/boi-toan/boi-bien-so-xe",
        title: "Biển số xe",
        body: "Gõ thẳng lên mặt biển. Chữ và số được tách riêng.",
      },
      {
        href: "/boi-ten",
        title: "Bói tên",
        body: "Bốn thẻ thần số và ngũ hành của tên.",
      },
    ],
  },
] as const;

export const metadata = createPageMetadata({
  title: "Bói toán dân gian",
  description: "Xăm, tuổi, tình duyên, công danh, tài lộc, vận may, số điện thoại và biển số.",
  path: "/boi-toan",
});

export default function BoiToanPage() {
  return (
    <PageShell
      title="Bói toán dân gian"
      description="Mỗi việc một cách hỏi. Kết quả ghi rõ là quan niệm dân gian và khóa bằng seed để lần sau còn đối chiếu."
      breadcrumbs={[{ label: "Trang chủ", href: "/" }, { label: "Bói toán" }]}
    >
      <Subnav items={BOI_TOAN_LINKS} />
      <div className="space-y-10">
        {GROUPS.map((group) => (
          <section key={group.title}>
            <h2 className="ink-heading text-2xl text-ink">{group.title}</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {group.items.map((item) => (
                <Link key={item.href} href={item.href} className="paper-card rounded-xl p-5 transition hover:-translate-y-0.5">
                  <span className="ink-heading block text-xl text-ink">{item.title}</span>
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
