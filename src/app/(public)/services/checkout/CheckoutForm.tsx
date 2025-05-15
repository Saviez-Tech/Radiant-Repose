"use client";

import CustomerDetails from "@/components/cheechout-page/CustomerDetails";
import DeliveryAddress from "@/components/cheechout-page/DeliveryAddress";
import OrderSummary from "../cart/OrderSummary";
import { useForm } from "react-hook-form";
import { CheckoutHandler } from "@/actions/services.server";
import { useCart } from "@/hooks/useCart";
import toast from "react-hot-toast";
import { formatNaira } from "@/lib/helperFns/formatNumber";

export type CheckoutFormData = {
  full_name: string;
  email: string;
  phone: string;
  street_address: string;
  zip_code: string;
  city: string;
  state: string;
  country: string;
  order: string;
};

export default function CheckoutForm({ products }: { products: Product[] }) {
  const formControl = useForm<CheckoutFormData>();
  const { items, totalPrice, cartItems } = useCart(products);

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      const result = await CheckoutHandler(data);

      if (!result.success) {
        toast.error(result.error || "Chekout failed");
        return;
      }

      toast.success("Checkout successful");
    //   TODO: after succussful checkout, redirect to payment gateway
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
              subTotal={cartItems.reduce(
                (acc, item) => acc + item!.price * items.find(i => i.product === item!.id)!.quantity,
                0
              )}
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
          {formControl.formState.isLoading ? (
            "loading..."
          ) : (
            <>Pay {formatNaira(totalPrice)}</>
          )}
        </button>
      </form>
    </>
  );
}
