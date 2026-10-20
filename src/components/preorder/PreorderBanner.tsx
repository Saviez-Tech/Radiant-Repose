import Link from "next/link";
import { ArrowRight, Clock, Sparkles } from "lucide-react";

interface PreorderBannerProps {
  className?: string;
  variant?: "hero" | "compact";
}

export default function PreorderBanner({
  className = "",
  variant = "hero",
}: PreorderBannerProps) {
  if (variant === "compact") {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#FFF5EC] via-[#FDF2E8] to-[#FCE7D6] border border-[#F2DAC4] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all ${className}`}
      >
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-primary-yellow/15 text-primary-yellow flex items-center justify-center shrink-0">
            <Clock size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary-yellow bg-amber-100/80 px-2 py-0.5 rounded-full">
                Early Access
              </span>
              <h4 className="text-sm sm:text-base font-bold text-primary-deepBlack">
                Looking for Upcoming Arrivals?
              </h4>
            </div>
            <p className="text-xs text-primary-text_stone_color mt-0.5 leading-relaxed">
              Reserve products at exclusive discounted pre-order prices before they go live.
            </p>
          </div>
        </div>

        <Link
          href="/preorder"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary-darkRed text-white text-xs font-semibold hover:bg-primary-red transition-all shadow-sm active:scale-95 shrink-0"
        >
          <span>Explore Pre-Orders</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FFF6ED] via-[#FDF1E5] to-[#FAE4D0] border border-[#F0D5BE] p-6 sm:p-8 shadow-sm hover:shadow-md transition-all ${className}`}
    >
      {/* Subtle decorative circles */}
      <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-primary-yellow/10 pointer-events-none" />
      <div className="absolute -left-6 -bottom-6 w-28 h-28 rounded-full bg-primary-darkRed/5 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4 max-w-xl">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-yellow to-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
            <Clock size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary-darkRed bg-red-100/80 px-2.5 py-0.5 rounded-full">
                <Sparkles size={11} />
                Upcoming Pre-Orders
              </span>
              <span className="text-[10px] text-primary-yellow font-bold uppercase tracking-wider hidden sm:inline">
                Limited Allocations
              </span>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-primary-deepBlack leading-snug">
              Reserve Upcoming Products Before Stock Arrives
            </h3>
            <p className="text-xs sm:text-sm text-primary-text_stone_color mt-1.5 leading-relaxed">
              Lock in discounted pre-order pricing on new shipments from Turkey & China. Secure your reservation now and we&apos;ll ship directly to you on arrival.
            </p>
          </div>
        </div>

        <Link
          href="/preorder"
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary-darkRed to-primary-red text-white text-sm font-semibold hover:opacity-95 transition-all shadow-md active:scale-95 shrink-0"
        >
          <span>Browse Pre-Orders</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
