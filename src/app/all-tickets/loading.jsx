import { Skeleton, TicketGridSkeleton } from "@/Components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Skeleton className="mb-6 h-8 w-64" />

      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-11 w-full" />
        ))}
      </div>

      <Skeleton className="mb-4 h-4 w-48" />
      <TicketGridSkeleton count={6} />
    </div>
  );
}
