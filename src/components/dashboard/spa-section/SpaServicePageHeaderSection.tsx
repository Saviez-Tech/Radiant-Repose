"use client"

import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname } from "next/navigation";

function SpaServicePageHeaderSection({ searchValue, handleSearchChange, handleClearSearch }: { searchValue: string | null, handleSearchChange: (value: string) => void, handleClearSearch: () => void }) {

    const pathName = usePathname()
    const isServicePage = pathName.includes("services")
    const isProductPage = pathName.includes("products") 
    const isProductSearchPage = pathName.includes("item-barcode-lookup")

    return (
        <div className="flex gap-6 items-center">
            <h1 className="font-semibold capitalize whitespace-nowrap text-lg text-primary-deepBlack">Select Spa Service</h1>

            <div aria-hidden="true" className="flex gap-2 items-center">
                <span className={`${isServicePage ? "bg-primary-red" : "bg-primary-dark_gray/20"} rounded-3xl h-1 w-16`}></span>
                <span className={`${isProductPage || isProductSearchPage ? "bg-primary-red" : "bg-primary-dark_gray/20"} rounded-3xl h-1 w-16`}></span>
            </div>

            <div>
                <span className="text-emerald-800 text-xs font-medium">Look-up Service Booking Code</span>
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
                        placeholder="Enter Unique Reference Code"
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
        </div>
    )
}

export default SpaServicePageHeaderSection;