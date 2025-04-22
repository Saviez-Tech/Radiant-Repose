"use client"

import Image from "next/image";
import { TransactionPagination } from "./TransactionPagination";
import TransactionFilter from "./TransactionFilter";
import { useEffect, useMemo, useState } from "react";

export default function TransactionHistoryClientContainer({ data }: { data: Transaction[] }) {

    const [transactions, setTransactions] = useState<Transaction[]>(data)
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(data)
    const [selectedFilter, setSelectedFilter] = useState('yesterday')
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(7)
  
    const applyFilter = (filter: string) => {
        const today = new Date()
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        
        const lastWeekStart = new Date()
        lastWeekStart.setDate(lastWeekStart.getDate() - 7)
        
        const lastMonthStart = new Date()
        lastMonthStart.setMonth(lastMonthStart.getMonth() - 1)
        
        let filtered: Transaction[];
        
        switch (filter) {
          case 'today':
            filtered = transactions.filter(t => {
              const transactionDate = new Date(t.date)
              return (
                transactionDate.getDate() === today.getDate() &&
                transactionDate.getMonth() === today.getMonth() &&
                transactionDate.getFullYear() === today.getFullYear()
              )
            })
            break;
          case 'yesterday':
            filtered = transactions.filter(t => {
              const transactionDate = new Date(t.date)
              return (
                transactionDate.getDate() === yesterday.getDate() &&
                transactionDate.getMonth() === yesterday.getMonth() &&
                transactionDate.getFullYear() === yesterday.getFullYear()
              )
            })
            break;
          case 'lastWeek':
            filtered = transactions.filter(t => {
              const transactionDate = new Date(t.date)
              return transactionDate >= lastWeekStart && transactionDate <= today;
            })
            break;
          case 'lastMonth':
            filtered = transactions.filter(t => {
              const transactionDate = new Date(t.date)
              return transactionDate >= lastMonthStart && transactionDate <= today;
            })
            break;
          default:
            filtered = transactions;
        }
        
        setFilteredTransactions(filtered)
        setCurrentPage(1)
    }
  
    // Handle filter change
    useEffect(() => {
      applyFilter(selectedFilter)
    }, [selectedFilter, transactions.length])
    
    // Calculate pagination
    const paginatedTransactions = useMemo(() => {
        return filteredTransactions.slice(
            (currentPage - 1) * rowsPerPage,
            currentPage * rowsPerPage
        )
    }, [filteredTransactions.length, currentPage, rowsPerPage])


    console.log("Filtered Transactions: ", filteredTransactions)
    
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
      <div className="w-full py-16">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-primary-deepBlack">Transaction History</h2>
          <TransactionFilter
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        </div>
        
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
              {paginatedTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 text-sm text-gray-600">{transaction.barCode}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={transaction.image}
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
                  <td className="p-4 text-center text-xs text-gray-600">{transaction.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <TransactionPagination
          totalItems={filteredTransactions.length}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </div>
    )
}