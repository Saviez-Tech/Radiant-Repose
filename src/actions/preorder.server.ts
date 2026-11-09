"use server";

import { handleApiError } from "@/lib/helperFns/handleApiErrors";

export type PreorderFormValues = {
  full_name: string;
  email: string;
  phone: string;
  street_address: string;
  zip_code: string;
  city: string;
  state: string;
  country: string;
  product: number;
  quantity: number;
  note?: string;
  payment_option?: "installments" | "full";
};

export type PreorderApiResponse = {
  preorder?: {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    street_address: string;
    zip_code: string;
    city: string;
    state: string;
    country: string;
    reference: string;
    product: number;
    quantity: number;
    price_at_order: string;
    total_amount?: string;
    amount_paid?: string;
    balance_due?: string;
    payment_option?: "installments" | "full";
    note: string;
    status: string;
    payment: boolean;
    created_at: string;
  };
  payment?: {
    status: boolean;
    message?: string;
    data?: {
      authorization_url: string;
      access_code?: string;
      reference: string;
    };
  };
  tracking_url?: string;
};

export type PreorderTrackData = {
  preorder: {
    product_name: string;
    quantity: number;
    price_at_order: string;
    total_amount: string;
    amount_paid: string;
    balance_due: string;
    payment_option: "installments" | "full" | string;
    payment: boolean;
    status: string;
    created_at: string;
    full_name?: string;
    email?: string;
    phone?: string;
    street_address?: string;
    city?: string;
    state?: string;
    country?: string;
    zip_code?: string;
    reference?: string;
  };
  payments: Array<{
    amount: string;
    status: string;
    created_at: string;
    paid_at?: string | null;
    reference?: string;
  }>;
  payment_choices: Array<"installment" | "remaining" | string>;
};

export type PreorderNextPaymentResponse = {
  reference: string;
  amount: string;
  authorization_url: string;
};

export type PreorderVerifyResponse = {
  status: string;
  reference: string;
  amount: number;
  currency: string;
  email: string;
  transaction_date: string;
  gateway_response: string;
};

export type PreorderProduct = {
  id: number;
  name: string;
  image: string | null;
  image_url: string;
  category: string;
  description: string;
  price: string;
  stock_quantity: number;
  barcode: string;
  preorder: boolean;
  preorder_price: string;
  branch: number;
};

export async function fetchPreorderProducts(query?: string): Promise<{
  success: boolean;
  data?: PreorderProduct[];
  errorMessage?: string;
}> {
  try {
    const trimmed = query?.trim();
    const url = trimmed
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/ecommerce/products/preorder/search/?q=${encodeURIComponent(trimmed)}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/ecommerce/products/preorder/`;

    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...(trimmed ? { cache: "no-store" } : { next: { revalidate: 300 } }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const list = Array.isArray(data) ? data : data?.results || [];
    return { success: true, data: list };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An Error Occurred";
    console.error("[fetchPreorderProducts]", errorMessage);
    return { success: false, errorMessage };
  }
}

export async function searchPreorderProducts(query: string): Promise<{
  success: boolean;
  data?: PreorderProduct[];
  errorMessage?: string;
}> {
  return fetchPreorderProducts(query);
}

export async function submitPreorder(d: PreorderFormValues): Promise<{
  success: boolean;
  data?: PreorderApiResponse;
  authorizationUrl?: string;
  trackingUrl?: string;
  error?: string;
}> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/ecommerce/preorders/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: d.full_name,
          email: d.email,
          phone: d.phone,
          street_address: d.street_address,
          zip_code: d.zip_code,
          city: d.city,
          state: d.state,
          country: d.country,
          product: Number(d.product),
          quantity: Number(d.quantity),
          note: d.note ?? "",
          payment_option: d.payment_option || "installments",
        }),
      }
    );

    const data: PreorderApiResponse = await response.json();

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error(handleApiError(data));
      }
      throw new Error(
        "Failed to submit preorder. Please check your network and try again."
      );
    }

    const authorizationUrl = data?.payment?.data?.authorization_url;

    return {
      success: true,
      data,
      authorizationUrl,
      trackingUrl: data?.tracking_url,
    };
  } catch (error) {
    console.error("Preorder error:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to submit preorder. Please try again.",
      success: false,
    };
  }
}

export async function fetchPreorderTrack(token: string): Promise<{
  success: boolean;
  data?: PreorderTrackData;
  error?: string;
  statusCode?: number;
}> {
  try {
    const rawToken = token ? decodeURIComponent(token).trim() : "";
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");
    const url = `${baseUrl}/api/ecommerce/preorders/track/${rawToken}/`;
    console.log("[fetchPreorderTrack] Fetching URL:", url);

    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("[fetchPreorderTrack] Response not ok:", res.status, data);
      const errorMsg =
        (data && handleApiError(data)) ||
        (res.status === 404 ? "Tracking record not found" : `Failed to load tracking info (Status ${res.status})`);
      return {
        success: false,
        error: errorMsg,
        statusCode: res.status,
      };
    }

    return {
      success: true,
      data: data as PreorderTrackData,
    };
  } catch (err) {
    console.error("[fetchPreorderTrack] error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to load preorder tracking.",
    };
  }
}

export async function initiatePreorderNextPayment(
  token: string,
  paymentChoice: "installment" | "remaining"
): Promise<{
  success: boolean;
  data?: PreorderNextPaymentResponse;
  error?: string;
  statusCode?: number;
}> {
  try {
    const rawToken = token ? decodeURIComponent(token).trim() : "";
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");
    const url = `${baseUrl}/api/ecommerce/preorders/track/${rawToken}/payments/`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        payment_choice: paymentChoice,
      }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      let errorMsg = data ? handleApiError(data) : "Failed to initiate payment";
      if (res.status === 409) {
        errorMsg = (data && handleApiError(data)) || "No remaining balance to pay.";
      } else if (res.status === 502) {
        errorMsg = "Payment gateway is temporarily unavailable. Please try again shortly.";
      } else if (res.status === 404) {
        errorMsg = "Preorder tracking link is invalid or expired.";
      }
      return {
        success: false,
        error: errorMsg,
        statusCode: res.status,
      };
    }

    return {
      success: true,
      data: data as PreorderNextPaymentResponse,
    };
  } catch (err) {
    console.error("[initiatePreorderNextPayment] error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "An unexpected error occurred",
    };
  }
}

export async function verifyPreorderPayment(reference: string): Promise<{
  success: boolean;
  data?: PreorderVerifyResponse;
  error?: string;
  statusCode?: number;
}> {
  try {
    const rawRef = reference ? decodeURIComponent(reference).trim() : "";
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");
    const url = `${baseUrl}/api/ecommerce/preorders/verify/${rawRef}/`;
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      let errorMsg = data ? handleApiError(data) : "Payment verification failed";
      if (res.status === 404) {
        errorMsg = "Payment reference not found.";
      } else if (res.status === 400) {
        errorMsg = (data && handleApiError(data)) || "Invalid payment reference or payment was unsuccessful.";
      } else if (res.status === 502) {
        errorMsg = "Payment gateway is temporarily unavailable. Please try again shortly.";
      }
      return {
        success: false,
        error: errorMsg,
        statusCode: res.status,
      };
    }

    return {
      success: true,
      data: data as PreorderVerifyResponse,
    };
  } catch (err) {
    console.error("[verifyPreorderPayment] error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to verify payment.",
    };
  }
}
