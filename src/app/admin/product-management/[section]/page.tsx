import { productManagementSections } from "@/components-data/productsManagementSectionsLinkData";
import ProductManagementServerWrapper from "@/components/dashboard/admin-dashboard-components/ProductManagementServerWrapper";
import ProductListSkeleton from "@/components/loaders/ProductListSkeleton";
import { Suspense } from "react";

export default async function Page({ params }: { params: Promise<{ section: string }> }){

    const { section } = await params;

    return (
        <Suspense fallback={<ProductListSkeleton />}>
            <ProductManagementServerWrapper section={productManagementSections.find(v => v.href === section) ? section : "luxury-collection"} />
        </Suspense>
    )
}