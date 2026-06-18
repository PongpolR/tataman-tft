import PostCardSkeleton from "@/app/components/post/PostCardSkeleton";

export default function BlogLoading() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
}
