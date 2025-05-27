"use client"

import SpaOrderSummary from "@/components/dashboard/spa-section/SpaOrderSummary";
import { useAppSelector } from "@/lib/redux/hooks";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Page(){

    const { addedServices, scannedProducts } = useAppSelector(store => store.spaPosFlow)
    const router = useRouter()


    useEffect(() => {
        if (!addedServices?.length && !scannedProducts?.length) {
            router.push("/pos/spa-section/services")
        }
    },[addedServices.length, scannedProducts.length])

    return (
        <main className="py-12">
            <div className="flex items-center gap-4">
                <h2 className="font-semibold text-lg text-primary-deepBlack">Order Summary</h2>
                <hr className="flex-1 h-[1px] w-full bg-primary-base_color2/20" />

                <button onClick={() => router.back()} className="text-sm flex items-center gap-1 text-primary-red font-semibold">
                    <Icon icon="ic:round-arrow-left" width="24" height="24" />
                    <span>Go back to Shopping</span>
                </button>
            </div>

            <SpaOrderSummary />
        </main>
    )
}