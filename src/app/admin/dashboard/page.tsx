import AdminDashboardMC from "@/components/dashboard/admin-dashboard-components/AdminDashboardMC";
import { Suspense } from "react";

export default function Page(){
    return (
        <Suspense>
            <AdminDashboardMC />
        </Suspense>
    )
}