"use client";
import { useEffect, useState, useRef } from "react";
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
  debounceTime = 500,
  autoFocus = false,
}: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const searchTermRef = useRef(searchTerm)
  
  // Update ref when searchTerm changes
  useEffect(() => {
    searchTermRef.current = searchTerm;
  }, [searchTerm])
  
  // Debounce effect with cleanup
  useEffect(() => {
    // Don't trigger search for empty inputs or inputs that are too short
    if (!searchTerm?.trim() || searchTerm.trim().length <= 3) {
      // If search is cleared, immediately notify parent
      if (!searchTerm) {
        onSearch("")
      }
      return;
    }
    
    // Store the current search term to compare later
    const currentSearchTerm = searchTerm;
    
    const debounce = setTimeout(() => {
      // Only perform search if the term is still current when timeout completes
      if (currentSearchTerm === searchTermRef.current) {
        onSearch(currentSearchTerm)
      }
    }, debounceTime)
   
    // Clear timeout on cleanup
    return () => clearTimeout(debounce)
     
  }, [searchTerm, debounceTime])
  
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