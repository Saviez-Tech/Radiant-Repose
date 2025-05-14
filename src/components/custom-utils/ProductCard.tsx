"use client";
import { formatNaira } from "@/lib/helperFns/formatNumber";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { dm_mono } from "@/fonts";
import { DollarSquare } from "../Svg";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { useCart } from "@/hooks/useCart";

export default function ProductCard({
  productType,
  image_url,
  name,
  price,
  description,
  stock_quantity,
  id,
}: Product) {
  const { addItem } = useCart();
  return (
    <div className="cursor-pointer relative w-full h-[320px] pb-2 bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 outline-none flex flex-col">
      <div className="relative h-40 flex-shrink-0">
        {image_url?.length ? (
          <Image
            src={image_url}
            width={300}
            height={300}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Skeleton className="w-full h-full" />
        )}
      </div>

      <div className="p-2 flex flex-col justify-between flex-grow">
        <div className="flex-grow overflow-hidden">
          <h3 className="text-xs md:text-sm font-semibold truncate">{name}</h3>
          <p className="text-primary-dark_gray/50 text-[9px] md:text-[11px] line-clamp-2 h-8">
            {description}
          </p>
        </div>

        <div className="flex justify-between items-center my-2 gap-2">
          <div className="flex items-center">
            <DollarSquare className="size-6" />
            <span
              className={`${dm_mono.className} text-primary-dark_gray text-xs md:text-xs font-light ml-1`}
            >
              {formatNaira(price, false, true)}
            </span>
          </div>
          <p className="text-primary-dark_gray text-right text-xs capitalize truncate">
            <span className="font-semibold">Category:</span>{" "}
            {productType?.split("-").join(" ")}
          </p>
        </div>

        <div className="flex justify-between items-center overflow-hidden gap-2 pb-1">
          <span className="text-[9px] md:text-[11px] text-gray-500 bg-gray-100 p-1 rounded">
            {stock_quantity} Pieces left
          </span>
          <div className="flex flex-col gap-2 items-center">
            <button
              onClick={() => addItem({ product: id, quantity: 1 })}
              className="bg-primary-light_amber text-white rounded-3xl py-2 px-3 text-[8px] md:text-xs truncate"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
