"use client";

import { formatNaira } from "@/lib/helperFns/formatNumber";
import SelectedServicesCard from "../../../../../components/spa/SelectedServicesCard";
import { dm_mono } from "@/fonts";
import { useSelector } from "react-redux";
import { selectSelectedServices } from "@/lib/redux/slices/spaCartSlice";
import { useSpaCart } from "@/hooks/useSpaCart";
import { SpaCheckoutFormValues } from "@/schemas/SpaCheckoutSchema";
import { UseFormReturn } from "react-hook-form";
import SpaCheckoutSuccessfulModal from "@/components/modals/SpaCheckoutSuccefullModal";

export default function SelectedService({form}:{form: UseFormReturn<SpaCheckoutFormValues>;}) {
   const {items:selectedServices, totalPrice} = useSpaCart()
   const discount = 10_000;
   const {formState: {isSubmitting}} = form
  
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
        <SpaCheckoutSuccessfulModal
        
        dates={[
          ["12/06/2025", "12:30PM"],
          ["12/06/2025", "12:30PM"],
          ["12/06/2025", "12:30PM"],
          ["12/06/2025", "12:30PM"],
        ]}
        >
          <button disabled={isSubmitting} className="w-full py-3 mt-4 rounded-md transition-colors bg-primary-red text-white">
        {isSubmitting ? "Loading" : "  Submit Booking"}
        </button>
        </SpaCheckoutSuccessfulModal>
      </div>
    </section>
  );
}


