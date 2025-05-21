"use server";

import { handleApiError } from "@/lib/helperFns/handleApiErrors";
import { PaymentFormValues } from "@/schemas/paymentFormSchema";
import { redirect } from "next/navigation";

export async function CheckoutHandler(d: PaymentFormValues) {
  let paymentUrl: string = "";
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/ecommerce/make-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...d,
          order: JSON.parse(d.order),
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      const errorMessage =
        response.status === 401 || response.status === 404
          ? "Invalid credentials. Please try again."
          : "Failed to checkout. Please check your network or try again later.";
      if (response.status === 400) {
        throw new Error(handleApiError(data));
        return;
      }
      throw new Error(errorMessage);
    }
    
    // console.log({ data });

    if (data.payment && data.payment?.data?.authorization_url){
      paymentUrl = data.payment?.data?.authorization_url;
      throw new Error()
      return;
    }
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Login error:", error);
    if(paymentUrl) redirect(paymentUrl);
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to login. Please check your network or try again later.",
      success: false,
    };
  }
}
