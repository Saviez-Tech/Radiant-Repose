import ProductForm from "@/components/dashboard/admin-dashboard-components/ProductForm";

export default function Page(){
    return (
        <main className="">
            <h1 className="text-xl font-medium text-primary-dark_gray my-4">Add Product</h1>
            <ProductForm />
        </main>
    )
}