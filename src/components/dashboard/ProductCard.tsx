import { X } from "lucide-react";
import Image from "next/image";
import { DollarSquare } from "../Svg";
import { dm_mono } from "@/fonts";
import { useAppDispatch } from "@/lib/redux/hooks";
import { decrementItemQuantity, incrementItemQuantity, removeScannedItem, selectItem } from "@/lib/redux/slices/luxuryPosFlowSlice";
import { Skeleton } from "../ui/skeleton";
import { formatNaira } from "@/lib/helperFns/formatNumber";
import { decrementProductQuantity, incrementProductQuantity, removeScannedProduct } from "@/lib/redux/slices/spaPosSlice";

export default function ProductCard({ product, cardFor = "luxury" }: { product: ScannedProduct, cardFor?: "spa" | "luxury" }) {
  const dispatch = useAppDispatch();
  const isOutOfStock = !product.stock_quantity || product.stock_quantity <= 0;

  return (
    <div  
      tabIndex={isOutOfStock ? -1 : 0}
      className={`
        group hover:ring-2 hover:ring-red-500 focus:ring-2 focus:ring-red-500
        ${isOutOfStock ? "opacity-60 grayscale" : "cursor-pointer"} 
        relative max-w-64 pb-2 bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 outline-none
      `}
    >
      <div className="relative">
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
       
        {!isOutOfStock && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              dispatch(cardFor === "luxury" ? removeScannedItem(product.barcode) : removeScannedProduct(product.barcode))
            }} 
            className="opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 absolute top-1 right-1 bg-primary-red hover:bg-red-600 rounded-lg p-1 text-primary-base_color1 shadow-md"
          >
            <X size={16} />
          </button>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-red-500 text-white px-3 py-1 rounded-md font-medium transform rotate-45 text-sm">
              Out of Stock
            </div>
          </div>
        )}
      </div>
     
      <div className="p-2">
        <div className="flex justify-between items-center">
          <div className="flex-grow overflow-hidden">
            <h3 className="text-xs md:text-sm font-semibold truncate">{product.name}</h3>
            <p className="text-primary-dark_gray/50 text-[9px] md:text-[11px] line-clamp-2 h-8">{product.description}</p>
          </div>
          {!isOutOfStock && (
            <div className="flex gap-1">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(cardFor === "luxury" ? incrementItemQuantity(product.barcode) : incrementProductQuantity(product.barcode))
                }} 
                className="bg-yellow-400 text-primary-base_color1 rounded-full font-semibold p-1 w-6 h-6 flex items-center justify-center"
              >
                <span className="text-xs">+</span>
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(cardFor === "luxury" ? decrementItemQuantity(product.barcode) : decrementProductQuantity(product.barcode))
                }} 
                className="bg-red-500 rounded-full font-semibold p-1 w-6 h-6 flex items-center justify-center text-primary-base_color1"
              >
                <span className="text-xs">-</span>
              </button>
            </div>
          )}
        </div>
       
        <div className="flex justify-between items-center my-2">
          <div className="flex items-center">
            <DollarSquare />
            <span className={`${dm_mono.className} text-primary-dark_gray text-xs font-light ml-1`}>{formatNaira(product.price,false,true)}</span>
          </div>
          <span className="text-primary-dark_gray text-xs"><span className="font-medium">Quantity:</span> {product.quantity}</span>
        </div>
       
        <div className="flex justify-between items-center mt-1">
          <span className={`text-xs bg-gray-100 p-1 rounded ${isOutOfStock ? "text-red-500 font-medium" : "text-gray-500"}`}>
            {isOutOfStock ? "Out of stock" : `${product.stock_quantity} Pieces left`}
          </span>
          <span className={`${dm_mono.className} text-primary-dark_gray text-sm font-medium`}>₦{Number(product.price) * product.quantity}</span>
        </div>
      </div>
    </div>
  )
}