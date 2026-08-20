import { Skeleton, TableSkeleton } from "@/Components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6 md:p-8">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-72" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="rounded-card border border-default bg-surface p-5 shadow-card">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="mt-3 h-9 w-24" />
          </div>
        ))}
      </div>

      <TableSkeleton rows={5} />
    </div>
  );
}
