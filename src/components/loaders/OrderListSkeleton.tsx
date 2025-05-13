import { Skeleton } from "../ui/skeleton";

export default function OrderListSkeleton(){
    return (
        <div className="py-4 mt-5 grid grid-cols-2 md:grid-col-3 gap-4 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
            {
                Array.from({ length: 6}).map((_,i) => (
                    <Skeleton className="h-[15em] rounded-2xl" key={i} />
                ))
            }
        </div>
    )
}