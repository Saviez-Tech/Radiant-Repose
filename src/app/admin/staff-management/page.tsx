import { sampleStaffData } from "@/components-data/sample-data";
import StaffManagementMC from "@/components/dashboard/admin-dashboard-components/StaffManagementMC";
import TableLikeSkeleton from "@/components/loaders/TableLikeSkeleton";
import { Suspense } from "react";

export default function Page(){
    return (
        <Suspense fallback={<TableLikeSkeleton />}>
            <StaffManagementMC data={sampleStaffData} />
        </Suspense>
    )
}