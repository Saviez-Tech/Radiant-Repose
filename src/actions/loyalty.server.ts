"use server"

import createAxiosInstance from "@/lib/axios";

export const fetchMyWorkerProfile = async () => {
  try {
    const axios = await createAxiosInstance();
    const res = await axios.get("/api/worker/profile/");
    return { success: true, data: res.data as { id: number; name: string } };
  } catch (error: any) {
    return { success: false, data: null };
  }
};


export const fetchLuxuryTransactions = async () => {
  try {
    const axios = await createAxiosInstance();
    const res = await axios.get("/api/worker/sales");
    return { success: true, data: res.data as { id: number; created_at: string; subtotal: number }[] };
  } catch (error: any) {
    return { success: false, data: [] };
  }
};

export const claimTransactionPoints = async (data: { referral_id: string; transaction_id: number; transaction_type: string }) => {
  try {
    const axios = await createAxiosInstance();
    const res = await axios.post("/api/customers/points/claim/", data);
    return { success: true, data: res.data };
  } catch (error: any) {
    if (error.response?.data) {
      const data = error.response.data;
      const msg = data.detail || Object.values(data)[0] || "An error occurred";
      // Handle array validation errors like { "transaction_type": ["is not a valid choice"] }
      return { success: false, error: Array.isArray(msg) ? msg[0] : msg };
    }
    return { success: false, error: error.message || "An error occurred" };
  }
};

export const submitReferral = async (data: { phone_number: string; referral_code: string; staff_id?: number }) => {
  try {
    const axios = await createAxiosInstance();
    const res = await axios.post("/api/customers/referrals/submit/", data);
    return { success: true, data: res.data };
  } catch (error: any) {
    if (error.response?.data) {
      const data = error.response.data;
      const msg = data.detail || Object.values(data)[0] || "An error occurred";
      return { success: false, error: Array.isArray(msg) ? msg[0] : msg };
    }
    return { success: false, error: error.message || "An error occurred" };
  }
};

export const reducePoints = async (data: { referral_id: string; amount: number; note?: string; staff_id?: number }) => {
  try {
    const axios = await createAxiosInstance();
    const res = await axios.post("/api/customers/points/reduce/", data);
    return { success: true, data: res.data };
  } catch (error: any) {
    if (error.response?.data) {
      const data = error.response.data;
      const msg = data.detail || Object.values(data)[0] || "An error occurred";
      return { success: false, error: Array.isArray(msg) ? msg[0] : msg };
    }
    return { success: false, error: error.message || "An error occurred" };
  }
};
