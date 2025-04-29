import ProductForm from "@/components/dashboard/admin-dashboard-components/ProductForm";
import StaffForm from "@/components/dashboard/admin-dashboard-components/SaffForm";

export default function Page(){
    return (
        <main className="w-full pt-20 max-md:pt-28">
            <h1 className="text-xl font-medium text-primary-dark_gray">Edit Staff</h1>
            <StaffForm  defaultValues={undefined} />
        </main>
    )
}