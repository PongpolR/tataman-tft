import Image from "next/image";
import type { Post } from "@/types/post";
import { calculateReadingTime, formatDate } from "@/lib/utils";

interface PostContentProps {
  post: Post;
}

export default function PostContent({ post }: PostContentProps) {
  const readingTime = calculateReadingTime(post);

  return (
    <article className="prose-tft animate-fade-in-up">
      <header className="mb-8 border-b border-border pb-6">
        <h1 className="mb-3 text-2xl font-bold leading-tight sm:text-3xl">
          {post.title}
        </h1>
        <p className="text-sm text-muted">
          {formatDate(post.published_at)} · {readingTime} นาทีในการอ่าน
        </p>
      </header>

      {post.header && (
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-bold">{post.header}</h2>
          <ul className="list-disc space-y-1 pl-5">
            {post.header_desc.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {post.body.map((paragraph, i) => (
        <p key={i} className="mb-4 text-justify leading-relaxed">
          {paragraph}
        </p>
      ))}

      {post.img && (
        <figure className="my-8">
          <div className="overflow-hidden rounded-xl border border-border">
            <Image
              src={post.img}
              alt={post.img_desc || post.title}
              width={800}
              height={450}
              className="h-auto w-full"
            />
          </div>
          {post.img_desc && (
            <figcaption className="mt-2 text-center text-sm text-muted">
              {post.img_desc}
            </figcaption>
          )}
        </figure>
      )}

      {post.body2.map((paragraph, i) => (
        <p key={i} className="mb-4 text-justify leading-relaxed">
          {paragraph}
        </p>
      ))}

      {post.img2 && (
        <figure className="my-8">
          <div className="overflow-hidden rounded-xl border border-border">
            <Image
              src={post.img2}
              alt={post.img2_desc || post.title}
              width={800}
              height={450}
              className="h-auto w-full"
            />
          </div>
          {post.img2_desc && (
            <figcaption className="mt-2 text-center text-sm text-muted">
              {post.img2_desc}
            </figcaption>
          )}
        </figure>
      )}

      {post.summary.length > 0 && (
        <section className="mt-10 rounded-xl border border-accent/30 bg-accent/5 p-6">
          <h2 className="mb-4 text-xl font-bold text-accent">สรุป</h2>
          <ul className="list-disc space-y-2 pl-5">
            {post.summary.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {post.ref.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-bold">Reference</h2>
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
