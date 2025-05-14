"use client";
import AppInput from "../custom-utils/AppInput";
import Payment from "./Payment";

export default function CustomerDetails() {
    return (
        <div className="flex flex-col">
      <h3 className="text-lg font-semibold text-primary-deepBlack">Customer Details</h3>
      <div className="border-t border-gray-400 my-4">
        <div className="py-4 w-full flex flex-col gap-4">
          
          <AppInput variant="transparent" label="Full Name" className="!bg-transparent" name="full_name" placeholder="Enter full name" register={Payment} />
          <div className="flex gap-2 w-full">
            <AppInput variant="transparent" label="Email Address" className="!bg-transparent w-full" name="email" placeholder="Enter email" type="email" register={Payment} />
            <AppInput variant="transparent" label="Phone Number" className="!bg-transparent w-full" name="phone" placeholder="Enter phone" type="tel" register={Payment} />
          </div>
        </div>
      </div>
    </div>
    );
}