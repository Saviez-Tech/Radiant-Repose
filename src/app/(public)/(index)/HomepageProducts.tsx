"use client";

import ProductCard from "@/components/custom-utils/ProductCard";
import ProductCardAlreadyInCart from "@/components/custom-utils/ProductCardAlreadyInCart";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ClientLayout from "@/app/(public)/services/luxury/ClientLayout";
import { useRouter } from "next/navigation";
import { useState } from "react";

const categories = [
  { label: "All Items", value: "" },
  { label: "Kids", value: "kids" },
  { label: "Kitchen Ware", value: "kitchen ware" },
  { label: "Household Items", value: "household items" },
  { label: "Electronics & Gadgets", value: "electronics and gadgets" },
];

function HomepageProductsContent({ products }: { products: Product[] }) {
  const { cartItems } = useCart(products);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/services/luxury?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleCategoryClick = (value: string) => {
    setSearchQuery(value);
    router.push(`/services/luxury?search=${encodeURIComponent(value)}`);
  };

  return (
    <section className="app-container relative w-full px-4 py-12 md:py-16">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary-darkRed mb-2">Global Collection</h2>
          <p className="text-gray-600 text-sm md:text-base">Discover carefully selected products imported from Turkey and China, bringing quality, style, and value to your home and family.</p>
        </div>
        <Link href="/services/luxury" className="hidden md:flex items-center text-primary-darkRed font-semibold hover:underline">
          View All <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>

      {/* Search + Category Filter */}
      <div className="flex flex-col gap-4 mb-8">
        <form onSubmit={handleSearch} className="flex items-center w-full max-w-lg">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2.5 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800/60 text-sm text-gray-700 bg-white"
              aria-label="Search products"
            />
          </div>
          <button
            type="submit"
            className="bg-primary-darkRed text-white px-5 py-2.5 rounded-r-full text-sm font-medium hover:bg-primary-red transition-colors whitespace-nowrap"
          >
            Search
          </button>
        </form>

        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => handleCategoryClick(cat.value)}
              className="px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap bg-[#EFE1D2] text-primary-dark_slate/60 hover:bg-primary-darkRed hover:text-white transition-colors"
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        {products.map((product) => {
          if (!product || !product.id) return null;

          const isInCart = cartItems.some(item => item?.id === product.id);

          return isInCart ? (
            <ProductCardAlreadyInCart
              key={`in-cart-${product.id}`}
              product={product}
            />
          ) : (
            <ProductCard
              key={`regular-${product.id}`}
              product={product}
            />
          );
        })}
      </div>

      <div className="mt-8 flex justify-center md:hidden">
        <Link href="/services/luxury" className="flex items-center justify-center w-full bg-primary-darkRed text-white py-3 rounded-xl font-semibold">
          View All Products
        </Link>
      </div>
    </section>
  );
}

export default function HomepageProducts({ products }: { products: Product[] }) {
  return (
    <ClientLayout>
      <HomepageProductsContent products={products} />
    </ClientLayout>
  )
}

