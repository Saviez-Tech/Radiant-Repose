"use client"

import { useEffect, useState } from "react";
import ProductSkeleton from "./ProductSkeleton";

export default function ProductListSkeleton() {
    const [itemCount, setItemCount] = useState(12)

    useEffect(() => {
        const calculateItemCount = () => {
            const viewportWidth = window.innerWidth;
            
            let count = 12;
            
            if (viewportWidth >= 1280) { // xl breakpoint
                count = Math.ceil((viewportWidth - 64) / 200) * 2;
            } else if (viewportWidth >= 768) { // md breakpoint
                count = 15;
            }
            
            // Set a minimum and maximum
            count = Math.max(12, Math.min(count, 24))
            
            setItemCount(count)
        }

        // Calculate on mount
        calculateItemCount()
        
        window.addEventListener("resize", calculateItemCount)
        
        return () => window.removeEventListener("resize", calculateItemCount)
    }, [])

    return (
        <div className="py-4 mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4 md:grid-cols-[repeat(auto-fill,minmax(184px,1fr))]">
            {Array.from({ length: itemCount }).map((_, i) => (
                <ProductSkeleton key={i} />
            ))}
        </div>
    )
}