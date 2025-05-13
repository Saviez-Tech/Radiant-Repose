"use client"

import { useMemo, useState } from "react";
import { Pagination } from "../Pagination";
import PendingOrderCard from "./PendingOrdersCard";

export default function PendingOrderMC({ data }: { data: OrderList[] }){

    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(7)

    const paginatedOrderListData = useMemo(() => {
        return data.slice(
            (currentPage - 1) * rowsPerPage,
            currentPage * rowsPerPage
        )
    }, [data, currentPage, rowsPerPage])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }
   
    const handleRowsPerPageChange = (rows: number) => {
        setRowsPerPage(rows)
        setCurrentPage(1)
    }

    return(
        <main>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                {paginatedOrderListData.length > 0 ? (
                    paginatedOrderListData.map((v, index) => (
                        <PendingOrderCard key={index} {...v} />
                    ))
                ) : (
                    <div className="col-span-full mt-32 text-center py-8 text-gray-500">
                        No pending order
                    </div>
                )}
            </div>

            {
                paginatedOrderListData.length ?
                <Pagination
                    totalItems={data.length}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
                :
                null
            }
        </main>
    )
}