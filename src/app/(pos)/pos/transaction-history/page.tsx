import { sampleTransactions } from "@/components-data/sample-data";
import TransactionHistoryClientContainer from "@/components/dashboard/TransactionHistoryClientContainer";
import TableLikeSkeleton from "@/components/loaders/TableLikeSkeleton";
import { Suspense } from "react";

export default function Page(){
    return (
        <Suspense fallback={<TableLikeSkeleton />}>
            <TransactionHistoryClientContainer data={sampleTransactions} />
        </Suspense>
    )
}