import { cn } from "@/lib/utils";
import { ProductFormValues } from "@/schemas/addProduct.schema";
import { Label } from "../ui/label";
import ErrorPara from "./ErrorPara";

type FormInputFieldProps = {
  label: string;
  name: keyof ProductFormValues;
  placeholder: string;
  register: any;
  error?: string;
  type?: string;
  prefix?: React.ReactNode;
  className?: string;
}

export default function AppInput({ 
  label, 
  name, 
  placeholder, 
  register, 
  error, 
  type = "text", 
  prefix,
  className
}: FormInputFieldProps){

  return(

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
          type={type}
          id={name}
          placeholder={placeholder}
          className={cn(
            "border border-gray-300 rounded-md max-w-full w-full text-sm py-3 h-12 px-3 focus:outline-offset-0 focus:outline focus:outline-[1.5px] focus:outline-stone-400", 
            prefix ? "pl-8" : "",
            error ? "border-red-500 focus:ring-red-500" : ""
          )}
          {...register(name)}
        />
      </div>
      {error && <ErrorPara errorText={error} />}
    </div>
  )
}