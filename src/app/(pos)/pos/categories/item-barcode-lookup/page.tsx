"use client"

import { fetchProductByBarcodeAction } from "@/actions/product.server"
import ProductCard2 from "@/components/dashboard/ProductCard2"
import SpinnerLoader from "@/components/loaders/SpinnerLoader"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { addScannedItem, removeBarCodeFromManualInput, setBarCodeFromManualInput } from "@/lib/redux/slices/posFlowSlice"
import clsx from "clsx"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function ItemBarCodeManualLookupPage() {

    const { barCodeFromManualInput, scannedItems } = useAppSelector(store => store.posFlow)
    const [item,setItem] = useState<null | ScannedProduct>(null)
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [selectedItem,setSelectedItem] = useState<Product | null>(null)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleFetchProductByBarcode = async () => {

        setIsLoading(true)
        setItem(null)
        const { product, errorMessage, status } = await fetchProductByBarcodeAction(barCodeFromManualInput!)

        if (product){
            setItem(product)
        } else if (errorMessage) {
            setItem(null)
            status !== 404 && toast.error(errorMessage)
        }

        setIsLoading(false)
    }

    const handleItemRemove = () => {
        // When a user manually inputs a barcode an item is found,
        // When the item found is removed, the barcode should be cleared and 
        // the user should return to the page showing scanned Items

        dispatch(removeBarCodeFromManualInput())
        router.push("/pos/categories")
    }

    useEffect(() => {
        const debounce = setTimeout(() => {
          if (barCodeFromManualInput?.trim() !== "" && (barCodeFromManualInput && barCodeFromManualInput?.trim().length > 4)) {
            handleFetchProductByBarcode()
          }
        }, 500)
      
        return () => clearTimeout(debounce)
    }, [barCodeFromManualInput])

    useEffect(() => {
        if(scannedItems.some(v => v.barcode === item?.barcode)){
            dispatch(removeBarCodeFromManualInput())
            router.push("/pos/categories")
        }
    },[scannedItems.length])
      

    if (isLoading){
        return (
            <div className="py-16">
                <SpinnerLoader />
            </div>
        )
    }

    return (
        <main>
            {
                item ?
                <section className="mt-14">
                    <div className="flex items-center gap-4">
                        <h2 className="font-semibold text-primary-deepBlack">Item Found</h2>
                        <hr className="flex-1 h-[1px] w-full bg-primary-base_color2/20" />
                    </div>
                    <div className="mt-5 grid grid-cols-1 md:grid-col-3 gap-4 xl:grid-cols-[repeat(auto-fill,minmax(184px,1fr))]">
                        <ProductCard2 
                            product={item} 
                            handleItemRemove={handleItemRemove} 
                            setIsSelected={setSelectedItem} 
                            isSelected={selectedItem?.barcode === item.barcode}
                        />
                    </div>

                    <Button
                        onClick={() => item && dispatch(addScannedItem(item))}
                        disabled={!selectedItem}
                        className={clsx(
                            "flex items-center gap-2 px-4 my-6 py-3 h-12 rounded-md font-medium transition-colors",
                            selectedItem
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        )}
                        >
                        Add Selected Item
                        <ArrowRight size={16} />
                    </Button>
                </section>
                :
                <div className="flex h-full justify-center items-center flex-col my-2">
                    <div className="bg-[url('/images/barcode-no-found-item.svg')] w-[25em] h-[25em] bg-contain bg-center bg-no-repeat"></div>
                    <p role="alert" className="text-primary-charcoal text-sm font-medium text-center">
                        Item not found! <br /> Check the Barcode Number and try again.
                    </p>
                </div>
            }
        </main>
    )
}