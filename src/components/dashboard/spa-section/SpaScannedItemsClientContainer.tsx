"use client"

import { useAppSelector } from "@/lib/redux/hooks";
import ProductCard from "../ProductCard";
import SpinnerLoader from "../../loaders/SpinnerLoader";

export default function SpaScannedItemsClientContainer() {

    const { scannedProducts, isLoading } = useAppSelector(store => store.spaPosFlow)

    return (
        <section className="mt-14">
            {
                isLoading ?
                <div className="py-16 flex justify-center items-center w-full">
                    <SpinnerLoader />
                </div>
                :
                scannedProducts && scannedProducts.length ? (
                    <>
                        <div className="mt-5 grid grid-cols-2 md:grid-col-3 gap-4 xl:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
                            {scannedProducts.map((v, i) => (
                                <ProductCard key={i} product={v} cardFor="spa" />
                            ))}
                        </div>
                    </>
                ) : 
                (
                    <div className="flex h-full justify-center items-center flex-col my-2">
                        <div className="bg-[url('/images/no-scanned-item.svg')] w-[25em] h-[25em] bg-contain bg-center bg-no-repeat"></div>
                        <p role="alert" className="text-primary-charcoal text-sm font-medium">
                            No items scanned yet. Scan an item to begin.
                        </p>
                    </div>
                )
            }
        </section>
    )
}