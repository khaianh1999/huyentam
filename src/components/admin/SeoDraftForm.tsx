"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const STORAGE_KEY = "huyen-tam.seo-draft.v1";

function readDraft(): { title: string; description: string } {
  if (typeof window === "undefined") {
    return { title: "", description: "" };
  }
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return { title: "", description: "" };
  try {
    const parsed = JSON.parse(raw) as { title?: string; description?: string };
    return {
      title: typeof parsed.title === "string" ? parsed.title : "",
      description: typeof parsed.description === "string" ? parsed.description : "",
    };
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return { title: "", description: "" };
  }
}

export function SeoDraftForm() {
  const [title, setTitle] = useState(() => readDraft().title);
  const [description, setDescription] = useState(() => readDraft().description);
  const [note, setNote] = useState<string | null>(null);

  return (
    <form
      className="mt-6 max-w-2xl space-y-4 rounded-xl border border-border bg-card p-5"
      onSubmit={(event) => {
        event.preventDefault();
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ title, description }));
        setNote("Đã lưu bản nháp trên trình duyệt. Chưa ghi vào SiteSetting.");
      }}
    >
      <p className="text-sm leading-relaxed text-wood">
        Bản nháp tiêu đề và mô tả mặc định, lưu localStorage vì chưa nối SiteSetting. Trang công khai vẫn dùng{" "}
        <code className="text-ink">createPageMetadata</code>.
      </p>
      <div className="space-y-2">
        <Label htmlFor="seo-title">Tiêu đề gốc</Label>
        <Input
          id="seo-title"
          value={title}
          maxLength={120}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="seo-description">Mô tả</Label>
        <Textarea
          id="seo-description"
          value={description}
          maxLength={300}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      {note ? <p className="mt-2 text-sm text-jade">{note}</p> : null}
      <Button type="submit" variant="gold">
        Lưu nháp trên trình duyệt
      </Button>
    </form>
  );
}
