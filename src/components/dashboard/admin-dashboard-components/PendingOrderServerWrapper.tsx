import axios from "axios";
import { handleApiError } from "@/lib/helperFns/handleApiErrors";
import createAxiosInstance from "@/lib/axios";
import PendingOrderMC from "./PendingOrderMC";


async function fetchOrderListData() {
  try {
    const axiosInstance = await createAxiosInstance()
    const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/api/ecommerce/buyers/pending/`)
    return {
      success: true,
      data: res.data as OrderList[]
    }
  } catch (err) {

    let errorMessage = "An Error Occurred";
    if (axios.isAxiosError(err)) {
      if (err.response) {
        errorMessage = handleApiError(err.response.data)
      } else if (err.request) {
        console.log(err.request);
        errorMessage = "Request Failed";
      } else {
        errorMessage = err.message;
      }
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }
    return {
      success: false,
      errorMessage
    }
  }
}


export default async function PendingOrderServerWrapper() {
    const { success, data, errorMessage } = await fetchOrderListData()
    
    if (!success) {
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-md">
          <h3 className="text-red-600 font-medium mb-2">Error Loading Pending Order List</h3>
          <p className="text-red-500">{errorMessage}</p>
        </div>
      )
    }
    
    return <PendingOrderMC data={data || []} />
  }