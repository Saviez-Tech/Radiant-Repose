import StaffForm from "@/components/dashboard/admin-dashboard-components/StaffForm";

export default function Page(){
    return (
        <main className="w-full pt-20 max-md:pt-28">
            <h1 className="text-xl font-medium text-primary-dark_gray">Add New Staff</h1>
            <StaffForm formActionType="add"  />
        </main>
    )
}