"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
  baseId: string;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Thành phần tab phải nằm trong Tabs.");
  }
  return context;
}

function tabKey(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "-");
}

function Tabs({
  value,
  defaultValue = "",
  onValueChange,
  className,
  children,
}: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}) {
  const baseId = React.useId();
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
  const current = value ?? uncontrolled;

  const setValue = React.useCallback(
    (next: string) => {
      if (value === undefined) {
        setUncontrolled(next);
      }
      onValueChange?.(next);
    },
    [onValueChange, value],
  );

  return (
    <TabsContext.Provider value={{ value: current, setValue, baseId }}>
      <div data-slot="tabs" className={cn("flex flex-col gap-4", className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

function TabsList({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="tabs-list"
      role="tablist"
      className={cn(
        "inline-flex w-fit max-w-full flex-wrap items-center gap-1 rounded-xl border border-border bg-muted/60 p-1",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  value,
  className,
  children,
  ...props
}: React.ComponentProps<"button"> & { value: string }) {
  const { value: selected, setValue, baseId } = useTabsContext();
  const active = selected === value;
  const key = tabKey(value);

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${key}`}
      aria-selected={active}
      aria-controls={`${baseId}-panel-${key}`}
      data-state={active ? "active" : "inactive"}
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer",
        active && "bg-card text-primary shadow-sm",
        className,
      )}
      onClick={() => setValue(value)}
      {...props}
    >
      {children}
      {active ? (
        <motion.span
          layoutId={`${baseId}-indicator`}
          className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-accent"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      ) : null}
    </button>
  );
}

function TabsContent({
  value,
  className,
  ...props
}: React.ComponentProps<"div"> & { value: string }) {
  const { value: selected, baseId } = useTabsContext();
  if (selected !== value) {
    return null;
  }

  const key = tabKey(value);

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${key}`}
      aria-labelledby={`${baseId}-tab-${key}`}
      data-slot="tabs-content"
      tabIndex={0}
      className={cn("focus-visible:outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
