import AdminDashboardServerWrapper from "@/components/dashboard/admin-dashboard-components/AdminDashboardServerWrapper";
import AdminDashboardSkeleton from "@/components/loaders/DashboardSkeleton";
import { Suspense } from "react";

export default async function Page({ searchParams }:{ searchParams: Promise<{ [key: string]: string | string[] | undefined }> }){

    const { filter, date } = (await (searchParams))

    return (
        <Suspense fallback={<AdminDashboardSkeleton />}>
            <AdminDashboardServerWrapper filter={filter as DateFilter} date={date as string} />
        </Suspense>
    )
}