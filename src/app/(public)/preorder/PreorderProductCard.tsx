import { PreorderProduct } from "@/actions/preorder.server";
import { formatNaira } from "@/lib/helperFns/formatNumber";
import { dm_mono } from "@/fonts";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Clock } from "lucide-react";

export default function PreorderProductCard({
  product,
}: {
  product: PreorderProduct;
}) {
  const originalPrice = parseFloat(product.price);
  const preorderPrice = parseFloat(product.preorder_price);
  const hasDiscount = preorderPrice > 0 && preorderPrice < originalPrice;
  const savingsPct = hasDiscount
    ? Math.round(((originalPrice - preorderPrice) / originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
      {/* Discount badge */}
      {hasDiscount && (
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-primary-darkRed text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow">
          {savingsPct}% OFF
        </div>
      )}

      {/* Pre-order badge */}
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 flex items-center gap-1 bg-primary-yellow text-white text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow">
        <Clock size={10} />
        PRE-ORDER
      </div>

      {/* Image */}
      <div className="relative h-36 sm:h-48 w-full overflow-hidden bg-gray-50 flex-shrink-0">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        ) : (
          <Skeleton className="w-full h-full" />
        )}
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-primary-deepBlack/0 group-hover:bg-primary-deepBlack/10 transition-all duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-3 sm:p-4 gap-2 sm:gap-3">
        {/* Category */}
        <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-primary-yellow truncate">
          {product.category}
        </span>

        {/* Name */}
        <h3 className="text-xs sm:text-sm font-bold text-primary-deepBlack leading-snug line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-[11px] sm:text-xs text-primary-text_stone_color line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Pricing */}
        <div className="flex flex-col gap-0.5 mt-auto">
          {hasDiscount && (
            <span
              className={`${dm_mono.className} text-[10px] sm:text-xs text-gray-400 line-through`}
            >
              {formatNaira(product.price, true, true)}
            </span>
          )}
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span
              className={`${dm_mono.className} text-sm sm:text-base font-semibold text-primary-darkRed`}
            >
              {hasDiscount
                ? formatNaira(product.preorder_price, true, true)
                : formatNaira(product.price, true, true)}
            </span>
            {hasDiscount && (
              <span className="text-[9px] sm:text-[10px] text-primary-yellow font-medium">
                pre-order price
              </span>
            )}
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/preorder/${product.id}`}
          id={`preorder-btn-${product.id}`}
          className="mt-1 flex items-center justify-center gap-1.5 w-full bg-gradient-to-r from-primary-darkRed to-primary-red text-white text-[11px] sm:text-xs font-semibold py-2 sm:py-2.5 rounded-xl hover:opacity-90 active:scale-95 transition-all duration-200 shadow-sm"
        >
          Pre-Order Now
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
