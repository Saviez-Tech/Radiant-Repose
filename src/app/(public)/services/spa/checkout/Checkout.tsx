"use client"
import { SpaCheckoutFormValues } from "@/schemas/SpaCheckoutSchema";
import { useForm } from "react-hook-form";
import CheckoutForm from "./CheckoutForm";
import SelectedService from "./SelectedService";

export default function Checkout({}) {
     const form = useForm<SpaCheckoutFormValues>({
    defaultValues: {
      scheduling: "same-day",
    }
    
  });
 
    return (
        <form className="flex flex-col md:flex-row justify-center items-start gap-12 py-12 app-container">
        <div className="w-full md:max-w-md lg:max-w-lg">
          <CheckoutForm form={form} />
        </div>
        <div className="w-full md:max-w-md lg:max-w-lg">
          <SelectedService form={form} />
        </div>
      </form>
    );
}