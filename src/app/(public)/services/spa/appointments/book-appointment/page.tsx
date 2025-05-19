import ProductListSkeleton from "@/components/loaders/ProductListSkeleton";
import BookAppointmentServerWrapper from "@/components/spa/BookAppointmentPageServer";
import { Suspense } from "react";

export default function Page(){
    return (
        <main className="">
            <Suspense fallback={
                <div className="space-for-header app-container">
                    <ProductListSkeleton />
                </div>
            }>
                <BookAppointmentServerWrapper />
            </Suspense>
        </main>
    )
}