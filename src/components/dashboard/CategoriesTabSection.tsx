"use client"

import { usePathname, useRouter } from "next/navigation"
import { Icon } from "@iconify/react/dist/iconify.js";



const buttonsData = [
    { href: "/dashboard/categories/luxury-collection", linkText: "Luxury Collection" },
    { href: "/dashboard/categories/spa-section", linkText: "Spa Section" },
    { href: "/dashboard/categories/pharmacy", linkText: "Pharmacy" }
]    

export default function CategoriesTabSection() {

    const pathName = usePathname()
    const router = useRouter()

    return (
       <div className="flex items-center gap-5 mt-4">
            <div
                className="flex flex-wrap gap-3"
                >
                {buttonsData.map((link) => (
                    <button
                        key={link.href}
                        aria-selected={pathName.startsWith(link.href)}
                        className={`p-4 flex min-w-24 w-fit drop-shadow-sm justify-center items-center text-sm gap-2 font-medium rounded-[2.4rem] whitespace-nowrap ${
                            pathName.startsWith(link.href)
                            ? "bg-primary-darkRed text-primary-base_color1"
                            : "bg-primary-dark_gray/10 text-primary-base_color1 text-primary-dark_gray/60 border border-gray-200"
                        } focus:outline-none focus:ring-2 focus:ring-red-400 px-3`}
                        onClick={() => router.push(link.href)}
                    >
                    {link.linkText}
                    </button>
                ))}
            </div>

            <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
                <span>
                    <Icon icon="ic:sharp-search" width="24" height="24" />
                </span>
                </span>
                <input
                    type="text"
                    value=""
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-800/60 focus:border-none text-gray-700"
                    placeholder="Scan or Enter Barcode here"
                    aria-label="sScan input"
                />
            </div>
       </div>
    )
}