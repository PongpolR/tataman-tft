export default function PostContentSkeleton() {
  return (
    <article className="animate-fade-in-up">
      <header className="mb-8 border-b border-border pb-6">
        <div className="skeleton-block mb-3 h-8 w-3/4 sm:h-10" />
        <div className="skeleton-block h-4 w-48" />
      </header>

      <div className="mb-6 space-y-3">
        <div className="skeleton-block h-6 w-1/3" />
        <div className="skeleton-block h-4 w-full" />
        <div className="skeleton-block h-4 w-5/6" />
      </div>

      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="skeleton-block h-4"
            style={{ width: `${95 - i * 8}%` }}
          />
        ))}
      </div>

      <div className="my-8">
        <div className="skeleton-block aspect-video w-full rounded-xl" />
        <div className="skeleton-block mx-auto mt-2 h-3 w-1/2" />
      </div>

      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="skeleton-block h-4 w-full" />
        ))}
      </div>
    </article>
  );
}
