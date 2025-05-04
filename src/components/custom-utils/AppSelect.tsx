"use client"
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Control, Controller } from "react-hook-form";
import { ProductFormValues } from "@/schemas/addProduct.schema";
import ErrorPara from "./ErrorPara";
import { StaffFormValues } from "@/schemas/addStaff.schema";

type FormSelectFieldProps = {
  label?: string;
   name: (keyof ProductFormValues | keyof StaffFormValues | string);
  placeholder?: string;
  options: { value: string; label: string }[];
<<<<<<< HEAD
  control?: any;
=======
  control: Control<any,any>;
>>>>>>> 3be884f8127a07cb321a1d9a1d2efda9821ed40c
  error?: string;
  className?: string;
  disabled?: boolean
}

export default function AppSelect({ 
  label, 
  name, 
  placeholder, 
  options, 
  control, 
  disabled,
  error,
  className
}: FormSelectFieldProps){

  return (

    <div className={cn("space-y-1", className)}>
      <Label htmlFor={name} className="font-medium mb-1 text-primary-dark_gray">
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
            disabled={disabled}
          >
            <SelectTrigger 
              id={name}
              className={cn(
                "border border-gray-300 !text-primary-dark_gray py-4 h-12 bg-[#F8F8F8] px-3 focus:ring-stone-400",
                error ? "border-red-500 focus:ring-red-500" : ""
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error && <ErrorPara errorText={error} />}
    </div>
  )
}
