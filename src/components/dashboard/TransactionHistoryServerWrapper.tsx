import createAxiosInstance from "@/lib/axios";
import TransactionHistoryClientContainer from "./TransactionHistoryClientContainer";
import axios from "axios";
import { handleApiError } from "@/lib/helperFns/handleApiErrors";
import { redirect } from "next/navigation";

const handleFetchTransactionHistory = async(userID: string ) => {

    if (!userID){
        redirect("/pos/categories")
    }

    try{
        const axiosInstance = await createAxiosInstance()
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;

        const res = await axiosInstance.get(`${baseUrl}/api/worker/sales`)
        return {
            data: res.data,
            success: true
        }
    }
    catch (err) {
        let errorMessage = "An error occurred while fetching transaction history";
        if (axios.isAxiosError(err)) {
          if (err.response) {
            errorMessage = handleApiError(err.response.data)
          } else if (err.request) {
            console.error("Request failed:", err.request);
            errorMessage = "Network request failed. Please check your connection.";
          } else {
            errorMessage = `Request error: ${err.message}`;
          }
        } else if (err instanceof Error) {
          console.error("Non-Axios error:", err)
          errorMessage = err.message;
        }
        
        return {
          success: false,
          errorMessage
        }
    }
}


export default async function TransactionHistoryServerWrapper({ userID }:{ userID: string }){
    
    const { data, success, errorMessage } = await handleFetchTransactionHistory(userID)

    if (!success) {
        return (
          <div className="p-6 bg-red-50 border border-red-200 rounded-md mt-10">
            <h3 className="text-red-600 font-medium mb-2">Error Loading Transaction History</h3>
            <p className="text-red-500">{errorMessage}</p>
          </div>
        )
    }
    
    return (
        <TransactionHistoryClientContainer data={data}  />
    )
}