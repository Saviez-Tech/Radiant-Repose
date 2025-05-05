"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  className?: string;
  debounceTime?: number;
  autoFocus?: boolean;
}

export default function AdminProductManagementMCSearch({
  placeholder = "Search products...",
  onSearch,
  className = "",
  autoFocus = false,
}: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Debounce effect
  useEffect(() => {
    const debounce = setTimeout(() => {
        if (searchTerm?.trim() !== "" && (searchTerm && searchTerm?.trim().length > 3)) {
          onSearch(searchTerm)
        }
      }, 500)
    
      return () => clearTimeout(debounce)
      
  }, [searchTerm])

  const handleClearSearch = () => {
    setSearchTerm("")
    onSearch("")
  }

  return (
    <div
      className={`relative flex items-center w-full max-w-md ${className}`}
    >
      <div className="absolute left-1 text-gray-400">
        <Search size={20} />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full cursor-pointer pl-6 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800/70 text-sm focus:border-none text-gray-700"
        autoFocus={autoFocus}
      />
      {searchTerm && (
        <button
          onClick={handleClearSearch}
          className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  )
}