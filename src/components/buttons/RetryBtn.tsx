"use client"

import { revalidatePathHandler } from "@/actions/revalidatePathHandler";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RetryBtn(){

    const router = useRouter()

    const handleRetry = async() => {
        revalidatePathHandler('/pos/spa-section/services')
        router.refresh()
    }

    return (
        <button
            onClick={handleRetry}
            className="group relative max-w-[15em] w-full text-sm bg-gradient-to-r from-primary-darkRed to-red-500 hover:from-red-600 hover:to-red-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
        >
            <div className="flex items-center justify-center gap-3">
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                <span>Try Again</span>
            </div>
            
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"></div>
            
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-darkRed to-red-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
        </button>
    )
}