// Transaction Timeframe Filter component

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

interface FilterOption {
    label: string;
    value: string;
}

interface ProductCategoryFilterProps {
    selectedFilter: string;
    setSelectedFilter: (filter: string) => void;
}

export default function ProductCategoryFilter({ selectedFilter, setSelectedFilter }: ProductCategoryFilterProps) {
        
    const filterOptions: FilterOption[] = [
      { label: 'All Products', value: 'all' },
      { label: 'Luxury Collection', value: 'luxury-collection' },
      { label: 'Spa Section', value: 'spa-section' },
      { label: 'Pharmacy', value: 'pharmacy' },
    ]
  
    const handleFilterChange = (value: string) => {
      setSelectedFilter(value)
    }
  
    return (
        <div className="relative w-40">
            <Select value={selectedFilter} onValueChange={handleFilterChange}>
                <SelectTrigger className="w-full h-12 text-center">
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