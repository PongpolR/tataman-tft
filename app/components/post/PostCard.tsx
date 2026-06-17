import Link from "next/link";
import {
  calculateReadingTime,
  formatDate,
  getPostBadge,
} from "@/lib/utils";
import type { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const badge = getPostBadge(post.title);
  const readingTime = calculateReadingTime(post);

  return (
    <Link href={`/post/${post.slug}`} className="block">
      <article className="card-surface group p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {badge === "TIP" && <span className="badge-tip">TIP</span>}
          {badge === "RECAP" && <span className="badge-recap">RECAP</span>}
          <span className="text-xs text-muted">
            {formatDate(post.published_at)} · {readingTime} นาที
          </span>
        </div>

        <h2 className="mb-2 text-lg font-bold leading-snug text-foreground transition group-hover:text-accent sm:text-xl">
          {post.title.replace(/^\[.*?\]\s*/, "")}
        </h2>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted">
          {post.description}
        </p>

        <span className="mt-4 inline-block text-sm font-medium text-accent opacity-0 transition group-hover:opacity-100">
          อ่านต่อ →
        </span>
      </article>
    </Link>
  );
}
