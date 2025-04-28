import ProductSkeleton from "./ProductSkeleton";

export default function ProductListSkeleton(){
    return (
        <div className="py-4 mt-5 grid grid-cols-2 md:grid-col-3 gap-4 xl:grid-cols-[repeat(auto-fill,minmax(184px,1fr))]">
            {
                Array.from({ length: 6}).map((_,i) => (
                    <ProductSkeleton key={i} />
                ))
            }
        </div>
    )
}