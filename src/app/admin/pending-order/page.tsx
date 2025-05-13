import PendingOrderServerWrapper from "@/components/dashboard/admin-dashboard-components/PendingOrderServerWrapper";
import OrderListSkeleton from "@/components/loaders/OrderListSkeleton";
import { Suspense } from "react";

export default function Page(){
    return (
        <Suspense fallback={<OrderListSkeleton />}>
            <PendingOrderServerWrapper />
        </Suspense>
    )
}