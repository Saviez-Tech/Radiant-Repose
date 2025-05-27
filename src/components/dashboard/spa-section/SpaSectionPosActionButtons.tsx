"use client"

import { useAppSelector } from "@/lib/redux/hooks";
import { usePathname, useRouter } from "next/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function SpaSectionPosActionButtons() {

    const pathName = usePathname()
    const router = useRouter()
    const { addedServices, scannedProducts } = useAppSelector(store => store.spaPosFlow)

    return (
        <div className="mt-12">
            {
                pathName.includes("services") ?
                <button onClick={() => router.push("/pos/spa-section/products")} className="bg-primary-red  text-xs hover:bg-red-600
                    active:scale-95 text-white font-medium px-6 py-3 rounded-3xl inline-flex items-center gap-2
                    transition-all duration-300 shadow-md hover:shadow-lg">
                    <span className="text-xs">Next</span>
                    <FaArrowRight className="text-xs size-3" />
                </button>
                :
                pathName.includes("products") ?
                <div className="space-x-4">
                    <button onClick={() => router.back()} className="border bg-primary-base_color1 border-primary-red  text-sm hover:bg-red-100
                        active:scale-95 text-primary-base_color2 font-medium px-6 py-3 rounded-3xl inline-flex items-center gap-2
                        transition-all duration-300 shadow-md hover:shadow-lg">
                        <FaArrowLeft className="text-xs size-3" />
                        <span className="text-xs">Prev</span>
                    </button>
                    <button 
                        disabled={!addedServices.length && !scannedProducts.length} 
                        onClick={() => router.push("/pos/spa-section/summary")} 
                        className="bg-primary-red text-sm hover:bg-red-600 active:scale-95 text-white font-medium px-6 py-3 rounded-3xl 
                                disabled:bg-primary-dark_gray/10 disabled:text-primary-dark_gray/50 disabled:cursor-not-allowed
                                disabled:active:scale-100 disabled:shadow-none inline-flex items-center gap-2
                                transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        <span className="text-xs">Proceed</span>
                        <FaArrowRight className="text-xs size-3" />
                    </button>
                </div>
                :
                pathName.includes("item-barcode-lookup") ?
                <button onClick={() => router.back()} className="border bg-primary-base_color1 border-primary-red  text-xs hover:bg-red-100
                    active:scale-95 text-primary-base_color2 font-medium px-6 py-3 rounded-3xl inline-flex items-center gap-2
                    transition-all duration-300 shadow-md hover:shadow-lg">
                    <FaArrowLeft className="text-xs size-3" />
                    <span className="text-xs">Back</span>
                </button>
                :
                null
            }
        </div>
    )
}

export default SpaSectionPosActionButtons;