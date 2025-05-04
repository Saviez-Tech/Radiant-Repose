"use client"
import { useEffect, useState } from "react";
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
    // Add a local state for hydration safety
    const [mounted, setMounted] = useState(false)
    
    // Only render the actual select component after client-side hydration
    useEffect(() => {
        setMounted(true)
    }, [])
    
    const filterOptions: FilterOption[] = [
        { label: 'Today', value: 'day' },
        { label: 'Week', value: 'week' },
        { label: 'Month', value: 'month' },
    ]
 
    const handleFilterChange = (value: string) => {
        setSelectedFilter(value)
    }
 
    // Show a placeholder during server-side rendering
    if (!mounted) {
        return (
            <div className="relative">
                <div className="h-10 w-full rounded-md border border-input px-3 py-2 text-sm">
                    Loading...
                </div>
            </div>
        )
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