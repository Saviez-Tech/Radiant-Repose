import Scalffold from "@/components/custom-utils/Scalffold";
import { fetchProductsData } from "@/components/dashboard/admin-dashboard-components/ProductManagementServerWrapper";
import { Suspense } from "react";
import Products from "./Products";
// import ServiceHeader from "./ServiceHeader";

export default async function Page() {

  const { success, data, errorMessage } = await fetchProductsData()
  
  if (!success) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-md">
        <h3 className="text-red-600 font-medium mb-2">Error Loading Products Data</h3>
        <p className="text-red-500">{errorMessage}</p>
      </div>
    )
  }

    
  
  return (
    <Scalffold>
      <div className="flex flex-col app-container py-6">
        <Suspense>
          <Products products={data} />
        </Suspense>
      </div>
    </Scalffold>
  )
}
