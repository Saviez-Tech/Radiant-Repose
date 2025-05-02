"use client";
import { formatNaira } from "@/lib/helperFns/formatNumber";
import { Product } from "@/types";
import { useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";

export default function TableRow({
  id,
  image_url,
  name,
  price,
  productType,
  description,
}: Product) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Calculate total price
  const totalPrice = price * quantity;

  return (
      <tr className="hover:bg-gray-50 transition-all duration-300 ease-in-out">
        <td className="p-2 text- font-medium text-gray-900">
          <div className="flex">
            <img
              src={image_url}
              alt="hand bag"
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex flex-col ml-4">
              <h2 className="text-primary-deepBlack font-semibold">{name}</h2>
              <p className="text-primary-text_stone_color text-sm">
                {description}
              </p>
            </div>
          </div>
        </td>
        <td className="p-2">
          <div className="flex items-center gap-4">
            {/* Decrement Button */}
            <button
              onClick={decrement}
              className="w-8 h-8 flex items-center justify-center border border-[#FF0000] text-[#FF0000] rounded-full hover:bg-red-100"
            >
              <span className="text-lg font-bold">
                <LuMinus />
              </span>
            </button>

            {/* Quantity Display */}
            <span className="text-lg font-semibold">
              {quantity.toString().padStart(2, "0")}
            </span>

            {/* Increment Button */}
            <button
              onClick={increment}
              className="w-8 h-8 flex items-center justify-center bg-[#FF0000] text-white rounded-full shadow-md hover:bg-red-600"
            >
              <span className="text-lg font-bold">
                <LuPlus />
              </span>
            </button>
          </div>
        </td>
        {/* Price per item */}
        <td>{formatNaira(price, true)}</td>
        {/* Total price */}
        <td className="text-primary-darkRed">{formatNaira(totalPrice, true)}</td>
        <td>
          <button className="text-red-500 rounded-3xl py-2 px-3 text-sm truncate">
            Remove item
          </button>
        </td>
      </tr>
  );
}
