import HeroSkeleton from "@/app/components/layout/HeroSkeleton";
import PostCardSkeleton from "@/app/components/post/PostCardSkeleton";

export default function BlogLoading() {
  return (
    <div className="space-y-12">
      <HeroSkeleton />
      <div className="space-y-4">
        <div className="mb-6 space-y-2">
          <div className="skeleton-block h-7 w-40" />
          <div className="skeleton-block h-4 w-64" />
        </div>
        {Array.from({ length: 4 }).map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
