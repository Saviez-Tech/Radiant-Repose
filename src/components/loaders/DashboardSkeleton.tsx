import { Skeleton } from "../ui/skeleton";

export default function AdminDashboardSkeleton(){
    return (
        <div className="flex w-full p-5 md:p-0 h-full flex-col md:flex-row justify-between gap-4">
            <div className="flex-1 space-y-10">
                <Skeleton className="h-40" />
                <Skeleton className="h-60" />
            </div>

            <Skeleton className="h-full min-h-96 md:w-[19.125rem]" />
        </div>
    )
}