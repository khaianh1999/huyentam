import { AlertTriangle, BookOpen, Calculator, Library, type LucideIcon } from "lucide-react";
import type { ContentDisclaimer } from "@/types";
import { cn } from "@/lib/utils";

const COPY: Record<
  ContentDisclaimer,
  { title: string; body: string; icon: LucideIcon }
> = {
  "thuat-toan": {
    title: "Theo thuật toán",
    body: "Kết quả được lập bằng thuật toán lịch pháp và các quy tắc đã công bố. Đây là thông tin tham khảo văn hóa, không phải lời phán quyết hay tư vấn chuyên môn.",
    icon: Calculator,
  },
  "quan-niem-dan-gian": {
    title: "Quan niệm dân gian",
    body: "Nội dung dựa trên quan niệm dân gian được lưu truyền trong đời sống Việt. Cách hiểu có thể khác nhau theo vùng miền và gia đình.",
    icon: BookOpen,
  },
  "du-lieu-tham-khao": {
    title: "Dữ liệu tham khảo",
    body: "Dữ liệu tổng hợp từ nguồn tham khảo phổ biến, có thể chưa đầy đủ hoặc khác với tư liệu địa phương. Nên đối chiếu khi dùng vào việc hệ trọng.",
    icon: Library,
  },
  "can-bo-sung": {
    title: "Cần bổ sung",
    body: "Phần này còn thiếu dữ liệu hoặc đang được hoàn thiện. Hãy xem đây là bản nháp và chưa dùng làm căn cứ duy nhất.",
    icon: AlertTriangle,
  },
};

type DisclaimerProps = {
  type: ContentDisclaimer;
  className?: string;
};

export function Disclaimer({ type, className }: DisclaimerProps) {
  const item = COPY[type];
  const Icon = item.icon;

  return (
    <aside
      className={cn(
        "flex gap-3 rounded-xl border border-accent/40 bg-card/70 px-4 py-3 text-sm shadow-sm",
        className,
      )}
    >
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-primary">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <span>
        <span className="block font-medium text-ink">{item.title}</span>
        <span className="mt-1 block leading-relaxed text-muted-foreground">{item.body}</span>
      </span>
    </aside>
  );
}
