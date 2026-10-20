import { fetchPreorderProducts } from "@/actions/preorder.server";
import Scalffold from "@/components/custom-utils/Scalffold";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNaira } from "@/lib/helperFns/formatNumber";
import { dm_mono } from "@/fonts";
import { Clock, Package, ShieldCheck, Truck } from "lucide-react";
import PreorderForm from "./PreorderForm";
import { Suspense } from "react";
import PreorderSuccessfulModal from "@/components/modals/PreorderSuccessfulModal";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return {
    title: `Pre-Order Product #${id} | Radiant Repose`,
    description: "Complete your pre-order — enter your details and reserve this product at a discounted price.",
  };
}

export default async function PreorderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { success, data, errorMessage } = await fetchPreorderProducts();

  if (!success) {
    return (
      <Scalffold>
        <div className="app-container py-12 flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-red-500 text-center">{errorMessage}</p>
        </div>
      </Scalffold>
    );
  }

  const product = (data ?? []).find((p) => String(p.id) === id);
  if (!product) return notFound();

  const originalPrice = parseFloat(product.price);
  const preorderPrice = parseFloat(product.preorder_price);
  const hasDiscount = preorderPrice > 0 && preorderPrice < originalPrice;
  const savingsPct = hasDiscount
    ? Math.round(((originalPrice - preorderPrice) / originalPrice) * 100)
    : 0;
  const savings = hasDiscount ? originalPrice - preorderPrice : 0;

  return (
    <Scalffold>
      <div className="app-container py-10 relative z-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-primary-text_stone_color mb-8 flex gap-2">
          <a href="/" className="hover:text-primary-darkRed transition-colors">Home</a>
          <span>/</span>
          <a href="/preorder" className="hover:text-primary-darkRed transition-colors">Pre-Order</a>
          <span>/</span>
          <span className="text-primary-deepBlack font-medium truncate max-w-[160px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* ── Left: Product summary ── */}
          <div className="flex flex-col gap-6">
            {/* Image */}
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-gray-50 shadow-md">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <Skeleton className="w-full h-full" />
              )}
              {/* Pre-order ribbon */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-primary-yellow text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                <Clock size={12} />
                PRE-ORDER
              </div>
              {hasDiscount && (
                <div className="absolute top-4 right-4 bg-primary-darkRed text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  {savingsPct}% OFF
                </div>
              )}
            </div>

            {/* Product info card */}
            <div className="bg-white rounded-2xl p-6 shadow border border-gray-100 flex flex-col gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary-yellow">
                  {product.category}
                </span>
                <h1 className="text-xl md:text-2xl font-bold text-primary-deepBlack mt-1 leading-snug">
                  {product.name}
                </h1>
                <p className="text-sm text-primary-text_stone_color mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Pricing block */}
              <div className="bg-primary-light_peach rounded-xl p-4 flex flex-col gap-1">
                {hasDiscount && (
                  <div className="flex items-center gap-3">
                    <span className={`${dm_mono.className} text-sm text-gray-400 line-through`}>
                      {formatNaira(product.price, true, true)}
                    </span>
                    <span className="text-[10px] font-semibold text-primary-darkRed bg-red-100 px-2 py-0.5 rounded-full">
                      Save {formatNaira(savings, true, true)}
                    </span>
                  </div>
                )}
                <div className="flex items-baseline gap-2">
                  <span className={`${dm_mono.className} text-2xl font-bold text-primary-darkRed`}>
                    {hasDiscount
                      ? formatNaira(product.preorder_price, true, true)
                      : formatNaira(product.price, true, true)}
                  </span>
                  {hasDiscount && (
                    <span className="text-xs text-primary-yellow font-medium">
                      pre-order price
                    </span>
                  )}
                </div>
              </div>

              {/* Trust signals */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { icon: ShieldCheck, label: "Secure payment" },
                  { icon: Truck, label: "Delivered to you" },
                  { icon: Package, label: "Ships when ready" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1 text-center">
                    <Icon size={18} className="text-primary-darkRed" />
                    <span className="text-[10px] text-primary-text_stone_color font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Order form ── */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-primary-yellow font-semibold text-xs uppercase tracking-widest mb-1">
                Complete Your Reservation
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-primary-deepBlack">
                Pre-Order Details
              </h2>
              <p className="text-sm text-primary-text_stone_color mt-1">
                Fill in your details below to secure your pre-order. We&apos;ll
                notify you once your item is ready to ship.
              </p>
            </div>

            <PreorderForm product={product} />
          </div>
        </div>
      </div>
      <Suspense fallback={null}>
        <PreorderSuccessfulModal />
      </Suspense>
    </Scalffold>
  );
}
