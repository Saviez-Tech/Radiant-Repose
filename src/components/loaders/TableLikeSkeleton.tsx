import { Skeleton } from "../ui/skeleton";

export default function TableLikeSkeleton() {
  return (
    <div className="w-full overflow-hidden">
      <div className="w-full py-8">
        <div className="bg-gray-50 px-4 py-3 flex items-center w-full">
          <div className="flex-1 flex gap-2 md:gap-4">
            <Skeleton className="h-5 md:h-6 w-full flex-1" />
            <Skeleton className="h-5 md:h-6 w-full flex-1" />
            <Skeleton className="h-5 md:h-6 w-full flex-1" />
            <Skeleton className="h-5 md:h-6 w-full flex-1" />
            <Skeleton className="h-5 md:h-6 w-24 flex-shrink-0" />
            <Skeleton className="h-5 md:h-6 w-24 flex-shrink-0" />
          </div>
        </div>
       
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`px-4 py-3 flex items-center w-full ${index !== 4 ? "border-b" : ""}`}
          >
            <div className="flex-1 flex items-center gap-2 md:gap-4">
              <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                <Skeleton className="h-8 w-8 md:h-10 md:w-10 rounded-full" />
                <Skeleton className="h-5 md:h-7 w-24" />
              </div>
              <Skeleton className="h-5 md:h-7 w-full flex-1" />
              <Skeleton className="h-5 md:h-7 w-full flex-1" />
              <Skeleton className="h-4 w-full flex-1" />
              <Skeleton className="h-8 w-24 rounded-full flex-shrink-0" />
              <div className="flex items-center gap-1 md:gap-2 w-24 flex-shrink-0">
                <Skeleton className="h-6 w-6 md:h-8 md:w-8 rounded-full" />
                <Skeleton className="h-6 w-6 md:h-8 md:w-8 rounded-full" />
              </div>
            </div>
          </div>
        ))}
       
        <div className="bg-gray-50 px-4 py-3 flex justify-end items-center gap-2 md:gap-4">
          <Skeleton className="h-4 w-16 md:w-24" />
          <Skeleton className="h-4 w-12 md:w-16" />
          <Skeleton className="h-6 w-12 md:h-8 md:w-16" />
        </div>
      </div>
    </div>
  )
}