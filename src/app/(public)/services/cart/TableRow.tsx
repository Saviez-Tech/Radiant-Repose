"use client";

import { useCart } from "@/hooks/useCart";
import { formatNaira } from "@/lib/helperFns/formatNumber";
import Image from "next/image";
import { useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";

export default function TableRow({
  image_url,
  name,
  price,
  description,
  id,
}: Product) {
  const { incrementItem, decrementItem, items, removeItem } = useCart();

  const quantity = (
    items.find((item) => item.product === id)?.quantity || 1
  );

  const increment = () => incrementItem(id);
  const decrement = () => decrementItem(id);

  const totalPrice = price * quantity;

  return (
    <div className=" grid md:flex md:items-center hover:bg-gray-50 transition-all duration-300 ease-in-out">
      <div className="flex flex-1 items-center  md:w-[55%]">
        <div className="p-2 text- font-medium text-gray-900 flex-1 ">
          <div className="flex">
            <Image
              width={100}
              height={100}
              src={image_url}
              alt="hand bag"
              className="md:w-16 md:h-16 h-14 w-14 object-cover  rounded-xl"
            />
            <div className="flex flex-col ml-4">
              <h2 className="text-primary-deepBlack font-semibold md:text-base text-xs">
                {name}
              </h2>
              <p className="text-primary-text_stone_color md:text-sm text-xs font-normal">
                {description}
              </p>
            </div>
          </div>
        </div>
        <div className="p-2 w-[30%]">
          <div className="flex items-center gap-4">
            <button
              onClick={decrement}
              className="w-6 h-6 flex items-center justify-center border border-[#FF0000] text-[#FF0000] rounded-full hover:bg-red-100"
            >
              <span className="text-lg font-bold">
                <LuMinus />
              </span>
            </button>

            <span className="md:text-lg text-sm font-semibold">
              {quantity.toString().padStart(2, "0")}
            </span>

            <button
              onClick={increment}
              className="w-6 h-6 flex items-center justify-center bg-[#FF0000] text-white rounded-full shadow-md hover:bg-red-600"
            >
              <span className="text-lg font-bold">
                <LuPlus />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 md:w-[45%] max-md:pl-20 ">
        <div className="">
          <p className="md:hidden text-xs ">Unit Price</p>
          <div className=" md:text-sm text-xs ">{formatNaira(price, true)}</div>
        </div>
        <div className="">
          <p className="md:hidden text-xs ">Total</p>
          <div className="text-primary-darkRed md:text-sm text-xs font-semibold ">
            {formatNaira(totalPrice, true)}
          </div>
        </div>
        <div>
          <button
            onClick={() => removeItem(id)}
           className="text-red-500 rounded-3xl py-2 px-3 md:text-sm text-xs truncate">
            Remove item
          </button>
        </div>
      </div>
    </div>
  );
}
