import { ProductFormValues } from "@/schemas/addProduct.schema";
import { useRef, useState } from "react";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Control, Controller } from "react-hook-form";
import { HiMiniCamera } from "react-icons/hi2";
import ErrorPara from "./ErrorPara";

type FormFileUploadFieldProps = {
  label: string;
  name: keyof ProductFormValues;
  control: Control<any>;
  error?: string;
  className?: string;
  disabled?: boolean
}

export default function FileUpload({ 
  label, 
  name, 
  control, 
  disabled,
  error,
  className
}: FormFileUploadFieldProps){
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string>("")

  const handleContainerClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className={cn("space-y-1", className)}>
      <Label htmlFor={name} className="font-medium mb-1 text-primary-dark_gray">
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ref, ...rest } }) => (
          <div
            onClick={handleContainerClick}
            className={cn(
              "w-full border border-dashed rounded-md py-2.5 pe-3 flex items-center justify-center gap-2 cursor-pointer hover:border-gray-400 transition-colors",
              error ? "border-red-500" : "border-gray-300"
            )}
          >
            <div className="flex border border-[#5B5B5B66] gap-2 p-1 rounded-md">
              <input
                type="file"
                accept="image/*"
                id={name}
                className="hidden"
                disabled={disabled}
                ref={(instance) => {
                  fileInputRef.current = instance;
                  ref(instance)
                }}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    setFileName(file.name)
                    onChange(file)
                  }
                }}
                {...rest}
              />
              <HiMiniCamera className="h-4 w-4 text-primary-dark_gray" />
              <span className="text-primary-dark_gray text-xs">
                {fileName || "add image here"}
              </span>
            </div>
          </div>
        )}
      />
      {error && <ErrorPara errorText={error} />}
    </div>
  )
}