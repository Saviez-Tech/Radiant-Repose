"use client"

import AppInput from "@/components/custom-utils/AppInput";
import AppSelect from "@/components/custom-utils/AppSelect";
import FileUpload from "@/components/custom-utils/FileUpload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { productFormSchema, ProductFormValues } from "@/schemas/addProduct.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideArrowRight } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function ProductForm({ defaultValues }: { defaultValues?: ProductFormValues }) {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  })

  const productSectionOptions = [
    { value: "luxury-item", label: "Luxury Item" },
    { value: "pharmacy", label: "Pharmacy" },
    { value: "wellness", label: "Wellness" },
  ]

  const categoryOptions = [
    { value: "skincare", label: "Skincare" },
    { value: "haircare", label: "Haircare" },
    { value: "makeup", label: "Makeup" },
    { value: "fragrance", label: "Fragrance" },
  ]

  const onSubmit: SubmitHandler<ProductFormValues> = (data) => {
    console.log("Product data:", data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full py-6">
      
      {/* Grid layout with 3 columns and auto rows */}
      <div className="grid grid-cols-3 gap-x-6 gap-y-8 mb-6">
        <AppSelect
          label="Product Section"
          name="productSection"
          placeholder="Select Product Section"
          options={productSectionOptions}
          control={control}
          error={errors.productSection?.message}
        />

        <AppInput
          label="Product Name"
          name="productName"
          placeholder="Enter Product name"
          register={register}
          error={errors.productName?.message}
        />

        <AppSelect
          label="Category"
          name="category"
          placeholder="Select Category"
          options={categoryOptions}
          control={control}
          error={errors.category?.message}
        />
        
        <FileUpload
          label="Upload Product Photo"
          name="image"
          className="h-12"
          control={control}
          error={errors.image?.message}
        />

        <AppInput
          label="Barcode"
          name="barcode"
          placeholder="Enter Barcode"
          register={register}
          error={errors.barcode?.message}
        />

        <div className="max-w-full col-span-1 flex gap-4 justify-between">
          <div className="space-y-1 max-w-full w-1/2">
            <Label htmlFor="unitPrice" className="font-medium mb-1 text-primary-dark_gray">
              Unit Price
            </Label>
            <div className="flex max-w-full rounded-md focus-within:outline-offset-0 focus-within:outline focus-within:outline-[1.5px] focus-within:outline-stone-400">
              <div className="flex items-center justify-center bg-gray-100 px-3 border border-r-0 border-gray-300 rounded-l-md">
                <span className="text-gray-500">₦</span>
              </div>
              <input
                type="text"
                id="unitPrice"
                placeholder="150,000"
                className={cn(
                  "border border-gray-300 rounded-r-md border-s-0 w-full text-sm py-3 h-12 focus:outline-none px-3",
                  errors.unitPrice ? "border-red-500 focus:ring-red-500" : ""
                )}
                {...register("unitPrice")}
              />
            </div>
            {errors.unitPrice && <p className="text-xs text-red-500">{errors.unitPrice.message}</p>}
          </div>
          
          <AppInput
            label="Quantity in Stock"
            name="quantityInStock"
            placeholder="Enter Quantity in Stock"
            register={register}
            error={errors.quantityInStock?.message}
            type="number"
            className="w-1/2"
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="description" className="font-medium mb-1 text-primary-dark_gray">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Enter Description (e.g., colors, size, brand)"
            className={cn(
              "border py-2.5 px-3 min-h-[80px] focus:ring-gray-400 text-sm",
              errors.description ? "border-red-500 focus:ring-red-500" : "border-gray-300"
            )}
            {...register("description")}
          />
          {errors.description && (
            <p className="text-xs text-red-500">{errors.description.message}</p>
          )}
        </div>
      </div>

      <div className="flex mt-10">
        <button className="flex gap-2 bg-primary-green w-fit !text-white font-medium text-sm rounded-md px-5 py-3 hover:bg-green-600 transition-colors">
          Save changes
          <LucideArrowRight />
        </button>
      </div>
    </form>
  )
}