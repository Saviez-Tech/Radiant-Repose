"use client";

import { UseFormReturn } from "react-hook-form";
import AppInput from "@/components/custom-utils/AppInput";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import AppSelect from "@/components/custom-utils/AppSelect";

export type CheckoutFormData = {
  full_name: string;
  phone: string;
  date: string;
  time: string;
  note: string;
  scheduling: "same-day" | "different-days";
};

export default function CheckoutForm({
  form,
}: {
  form: UseFormReturn<CheckoutFormData>;
}) {
  const { register, setValue, watch } = form;
  const scheduling = watch("scheduling");

  return (
    <section className="flex flex-col gap-6">
      {/* Personal Details */}
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
          />
        ))}
      </div>

      {/* Scheduling Section */}
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
            <div className="flex items-center gap-2">
              <RadioGroupItem value="same-day" id="same-day" />
              <Label htmlFor="same-day" className="text-sm font-medium">
                Same Day
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="different-days" id="different-days" />
              <Label htmlFor="different-days" className="text-sm font-medium">
                Different Days
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Date & Time */}
        <div className="grid md:grid-cols-2 gap-4">
          <AppSelect
            name="date"
            label="Date"
            placeholder="Select Preferred Date"
            variant="transparent"
            options={[]}
            control={form.control}
          />
          <AppSelect
            name="time"
            label="Time"
            placeholder="Select Preferred Time"
            variant="transparent"
            options={[]}
            control={form.control}
          />
        </div>

        <AppInput
          variant="transparent"
          name="note"
          placeholder="Enter your note"
          register={register}
          textarea
          label="Enter Special Requests/Note here"
        />
      </div>
    </section>
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
