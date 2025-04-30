import ProductForm from "@/components/dashboard/admin-dashboard-components/ProductForm";

export default function Page(){
    return (
        <main className="w-full pt-10 app-container">
            <h1 className="text-xl font-medium text-primary-dark_gray">Add Product</h1>
            <ProductForm formActionType="add" />
        </main>
    )
}