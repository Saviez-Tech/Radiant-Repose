"use client";

import AppInput from "@/components/custom-utils/AppInput";
import AppSelect from "@/components/custom-utils/AppSelect";
import FileUpload from "@/components/custom-utils/FileUpload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  ProductFormValues,
  staffFormSchema,
  StaffFormValues,
} from "@/schemas/addProduct.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideArrowRight } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function StaffForm({
  defaultValues,
}: {
  defaultValues?: StaffFormValues;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<StaffFormValues>({
    resolver: zodResolver(staffFormSchema),
    defaultValues,
  });

  const locationOptions = [
    { value: "new_york", label: "New York, USA" },
    { value: "london", label: "London, UK" },
    { value: "paris", label: "Paris, France" },
    { value: "tokyo", label: "Tokyo, Japan" },
    { value: "sydney", label: "Sydney, Australia" },
    { value: "dubai", label: "Dubai, UAE" },
    { value: "toronto", label: "Toronto, Canada" },
    { value: "berlin", label: "Berlin, Germany" },
    { value: "mumbai", label: "Mumbai, India" },
    { value: "cape_town", label: "Cape Town, South Africa" },
  ];

  const categoryOptions = [
    { value: "skincare", label: "Skincare" },
    { value: "haircare", label: "Haircare" },
    { value: "makeup", label: "Makeup" },
    { value: "fragrance", label: "Fragrance" },
  ];

  const onSubmit: SubmitHandler<StaffFormValues> = (data) => {
    console.log("Product data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full py-6">
      {/* Grid layout with 3 columns and auto rows */}
      <div className="grid md:grid-cols-3 gap-x-6 gap-y-8 mb-6">
        <AppSelect
          label="Assigned Location"
          name="AssignedLocation"
          placeholder="Select Location"
          options={locationOptions}
          control={control}
          error={errors.AssignedLocation?.message}
        />

        <AppInput
          label="Full Name"
          name="fullName"
          placeholder="Enter Phone Number"
          register={register}
          error={errors.fullName?.message}
        />
        <AppInput
          label="Phone Number"
          name="phoneNumber"
          placeholder=""
          register={register}
          error={errors.phoneNumber?.message}
        />
        <AppInput
          label="Email Address"
          name="emailAddress"
          placeholder="Enter Email Address"
          register={register}
          error={errors.emailAddress?.message}
        />

        {/* <FileUpload
          label="Upload Staff Photo"
          name="image"
          className="h-12"
          control={control}
          error={errors.staffPhoto?.message}
        /> */}

        <AppInput
          label="Password"
          name="password"
          type="password"
          placeholder="Enter Password"
          register={register}
          error={errors.password?.message}
        />
        <AppInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Enter Password"
          register={register}
          error={errors.confirmPassword?.message}
        />
      </div>

      <div className="flex mt-10">
        <button className="flex gap-2 bg-primary-green w-fit !text-white font-medium text-sm rounded-md px-5 py-3 hover:bg-green-600 transition-colors">
          Create Staff
          <LucideArrowRight />
        </button>
      </div>
    </form>
  );
}
