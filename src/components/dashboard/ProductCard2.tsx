import React, { Dispatch, SetStateAction } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { DollarSquare } from "../Svg";
import { dm_mono } from "@/fonts";

// This Is The Product Card Used For The Manual BarCode Lookup Page
export default function ProductCard2({ product, handleItemRemove, setIsSelected, isSelected }: { product: Product, handleItemRemove: () => void, isSelected: boolean, setIsSelected: Dispatch<SetStateAction<Product | null>> }) {

  return (
    <div  
      tabIndex={0}
      onClick={() => setIsSelected(prev => prev?.barCode === product.barCode ? null : product)}
      className={`${isSelected ? "ring-2 ring-red-500" : ""} relative cursor-pointer max-w-64 pb-2 bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 outline-none`}>
      <div className="relative">
        <Image
          src={product.image}
          width={300}
          height={300}
          alt={product.name}
          className="w-full h-40 object-cover"
        />
       
        <button onClick={handleItemRemove} className={`${isSelected ? "block" : "hidden"} absolute top-0 right-0 bg-primary-red rounded-lg p-1 text-primary-base_color1 hidden`}>
          <X size={16} />
        </button>
      </div>
     
      <div className="p-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold">{product.name}</h3>
          <div className="flex gap-1">
            <button className="bg-yellow-400 text-primary-base_color1 rounded-full font-semibold p-1 w-6 h-6 flex items-center justify-center">
              <span className="text-xs">+</span>
            </button>
            <button className="bg-red-500 rounded-full font-semibold p-1 w-6 h-6 flex items-center justify-center text-primary-base_color1">
              <span className="text-xs">-</span>
            </button>
          </div>
        </div>
       
        <div className="flex justify-between items-center my-2">
          <div className="flex items-center">
            <DollarSquare />
            <span className={`${dm_mono.className} text-primary-dark_gray text-xs font-light ml-1`}>₦{product.price.toLocaleString()}</span>
          </div>
          <span className="text-primary-dark_gray text-xs"><span className="font-medium">Quantity:</span> {product.quantity}</span>
        </div>
       
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-500">{product.piecesLeft} Pieces left</span>
          <span className={`${dm_mono.className} text-primary-dark_gray text-sm font-medium`}>₦{product.totalPrice.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}