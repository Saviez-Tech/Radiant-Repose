"use server";

import { CheckoutFormData } from "@/app/(public)/services/checkout/CheckoutForm";
import { handleApiError } from "@/lib/helperFns/handleApiErrors";

export async function CheckoutHandler(d: CheckoutFormData) {
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
    console.log(response.status);

    const data = await response.json();
    if (!response.ok) {
      let errorMessage =
        response.status === 401 || response.status === 404
          ? "Invalid credentials. Please try again."
          : "Failed to checkout. Please check your network or try again later.";
      if (response.status === 400) {
        throw new Error(handleApiError(data))
      }
      throw new Error(errorMessage);
    }

    // console.log({ data });

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to login. Please check your network or try again later.",
      success: false,
    };
  }
}
