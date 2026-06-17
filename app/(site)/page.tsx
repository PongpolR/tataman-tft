import HeroSection from "@/app/components/layout/HeroSection";
import PostList from "@/app/components/post/PostList";
import { getPublishedPosts } from "@/lib/posts";

export default async function HomePage() {
  const posts = await getPublishedPosts();

  return (
    <div>
      <HeroSection />
      <section>
        <h2 className="mb-6 text-xl font-bold text-foreground">Posts</h2>
        <PostList posts={posts} />
      </section>
    </div>
  );
}
