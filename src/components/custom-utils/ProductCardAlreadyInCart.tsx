import Image from "next/image";
import { DollarSquare } from "../Svg";
import { dm_mono } from "@/fonts";
import { Skeleton } from "../ui/skeleton";
import { formatNaira } from "@/lib/helperFns/formatNumber";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useCart } from "@/hooks/useCart";

export default function ProductCardAlreadyInCart({ product }: { product: Product }) {

  const isOutOfStock = !product.stock_quantity || product.stock_quantity <= 0;
    const { incrementItem, decrementItem} = useCart();

      const increment = () => incrementItem(product.id);
  const decrement = () => decrementItem(product.id);


  return (
    <div  
      className={`
        ${isOutOfStock ? "opacity-60 grayscale" : "cursor-pointer"} 
        relative max-w-64 pb-2 bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 outline-none
      `}
    >
      <div className="relative">
        <div className="relative h-40 flex-shrink-0">
          <p className="absolute bottom-4 opacity-90 left-1 z-10 rounded-3xl flex items-center gap-1 p-2 bg-primary-base_color1 text-[10px] md:text-xs font-medium text-brand-primary-light_black">
            <strong>4.5</strong>
            <span className="flex items-center">
              <Icon icon="material-symbols-light:star-rounded" width="11" height="11" className="-translate-y-[1px] text-primary-yellow" />
              <span className="text-[9px] md:text-[10px] text-primary-dark_ash_slate">(25+)</span>
            </span>
          </p>
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
                onClick={increment}
                className="bg-yellow-400 text-primary-base_color1 rounded-full font-semibold p-1 w-6 h-6 flex items-center justify-center"
              >
                <span className="text-xs">+</span>
              </button>
              <button 
                onClick={decrement}
                className="bg-red-500 rounded-full font-semibold p-1 w-6 h-6 flex items-center justify-center text-primary-base_color1"
              >
                <span className="text-xs">-</span>
              </button>
            </div>
          )}
        </div>
       
        <div className="flex justify-between gap-1 flex-wrap items-center my-2">
          <div className="flex items-center">
            <DollarSquare />
            <span className={`${dm_mono.className} text-primary-dark_gray text-xs font-light ml-1`}>{formatNaira(product.price,false,true)}</span>
          </div>
          <span className="text-primary-dark_gray text-[10px] md:text-xs"><span className="font-medium">Quantity:</span> 2</span>
        </div>
       
        <div className="flex justify-between items-center gap-2 mt-1">
          <span className={`text-[9px] md:text-xs bg-gray-100 p-1 rounded ${isOutOfStock ? "text-red-500 font-medium" : "text-gray-500"}`}>
            {isOutOfStock ? "Out of stock" : `${product.stock_quantity} Pieces left`}
          </span>
          <span className={`${dm_mono.className} text-primary-dark_gray text-xs font-medium`}>₦{Number(product.price) * 2}</span>
        </div>
      </div>
    </div>
  )
}