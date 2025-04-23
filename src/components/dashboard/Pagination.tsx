"use client"

import { ChevronLeft, ChevronRight } from "lucide-react";

// Pagination component
interface PaginationProps {
  totalItems: number;
  currentPage: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

export function Pagination({
  totalItems,
  currentPage,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: PaginationProps) {

    const totalPages = Math.ceil(totalItems / rowsPerPage);
    const startItem = (currentPage - 1) * rowsPerPage + 1;
    const endItem = Math.min(currentPage * rowsPerPage, totalItems);
    
    const rowOptions = [7, 10, 25, 50]
  
    return (
      <div className="flex items-center justify-end gap-14 px-4 py-2 mt-8">
        <div className="relative">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="whitespace-nowrap">Rows per page: </span>
              <select className="bg-transparent w-auto cursor-pointer" value={rowsPerPage.toString()} onChange={(e) => onRowsPerPageChange(Number(e.target.value))}>
                {rowOptions.map((option) => 
                <option key={option} value={option.toString()} className="text-sm text-gray-500">
                    {option}
                </option>
                )}
              </select>
            </div>
        </div>
        
        <div className="flex items-center text-xs text-gray-500">
          {startItem}-{endItem} of {totalItems}
          
          <div className="flex items-center ml-2">
            <button
              className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-50"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-50"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    )
}