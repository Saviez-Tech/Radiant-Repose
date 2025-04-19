import React from "react";
import { X, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { dm_mono } from "@/fonts";


const cartItems = [
    {
      id: 1,
      name: "Louis Vuitton HandBag",
      price: "₦16,200",
      total: "₦48,600",
      quantity: 3,
      image: "/images/rings.png"
    },
    {
      id: 2,
      name: "Creed Aventus",
      price: "₦16,200",
      total: "₦48,600",
      quantity: 2,
      image: "/images/rings.png"
    },
    {
      id: 3,
      name: "Diamond Rings",
      price: "₦16,200",
      total: "₦48,600",
      quantity: 1,
      image: "/images/rings.png"
    },
    {
      id: 4,
      name: "Vee's Heels",
      price: "₦16,200",
      total: "₦48,600",
      quantity: 1,
      image: "/images/rings.png"
    },
    {
      id: 5,
      name: "Richard Mille",
      price: "₦16,200",
      total: "₦48,600",
      quantity: 1,
      image: "/images/rings.png"
    },
    {
      id: 6,
      name: "Wedding Gown",
      price: "₦16,200",
      total: "₦48,600",
      quantity: 1,
      image: "/images/rings.png"
    }
]

const CartItem = ({ item }: { item: typeof cartItems[0]}) => {
  const { image, name, price, total, quantity } = item;
  
  return (
    <div className="flex items-center py-3 border-b border-gray-100 text-[#1F1F1F]">
      <div className="w-12 h-12 rounded-xl overflow-hidden mr-4">
        <Image src={image} alt={name} width={40} height={40} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-grow">
        <div className="flex justify-between">
          <h3 className="text-xs font-semibold">{name}</h3>
          <button className="text-red-500">
            <X size={16} />
          </button>
        </div>
        <p className={`${dm_mono.className} text-xs my-2`}>Price: {price}</p>
        <div className="flex justify-between items-center">
          <span className={`${dm_mono.className} text-xs font-medium`}>{total}</span>
          <div className="flex items-center gap-4">
            <button className="text-gray-500">
              <Minus size={13} />
            </button>
            <span className="text-xs">{quantity}</span>
            <button className="text-gray-500">
              <Plus size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}




export default function CartSection() {
  return (
    <div className="w-[270px] pt-6">
      <h2 className="text-sm font-medium text-[#111719] mb-4">Order #1234567890</h2>
      
      <div className="space-y-0">
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}