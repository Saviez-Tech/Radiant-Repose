"use client";
import {
  SpaCheckoutFormValues,
  SpaCheckoutSchema,
} from "@/schemas/SpaCheckoutSchema";
import { useForm } from "react-hook-form";
import CheckoutForm from "./CheckoutForm";
import SelectedService from "./SelectedService";
import { SpaCheckoutHandler } from "@/actions/services.server";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSpaCart } from "@/hooks/useSpaCart";
import { useState } from "react";
import SpaCheckoutSuccessfulModal from "@/components/modals/SpaCheckoutSuccefullModal";

export default function Checkout({}) {
  const { items, clearCart } = useSpaCart();
  const [data, setData] = useState<any>(null);

  const form = useForm<SpaCheckoutFormValues>({
    defaultValues: {
      scheduling: "same-day",
      services: JSON.stringify(items.map((i) => i.id)),
    },
    resolver: zodResolver(SpaCheckoutSchema),
  });

  const onSubmit = async (data: SpaCheckoutFormValues) => {
    try {
      const result = await SpaCheckoutHandler(data);

      if (result && !result.success) {
        toast.error(result.error || "Chekout failed");
        return;
      }

      clearCart();
      setData(result?.data);
    } catch (err) {
      console.error("Login error in component:", err);

      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row justify-center items-start gap-12 py-12 app-container"
      >
        <div className="w-full md:max-w-md lg:max-w-lg">
          <CheckoutForm form={form} />
        </div>
        <div className="w-full md:max-w-md lg:max-w-lg">
          <SelectedService form={form} />
        </div>
      </form>
      {!!data && <SpaCheckoutSuccessfulModal
        open={!!data}
        dates={data.dates}
        url={data.url}
      ></SpaCheckoutSuccessfulModal>}
    </>
  );
}
