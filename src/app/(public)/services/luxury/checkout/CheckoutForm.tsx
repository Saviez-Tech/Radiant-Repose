"use client";

import { CheckoutHandler } from "@/actions/services.server";
import CustomerDetails from "@/components/cheechout-page/CustomerDetails";
import DeliveryAddress from "@/components/cheechout-page/DeliveryAddress";
import { useCart } from "@/hooks/useCart";
import { formatNaira } from "@/lib/helperFns/formatNumber";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import OrderSummary from "../cart/OrderSummary";
import { PaymentFormValues } from "@/schemas/paymentFormSchema";


export default function CheckoutForm({ products }: { products: Product[] }) {
  const formControl = useForm<PaymentFormValues>();
  const { items, totalPrice} = useCart(products);

  const onSubmit = async (data: PaymentFormValues) => {
    try {
      const result = await CheckoutHandler(data);

      if (result && !result.success) {
        toast.error(result.error || "Chekout failed");
        return;
      }

      toast.success("Checkout successful");
    } catch (err) {
      console.error("Login error in component:", err);

      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  const isFormValid = formControl.formState.isValid;
  formControl.register("order", {
    value: JSON.stringify(items),
  });

  return (
    <>
       <OrderSummary
              subTotal={totalPrice}
            />
      <form onSubmit={formControl.handleSubmit(onSubmit)}>
        <CustomerDetails form={formControl} />
        <DeliveryAddress form={formControl} />
        <input type="hidden" name="order" value={JSON.stringify(items)} />
        <button
          className={`w-full py-3 mt-4 rounded-md transition-colors ${
            isFormValid
              ? "bg-primary-red text-white"
              : "bg-[#5B5B5B1A] text-gray-600"
          }`}
          disabled={!isFormValid}
        >
          {formControl.formState.isSubmitting ? (
            "loading..."
          ) : (
            <>Pay {formatNaira(totalPrice)}</>
          )}
        </button>
      </form>
    </>
  );
}
