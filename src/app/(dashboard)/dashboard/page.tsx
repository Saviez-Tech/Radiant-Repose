import CartSection from "@/components/dashboard/CartSection";
import CategoriesTabSection from "@/components/dashboard/CategoriesTabSection";
import ProductCard from "@/components/dashboard/ProductCard";

export default function Page(){
    return (
        <main className="px-8 w-full flex gap-12 justify-between">
            <div className="flex-1">
                <div className="pt-5">
                    <h2 className="font-semibold text-primary-deepBlack">Categories</h2>
                    <CategoriesTabSection />
                </div>

                <section className="mt-14">
                    <div className="flex items-center gap-4">
                        <h2 className="font-semibold text-primary-deepBlack">Scanned Items</h2>
                        <hr className="flex-1 h-[1px] w-full bg-primary-base_color2/20" />
                    </div>

                    <div className="mt-5 grid grid-cols-1 md:grid-col-3 gap-4 xl:grid-cols-[repeat(auto-fill,minmax(184px,1fr))]">
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                </section>
            </div>

            <CartSection />
        </main>
    )
}