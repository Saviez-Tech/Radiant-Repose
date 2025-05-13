"use client";

// import { fetchProductAction } from "@/actions/product.server";
import ProductCard from "@/components/custom-utils/ProductCard";
import { Pagination } from "@/components/dashboard/Pagination";
import { useEffect, useMemo, useState } from "react";
// import toast from "react-hot-toast";
import ServiceHeader from "./ServiceHeader";

export default function Products({ products: data }: { products: Product[] }) {
  const [selectedFilter] = useState("all");
  const [selectedProductType] =
    useState<ProductType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [searchValue] = useState("");
  const [searchedProducts] = useState<Product[] | null>(
    null
  );
  // const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState<undefined | number>(undefined);

  const categoryFilteredProducts = useMemo(() => {
    if (!activeTab) {
      return data;
    }
    return data.filter((product) => product.category === activeTab);
  }, [data, activeTab])

  // const handleSearch = async (value: string) => {
  //   // Update search value first
  //   setSearchValue(value);

  //   // Clear search results if search is empty
  //   if (!value.trim()) {
  //     setSearchedProducts(null);
  //     return;
  //   }

  //   // Show loading indicator
  //   setIsSearching(true);

  //   try {
  //     // Search with the current value
  //     const { errorMessage, products } = await fetchProductAction(value);

  //     // Update state based on current search value
  //     if (products && products.length > 0) {
  //       setSearchedProducts(products);
  //     } else {
  //       setSearchedProducts([]);
  //     }

  //     if (errorMessage) {
  //       setSearchedProducts([]);
  //     }
  //   } catch (error) {
  //     toast.error("Search error:" + error);
  //     setSearchedProducts([]);
  //   } finally {
  //     // Always hide the loading indicator
  //     setIsSearching(false);
  //   }
  // };

  // Determine which products to display based on search state
  const productsToFilter = useMemo(() => {
    if (searchValue && searchedProducts !== null) {
      return searchedProducts;
    }
    return categoryFilteredProducts;
  }, [searchValue, searchedProducts, categoryFilteredProducts]);

  // Then apply additional filters based on selectedFilter and selectedProductType
  // Only if we're not showing search results
  const filteredProducts = useMemo(() => {
    // If we have search results or error, don't apply additional filters
    if (searchValue && searchedProducts !== null) {
      return searchedProducts;
    }

    // Start with products already filtered by category
    const products = productsToFilter.filter((product) => {
      if (priceFrom && product.price < priceFrom) {
        return false;
      }
      if (priceTo && product.price > priceTo) {
        return false;
      }
      return true;
    });

    switch (selectedFilter) {
      case "all":
        return products;
      case "low-stock":
        return products.filter((product) => product.stock_quantity < 10);
      case "product-types":
        if (selectedProductType) {
          return products.filter(
            (product) =>
              product.category?.toLocaleLowerCase() ===
              selectedProductType.toLocaleLowerCase()
          );
        }
        return products;
      default:
        return products;
    }
  }, [
    productsToFilter,
    selectedFilter,
    selectedProductType,
    searchValue,
    searchedProducts,
    priceFrom,
    priceTo,
  ]);

  // Calculate pagination
  const paginatedProductsData = useMemo(() => {
    return filteredProducts.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
  }, [filteredProducts, currentPage, rowsPerPage]);

  // Reset pagination when filter changes or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter, selectedProductType, activeTab, searchValue]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col">
      <ServiceHeader from={priceFrom} to={priceTo} setFrom={setPriceFrom} setTo={setPriceTo} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 grid-cols-2  gap-4 py-10">
        {paginatedProductsData.map((product, index) => (
          <ProductCard key={index} {...product} />
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
  );
}
