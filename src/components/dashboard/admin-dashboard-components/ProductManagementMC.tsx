"use client"

import { Pagination } from "./../Pagination";
import { useEffect, useMemo, useState } from "react";
import ProductCategoryFilter from "./ProductCategoryFilter";
import ProductCard3 from "../ProductCard3";
import AddNewProductBtn from "@/components/buttons/AddNewProductBtn";

export default function ProductManagementMC({ data }: { data: Product[] }) {

    const [selectedFilter, setSelectedFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(7)

    // Apply filter function
    const applyFilter = (products: Product[], filter: string) => {
        switch (filter) {
        case 'all':
            return products
        case 'luxury-collection':
            return products.filter(t => t.category === 'luxury-collection')
        case 'spa-section':
            return products.filter(t => t.category === 'spa-section')
        case 'pharmacy':
            return products.filter(t => t.category === 'pharmacy')
        default:
            return products;
        }
    }

    // Apply filter immediately using useMemo
    const filteredProducts = useMemo(() => {
        return applyFilter(data, selectedFilter)
    }, [data, selectedFilter])
    
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
    }, [selectedFilter])
    
    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }
    
    // Handle rows per page change
    const handleRowsPerPageChange = (rows: number) => {
        setRowsPerPage(rows)
        setCurrentPage(1)
    }

    return (
        <div className="w-full py-10">
           <div className="mb-16 flex justify-between items-center gap-4 flex-wrap">
                <ProductCategoryFilter
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                />
                <AddNewProductBtn />
           </div>
            
            <div className="mt-5 grid grid-cols-1 md:grid-col-3 gap-4 xl:grid-cols-[repeat(auto-fill,minmax(184px,1fr))]">
                {paginatedProductsData.map((v, i) => (
                    <ProductCard3 key={i} product={v} />
                ))}
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