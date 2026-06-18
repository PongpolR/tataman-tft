export default function CommentSectionSkeleton() {
  return (
    <section className="mt-12 border-t border-border pt-8">
      <div className="skeleton-block mb-6 h-7 w-40" />

      <div className="mb-8 space-y-3">
        <div className="skeleton-block h-24 w-full rounded-lg" />
        <div className="skeleton-block h-10 w-32 rounded-lg" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-border bg-card/50 p-4"
          >
            <div className="mb-2 flex items-center gap-2">
              <div className="skeleton-block h-4 w-24" />
              <div className="skeleton-block h-3 w-20" />
            </div>
            <div className="space-y-2">
              <div className="skeleton-block h-3 w-full" />
              <div className="skeleton-block h-3 w-4/5" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
