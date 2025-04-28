// Transaction Timeframe Filter component

import { ProductType as ProductTypeEnum } from "@/enums";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

interface ProductTypeFilterProps {
    selectedFilter: string;
    setSelectedFilter: (filter: string) => void;
}

export default function ProductTypeFilter({ selectedFilter, setSelectedFilter }: ProductTypeFilterProps) {
        
    const filterOptions: ProductTypeEnum[] = [
        ProductTypeEnum.BAGS,
        ProductTypeEnum.JEWELRY,
        ProductTypeEnum.PERFUMES,
        ProductTypeEnum.SHOES,
    ]
  
    const handleFilterChange = (value: string) => {
      setSelectedFilter(value)
    }
  
    return (
        <div className="relative">
            <Select value={selectedFilter} onValueChange={handleFilterChange}>
                <SelectTrigger className="w-full text-sm capitalize text-primary-dark_ash_slate font-normal">
                    <SelectValue placeholder="Select a filter" />
                </SelectTrigger>
                <SelectContent className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    <SelectItem value="all" className="text-sm capitalize text-gray-500">
                        All
                    </SelectItem>
                    {filterOptions.map((option) => 
                    <SelectItem key={option} value={option} className="text-sm capitalize text-gray-500">
                        {option}
                    </SelectItem>
                    )}
                </SelectContent>
            </Select>
        </div>
    )
}