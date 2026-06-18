import Image from "next/image";
import Link from "next/link";
import {
  calculateReadingTime,
  formatDate,
  getPostBadge,
  getPostThumbnail,
} from "@/lib/utils";
import type { Post } from "@/types/post";

interface FeaturedPostCardProps {
  post: Post;
}

export default function FeaturedPostCard({ post }: FeaturedPostCardProps) {
  const badge = getPostBadge(post.title);
  const readingTime = calculateReadingTime(post);
  const thumbnail = getPostThumbnail(post, "/ttm.jpg") ?? "/ttm.jpg";

  return (
    <Link href={`/post/${post.slug}`} className="block">
      <article className="card-surface-interactive group overflow-hidden p-0">
        <div className="grid md:grid-cols-2">
          <div className="flex flex-col justify-center p-5 sm:p-6 md:p-8">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="badge-tip">ล่าสุด</span>
              {badge === "TIP" && <span className="badge-tip">TIP</span>}
              {badge === "RECAP" && <span className="badge-recap">RECAP</span>}
              <span className="text-xs text-muted">
                {formatDate(post.published_at)} · {readingTime} นาที
              </span>
            </div>

            <h2 className="font-display mb-3 text-xl font-bold leading-snug text-foreground transition group-hover:text-accent sm:text-2xl">
              {post.title.replace(/^\[.*?\]\s*/, "")}
            </h2>

            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted sm:text-base">
              {post.description}
            </p>

            <span className="inline-block text-sm font-medium text-accent">
              อ่านต่อ →
            </span>
          </div>

          <div className="relative aspect-video overflow-hidden border-t border-border md:border-l md:border-t-0">
            <Image
              src={thumbnail}
              alt={post.title}
              fill
              className="object-cover transition duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </article>
    </Link>
  );
}
