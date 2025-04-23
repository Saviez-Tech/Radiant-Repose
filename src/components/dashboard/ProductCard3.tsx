import Image from "next/image";
import { DollarSquare } from "../Svg";
import { dm_mono } from "@/fonts";
import { Icon } from "@iconify/react/dist/iconify.js";
import BarcodeGenerator from "../custom-utils/BarCodeGenerator";

export default function ProductCard3({ product }: { product: Product }) {
  return (
    <div  
      tabIndex={0}
      className="cursor-pointer relative w-full h-[320px] pb-2 bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 outline-none flex flex-col">
      <div className="relative h-40 flex-shrink-0">
        <Image
          src={product.image}
          width={300}
          height={300}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
     
      <div className="p-2 flex flex-col flex-grow">
        <div className="flex gap-2 justify-between items-start">
          <div className="flex-grow overflow-hidden">
            <h3 className="text-sm font-semibold truncate">{product.name}</h3>
            <p className="text-primary-dark_gray/50 text-[11px] line-clamp-2 h-8">{product.desc}</p>
          </div>
          <div className="flex gap-1 flex-shrink-0">
            <button aria-label="edit" onClick={(e) => {
              e.stopPropagation()
             
            }} className="bg-yellow-400 text-primary-base_color1 rounded-full font-semibold p-1 w-6 h-6 flex items-center justify-center">
                <Icon icon="iconamoon:edit-light" width="24" height="24" />
            </button>
            <button aria-label="delete" onClick={(e) => {
              e.stopPropagation()
             
            }} className="bg-red-500 rounded-full font-semibold p-1 w-6 h-6 flex items-center justify-center text-primary-base_color1">
              <Icon icon="fluent:delete-24-regular" width="24" height="24" />
            </button>
          </div>
        </div>
       
        <div className="flex justify-between items-center mt-1 gap-2">
            <div className="flex items-center">
                <DollarSquare />
                <span className={`${dm_mono.className} text-primary-dark_gray text-xs font-light ml-1`}>₦{product.price.toLocaleString()}</span>
            </div>
            <p className="text-primary-dark_gray text-right text-[11px] capitalize truncate"><span className="font-semibold">Category:</span> {product.category.split("-").join(" ")}</p>
        </div>
       
        <div className="flex justify-between items-center gap-2 mt-auto">
            <span className="text-xs text-gray-500 bg-gray-100 p-1 rounded">{product.piecesLeft} Pieces left</span>
            <BarcodeGenerator barCode={product.barCode} />
        </div>
      </div>
    </div>
  )
}