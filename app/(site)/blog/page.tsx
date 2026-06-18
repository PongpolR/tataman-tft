import HeroSection from "@/app/components/layout/HeroSection";
import PostList from "@/app/components/post/PostList";
import { getPublishedPosts } from "@/lib/posts";

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  const latestPostSlug = posts[0]?.slug;

  return (
    <div className="space-y-12">
      <HeroSection latestPostSlug={latestPostSlug} />
      <section aria-label="บทความล่าสุด">
        <div className="mb-6">
          <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
            บทความล่าสุด
          </h2>
          <p className="mt-1 text-sm text-muted">
            เทคนิค competitive, tips และ tournament recap
          </p>
        </div>
        <PostList posts={posts} />
      </section>
    </div>
  );
}
