"use client"

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { removeSearchValue, setSearchValue } from "@/lib/redux/slices/spaPosSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

function SpaPageHeaderSection() {

    const pathName = usePathname()
    const isServicePage = pathName.includes("services")
    const isProductPage = pathName.includes("products") 
    const isProductSearchPage = pathName.includes("item-barcode-lookup")
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { searchValue } = useAppSelector(store => store.spaPosFlow)

    const handleSearchChange = useCallback((value: string) => {
        dispatch(setSearchValue(value))
        
        if (pathName !== "/pos/spa-section/item-barcode-lookup") {
            setTimeout(() => {
                router.push("/pos/spa-section/item-barcode-lookup")
            }, 0)
        }
    }, [pathName, router, dispatch])

    const handleClearSearch = useCallback(() => {
        dispatch(removeSearchValue())
        setTimeout(() => {
            if (pathName !== "/pos/spa-section/products"){
                router.push("/pos/spa-section/products")
            }
        }, 0)
    }, [dispatch, router])

    return (
        !pathName.includes("summary") && !pathName.includes("services") &&
        <div className="flex gap-6 items-center mt-12">
            <h1 className="font-semibold capitalize whitespace-nowrap text-lg text-primary-deepBlack">{isServicePage ? "Select Spa Service" : isProductPage ? "Select Spa Product" : isProductSearchPage ? "Search Spa Product" : null}</h1>

            <div aria-hidden="true" className="flex gap-2 items-center">
                <span className={`${isServicePage ? "bg-primary-red" : "bg-primary-dark_gray/20"} rounded-3xl h-1 w-16`}></span>
                <span className={`${isProductPage || isProductSearchPage ? "bg-primary-red" : "bg-primary-dark_gray/20"} rounded-3xl h-1 w-16`}></span>
            </div>


            <div className="relative h-fit">
                <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 pointer-events-none">
                    <span>
                        <Icon icon="ic:sharp-search" width="24" height="24" />
                    </span>
                </span>
                <input
                    type="text"
                    value={searchValue || ""}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full cursor-pointer pl-2 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800/70 text-sm focus:border-none text-gray-700"
                    placeholder="Scan or Enter Barcode here"
                    aria-label="Scan input"
                />
                {searchValue && (
                    <button
                        onClick={handleClearSearch}
                        className="absolute inset-y-0 right-10 flex items-center text-gray-400 hover:text-gray-600"
                        aria-label="Clear input"
                    >
                        <Icon icon="ic:round-close" width="18" height="18" />
                    </button>
                )}
            </div>
        </div>
    )
}

export default SpaPageHeaderSection;