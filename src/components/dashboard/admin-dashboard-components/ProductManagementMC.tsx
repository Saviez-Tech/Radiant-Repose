"use client"
import { Pagination } from "./../Pagination";
import { useEffect, useMemo, useState } from "react";
import ProductCategoryFilter from "./ProductCategoryFilter";
import ProductCard3 from "../ProductCard3";
import AddNewProductBtn from "@/components/buttons/AddNewProductBtn";
import { ProductType } from "@/enums";
import AdminProductManagementMCSearch from "./AdminProductManagementMCSearch";
import { fetchProductAction } from "@/actions/product.server";
import SpinnerLoader from "@/components/loaders/SpinnerLoader";
import toast from "react-hot-toast";


export default function ProductManagementMC({ data, section }: { data: Product[], section: string }) {
    const [selectedFilter, setSelectedFilter] = useState('all')
    const [selectedProductType, setSelectedProductType] = useState<ProductType | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(7)
    const [searchValue, setSearchValue] = useState("")
    const [searchedProducts, setSearchedProducts] = useState<Product[] | null>(null)
    const [isSearching, setIsSearching] = useState(false)
    
    const categoryFilteredProducts = useMemo(() => {
        if (section) {
            return data;
        }
        return data.filter(product => product.category === section)
    }, [data, section])
    
    const handleSearch = async (value: string) => {
        // Update search value first
        setSearchValue(value)
        
        // Clear search results if search is empty
        if (!value.trim()) {
            setSearchedProducts(null)
            return;
        }
        
        // Show loading indicator
        setIsSearching(true)
        
        try {
            // Search with the current value
            const { errorMessage, products } = await fetchProductAction(value)
            
            // Update state based on current search value
            if (products && products.length > 0) {
                setSearchedProducts(products)
            } else {
                setSearchedProducts([])
            }
            
            if (errorMessage) {
                setSearchedProducts([])
            }
        } catch (error) {
            toast.error("Search error:" + error)
            setSearchedProducts([])
        } finally {
            // Always hide the loading indicator
            setIsSearching(false)
        }
    }


    // Determine which products to display based on search state
    const productsToFilter = useMemo(() => {
        if (searchValue && searchedProducts !== null) {
            return searchedProducts;
        }
        return categoryFilteredProducts;
    }, [searchValue, searchedProducts, categoryFilteredProducts])
    
    // Then apply additional filters based on selectedFilter and selectedProductType
    // Only if we're not showing search results
    const filteredProducts = useMemo(() => {
        // If we have search results or error, don't apply additional filters
        if (searchValue && searchedProducts !== null) {
            return searchedProducts;
        }
        
        // Start with products already filtered by category
        const products = productsToFilter;
        
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
    }, [productsToFilter, selectedFilter, selectedProductType, searchValue, searchedProducts])
   
    // Calculate pagination
    const paginatedProductsData = useMemo(() => {
        return filteredProducts.slice(
            (currentPage - 1) * rowsPerPage,
            currentPage * rowsPerPage
        )
    }, [filteredProducts, currentPage, rowsPerPage])
    
    // Reset pagination when filter changes or search changes
    useEffect(() => {
        setCurrentPage(1)
    }, [selectedFilter, selectedProductType, section, searchValue])
   
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
            {/* Search Input Section */}
            <div className="mb-6">
                <AdminProductManagementMCSearch 
                    onSearch={handleSearch}
                    placeholder="Search for products by name, category, SKU..."
                    debounceTime={500}
                    className="shadow-sm"
                />
            </div>
            
            {/* Filter and Add Product Section */}
            <div className={`mb-16 flex ${!searchValue && !isSearching ? "justify-between" : "justify-end"} items-center gap-4 flex-wrap`}>
                {!searchValue && !isSearching && (
                    <ProductCategoryFilter
                        selectedFilter={selectedFilter}
                        setSelectedFilter={setSelectedFilter}
                        setSelectedProductType={setSelectedProductType}
                        selectedProductType={selectedProductType}
                    />
                )}
                <AddNewProductBtn />
            </div>
           
            {/* Search Status Indicator */}
            {isSearching && (
                <div className="py-16">
                    <SpinnerLoader />
                </div>
            )}
           
            {/* Products Grid */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
                {!isSearching && paginatedProductsData.length > 0 ? (
                    paginatedProductsData.map((product, index) => (
                        <ProductCard3 key={product.id || index} product={product} searchValue={searchValue} onSearch={handleSearch} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-8 text-gray-500">
                        {searchValue ? "No products match your search" : "No products match the selected filters"}
                    </div>
                )}
            </div>
           
            {/* Pagination */}
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