// Transaction Timeframe Filter component

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface FilterOption {
    label: string;
    value: string;
}

interface TransactionFilterProps {
    selectedFilter: string;
    setSelectedFilter: (filter: string) => void;
}

export default function TransactionFilter({ selectedFilter, setSelectedFilter }: TransactionFilterProps) {
        
    const filterOptions: FilterOption[] = [
      { label: 'Today', value: 'today' },
      { label: 'Yesterday', value: 'yesterday' },
      { label: 'Last Week', value: 'lastWeek' },
      { label: 'Last Month', value: 'lastMonth' },
    ]
  
    const handleFilterChange = (value: string) => {
      setSelectedFilter(value)
    }
  
    return (
        <div className="relative">
            <Select value={selectedFilter} onValueChange={handleFilterChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a filter" className="text-sm text-primary-dark_ash_slate font-normal" />
                </SelectTrigger>
                <SelectContent className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    {filterOptions.map((option) => 
                    <SelectItem key={option.value} value={option.value} className="text-sm text-gray-500">
                        {option.label}
                    </SelectItem>
                    )}
                </SelectContent>
            </Select>
        </div>
    )
}