import Image from "next/image";
import type { Post } from "@/types/post";
import { calculateReadingTime, formatDate, getPostBadge } from "@/lib/utils";

interface PostContentProps {
  post: Post;
}

function PostImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="group my-8">
      <div className="overflow-hidden rounded-xl border border-border shadow-lg shadow-black/10 ring-1 ring-border">
        <Image
          src={src}
          alt={alt}
          width={800}
          height={450}
          className="h-auto w-full transition duration-300 md:group-hover:scale-[1.02]"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default function PostContent({ post }: PostContentProps) {
  const readingTime = calculateReadingTime(post);
  const badge = getPostBadge(post.title);

  return (
    <article className="prose-tft animate-fade-in-up max-w-prose">
      <header className="mb-8 border-b border-accent/30 pb-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {badge === "TIP" && <span className="badge-tip">TIP</span>}
          {badge === "RECAP" && <span className="badge-recap">RECAP</span>}
        </div>
        <h1 className="font-display mb-3 text-2xl font-bold leading-tight sm:text-3xl">
          {post.title.replace(/^\[.*?\]\s*/, "")}
        </h1>
        <p className="text-sm text-muted">
          {formatDate(post.published_at)} · {readingTime} นาทีในการอ่าน
        </p>
      </header>

      {post.header && (
        <section className="mb-6">
          <h2 className="font-display mb-3 text-xl font-bold">{post.header}</h2>
          <ul className="list-disc space-y-1 pl-5">
            {post.header_desc.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {post.body.map((paragraph, i) => (
        <p
          key={i}
          className="mb-4 text-left text-base leading-relaxed md:text-lg"
        >
          {paragraph}
        </p>
      ))}

      {post.img && (
        <PostImage
          src={post.img}
          alt={post.img_desc || post.title}
          caption={post.img_desc || undefined}
        />
      )}

      {post.body2.map((paragraph, i) => (
        <p
          key={i}
          className="mb-4 text-left text-base leading-relaxed md:text-lg"
        >
          {paragraph}
        </p>
      ))}

      {post.img2 && (
        <PostImage
          src={post.img2}
          alt={post.img2_desc || post.title}
          caption={post.img2_desc || undefined}
        />
      )}

      {post.summary.length > 0 && (
        <section className="mt-8 rounded-xl border border-accent/30 bg-accent/5 px-5 py-5 sm:px-6 sm:py-6">
          <h2 className="font-display mb-4 text-xl font-bold text-foreground">
            สรุป
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            {post.summary.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {post.ref.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display mb-3 text-lg font-bold">Reference</h2>
          <ol className="list-decimal space-y-1 pl-5">
            {post.ref.map((url, i) => (
              <li key={i}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-accent hover:underline"
                >
                  {url}
                </a>
              </li>
            ))}
          </ol>
        </section>
      )}
    </article>
  );
}
