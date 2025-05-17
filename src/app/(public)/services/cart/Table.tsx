"use client";

import { useCart } from "@/hooks/useCart";
import TableRow from "./TableRow";
import OrderSummary from "./OrderSummary";

export default function Table({ products: data }: { products: Product[] }) {
  const { cartItems, totalPrice, items } = useCart(data);

  // Add loading state if cartItems isn't ready
  if (!cartItems) return <div>Loading cart...</div>;

  return (
    <div className=" bg-white rounded-xl overflow-hidden">
      <div className="w-full">
        <div className="border-b border-gray-200 bg-[#F8F8F8]">
          <div className="flex">
            <div className="text-left p-4 text-[13px] flex-1 font-semibold text-gray-600">
              Item/Product Name
            </div>
            <div className="text-left p-4 text-[13px] max-md:w-[30%] w-[15%] font-semibold text-gray-600">
              Quantity
            </div>
            <div className="max-md:hidden p-4 text-[13px] w-[15%] font-semibold text-gray-600">
              Unit Price
            </div>
            <div className="max-md:hidden p-4 text-[13px] w-[15%] font-semibold text-gray-600">
              Total
            </div>
            <div className="max-md:hidden p-4 text-[13px] w-[15%] font-semibold text-gray-600">
              Action
            </div>
          </div>
        </div>
        <div className="bg-white max-md:space-y-4">
          {cartItems
            .filter(item => item && item.id) // Filter out undefined/null items and items without id
            .map(item => (
              <TableRow
                key={item?.id} 
                {...item as Product} 
              />
            ))}
        </div>
      </div>
      <OrderSummary subTotal={totalPrice} />
    </div>
  );
}