export default function AboutLoading() {
  return (
    <div className="animate-pulse">
      <div className="skeleton-block mb-6 h-8 w-40" />
      <div className="card-surface-static mb-8 space-y-4 p-5 sm:p-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton-block h-4 w-full" />
        ))}
      </div>
      <div className="skeleton-block mb-4 h-6 w-32" />
      <div className="card-surface-static skeleton-block mb-10 h-48" />
      <div className="skeleton-block mb-4 h-6 w-52" />
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="card-surface-static skeleton-block h-24" />
        ))}
      </div>
    </div>
  );
}
