"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { Provider } from "react-redux";
import { store } from "@/store";
import SpinnerLoader from "@/components/loaders/SpinnerLoader";

const CART_COLOR = "#E0342D";

interface FloatingCartProps {
  href?: string;
}

function FloatingCartInner({
  href = "/services/luxury/cart",
}: FloatingCartProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const { items } = useCart();
  const itemCount = items?.length || 0;
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  if (!mounted) return null;

  return (
    <Link
      href={href}
      onClick={() => {
        if (pathname !== href) {
          setIsNavigating(true);
        }
      }}
      aria-label={`View cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
      className="fixed z-[99999] flex items-center justify-center rounded-2xl shadow-lg hover:shadow-xl transition-all duration-150 bottom-4 right-4 sm:bottom-6 sm:right-6 w-[50px] h-[50px] sm:w-[56px] sm:h-[56px]"
      style={{
        background: CART_COLOR,
        transform: isHovered ? 'translateY(-2px) scale(1.04)' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      suppressHydrationWarning
    >
      {isNavigating ? (
        <SpinnerLoader className="scale-[0.4]" />
      ) : (
        <svg
          className="w-6 h-6 sm:w-[26px] sm:h-[26px]"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13L5.4 5M7 13l-1.5 3H17M9 21a1 1 0 100-2 1 1 0 000 2zM18 21a1 1 0 100-2 1 1 0 000 2z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {!isNavigating && itemCount > 0 && (
        <span
          className="absolute -top-1.5 -right-1.5 min-w-[22px] h-[22px] px-1.5 rounded-full bg-white flex items-center justify-center shadow-md text-xs font-bold"
          style={{ color: CART_COLOR }}
        >
          {itemCount}

        </span>
      )}
    </Link>
  );
}

export default function FloatingCart(props: FloatingCartProps) {
  return (
    <Provider store={store}>
      <FloatingCartInner {...props} />
    </Provider>
  );
}