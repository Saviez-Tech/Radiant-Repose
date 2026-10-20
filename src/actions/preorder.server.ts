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
    note: string;
    status: string;
    payment: boolean;
    created_at: string;
  };
  payment?: {
    status: boolean;
    message: string;
    data?: {
      authorization_url: string;
      access_code: string;
      reference: string;
    };
  };
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
