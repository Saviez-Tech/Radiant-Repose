"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import AppInput from "@/components/custom-utils/AppInput";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import SameDayBooking from "./SameDayBooking";
import DifferentDaysBooking from "./DifferentDaysBooking";
import { SpaCheckoutFormValues } from "@/schemas/SpaCheckoutSchema";
import { useSpaCart } from "@/hooks/useSpaCart";
import { error } from "console";


export default function CheckoutForm({form}:{form: UseFormReturn<SpaCheckoutFormValues>;}) {
  const {items} = useSpaCart()
 


   const { register, setValue, watch,  formState: { errors, }} = form;
  const scheduling = watch("scheduling");

  return (
    <div className="flex flex-col gap-6 md:max-w-md md:mx-w-[500px] md:p-4">
      <div className="flex flex-col gap-2 border-b border-gray-300 pb-5">
        <h1 className="md:text-4xl text-2xl font-semibold">Booking Details</h1>
        <p className="md:text-xl text-lg font-semibold">Personal Details</p>
      </div>

      <div className="grid gap-4 mb-6">
        {formFields.map((field) => (
          <AppInput
            key={field.name}
            {...field}
            register={register}
            variant="transparent"
            error={errors[field.name as keyof typeof errors]?.message}

          />
        ))}
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 border-b border-gray-300 pb-5">
          <h2 className="md:text-xl text-lg font-semibold">
            Scheduling Details
          </h2>
          <p className="md:text-base text-sm">Appointment Scheduling</p>

          <RadioGroup
            className="flex items-center gap-6 mt-2"
            value={scheduling}
            onValueChange={(val: "same-day" | "different-days") =>
              setValue("scheduling", val)
            }
          >
            {options.map(({ value, label }) => (
              <div key={value} className="flex items-center gap-2">
                <RadioGroupItem value={value} id={value} />
                <Label
                  htmlFor={value}
                  className={`text-sm font-medium ${
                    scheduling === value
                      ? "text-primary-deepBlack"
                      : "text-primary-dark_gray/50"
                  }`}
                >
                  {label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {scheduling === "same-day" ? (
          <SameDayBooking form={form} />
        ) : (
          <>
          {
            items.map((item) => (
              <DifferentDaysBooking key={item.id} form={form} item={item} />
            ))
          }
          </>
        )}
      </div>
    </div>
  );
}

const formFields = [
  {
    name: "full_name",
    label: "Full Name",
    placeholder: "Enter your full name",
  },
  {
    name: "phone",
    label: "Phone Number",
    placeholder: "Enter your phone number",
  },
];

const options = [
  { value: "same-day", label: "Same Day" },
  { value: "different-days", label: "Different Days" },
];
