"use client";
import AppInput from "../custom-utils/AppInput";
import Payment from "./Payment";

export default function DeliveryAddress() {
    return (
        <div className="flex flex-col">
      <h3 className="text-lg font-semibold text-primary-deepBlack">Delivery Address</h3>
      <div className="border-t border-gray-400 my-4">
        <div className="py-4 w-full flex flex-col gap-4">
          
          <AppInput variant="transparent" label="Street Address" className="!bg-transparent" name="address" placeholder="Enter street address" register={Payment} />
          <div className="flex gap-2 w-full">
            <AppInput variant="transparent" label="Zip Code" className="!bg-transparent w-full" name="email" placeholder="Enter city" type="email" register={Payment} />
            <AppInput variant="transparent" label="Phone Number" className="!bg-transparent w-full" name="phoneNumber" placeholder="Enter phone" type="tel" register={Payment} />
          </div>
          <div className="flex w-full gap-2">
            {/* TODO: bring back the select dropdowns during api implementation */}
            {/* <AppSelect 
            control={undefined}
            options={[]} key={""} className="!bg-transparent w-full"  label="State"  name="state" placeholder="Enter your state"  error="" />
            <AppSelect  control={undefined} options={[]}  key={""} className="!bg-transparent w-full" label="Country"  name="country" placeholder="Enter your country" error="" /> */}
          </div>
        </div>
      </div>
    </div>
    );
}