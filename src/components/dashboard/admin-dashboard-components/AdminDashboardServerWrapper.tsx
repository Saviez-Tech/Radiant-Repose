import axios from "axios";
import { handleApiError } from "@/lib/helperFns/handleApiErrors";
import createAxiosInstance from "@/lib/axios";
import AdminDashboardMC from "./AdminDashboardMC";
import { dateToString } from "@/lib/helperFns/formatDate";
import { fetchStoreBranches } from "@/actions/auth.server";


export const revalidate = 1800 ;

export async function fetchDashboardData(filter?: string, branchID?: string): Promise<{
  success: boolean;
  data?: {
    categorySales: SalesSummaryData;
    sales: SalesRecordList;
    totalGoodsSold: StatData;
  };
  errorMessage?: string;
}> {
 
  try {
    const axiosInstance = await createAxiosInstance()
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    
    // Determine if we should use spa or luxury endpoints
    let apiPath = 'admin'; // Default to luxury
    
    if (branchID) {
      // Fetch branches to determine the type
      const { data: branches, success: branchSuccess } = await fetchStoreBranches()
      
      if (branchSuccess && branches) {
        const branchIdNum = parseInt(branchID);
        const branch = branches.find((branch: Branch) => branch.id === branchIdNum);
        
        // Check if branch name contains 'spa' to determine API path
        if (branch && branch.name.toLowerCase().includes('spa')) {
          apiPath = 'admin/spa';
        }
        // If branch contains 'luxury' or no keywords found, keep default 'admin'
      }
    }
   
    const [categorySalesRes, salesRes, totalGoodsSoldRes] = await Promise.all([
      axiosInstance.get(`${baseUrl}/api/${apiPath}/category-sales-report/?filter=${filter}`),
      axiosInstance.get(`${baseUrl}/api/${apiPath}/sales/?date=${filter}`),
      axiosInstance.get(`${baseUrl}/api/${apiPath}/total-goods-sold/?filter=${filter}`)
    ])
    
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
        console.log(err.response.data)
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



export default async function AdminDashboardServerWrapper({ branchID,  filter = dateToString(new Date())}:{ filter: string, branchID?: string }) {
    const { success, data, errorMessage } = await fetchDashboardData(filter, branchID)

    console.log(data)
    
    if (!success) {
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-md">
          <h3 className="text-red-600 font-medium mb-2">Error Loading Dashboard Data</h3>
          <p className="text-red-500">{errorMessage}</p>
        </div>
      )
    }
    
    return <AdminDashboardMC branchID={branchID} data={{...data!, filter }} />
}