"use client"
import { Pagination } from "./../Pagination";
import { useEffect, useMemo, useState } from "react";
import ProductCategoryFilter from "./ProductCategoryFilter";
import ProductCard3 from "../ProductCard3";
import AddNewProductBtn from "@/components/buttons/AddNewProductBtn";
import { ProductType } from "@/enums";



export default function ProductManagementMC({ data, section }: { data: Product[], section: string }) {
    const [selectedFilter, setSelectedFilter] = useState('all')
    const [selectedProductType, setSelectedProductType] = useState<ProductType | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(7)

    
    // First filter by section from props (If There's no API query to fetch based on category)
    const categoryFilteredProducts = useMemo(() => {
        if (section) {
            return data;
        }
        return data.filter(product => product.category === section)
    }, [data, section])
    
    // Then apply additional filters based on selectedFilter and selectedProductType
    const filteredProducts = useMemo(() => {
        // Start with products already filtered by category
        const products = categoryFilteredProducts;
        
        switch (selectedFilter) {
            case 'all':
                return products;
            case 'low-stock':
                return products.filter(product => product.stock_quantity < 10)
            case 'product-types':
                if (selectedProductType) {
                    return products.filter(product => product.category?.toLocaleLowerCase() === selectedProductType.toLocaleLowerCase())
                }
                return products;
            default:
                return products;
        }
    }, [categoryFilteredProducts, selectedFilter, selectedProductType])
   
    // Calculate pagination
    const paginatedProductsData = useMemo(() => {
        return filteredProducts.slice(
            (currentPage - 1) * rowsPerPage,
            currentPage * rowsPerPage
        )
    }, [filteredProducts, currentPage, rowsPerPage])
    
    // Reset pagination when filter changes
    useEffect(() => {
        setCurrentPage(1)
    }, [selectedFilter, selectedProductType, section])
   
    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }
   
    // Handle rows per page change
    const handleRowsPerPageChange = (rows: number) => {
        setRowsPerPage(rows)
        setCurrentPage(1)
    }


    if (!data.length){
        return (
            <div className="h-screen flex gap-10 flex-col justify-center items-center text-center py-8 text-gray-500">
                <AddNewProductBtn />
                <span>No products in this section</span>
            </div>
        )
    }
    
    return (
        <div className="w-full py-10">
           <div className="mb-16 flex justify-between items-center gap-4 flex-wrap">
                <ProductCategoryFilter
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                    setSelectedProductType={setSelectedProductType}
                    selectedProductType={selectedProductType}
                />
                <AddNewProductBtn />
           </div>
           
            <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-4 xl:grid-cols-[repeat(auto-fill,minmax(184px,1fr))]">
                {paginatedProductsData.length > 0 ? (
                    paginatedProductsData.map((product, index) => (
                        <ProductCard3 key={product.id || index} product={product} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-8 text-gray-500">
                        No products match the selected filters
                    </div>
                )}
            </div>
           
            <Pagination
                totalItems={filteredProducts.length}
                currentPage={currentPage}
                rowsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
        </div>
    )
}