import { Skeleton } from "../ui/skeleton";

export default function TableLikeSkeleton() {
  return (
    <div className="w-full overflow-hidden py-8">
      {/* Table Header */}
      <div className="bg-gray-50 px-4 py-3 flex items-center gap-4">
        <Skeleton className="h-5 md:h-6 w-40" />
        <Skeleton className="h-5 md:h-6 w-32" />
        <Skeleton className="h-5 md:h-6 w-36" />
        <Skeleton className="h-5 md:h-6 w-48" />
        <Skeleton className="h-5 md:h-6 w-24" />
        <Skeleton className="h-5 md:h-6 w-24" />
      </div>
      
      {/* Table Rows */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div 
          key={index} 
          className={`px-4 py-3 flex items-center gap-4 ${index !== 4 ? "border-b" : ""}`}
        >
          <div className="flex items-center gap-3 w-40">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-5 md:h-7 w-24" />
          </div>
          <Skeleton className="h-5 md:h-7 w-32" />
          <Skeleton className="h-5 md:h-7 w-36" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-8 w-24 rounded-full" />
          <div className="flex items-center gap-2 w-24">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      ))}

      {/* Table Footer/Pagination */}
      <div className="bg-gray-50 px-4 py-3 flex justify-end items-center gap-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  )
}