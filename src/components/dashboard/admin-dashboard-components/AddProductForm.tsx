import AppInput from "@/components/ui/AppInput";
import AppSelect from "@/components/ui/AppSelect";
import FileUpload from "@/components/ui/FileUpload";
import { LucideArrowRight, SeparatorVertical } from "lucide-react";
import { FaCamera } from "react-icons/fa";

export default function AddProductForm() {
  return (
    <form className=" flex flex-col">
      <div className="grid grid-cols-3 gap-7 mb-9">
        <AppSelect
          name="productSection"
          title="Product Section"
          placeholder="Select Section"
          options={["Luxury items"]}
          value=""
        />
        <AppInput
          name="productName"
          title="Product Name"
          placeholder="Enter Product name"
          value=""
        />
        <AppSelect
          name="productSection"
          title="Product Section"
          placeholder="Select Section"
          options={["Luxury items"]}
          value=""
        />
        <FileUpload />
        <AppInput name="barcode" title="Barcode" placeholder="Enter Barcode" />
        <div className="flex gap-4">
          <AppInput name="uprice" title="Unit Price" placeholder="150,000" />
          <AppInput
            name="quantity"
            title="Quantity in Stock"
            placeholder="Enter Quantity in Stock"
            value=""
          />
        </div>
        <AppInput
          name="description"
          title="Description"
          placeholder="Enter Description (e.g., colors, size, brand)"
          value=""
        />
      </div>
      <button className="flex gap-2 bg-primary-green w-fit !text-white font-semibold rounded-lg px-5 p-4">
        Save changes
        <LucideArrowRight />
      </button>
    </form>
  );
}
