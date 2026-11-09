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
    formState: { errors },
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
            error={errors.full_name?.message}
          />
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <AppInput
              variant="transparent"
              label="Email Address"
              className="!bg-transparent w-full"
              name="email"
              placeholder="Enter email"
              type="email"
              register={register}
              error={errors.email?.message}
            />
            <AppInput
              variant="transparent"
              label="Phone Number"
              className="!bg-transparent w-full"
              name="phone"
              placeholder="Enter phone"
              type="tel"
              register={register}
              error={errors.phone?.message}
            />
          </div>
          <div className="flex flex-col gap-1">
            <AppInput
              variant="transparent"
              label="Loyalty / Referral Code (optional)"
              className="!bg-transparent w-full"
              name="referral_id"
              placeholder="e.g. RADIANT-9X42L1"
              register={register}
              error={errors.referral_id?.message}
            />
            <p className="text-[11px] text-gray-500">
              Enter your loyalty referral code to earn reward points with this purchase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
