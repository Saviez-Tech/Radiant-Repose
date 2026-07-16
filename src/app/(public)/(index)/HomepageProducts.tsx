"use client";

import ProductCard from "@/components/custom-utils/ProductCard";
import ProductCardAlreadyInCart from "@/components/custom-utils/ProductCardAlreadyInCart";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ClientLayout from "@/app/(public)/services/luxury/ClientLayout";

function HomepageProductsContent({ products }: { products: Product[] }) {
  const { cartItems } = useCart(products);

  return (
    <section className="app-container relative w-full px-4 py-12 md:py-16">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary-darkRed mb-2">Global Collection</h2>
          <p className="text-gray-600 text-sm md:text-base">Discover carefully selected products imported from Turkey and China, bringing quality, style, and value to your home and family.</p>
        </div>
        <Link href="/services/luxury" className="hidden md:flex items-center text-primary-darkRed font-semibold hover:underline">
          View All <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
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
