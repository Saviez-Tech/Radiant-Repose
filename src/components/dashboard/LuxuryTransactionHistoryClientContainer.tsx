"use client"

import Image from "next/image";
import { Pagination } from "./Pagination";
import { useMemo, useState } from "react";

export default function LuxuryTransactionHistoryClientContainer({ data }: { data: Transaction[] }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(25)

  // Calculate pagination
  const paginatedTransactions = useMemo(() => {
    return data.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    )
  }, [data.length, currentPage, rowsPerPage])

  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  
  // Handle rows per page change
  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows)
    setCurrentPage(1)
  }

  return (
    <div className="w-full py-14">
      <h2 className="text-lg font-medium text-primary-deepBlack mb-4">Transaction History</h2>
      
      <div className="overflow-x-auto">
          <table className="table-auto w-full">
              <thead className="bg-[#F8F8F8]">
                  <tr>
                      <th className="text-left p-4 text-[13px] font-semibold text-gray-600">Barcode No.</th>
                      <th className="text-left p-4 text-[13px] font-semibold text-gray-600">Product Name</th>
                      <th className="text-center p-4 text-[13px] font-semibold text-gray-600">Quantity</th>
                      <th className="text-center p-4 text-[13px] font-semibold text-gray-600">Time</th>
                      <th className="text-center p-4 text-[13px] font-semibold text-gray-600">Date</th>
                      <th className="text-center p-4 text-[13px] font-semibold text-gray-600">Amount</th>
                      <th className="text-center p-4 text-[13px] font-semibold text-gray-600">Balance</th>
                  </tr>
              </thead>
              <tbody>
                  {paginatedTransactions.length > 0 ? (
                      paginatedTransactions.map((transaction) => (
                          <tr key={transaction.id} className="border-t hover:bg-gray-50">
                              <td className="p-4 text-sm text-gray-600">{transaction.barcode}</td>
                              <td className="p-4">
                                  <div className="flex items-center gap-3">
                                      <Image
                                          src={transaction.image_url}
                                          alt={transaction.name}
                                          width={40}
                                          height={40}
                                          className="w-10 h-10 rounded-md object-cover"
                                      />
                                      <span className="text-xs text-gray-700">{transaction.name}</span>
                                  </div>
                              </td>
                              <td className="p-4 text-center text-xs text-gray-600">{transaction.quantity}</td>
                              <td className="p-4 text-center text-xs text-gray-600">{transaction.time}</td>
                              <td className="p-4 text-center text-xs text-gray-600">{transaction.date}</td>
                              <td className="p-4 text-center text-xs text-gray-600">{transaction.amount}</td>
                              <td className="p-4 text-center text-xs text-gray-600">0</td>
                          </tr>
                      ))
                  ) : (
                      <tr className="border-t">
                          <td colSpan={7} className="p-4 text-center text-sm text-gray-500">
                              No transactions found for the selected filter.
                          </td>
                      </tr>
                  )}
              </tbody>
          </table>
      </div>
      
      <Pagination
        totalItems={data.length}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  )
}