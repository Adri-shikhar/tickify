import { Skeleton, CardListSkeleton } from "@/Components/ui/Skeleton";

// Covers every dashboard route that does not define its own loading file.
export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-4 sm:p-6 md:p-8">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-72" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>
      <CardListSkeleton count={3} />
    </div>
  );
}
