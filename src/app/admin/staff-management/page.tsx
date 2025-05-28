import StaffManagementServerWrapper from "@/components/dashboard/admin-dashboard-components/StaffManagementServerWrapper";
import TableLikeSkeleton from "@/components/loaders/TableLikeSkeleton";
import { Suspense } from "react";

export default function Page(){

    return (
        <Suspense fallback={<TableLikeSkeleton />}>
            <StaffManagementServerWrapper />
        </Suspense>
    )
}