import { Skeleton } from "@/components/ui/skeleton";
export function SkeletonTable() {
  return (
    <div className="flex w-full min-w-full flex-col gap-2">
      {Array.from({ length: 15 }).map((_, index) => (
        <div className="flex gap-2" key={index}>
          <Skeleton className="h-10 w-9.5" />
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-59.5" />
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-31" />
          <Skeleton className="h-10 w-19" />
        </div>
      ))}
    </div>
  );
}
