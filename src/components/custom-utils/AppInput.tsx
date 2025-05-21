import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { cn } from "@/lib/utils";

import { Label } from "../ui/label";
import ErrorPara from "./ErrorPara";

import type { ProductFormValues } from "@/schemas/addProduct.schema";
import type { StaffFormValues } from "@/schemas/addStaff.schema";
import type { PaymentFormValues } from "@/schemas/paymentFormSchema";
import { SpaCheckoutFormValues } from "@/schemas/SpaCheckoutSchema";

type FormInputFieldProps = {
  label: string;
  name:
    | keyof StaffFormValues
    | keyof ProductFormValues
    | keyof PaymentFormValues
    | keyof SpaCheckoutFormValues
    | string;
  placeholder: string;
  register: any;
  error?: string;
  type?: string;
  prefix?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: "solid" | "transparent";
  textarea?: boolean;
  rows?: number;
};

export default function AppInput({
  label,
  name,
  placeholder,
  register,
  error,
  type = "text",
  prefix,
  disabled,
  className,
  variant = "solid",
  textarea = false,
  rows = 4,
}: FormInputFieldProps) {
  const [eyeOpen, setEyeOpen] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (eyeOpen ? "text" : "password") : type;

  const baseStyles = cn(
    "rounded-md max-w-full w-full text-sm text-primary-dark_gray py-3 disabled:cursor-not-allowed h-12 px-3 focus:outline-offset-0 focus:outline focus:outline-[1.5px] focus:outline-stone-400",
    prefix ? "pl-8" : "",
    variant === "transparent"
      ? "bg-transparent border-[1px]"
      : "bg-white border border-gray-300",
    error && "border-red-500 focus:ring-red-500"
  );

  return (
    <div className={cn("space-y-1", className)}>
      <Label htmlFor={name} className="font-medium mb-1 text-primary-dark_gray">
        {label}
      </Label>
      <div className="relative">
        {prefix && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {prefix}
          </div>
        )}

        {textarea ? (
          <textarea
            id={name as string}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            className={cn(
              baseStyles,
              "resize-none h-auto py-2", // overrides height for textarea
            )}
            style={{
              borderColor:
                variant === "transparent" && !error ? "#ACACAC" : undefined,
            }}
            {...register(name)}
          />
        ) : (
          <input
            type={inputType}
            id={name as string}
            placeholder={placeholder}
            disabled={disabled}
            className={baseStyles}
            style={{
              borderColor:
                variant === "transparent" && !error ? "#ACACAC" : undefined,
            }}
            {...register(name)}
          />
        )}

        {isPassword && !textarea && (
          <button
            type="button"
            onClick={() => setEyeOpen(!eyeOpen)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {eyeOpen ? <FaRegEye /> : <FaRegEyeSlash />}
          </button>
        )}
      </div>
      {error && <ErrorPara errorText={error} />}
    </div>
  );
}