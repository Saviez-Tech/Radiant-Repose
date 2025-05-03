import TransactionHistoryServerWrapper from "@/components/dashboard/TransactionHistoryServerWrapper";
import TableLikeSkeleton from "@/components/loaders/TableLikeSkeleton";
import { Suspense } from "react";

export default async function Page({ params }:{ params: Promise<{ userID: string }>}){

    const { userID } = (await params)

    return (
        <Suspense fallback={<TableLikeSkeleton />}>
            <TransactionHistoryServerWrapper userID={userID} />
        </Suspense>
    )
}