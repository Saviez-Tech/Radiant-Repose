import { formatNaira } from "@/lib/helperFns/formatNumber";
import Image from "next/image";

export default function ProductCard({ productType, image_url, name, price, description, stock_quantity, }:Product) {
    return (
        <div className="flex flex-col bg-white rounded-[15px] shadow-sm  gap-2">
            <Image src={image_url} alt="hand bag" width={206} height={150} className="w-full object-contain aspect-[206/150] rounded-t-[15px]" />
            <div className="flex flex-col gap-2 p-2 md:px-4">
                <div className="flex flex-col ">
                <h2 className="text-primary-deepBlack font-semibold max-md:text-xs">{name}</h2>
                <p className="text-primary-text_stone_color text-[7px] md:text-sm">{description}</p>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col  gap-2 items-center">
                        <span className="text-primary-dark_gray font-normal max-md:text-[9px] text-start">{formatNaira(price, true)}</span>
                        <span className="text-primary-text_stone_color bg-[#F6F6F6] rounded-md text-[8px] md:text-sm whitespace-nowrap  py-1 px-2 md:px-4">{stock_quantity} Pieces left</span>
                    </div>
                    <div className="flex flex-col  gap-2 items-center">
                        <p className="text-primary-dark_gray text-[7px] md:text-base font-semibold">Category: <span className=" font-normal">{productType}</span></p>
                        <button className="bg-primary-light_amber text-white rounded-3xl py-2 px-3 text-[8px] md:text-sm truncate">Add to Cart</button>
                    </div>
                </div>
            </div>

        </div>
    );
}