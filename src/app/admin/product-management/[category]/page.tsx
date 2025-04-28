import { productManagementCategories } from "@/components-data/productsManagementCategoriesLinkData";
import { sampleAdminproducts } from "@/components-data/sample-data";
import ProductManagementMC from "@/components/dashboard/admin-dashboard-components/ProductManagementMC";
import ProductListSkeleton from "@/components/loaders/ProductListSkeleton";
import { Suspense } from "react";

export default async function Page({ params }: { params: Promise<{ category: string }> }){

    const { category } = await params;

    return (
        <Suspense fallback={<ProductListSkeleton />}>
            <ProductManagementMC category={productManagementCategories.find(v => v.href === category) ? category : "luxury-category"} data={sampleAdminproducts} />
        </Suspense>
    )
}