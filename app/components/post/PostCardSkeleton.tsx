export default function PostCardSkeleton() {
  return (
    <article className="rounded-xl border border-border bg-card p-5 sm:p-6">
      <div className="mb-3 flex items-center gap-2">
        <div className="skeleton-block h-5 w-12 rounded-md" />
        <div className="skeleton-block h-3 w-28" />
      </div>
      <div className="skeleton-block mb-2 h-6 w-4/5" />
      <div className="skeleton-block mb-1 h-4 w-full" />
      <div className="skeleton-block h-4 w-3/4" />
    </article>
  );
}
