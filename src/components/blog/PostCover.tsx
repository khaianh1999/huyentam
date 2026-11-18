import type { ReactNode } from "react";
import { SectionArt, artForPost } from "@/components/art/SectionArt";
import { BLOG_COVERS } from "@/data/blog/covers";
import { assetPath } from "@/lib/seo/site";
import { cn } from "@/lib/utils";

type PostLike = { slug: string; title: string; category: string };

/**
 * Ảnh bìa full khung cho bài viết. Có ảnh thì phủ kín, kèm lớp tối phía dưới cho chữ dễ đọc;
 * chưa có ảnh thì dùng hình minh họa vẽ tay. `credit`: "text" ghi tên tác giả (dùng trong thẻ đã là liên kết),
 * "link" ghi kèm liên kết tới Unsplash.
 */
export function PostCover({
  post,
  className,
  children,
  credit = "text",
  eager = false,
}: {
  post: PostLike;
  className?: string;
  children?: ReactNode;
  credit?: "text" | "link" | "none";
  eager?: boolean;
}) {
  const cover = BLOG_COVERS[post.slug];
  return (
    <span className={cn("relative block overflow-hidden bg-[#2b1311]", className)}>
      {cover ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element -- xuất tĩnh, ảnh đã cắt sẵn 1200×630 */}
          <img
            src={assetPath(cover.src)}
            alt={cover.alt}
            width={1200}
            height={630}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" aria-hidden="true" />
        </>
      ) : (
        <span className="lacquer absolute inset-0">
          <span className="cloud-motif absolute inset-0" aria-hidden="true" />
          <SectionArt name={artForPost(post.title, post.category)} className="absolute -right-3 -bottom-4 w-44" />
        </span>
      )}
      {children ? <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">{children}</span> : null}
      {cover && credit !== "none" ? (
        <span className="absolute top-2 right-2 rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-white/85">
          {credit === "link" ? (
            <>
              Ảnh:{" "}
              <a href={cover.authorUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
                {cover.author}
              </a>{" "}
              /{" "}
              <a href={cover.photoUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
                Unsplash
              </a>
            </>
          ) : (
            <>Ảnh: {cover.author} / Unsplash</>
          )}
        </span>
      ) : null}
    </span>
  );
}
