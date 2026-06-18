import Image from "next/image";
import Link from "next/link";
import {
  calculateReadingTime,
  formatDate,
  getPostBadge,
} from "@/lib/utils";
import type { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
  index?: number;
}

export default function PostCard({ post, index = 0 }: PostCardProps) {
  const badge = getPostBadge(post.title);
  const readingTime = calculateReadingTime(post);
  const thumbnail = post.img || post.img2;

  return (
    <Link href={`/post/${post.slug}`} className="block">
      <article
        className="card-surface-interactive group animate-fade-in-up overflow-hidden p-0"
        style={{ animationDelay: `${index * 80}ms` }}
      >
        <div className={`flex ${thumbnail ? "flex-col sm:flex-row" : ""}`}>
          {thumbnail && (
            <div className="relative h-40 w-full shrink-0 overflow-hidden sm:h-auto sm:w-36 md:w-44">
              <Image
                src={thumbnail}
                alt=""
                width={352}
                height={198}
                className="h-40 w-full object-cover transition duration-300 group-hover:scale-[1.02] sm:h-full sm:min-h-[140px]"
              />
            </div>
          )}

          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {badge === "TIP" && <span className="badge-tip">TIP</span>}
              {badge === "RECAP" && <span className="badge-recap">RECAP</span>}
              <span className="text-xs text-muted">
                {formatDate(post.published_at)} · {readingTime} นาที
              </span>
            </div>

            <h2 className="font-display mb-2 text-lg font-bold leading-snug text-foreground transition group-hover:text-accent sm:text-xl">
              {post.title.replace(/^\[.*?\]\s*/, "")}
            </h2>

            <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
              {post.description}
            </p>

            <span className="mt-4 inline-block text-sm font-medium text-accent opacity-100 transition md:opacity-0 md:group-hover:opacity-100">
              อ่านต่อ →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
