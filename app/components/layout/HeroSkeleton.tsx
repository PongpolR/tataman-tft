export default function HeroSkeleton() {
  return (
    <div className="mb-12">
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-8 md:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
          <div className="skeleton-block mx-auto h-20 w-20 shrink-0 rounded-full sm:mx-0" />
          <div className="flex-1 space-y-4">
            <div className="skeleton-block mx-auto h-8 w-4/5 sm:mx-0" />
            <div className="skeleton-block h-4 w-full" />
            <div className="skeleton-block h-4 w-full" />
            <div className="skeleton-block h-4 w-3/4" />
            <div className="skeleton-block h-10 w-36 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
