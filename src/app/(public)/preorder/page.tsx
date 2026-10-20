import { fetchPreorderProducts } from "@/actions/preorder.server";
import Scalffold from "@/components/custom-utils/Scalffold";
import PreorderProductCard from "./PreorderProductCard";
import PreorderSearchBar from "./PreorderSearchBar";
import { Package } from "lucide-react";
import { Suspense } from "react";
import PreorderSuccessfulModal from "@/components/modals/PreorderSuccessfulModal";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Pre-Order | Radiant Repose",
  description:
    "Reserve upcoming products at exclusive pre-order prices before they go live. Get early access to our latest arrivals.",
};

export default async function PreorderPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const { success, data, errorMessage } = await fetchPreorderProducts(q);

  if (!success) {
    return (
      <Scalffold>
        <div className="app-container py-12 flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-red-500 text-center">{errorMessage}</p>
        </div>
      </Scalffold>
    );
  }

  const products = data ?? [];

  return (
    <Scalffold>
      <div className="app-container py-10 relative z-10">
        {/* Page header */}
        <div className="mb-10">
          <p className="text-primary-yellow font-semibold text-xs uppercase tracking-widest mb-2">
            Reserve Before They Arrive
          </p>
          <h1 className="text-2xl md:text-4xl font-bold text-primary-deepBlack">
            Pre-Order <span className="text-primary-darkRed">Products</span>
          </h1>
          <p className="text-primary-text_stone_color mt-3 max-w-xl text-sm md:text-base">
            Lock in the best price before stock arrives. Browse our upcoming
            products and place your pre-order today — we&apos;ll handle the rest.
          </p>
        </div>

        {/* Search Bar */}
        <Suspense fallback={<div className="h-10 w-full max-w-xl bg-gray-100 rounded-full animate-pulse mb-8" />}>
          <PreorderSearchBar />
        </Suspense>

        {/* Info banner */}
        <div className="flex items-start gap-3 bg-primary-light_peach border border-primary-light_amber/40 rounded-2xl px-5 py-4 mb-10 max-w-2xl">
          <Package className="text-primary-yellow mt-0.5 shrink-0" size={20} />
          <p className="text-sm text-primary-grayDark leading-relaxed">
            Pre-orders are charged at a{" "}
            <strong className="text-primary-darkRed">discounted pre-order price</strong>.
            Your item ships as soon as stock is confirmed. You will be notified via
            email and phone.
          </p>
        </div>

        {/* Products grid - 2 per line on mobile, 3 on md, 4 on lg */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Package size={48} className="text-primary-lightGray" />
            <p className="text-primary-text_stone_color text-center text-sm">
              No pre-order products available right now. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {products.map((product) => (
              <PreorderProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      <Suspense fallback={null}>
        <PreorderSuccessfulModal />
      </Suspense>
    </Scalffold>
  );
}
