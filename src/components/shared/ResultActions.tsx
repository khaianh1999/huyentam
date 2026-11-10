"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Printer, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ResultActionsProps = {
  title?: string;
  text?: string;
  url?: string;
  className?: string;
};

export function ResultActions({
  title = "Kết quả Huyền Tâm",
  text,
  url,
  className,
}: ResultActionsProps) {
  const [notice, setNotice] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) {
        window.clearTimeout(timer.current);
      }
    };
  }, []);

  function flash(message: string, didCopy = false) {
    setNotice(message);
    setCopied(didCopy);
    if (timer.current) {
      window.clearTimeout(timer.current);
    }
    timer.current = window.setTimeout(() => {
      setNotice(null);
      setCopied(false);
    }, 2200);
  }

  function currentUrl() {
    if (url) return url;
    if (typeof window === "undefined") return "";
    return window.location.href;
  }

  function onPrint() {
    window.print();
  }

  async function onShare() {
    const shareUrl = currentUrl();
    const payload: ShareData = {
      title,
      text: text ?? title,
      url: shareUrl,
    };

    if (typeof navigator.share === "function") {
      try {
        await navigator.share(payload);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      flash("Đã chép liên kết để chia sẻ", true);
    } catch {
      flash("Không chia sẻ được trên trình duyệt này");
    }
  }

  async function onCopy() {
    const value = text?.trim() ? text : currentUrl();
    try {
      await navigator.clipboard.writeText(value);
      flash("Đã sao chép", true);
    } catch {
      flash("Không sao chép được");
    }
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Thao tác với kết quả">
        <Button type="button" variant="outline" size="sm" onClick={onPrint}>
          <Printer aria-hidden="true" />
          In
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={onShare}>
          <Share2 aria-hidden="true" />
          Chia sẻ
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={onCopy}>
          {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          Sao chép
        </Button>
      </div>
      <p className="min-h-5 text-xs text-muted-foreground" aria-live="polite">
        {notice}
      </p>
    </div>
  );
}
