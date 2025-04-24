import AddProductForm from "@/components/dashboard/admin-dashboard-components/AddProductForm";

export default function Page(){
    return (
        <main className="px-8 py-3 flex flex-col gap-5">
            <h1 className="text-2xl font-semibold text-primary-dark_gray">Edit Product</h1>
            <AddProductForm />
        </main>
    )
}