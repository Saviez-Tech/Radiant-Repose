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
      <div className="w-14 h-14 rounded-xl overflow-hidden mr-4">
        <Image src={image} alt={name} width={40} height={40} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-grow">
        <div className="flex justify-between">
          <h3 className="text-xs font-semibold truncate">{name}</h3>
          <button className="text-red-500">
            <X size={16} />
          </button>
        </div>
        <p className={`${dm_mono.className} text-xs my-1`}>Price: {price}</p>
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

      <div className="">
        <div className={`${dm_mono.className} mb-6 mt-16 text-[#1F1F1F] text-xs`}>
          <div className="flex justify-between py-2">
            <span className="">Subtotal</span>
            <span className="">₦316,200</span>
          </div>
          
          <div className="flex justify-between py-2">
            <span className="">Discount</span>
            <span className=""></span>
          </div>
          
          <div className="flex justify-between py-2">
            <span className="">Amount Paid</span>
            <span className=""></span>
          </div>
          
          <div className="flex justify-between py-2">
            <span className="">Balance</span>
            <span className="">₦300</span>
          </div>
          
          <div className="border-t-2 border-dotted border-gray-500 my-2"></div>
          
          <div className="flex justify-between py-2">
            <span className="font-medium text-base">Total</span>
            <span className="font-medium text-base">₦316,000</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 pb-4">
          <button 
            className="bg-red-600 text-primary-base_color1 text-sm h-10 font-medium rounded-md py-2 px-6 flex-1 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all duration-200"
          >
            Cancel Transaction
          </button>
          
          <button 
            className="bg-green-500 text-primary-base_color1 text-sm h-10 font-medium rounded-md py-2 px-6 flex-1 hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-200"
          >
            Save & Print Transaction
          </button>
        </div>
      </div>
    </div>
  )
}