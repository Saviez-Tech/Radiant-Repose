import ProductListSkeleton from "@/components/loaders/ProductListSkeleton";
import SpaListingServerWrapper from "@/components/spa/SpaListingServerWrapper";
import { Suspense } from "react";

export default function Page() {
    return (
        <main className="">
            <Suspense fallback={
                <div className="space-for-header app-container">
                    <ProductListSkeleton />
                </div>
            }>
                <SpaListingServerWrapper/>
            </Suspense>
        </main>
    )
}