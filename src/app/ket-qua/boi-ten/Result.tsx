"use client";

import Link from "next/link";
import { NameNumbers } from "@/components/divination/NameNumbers";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { analyzeName } from "@/lib/algorithms/numerology/name";
import { parseNameQuery, type SearchRecord } from "@/lib/divination/params";
import { useSearchRecord } from "@/lib/client/use-search-record";

export function Result() {
  const searchRecord = useSearchRecord<SearchRecord>();
  const parsed = parseNameQuery(searchRecord);
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
