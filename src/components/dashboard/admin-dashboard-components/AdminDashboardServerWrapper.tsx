import axios from "axios";
import { handleApiError } from "@/lib/helperFns/handleApiErrors";
import createAxiosInstance from "@/lib/axios";
import AdminDashboardMC from "./AdminDashboardMC";
import { validateDate } from "@/lib/helperFns/formatDate";


export const revalidate = 1800 ;

const validateFilter = (filter: string | undefined) => {
  if (!filter) return "today";

  const validFilters = ['month', 'yesterday', 'week', 'today', 'yesterday']
  return validFilters.includes(filter) 
    ? (filter) 
    : 'today';
}

export async function fetchDashboardData(filter?: string, date?: string): Promise<{
  success: boolean;
  data?: {
    categorySales: SalesSummaryData;
    sales: SalesRecordList;
    totalGoodsSold: StatData;
  };
  errorMessage?: string;
}> {
  const validatedFilter = validateFilter(filter)
  const validatedDate = validateDate(date)
  
  try {
    const axiosInstance = await createAxiosInstance()
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    
    // Fetch all data concurrently for better performance
    const [categorySalesRes, salesRes, totalGoodsSoldRes] = await Promise.all([
      axiosInstance.get(`${baseUrl}/api/admin/category-sales-report/?filter=${validatedFilter}`),
      axiosInstance.get(`${baseUrl}/api/admin/sales/?date=${validatedDate}`),
      axiosInstance.get(`${baseUrl}/api/admin/total-goods-sold/?filter=${validatedFilter}`)
    ])
    
    console.log({
      categorySales: categorySalesRes.data,
      sales: salesRes.data,
      totalGoodsSold: totalGoodsSoldRes.data
    })
    return {
      success: true,
      data: {
        categorySales: categorySalesRes.data,
        sales: salesRes.data,
        totalGoodsSold: totalGoodsSoldRes.data
      }
    };
  } catch (err) {
    let errorMessage = "An error occurred while fetching dashboard data";
    
    if (axios.isAxiosError(err)) {
      if (err.response) {
        errorMessage = handleApiError(err.response.data);
      } else if (err.request) {
        console.error("Request failed:", err.request);
        errorMessage = "Network request failed. Please check your connection.";
      } else {
        errorMessage = `Request error: ${err.message}`;
      }
    } else if (err instanceof Error) {
      console.error("Non-Axios error:", err);
      errorMessage = err.message;
    }
    
    return {
      success: false,
      errorMessage
    }
  }
}




export default async function AdminDashboardServerWrapper({ date, filter = "month" }:{ filter: DateFilter, date: string }) {
    const { success, data, errorMessage } = await fetchDashboardData(filter,date)
    
    if (!success) {
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-md">
          <h3 className="text-red-600 font-medium mb-2">Error Loading Dashboard Data</h3>
          <p className="text-red-500">{errorMessage}</p>
        </div>
      )
    }
    
    return <AdminDashboardMC data={{...data!, filter }} />
}