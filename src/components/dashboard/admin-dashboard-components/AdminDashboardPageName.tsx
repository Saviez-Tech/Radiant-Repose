"use client"

import { usePathname } from 'next/navigation';

const useDashboardSegment = () => {
    const pathName = usePathname()
    
    const dashboardSegment = pathName
    .replace(/^\/admin\/?/, "")
    .split("/")[0]
    
    if (dashboardSegment === "product-management") return "Product Inventory Management";
    if (dashboardSegment === "preorders") return "Pre-Orders Management";
    return dashboardSegment.split("-").join(" ");
}

export function AdminDashBoardHeaderSectionPageName() {
    
    return (
        <div className="relative basis-2/6 w-2/6">
            <h1 className='capitalize font-medium text-lg text-primary-dark_slate'>{useDashboardSegment().split("-").join(" ")}</h1>
        </div>
    )
}