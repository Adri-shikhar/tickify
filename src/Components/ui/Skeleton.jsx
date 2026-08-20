// Placeholder blocks shaped like the content they stand in for, so the layout
// does not jump when real data arrives. Server component — no "use client".

export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-control bg-sunken ${className}`} />;
}

// Mirrors the silhouette of TicketCard: image band, title, route, price row.
export function TicketCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-card border border-default bg-surface shadow-card">
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="flex flex-col gap-3 p-5">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <div className="flex items-center justify-between border-b border-subtle pb-3">
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-10 w-full rounded-control" />
      </div>
    </div>
  );
}

export function TicketGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <TicketCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 6 }) {
  return (
    <div className="overflow-hidden rounded-card border border-default bg-surface shadow-card">
      <div className="border-b border-subtle bg-sunken px-6 py-3">
        <Skeleton className="h-4 w-40" />
      </div>
      <div className="divide-y divide-subtle">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="flex items-center gap-4 px-6 py-4">
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardListSkeleton({ count = 4 }) {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="flex flex-col gap-4 rounded-card border border-default bg-surface p-5 shadow-card">
          <div className="flex items-start justify-between gap-4">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <Skeleton className="h-12 w-full" />
          <div className="flex items-end justify-between border-t border-subtle pt-3">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}
