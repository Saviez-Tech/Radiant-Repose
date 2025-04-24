import AppInput from "@/components/custom-utils/AppInput";
import AppSelect from "@/components/custom-utils/AppSelect";
import FileUpload from "@/components/custom-utils/FileUpload";
import { LucideArrowRight, SeparatorVertical } from "lucide-react";

export default function EditProductForm() {
  return (
    <form className=" flex flex-col">
      <div className="grid grid-cols-3 gap-7 mb-9">
        <AppSelect
          name="productSection"
          label="Product Section"
          control={[]}
          placeholder="Select Section"
          options={[
            { value: "luxury-item", label: "Luxury Item" },
          ]}
        />
        <AppInput
          name="productName"
          label="Product Name"
          placeholder="Enter Product name"
          register={""}
        />
        <AppSelect
          name="productSection"
          label="Product Section"
          control={[]}
          placeholder="Select Section"
           options={[
            { value: "luxury-item", label: "Luxury Item" },
          ]}
        />
        <FileUpload control={""} label="Upload Product Image" name="image"  />
        <AppInput name="barcode" register={[]} label="Barcode" placeholder="Enter Barcode"/>
        <div className="flex gap-4">
            <AppInput name="unitPrice" register={[]} label="Unit Price" placeholder="150,000"/>
            <AppInput name="quantityInStock" register={[]} label="Quantity in Stock" placeholder="Enter Quantity in Stock"/>
        </div>
        <AppInput name="description" register={[]} label="Description" placeholder="Enter Description (e.g., colors, size, brand)"/>
      </div>
      <button className="flex gap-2 bg-primary-green w-fit !text-white font-semibold rounded-lg px-5 p-4">Add Selected Item
        <LucideArrowRight />
      </button>
    </form>
  );
}


