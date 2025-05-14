"use client"

import { inter } from "@/fonts";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import ProductCard4 from "../ProductCard4";
import ClearTransactionBtn from "@/components/buttons/ClearTransactionBtn";

export default function OrderDetailsMC({ orderDetails }:{ orderDetails: OrderListDetail }){
    return (
        <main>
            {
                orderDetails.customer &&
                 <div className={`${inter.className} flex gap-6`}>
                    <div className="flex items-center gap-2">
                        <div className="w-12 h-12 rounded-full aspect-square overflow-hidden bg-gray-100">
                            <Image
                                src="/icons/customer.svg"
                                alt={orderDetails.customer?.full_name}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover opacity-60"
                            />
                        </div>
                        <div>
                            <h3 className="text-[#1C2A53] text-sm font-semibold">{orderDetails.customer?.full_name}</h3>
                            <p className="text-sm mt-1 text-[#8E95A9]">{orderDetails.customer?.email}</p>
                        </div>
                    </div>
            
                    <div className="flex items-center gap-2">
                        <Icon 
                            icon="tdesign:location" 
                            className="w-5 h-5 flex-shrink-0 text-[#8E95A9]"
                        />
                        <div>
                            <p className="text-sm font-semibold text-[#1C2A53]">Location</p>
                            <p className="text-sm text-[#8E95A9] mt-1">{orderDetails.customer?.street_address}, {orderDetails.customer?.city}, {orderDetails.customer?.state}, {orderDetails.customer?.country}</p>
                        </div>
                    </div>
                </div>
            }

            <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-4 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
                {orderDetails.products?.length > 0 ? (
                    orderDetails.products?.map((v, index) => (
                        <ProductCard4 key={index} {...v} quantity={v.quantity} price_at_sale={v.price_at_sale} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-8 mt-32 text-gray-500">
                        No products found in this order
                    </div>
                )}
            </div>

            {
                orderDetails.products?.length ?
                <div className="my-10">
                    <ClearTransactionBtn />
                </div>
                :
                null
            }
        </main>
    )
}