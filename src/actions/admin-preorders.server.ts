"use server";

import createAxiosInstance from "@/lib/axios";
import { handleApiError } from "@/lib/helperFns/handleApiErrors";
import axios from "axios";
import { revalidatePath } from "next/cache";

export type AdminPreorder = {
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
  status: string; // e.g. "pending", "delivered"
  payment: boolean;
  created_at: string;
};

export async function fetchAdminPreorders(): Promise<{
  success: boolean;
  data?: AdminPreorder[];
  errorMessage?: string;
}> {
  try {
    const axiosInstance = await createAxiosInstance();
    const res = await axiosInstance.get("/api/admin/preorders/");

    // Ensure response data is an array
    const data = Array.isArray(res.data)
      ? res.data
      : (res.data?.results || res.data?.data || []);

    return {
      success: true,
      data: data as AdminPreorder[],
    };
  } catch (err) {
    let errorMessage = "An error occurred while fetching pre-orders";
    if (axios.isAxiosError(err)) {
      if (err.response?.data) {
        errorMessage = handleApiError(err.response.data);
      } else if (err.message) {
        errorMessage = err.message;
      }
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }
    console.error("[fetchAdminPreorders]", errorMessage);
    return {
      success: false,
      errorMessage,
    };
  }
}

export async function deliverPreorder(preorderId: number | string): Promise<{
  success: boolean;
  data?: any;
  error?: string;
}> {
  try {
    const axiosInstance = await createAxiosInstance();
    const res = await axiosInstance.patch(
      `/api/admin/preorders/${preorderId}/deliver/`,
      {}
    );
    revalidatePath("/admin/preorders");
    return {
      success: true,
      data: res.data,
    };
  } catch (err) {
    let error = "Failed to mark pre-order as delivered";
    if (axios.isAxiosError(err)) {
      if (err.response?.data) {
        error = handleApiError(err.response.data);
      } else if (err.message) {
        error = err.message;
      }
    } else if (err instanceof Error) {
      error = err.message;
    }
    console.error("[deliverPreorder]", error);
    return {
      success: false,
      error,
    };
  }
}
