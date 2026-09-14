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

function getPageNumbers(currentPage: number, totalPages: number): (number | "...")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [1];

  if (currentPage > 3) pages.push("...");

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (currentPage < totalPages - 2) pages.push("...");
  pages.push(totalPages);

  return pages;
}

export function Pagination({
  totalItems,
  currentPage,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(currentPage * rowsPerPage, totalItems);
  const rowOptions = [7, 10, 25, 50];
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 mt-6 border-t border-gray-100">
      {/* Left: rows per page + count */}
      <div className="flex items-center gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap font-medium">Rows per page:</span>
          <select
            className="border border-gray-200 rounded-lg bg-white px-2 py-1.5 text-sm text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            value={rowsPerPage.toString()}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          >
            {rowOptions.map((option) => (
              <option key={option} value={option.toString()}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <span className="text-gray-400">
          Showing <span className="font-semibold text-gray-700">{startItem}–{endItem}</span> of <span className="font-semibold text-gray-700">{totalItems}</span> results
        </span>
      </div>

      {/* Right: page navigation */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1.5">
          {/* Previous button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-600
              hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-all duration-150 shadow-sm"
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
            <span className="hidden sm:inline">Prev</span>
          </button>

          {/* Page number buttons */}
          <div className="flex items-center gap-1">
            {pageNumbers.map((page, idx) =>
              page === "..." ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="w-9 h-9 flex items-center justify-center text-sm text-gray-400 select-none"
                >
                  …
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => onPageChange(page as number)}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold border transition-all duration-150
                    ${
                      currentPage === page
                        ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-200 scale-105"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-red-50 hover:border-red-300 hover:text-red-700"
                    }
                  `}
                >
                  {page}
                </button>
              )
            )}
          </div>

          {/* Next button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-600
              hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-all duration-150 shadow-sm"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      )}
    </div>
  );
}