"use client"

import { useAppSelector } from "@/lib/redux/hooks";
import ProductCard from "./ProductCard";
import SpinnerLoader from "../loaders/SpinnerLoader";
import ClearTransactionBtn from "../buttons/ClearTransactionBtn";

export default function ScannedItemsClientContainer({ category }: { category: string }) {

    const { scannedItems, selectedItems, isLoading } = useAppSelector(store => store.posFlow)
    
    return (
        <section className="mt-14 pb-10">
            <div className="flex items-center gap-4">
                <h2 className="font-semibold text-primary-deepBlack">Scanned Items</h2>
                <hr className="flex-1 h-[1px] w-full bg-primary-base_color2/20" />
            </div>

            {
                isLoading ?
                <div className="py-16 flex justify-center items-center w-full">
                    <SpinnerLoader />
                </div>
                :
                scannedItems && scannedItems.length ? (
                    <>
                        <div className="mt-5 grid grid-cols-2 md:grid-col-3 gap-4 xl:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
                            {scannedItems.map((v, i) => (
                                <ProductCard isSelected={selectedItems.some(item => item.barcode === v.barcode)} key={i} product={v} />
                            ))}
                        </div>

                        <ClearTransactionBtn />
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