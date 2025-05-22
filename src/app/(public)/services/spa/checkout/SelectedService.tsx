"use client";

import { dm_mono } from "@/fonts";
import { useSpaCart } from "@/hooks/useSpaCart";
import { formatNaira } from "@/lib/helperFns/formatNumber";
import SelectedServicesCard from "./SelectedServicesCard";

export default function SelectedService() {
   const {items:selectedServices, totalPrice} = useSpaCart()
   const discount = 10_000;

  
  return (
    <section className=" md:p-4">
      <div className="flex justify-between text-primary-dark_gray bg-[#F8F8F8] rounded-t-2xl px-4 py-6">
        <p className="">Selected Service</p>
        <p>Price</p>
      </div>
      <div className="bg-white flex flex-col gap-4 p-4  rounded-b-2xl">
        <div className=" border-b border-gray-300 pb-4">
          {selectedServices.map((service) => (
            <SelectedServicesCard key={service.id} services={service} />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-primary-deepBlack">
            Order Summary
          </h3>
          <div
            className={`${dm_mono.className} text-primary-dark_gray md:text-sm text-xs font-light ml-1 flex justify-between`}
          >
            <span className="">Subtotal</span>
            <span className="">{formatNaira(totalPrice, false, true)}</span>
          </div>
          <div
            className={`${dm_mono.className} text-primary-dark_gray md:text-sm text-xs font-light ml-1 flex justify-between border-b border-dashed border-gray-300 pb-4`}
          >
            <span>Discount</span>
            <span>{formatNaira(discount, false, true)}</span>
          </div>

          <div className="flex justify-between md:text-sm text-xs font-semibold text-primary-deepBlack">
            <span>Total</span>
            <span>{formatNaira(totalPrice - discount, false, true)}</span>
          </div>

          <p className="md:text-sm text-xs font-light text-primary-dark_gray text-center">
            Payment will be made in-store after service
          </p>
        </div>
        <button className="w-full py-3 mt-4 rounded-md transition-colors bg-primary-red text-white">
          Submit Booking
        </button>
      </div>
    </section>
  );
}

export const dummyServices: SpaService[] = [
  {
    id: 1,
    name: "Hot Stone Therapy",
    description:
      "A deeply relaxing massage that eases tension, improves circulation and revitalizes the body.",
    price: 65000,
    type: "session",
    image: "/images/christin-hume.png",
  },
  {
    id: 2,
    name: "Hot Stone Therapy",
    description:
      "A deeply relaxing massage that eases tension, improves circulation and revitalizes the body.",
    price: 65000,
    type: "session",
    image: "/images/christin-hume.png",
  },
  {
    id: 3,
    name: "Hot Stone Therapy",
    description:
      "A deeply relaxing massage that eases tension, improves circulation and revitalizes the body.",
    price: 65000,
    type: "session",
    image: "/images/christin-hume.png",
  },
  {
    id: 4,
    name: "Hot Stone Therapy",
    description:
      "A deeply relaxing massage that eases tension, improves circulation and revitalizes the body.",
    price: 65000,
    type: "session",
    image: "/images/christin-hume.png",
  },
];
