"use client"

import { usePathname } from 'next/navigation';

const useDashboardSegment = () => {
    const pathName = usePathname()
    
    const dashboardSegment = pathName
    .replace(/^\/admin\/?/, "")
    .split("/")[0]
    
    return dashboardSegment === "product-management" ? "Product Inventory Management" : dashboardSegment.split("-").join(" ")
}

export function AdminDashBoardHeaderSectionPageName() {
    
    return (
        <div className="relative basis-2/6 w-2/6">
            <h1 className='capitalize font-medium text-lg text-primary-dark_slate'>{useDashboardSegment().split("-").join(" ")}</h1>
        </div>
    )
}