import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProductFormValues, StaffFormValues } from "@/schemas/addProduct.schema";
import { Label } from "../ui/label";
import ErrorPara from "./ErrorPara";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

type FormInputFieldProps = {
  label: string;
  name: keyof ProductFormValues | keyof StaffFormValues;
  placeholder: string;
  register: any;
  error?: string;
  type?: string;
  prefix?: React.ReactNode;
  className?: string;
};

export default function AppInput({ 
  label, 
  name, 
  placeholder, 
  register, 
  error, 
  type = "text", 
  prefix,
  className
}: FormInputFieldProps) {

  const [eyeOpen, setEyeOpen] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (eyeOpen ? "text" : "password") : type;

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
        <input
          type={inputType}
          id={name as string}
          placeholder={placeholder}
          className={cn(
            "border border-gray-300 rounded-md max-w-full w-full text-sm py-3 h-12 px-3 focus:outline-offset-0 focus:outline focus:outline-[1.5px] focus:outline-stone-400", 
            prefix ? "pl-8" : "",
            error ? "border-red-500 focus:ring-red-500" : ""
          )}
          {...register(name)}
        />

        {isPassword && (
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
