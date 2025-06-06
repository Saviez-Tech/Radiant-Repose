"use client"

import { addProductHandler, editProductHandler } from "@/actions/product.server";
import SubmitBtnWithLoader from "@/components/buttons/SubmitBtnWithLoader";
import AppInput from "@/components/custom-utils/AppInput";
import { cn } from "@/lib/utils";
import { editProductFormSchema, EditProductFormValues, productFormSchema, ProductFormValues } from "@/schemas/addProduct.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AppSelect from "@/components/custom-utils/AppSelect";
import FileUpload from "@/components/custom-utils/FileUpload";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/lib/redux/hooks";

export default function ProductForm({ formActionType, productID }: { productID?: string, formActionType: "add" | "edit" }) {

  
  const { branches } = useAppSelector(store => store.storeBranches)
  const { productToEdit } = useAppSelector(store => store.editProduct)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: formActionType === "edit" 
      ? zodResolver(editProductFormSchema)
      : zodResolver(productFormSchema),
    defaultValues: {
      barcode: productToEdit?.barcode || "",
      description: productToEdit?.description || "",
      id: productToEdit?.id || "",
      image: undefined,
      productName: productToEdit?.name || "",
      branch: productToEdit?.branch,
      unitPrice: productToEdit?.price.toString() || "",
      productSection: productToEdit?.category || "",
      category: productToEdit?.productType || "",
      quantityInStock: productToEdit?.stock_quantity.toString() || "",
    },
  })


  const router = useRouter()

  const productSectionOptions = [
    { value: "luxury-item", label: "Luxury Item" },
  ]

  const locationOptions = branches.map(v => {
    return { label: `${v.name}, ${v.location}`, value: v.id.toString()}
  })

  const categoryOptions = [
    { value: "bags", label: "Bags" },
    { value: "shoes", label: "Shoes" },
    { value: "jewelry", label: "Jewelry" },
    { value: "perfumes", label: "Perfumes" },
  ]

  const onSubmit: SubmitHandler<ProductFormValues | EditProductFormValues> = async(data) => {
    const { success, error } = formActionType === "add" ? await addProductHandler(data) : await editProductHandler(data,productID || "")
    if (success){
      toast.success(`Product ${formActionType === "add" ? "Added" : "Edited"}`)
      router.push("/admin/product-management/luxury-collection")
    }
    else if (error){
      toast.error(error)
    }
  }
  

  // Render different form based on formActionType
  if (formActionType === "edit") {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="w-full py-6">
        <div className="grid grid-cols-2 gap-8 mb-6">
          <AppInput
            label="Product Name"
            name="productName"
            placeholder="Enter Product name"
            register={register}
            error={errors.productName?.message}
          />

          <FileUpload
            label="Upload Product Photo"
            name="image"
            className="h-12"
            control={control}
            error={errors.image?.message}
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
                    "border rounded-r-md text-primary-dark_gray border-s-0 w-full text-sm py-3 h-12 focus:outline-none px-3",
                    errors.unitPrice ? "border-red-500 focus:ring-red-500" : "border-gray-300"
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
              className="w-1/2 whitespace-nowrap"
            />
          </div>
        </div>

        <div className="flex mt-10">
          <SubmitBtnWithLoader isSubmitting={isSubmitting} text="Update Product" />
        </div>
      </form>
    )
  }

  // Add mode form with all fields
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full py-6">
      <div className="grid md:grid-cols-3 gap-x-6 gap-y-8 mb-6">
        <AppSelect
          label="Assigned Location"
          name="branch"
          placeholder="Select Location"
          options={locationOptions}
          control={control}
          error={errors.branch?.message}
        />


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
                  "border rounded-r-md text-primary-dark_gray border-s-0 w-full text-sm py-3 h-12 focus:outline-none px-3",
                  errors.unitPrice ? "border-red-500 focus:ring-red-500" : "border-gray-300"
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
            className="w-1/2 whitespace-nowrap"
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
              "border py-2.5 px-3 min-h-[80px] text-primary-dark_gray focus:ring-gray-400 text-sm",
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
        <SubmitBtnWithLoader isSubmitting={isSubmitting} text="Create Product" />
      </div>
    </form>
  )
}