import { Suspense } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { SearchResults } from "./SearchResults";

export const metadata = createPageMetadata({
  title: "Tìm kiếm",
  description: "Tìm công cụ và bài viết trên Huyền Tâm theo tên, chủ đề hoặc từ khóa.",
  path: "/tim-kiem",
  noindex: true,
});

export default function SearchPage() {
  return (
    <PageShell
      title="Tìm kiếm"
      description="Một ô tìm cho cả công cụ và bài kiến thức. Dấu tiếng Việt có hoặc không đều được."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Tìm kiếm" },
      ]}
    >
      <Suspense fallback={<LoadingYinYang label="Đang tìm…" />}>
        <SearchResults />
      </Suspense>
    </PageShell>
  );
}
