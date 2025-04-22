import { Skeleton } from "../ui/skeleton";

export default function TableLikeSkeleton(){
    return (
        <div className="flex gap-4 flex-col py-16">
           {
            Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="w-full h-14 rounded-xl"  />
            ))
           }
        </div>
    )
}