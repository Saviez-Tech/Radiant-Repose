import { DollarSquare } from "../Svg";
import { dm_mono } from "@/fonts";
import { Icon } from "@iconify/react/dist/iconify.js";
import BarcodeGenerator from "../custom-utils/BarCodeGenerator";
import { Skeleton } from "../ui/skeleton";
import { formatNaira } from "@/lib/helperFns/formatNumber";
import { useRouter } from "next/navigation";
import DestructiveActionPrompt from "@/components/modals/DestructiveActionPrompt";
import DestructiveActionPromptSuccess from "@/components/modals/DestructiveActionPromptSuccess";
import toast from "react-hot-toast";
import { revalidatePathHandler } from "@/actions/revalidatePathHandler";
import { deleteProductHandler } from "@/actions/product.server";
import Image from "next/image";
import { useState } from "react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setProductToEdit } from "@/lib/redux/slices/editProductSlice";


export default function ProductCard3({ product, onSearch, searchValue }: { product: Product, searchValue: string, onSearch: (value: string) => void; }) {

  const router = useRouter()

  const [processing,setProcessing] = useState(false)

  const dispatch = useAppDispatch()

  const [showSuccessModal,setShowSuccessModal] = useState(false)
  const [showConfirmModal,setShowConfirmModal] = useState<{ show: boolean, productID: string | null}>({
    show: false,
    productID: null
  })

  const onConfirmDeleteProduct = async() => {
    setProcessing(true)

    if (!showConfirmModal.productID) {
      setShowConfirmModal({ show: false, productID: null })
      return;
    }

    const { success, error } = await deleteProductHandler(showConfirmModal.productID)

    if (success){
      await revalidatePathHandler("/admin/product-management/luxury-collection")
      toast.success("Product Deleted Successfully")
      onSearch(searchValue)
    }

    if (error){
        toast.error(error)
    }
    setProcessing(false)
    setShowConfirmModal({ show: false, productID: null })
  }
  
  const onCancelAction = async () => {
    setShowConfirmModal({ show: false, productID: null })
  }

  return (
    <div  
      tabIndex={0}
      className="cursor-pointer relative w-full h-[320px] pb-2 bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 outline-none flex flex-col">
      <div className="relative h-40 flex-shrink-0">
        {
          product.image_url?.length ?
          <Image
            src={product.image_url}
            width={300}
            height={300}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          :
          <Skeleton className="w-full h-full" />
        }
      </div>
     
      <div className="p-2 flex flex-col flex-grow">
        <div className="flex gap-2 justify-between items-start">
          <div className="flex-grow overflow-hidden">
            <h3 className="text-xs md:text-sm font-semibold truncate">{product.name}</h3>
            <p className="text-primary-dark_gray/50 text-[9px] md:text-[11px] line-clamp-2 h-8">{product.description}</p>
          </div>
          <div className="flex gap-1 flex-shrink-0">
            <button aria-label="edit" onClick={(e) => {
              e.stopPropagation()
              dispatch(setProductToEdit(product))
              router.push(`/admin/product-management/edit-product/${product.id}`)
            }} className="bg-yellow-400 text-primary-base_color1 rounded-full font-semibold p-1 w-6 h-6 flex items-center justify-center">
                <Icon icon="iconamoon:edit-light" width="24" height="24" />
            </button>
            <button aria-label="delete" onClick={(e) => {
              e.stopPropagation()
             setShowConfirmModal({ show: true, productID: product.id })
            }} disabled={processing} className="bg-red-500 rounded-full font-semibold p-1 w-6 h-6 flex items-center justify-center text-primary-base_color1">
              <Icon icon="fluent:delete-24-regular" width="24" height="24" />
            </button>
          </div>
        </div>
       
        <div className="flex justify-between items-center mt-1 gap-2">
          <div className="flex items-center">
              <DollarSquare />
              <span className={`${dm_mono.className} text-primary-dark_gray text-[9px] md:text-xs font-light ml-1`}>{formatNaira(product.price,false,true)}</span>
          </div>
          <p className="text-primary-dark_gray text-right text-[11px] capitalize truncate"><span className="font-semibold">Category:</span> {product.category?.split("-").join(" ")}</p>
        </div>
       
        <div className="flex justify-between items-center overflow-hidden gap-2 pb-1 mt-auto">
          <span className="text-[9px] md:text-[10px] text-gray-500 bg-gray-100 p-1 rounded">{product.stock_quantity} Pieces left</span>
          <div className="max-w-full">
            <BarcodeGenerator barCode={product.barcode!} />
          </div>
        </div>
      </div>

      <DestructiveActionPrompt 
        description="Delete This Product"
        onCancel={onCancelAction}
        processing={processing}
        onConfirm={onConfirmDeleteProduct}
        open={showConfirmModal.show}
      />

      <DestructiveActionPromptSuccess onClose={() => setShowSuccessModal(false)} open={showSuccessModal}>
        <Image src="/icons/cancelled-transaction-success.svg" alt="success" width={110} height={110} />
        <div className="text-center">
            <p className="text-sm font-bold text-primary-midGray mt-2 mb-1">Product Deleted!</p>
            <span className="font-light text-xs text-[#424F4A]">This product have been deleted.</span>
        </div>
      </DestructiveActionPromptSuccess>
    </div>
  )
}