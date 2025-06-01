"use server";

import { getUserSession } from "@/lib/helperFns/getUserSession";
import { handleApiError } from "@/lib/helperFns/handleApiErrors";
import { PaymentFormValues } from "@/schemas/paymentFormSchema";
import { SpaCheckoutFormValues } from "@/schemas/SpaCheckoutSchema";
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

    if (data.payment && data.payment?.data?.authorization_url) {
      paymentUrl = data.payment?.data?.authorization_url;
      throw new Error();
      return;
    }
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Login error:", error);
    if (paymentUrl) redirect(paymentUrl);
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to login. Please check your network or try again later.",
      success: false,
    };
  }
}

export async function SpaCheckoutHandler(d: SpaCheckoutFormValues) {
  const isOneDay = d.scheduling === "same-day";
  const services: string[] = JSON.parse(d.services);
  const filteredServices = services.map((s) => {
    if (isOneDay) return s;
    return { service_id: s, time: `${d[s + "-date"]}T${d[s + "-time"]}:00Z` };
  });
  const dates = isOneDay ? [[d.date, d.time]] : services.map((s) => [d[s + "-date"], d[s + "-time"]]) as [string, string][];

  const payload = {
    customer_name: d.full_name,
    customer_phone: d.phone,
    use_same_time_for_all: isOneDay,
    services: filteredServices,
    time: isOneDay ? `${d.date}T${d.time}:00Z` : undefined,
  };

  console.log(payload);
  // return;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/worker/create-booking/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      const errorMessage =
        response.status === 401 || response.status === 404
          ? "Invalid details. Please try again."
          : "Failed to checkout. Please check your network or try again later.";
      if (response.status === 400) {
        throw new Error(handleApiError(data));
        return;
      }
      throw new Error(errorMessage);
    }

    console.log({ data });

    if (data.customer_name && data.customer_phone) {
      return {
        success: true,
        data: {
          ...data,
          url: `/services/spa/booking-summary/${data.id}`,
          dates
        },
      };
    }
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





export const searchBookingCode = async (code: string): Promise<{ data: SingleBookingDetail[], errorMessage?: string, status: number }> => {
  try {
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/worker/search-booked-services/?code=${code}`,{
      method: "GET",
      headers: {
        'Authorization': `Token ${await getUserSession()}`,
      },
    })
    
    if (!response.ok) {
      if (response.status === 404) {
        return {
          data: [],
          errorMessage: "Booking not found",
          status: 404,
        }
      }
      throw new Error(handleApiError(await response.json()))
    }
    
    const data = (await response.json())


    return {
      data,
      status: 200,
    }
  } catch (err) {
    console.error("Error fetching code details:", err)
    return {
      data: [],
      errorMessage: err instanceof Error ? err.message : "An unexpected error occurred. Please try again.",
      status: 500,
    }
  }
}
   
