import ScannedItemsClientContainer from "@/components/dashboard/ScannedItemsClientContainer";
import ScannedItemsSkeletonContainer from "@/components/loaders/ScannedItemsSkeletonContainer";
import { Suspense } from "react";

export default function Page(){
    return (
        <Suspense fallback={<ScannedItemsSkeletonContainer />}>
            <ScannedItemsClientContainer items={[]} />
        </Suspense>
    )
}