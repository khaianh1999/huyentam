"use client";

import { useMemo, useSyncExternalStore } from "react";
import { vnDateParts, type VnDate } from "@/lib/divination/vn-date";
import type { SolarDate } from "@/types";

/**
 * "Today" is read in the browser so pages stay static (GitHub Pages export)
 * and never show a date frozen at build time. During prerender and the first
 * hydration pass it is null — render a fallback for that case.
 */
function subscribe(onChange: () => void) {
  // Re-check once a minute so an open tab rolls over at midnight (GMT+7).
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
}

function currentKey(): string {
  return vnDateParts(new Date()).key;
}

function serverKey(): null {
  return null;
}

/** Today's date in Asia/Ho_Chi_Minh, or null before the client has mounted. */
export function useVnToday(): VnDate | null {
  const key = useSyncExternalStore(subscribe, currentKey, serverKey);
  return useMemo(() => {
    if (!key) return null;
    const [year, month, day] = key.split("-").map(Number);
    return vnDateParts(new Date(Date.UTC(year, month - 1, day, 5)));
  }, [key]);
}

/** Same as useVnToday, as a SolarDate. */
export function useTodaySolar(): SolarDate | null {
  const today = useVnToday();
  return useMemo(
    () => (today ? { year: today.year, month: today.month, day: today.day } : null),
    [today],
  );
}
