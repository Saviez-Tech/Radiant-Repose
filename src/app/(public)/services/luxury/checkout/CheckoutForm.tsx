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
  const { items, totalPrice } = useCart(products);

  const onSubmit = async (data: PaymentFormValues) => {
    try {
      const result = await CheckoutHandler(data);

      if (result && !result.success) {
        // If referral_id error was returned from backend 400 validation
        if (result.fieldErrors?.referral_id) {
          const refMsg = Array.isArray(result.fieldErrors.referral_id)
            ? result.fieldErrors.referral_id[0]
            : String(result.fieldErrors.referral_id);
          formControl.setError("referral_id", {
            type: "server",
            message: refMsg,
          });
        }
        toast.error(result.error || "Checkout failed");
        return;
      }

      if (result?.authorizationUrl) {
        toast.success("Redirecting to Paystack payment...");
        window.location.href = result.authorizationUrl;
        return;
      }

      toast.success("Checkout successful");
    } catch (err) {
      console.error("Checkout error in component:", err);

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
