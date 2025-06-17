import LuxuryTransactionHistoryServerWrapper from "@/components/dashboard/LuxuryTransactionHistoryServerWrapper";
import TableLikeSkeleton from "@/components/loaders/TableLikeSkeleton";
import { Suspense } from "react";

export default async function Page({ params }:{ params: Promise<{ userID: string }>}){

    const { userID } = (await params)

    return (
        <Suspense fallback={<TableLikeSkeleton />}>
            <LuxuryTransactionHistoryServerWrapper userID={userID} />
        </Suspense>
    )
}