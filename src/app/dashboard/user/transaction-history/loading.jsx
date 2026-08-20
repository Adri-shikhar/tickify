import { Skeleton, TableSkeleton } from "@/Components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 sm:p-6 md:p-8">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-80" />
        <Skeleton className="h-4 w-64" />
      </div>
      <TableSkeleton rows={5} />
    </div>
  );
}
