import AppSelect from "@/components/custom-utils/AppSelect";
import Scalffold from "@/components/custom-utils/Scalffold";
import { Suspense } from "react";
import ServiceHeader from "./ServiceHeader";
import ProductCard from "@/components/custom-utils/ProductCard";
import { dummyProducts } from "@/components-data/sample-data";

export default function Page() {
    const products = dummyProducts
  return (
    <Scalffold>
      <div className="flex flex-col app-container py-6">
        <Suspense>
          <ServiceHeader />
        </Suspense>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 grid-cols-2  gap-4 py-5">
          {
            products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))
          }
        </div>
      </div>
    </Scalffold>
  );
}
