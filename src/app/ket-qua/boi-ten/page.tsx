import { Suspense } from "react";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { NameNumbers } from "@/components/divination/NameNumbers";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingYinYang } from "@/components/shared/LoadingYinYang";
import { Button } from "@/components/ui/button";
import { analyzeName } from "@/lib/algorithms/numerology/name";
import { parseNameQuery, type SearchRecord } from "@/lib/divination/params";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Kết quả bói tên",
  description: "Các chỉ số tên được lập lại từ họ tên, ngày sinh và giới tính trên đường dẫn.",
  path: "/ket-qua/boi-ten",
});

export default function NameResultPage({
  searchParams,
}: {
  searchParams: Promise<SearchRecord>;
}) {
  return (
    <PageShell
      title="Kết quả bói tên"
      description="Bốn thẻ số và lời đối chiếu ngũ hành, lập lại từ đường dẫn."
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Bói tên", href: "/boi-ten" },
        { label: "Kết quả" },
      ]}
    >
      <Suspense fallback={<LoadingYinYang label="Đang đọc tên…" />}>
        <Result searchParams={searchParams} />
      </Suspense>
    </PageShell>
  );
}

async function Result({ searchParams }: { searchParams: Promise<SearchRecord> }) {
  const parsed = parseNameQuery(await searchParams);
  if (!parsed) {
    return (
      <EmptyState
        title="Chưa đủ để luận tên"
        description="Cần họ tên, ngày sinh dương lịch và giới tính."
        action={
          <Button asChild>
            <Link href="/boi-ten">Nhập tên</Link>
          </Button>
        }
      />
    );
  }
  const result = analyzeName(
    parsed.fullName,
    { year: parsed.year, month: parsed.month, day: parsed.day },
    parsed.gender,
  );
  return <NameNumbers result={result} />;
}
