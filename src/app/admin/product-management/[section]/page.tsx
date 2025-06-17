import ProductManagementServerWrapper from "@/components/dashboard/admin-dashboard-components/ProductManagementServerWrapper";
import ProductListSkeleton from "@/components/loaders/ProductListSkeleton";
import { Suspense } from "react";

type SectionType = "luxury-collection" | "spa-collection" | "pharmacy-collection";

export default async function Page({ params }: { params: Promise<{ section: string }> }){

    const { section } = await params;

    const validSections: SectionType[] = ["luxury-collection", "spa-collection", "pharmacy-collection"];
    const sectionValue: SectionType = validSections.includes(section as SectionType) ? (section as SectionType) : "luxury-collection";

    return (
        <Suspense fallback={<ProductListSkeleton />}>
            <ProductManagementServerWrapper section={sectionValue} />
        </Suspense>
    )
}