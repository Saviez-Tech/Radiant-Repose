import { Dispatch, SetStateAction, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { ChevronDown } from "lucide-react";
import { ProductType } from "@/enums";

interface ProductInventoryFilterProps {
  selectedFilter: string;
  selectedProductType: ProductType | null;
  setSelectedFilter: (filter: string) => void;
  setSelectedProductType: Dispatch<SetStateAction<ProductType | null>>
}

export default function ProductInventoryFilter({ 
  selectedFilter, 
  setSelectedFilter ,
  selectedProductType,
  setSelectedProductType
}: ProductInventoryFilterProps) {

  const handleCategorySelect = (category: string) => {
    setSelectedFilter("product-types")
    setSelectedProductType(category as ProductType)
  }

  const getButtonText = () => {
    if (selectedFilter === "all") return "All Products";
    if (selectedFilter === "low-stock") return "Low Stock";
    if (selectedFilter === "product-types" && selectedProductType) {
      return selectedProductType.charAt(0).toUpperCase() + selectedProductType.slice(1)
    }
    return "Filter Products";
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="h-12 font-normal text-primary-dark_gray">
        <Button variant="outline" className="flex items-center gap-2">
          {getButtonText()}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-full text-primary-dark_gray">
        <DropdownMenuItem onClick={() => setSelectedFilter("all")}>
          All Products
        </DropdownMenuItem>
        
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Categories</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="text-primary-dark_gray">
              <DropdownMenuItem onClick={() => handleCategorySelect("bags")}>
                Bags
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCategorySelect("shoes")}>
                Shoes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCategorySelect("jewelry")}>
                Jewelry
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCategorySelect("perfumes")}>
                Perfumes
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        
        <DropdownMenuItem onClick={() => setSelectedFilter("low-stock")}>
          Low Stock
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}