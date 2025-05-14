"use client";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Control, Controller } from "react-hook-form";
import { ProductFormValues } from "@/schemas/addProduct.schema";
import ErrorPara from "./ErrorPara";
import { StaffFormValues } from "@/schemas/addStaff.schema";
import { PaymentFormValues } from "@/schemas/paymentFormSchema";

type FormSelectFieldProps = {
  label?: string;
  name: keyof ProductFormValues | keyof StaffFormValues | keyof PaymentFormValues | string;
  placeholder?: string;
  options: { value: string; label: string }[];
  control?: Control<any, any>;
  error?: string;
  className?: string;
  disabled?: boolean;
  variant?: "solid" | "transparent";
};

export default function AppSelect({
  label,
  name,
  placeholder,
  options,
  control,
  disabled,
  error,
  className,
  variant = "solid",
}: FormSelectFieldProps) {
  const selectTriggerStyles = cn(
    "!text-primary-dark_gray py-4 h-12 px-3 focus:ring-stone-400",
    variant === "transparent"
      ? "bg-transparent border-[1px] border-[#ACACAC]"
      : "bg-[#F8F8F8] border border-gray-300",
    error && "border-red-500 focus:ring-red-500"
  );

  return (
    <div className={cn("space-y-1", className)}>
      {label && (
        <Label htmlFor={name} className="font-medium mb-1 text-primary-dark_gray">
          {label}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={disabled}
          >
            <SelectTrigger id={name} className={selectTriggerStyles}>
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
  );
}