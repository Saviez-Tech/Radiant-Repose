import { sampleAdminproducts } from "@/components-data/sample-data";
import ProductManagementMC from "@/components/dashboard/admin-dashboard-components/ProductManagementMC";
import { Suspense } from "react";

export default function Page(){
    return (
        <Suspense>
            <ProductManagementMC data={sampleAdminproducts} />
        </Suspense>
    )
}