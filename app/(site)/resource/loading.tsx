export default function ResourceLoading() {
  return (
    <div className="animate-pulse">
      <div className="skeleton-block mb-2 h-8 w-36" />
      <div className="skeleton-block mb-8 h-4 w-80 max-w-full" />
      <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card-surface-static p-5">
            <div className="skeleton-block mb-4 h-5 w-40" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="skeleton-block h-4 w-3/4" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
