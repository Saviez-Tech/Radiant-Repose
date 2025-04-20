"use client"

import { useAppSelector } from "@/lib/redux/hooks";
import ProductCard from "./ProductCard";
import SpinnerLoader from "../loaders/SpinnerLoader";

export const productItems: Product[] = [
    {
      id: "1",
      name: "Louis Vuitton Bag",
      price: 16200,
      image: "/images/watch.png",
      quantity: 3,
      totalPrice: 48600,
      piecesLeft: 24
    },
    {
      id: "2",
      name: "Creed Aventus",
      price: 25000,
      image: "/images/watch.png",
      quantity: 2,
      totalPrice: 50000,
      piecesLeft: 15
    },
    {
      id: "3",
      name: "Diamond Rings",
      price: 450000,
      image: "/images/watch.png",
      quantity: 1,
      totalPrice: 450000,
      piecesLeft: 8
    },
    {
      id: "4",
      name: "Rolex Watch",
      price: 350000,
      image: "/images/watch.png",
      quantity: 1,
      totalPrice: 350000,
      piecesLeft: 5
    }
]

export default function ScannedItemsClientContainer({ items }: { items: Product[]}){

    const { products : productsFromBarCode, barCode, isLoading, error: productsFetchError } = useAppSelector(store => store.barCodeSearch)

    return (
        isLoading ?
        <div className="py-16">
            <SpinnerLoader />
        </div>
        :
        // Case 1: Barcode was entered and we have an error
        barCode && productsFetchError ? (
            <div className="flex h-full justify-center items-center flex-col my-2">
                <div className="bg-[url('/images/barcode-no-found-item.svg')] w-[25em] h-[25em] bg-contain bg-center bg-no-repeat"></div>
                <p role="alert" className="text-primary-charcoal text-sm font-medium text-center">
                    Item not found! <br /> Check the Barcode Number and try again.
                </p>
            </div>
        ) : 
        // Case 2: Barcode was entered and we have products
        barCode && productsFromBarCode ? (
            <div className="mt-5 grid grid-cols-1 md:grid-col-3 gap-4 xl:grid-cols-[repeat(auto-fill,minmax(184px,1fr))]">
                {productItems.map((v, i) => (
                    <ProductCard key={i} product={v} />
                ))}
            </div>
        ) : 
        // Case 3: No barcode but we have products
        !barCode && productItems.length ? (
            <div className="mt-5 grid grid-cols-1 md:grid-col-3 gap-4 xl:grid-cols-[repeat(auto-fill,minmax(184px,1fr))]">
                {productItems.map((v, i) => (
                    <ProductCard key={i} product={v} />
                ))}
            </div>
        ) : 
        // Case 4: Default - no barcode and no products
        (
            <div className="flex h-full justify-center items-center flex-col my-2">
                <div className="bg-[url('/images/no-scanned-item.svg')] w-[28em] h-[28em] bg-contain bg-center bg-no-repeat"></div>
                <p role="alert" className="text-primary-charcoal text-sm font-medium">
                    No items scanned yet. Scan an item to begin.
                </p>
            </div>
        )
    )
}