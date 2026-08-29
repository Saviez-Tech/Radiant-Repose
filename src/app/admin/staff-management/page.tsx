import StaffManagementServerWrapper from "@/components/dashboard/admin-dashboard-components/StaffManagementServerWrapper";
import TableLikeSkeleton from "@/components/loaders/TableLikeSkeleton";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';
export default function Page() {

    return (
        <Suspense fallback={<TableLikeSkeleton />}>
            <StaffManagementServerWrapper />
        </Suspense>
    )
}