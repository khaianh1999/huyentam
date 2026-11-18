"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { SearchRecord } from "@/lib/divination/params";

/**
 * The URL query as the same record shape server pages receive as `searchParams`.
 * Callers must sit inside <Suspense> so a static export can prerender the page shell.
 */
export function useSearchRecord<T extends SearchRecord = SearchRecord>(): T {
  const params = useSearchParams();
  return useMemo(() => {
    const record: SearchRecord = {};
    for (const key of new Set(params.keys())) {
      const values = params.getAll(key);
      record[key] = values.length > 1 ? values : values[0];
    }
    return record as T;
  }, [params]);
}
