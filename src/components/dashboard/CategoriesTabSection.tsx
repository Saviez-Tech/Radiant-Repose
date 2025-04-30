"use client"

import { usePathname, useRouter } from "next/navigation"
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { removeBarCodeFromManualInput, setBarCodeFromManualInput } from "@/lib/redux/slices/posFlowSlice";
import { tabButtonData } from "@/components-data/tabButtonData";
import { setActiveTab } from "@/lib/redux/slices/categoryTabSlice";


    

export default function CategoriesTabSection() {

    const pathName = usePathname()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { barCodeFromManualInput } = useAppSelector(store => store.posFlow)
    const { activeTab } = useAppSelector(store => store.categoryTab)

    return (
       <div className="flex gap-5 mt-4">
            <div
                className="flex flex-wrap gap-3"
                >
                {tabButtonData.map((link) => {
                    const segment = link.href.split("/").filter(Boolean).pop()
                    return <button
                        key={link.href}
                        aria-selected={activeTab === segment}
                        className={`p-4 flex min-w-24 w-fit drop-shadow-sm justify-center items-center text-sm gap-2 font-medium rounded-[2.4rem] whitespace-nowrap ${
                            activeTab === segment
                            ? "bg-primary-darkRed text-primary-base_color1"
                            : "bg-primary-dark_gray/10 text-primary-base_color1 text-primary-dark_gray/60 border border-gray-200"
                        } focus:outline-none focus:ring-2 focus:ring-red-400 px-3`}
                        onClick={() => segment && dispatch(setActiveTab(segment))}
                    >
                    {link.linkText}
                    </button>
                })}
            </div>

            <div className="relative h-fit">
                <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 pointer-events-none">
                    <span>
                        <Icon icon="ic:sharp-search" width="24" height="24" />
                    </span>
                </span>
                <input
                    type="text"
                    value={barCodeFromManualInput || ""}
                    onChange={(e) => {
                        if (pathName !== "/pos/categories/item-barcode-lookup") {
                            router.push("/pos/categories/item-barcode-lookup")
                        }
                        dispatch(setBarCodeFromManualInput(e.target.value))
                    }}
                    className="w-full cursor-pointer pl-2 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800/70 text-sm focus:border-none text-gray-700"
                    placeholder="Scan or Enter Barcode here"
                    aria-label="Scan input"
                />
                {barCodeFromManualInput && (
                    <button
                        onClick={() => {
                            dispatch(removeBarCodeFromManualInput())
                            router.back()
                        }}
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