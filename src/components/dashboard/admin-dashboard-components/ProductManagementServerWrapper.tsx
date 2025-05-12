import axios from "axios";
import { handleApiError } from "@/lib/helperFns/handleApiErrors";
import createAxiosInstance from "@/lib/axios";
import ProductManagementMC from "./ProductManagementMC";


 export  async function fetchProductsData() {
    try {
      const axiosInstance = await createAxiosInstance()
      const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/products`)
      return {
        success: true,
        data: res.data
      }
    } catch (err) {
      let errorMessage = "An Error Occurred";
      console.log(err)
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

export default async function ProductManagementServerWrapper({ section }:{ section: string}) {
    const { success, data, errorMessage } = await fetchProductsData()
    
    if (!success) {
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-md">
          <h3 className="text-red-600 font-medium mb-2">Error Loading Products Data</h3>
          <p className="text-red-500">{errorMessage}</p>
        </div>
      )
    }
    
    return <ProductManagementMC data={data || []} section={section} />
  }