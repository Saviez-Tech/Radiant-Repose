import axios from "axios";
import { handleApiError } from "@/lib/helperFns/handleApiErrors";
import createAxiosInstance from "@/lib/axios";
import SpaListingMC from "./SpaListingMC";


  async function fetchServicesData() {
  try {
    const axiosInstance = await createAxiosInstance()
    const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/api/worker/services/`)
    
    return {
      success: true,
      data: res.data
    }
  } catch (err) {
    let errorMessage = "An Error Occurred";
    console.log(err)
    if (axios.isAxiosError(err)) {
      if (err.response) {
        errorMessage = handleApiError("Something went wrong")
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

export default async function SpaListingServerWrapper() {
  const { success, data, errorMessage } = await fetchServicesData()
  
  if (!success) {
    return (
      <div className="glob-px !py-40 bg-red-50 border border-red-200 rounded-md justify-center flex flex-col items-center">
        <h3 className="text-red-600 font-medium mb-2">Error Loading Services</h3>
        <p className="text-red-500">{errorMessage}</p>
      </div>
    )
  }
  
  return <SpaListingMC data={data || []} />
}