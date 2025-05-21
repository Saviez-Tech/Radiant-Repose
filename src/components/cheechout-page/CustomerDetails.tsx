"use client";
import { UseFormReturn } from "react-hook-form";
import AppInput from "../custom-utils/AppInput";
import { PaymentFormValues } from "@/schemas/paymentFormSchema";
// import Payment from "./Payment";

export default function CustomerDetails({
  form,
}: {
  form: UseFormReturn<PaymentFormValues>;
}) {
    const {
    register,
  } = form;

  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold text-primary-deepBlack">
        Customer Details
      </h3>
      <div className="border-t border-gray-400 my-4">
        <div className="py-4 w-full flex flex-col gap-4">
          <AppInput
            variant="transparent"
            label="Full Name"
            className="!bg-transparent"
            name="full_name"
            placeholder="Enter full name"
            register={register}
          />
          <div className="flex gap-2 w-full">
            <AppInput
              variant="transparent"
              label="Email Address"
              className="!bg-transparent w-full"
              name="email"
              placeholder="Enter email"
              type="email"
              register={register}
            />
            <AppInput
              variant="transparent"
              label="Phone Number"
              className="!bg-transparent w-full"
              name="phone"
              placeholder="Enter phone"
              type="tel"
              register={register}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
