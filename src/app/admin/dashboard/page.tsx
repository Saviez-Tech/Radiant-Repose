import { fetchStoreBranches } from "@/actions/auth.server";
import AdminDashboardServerWrapper from "@/components/dashboard/admin-dashboard-components/AdminDashboardServerWrapper";
import AdminDashboardSkeleton from "@/components/loaders/DashboardSkeleton";
import { Metadata } from "next";
import { Suspense } from "react";


interface IProps { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }


export async function generateMetadata({ searchParams }: IProps): Promise<Metadata> {
    const { branchID } = await searchParams;
    const { data, success } = await fetchStoreBranches()
   
    const getTitle = (branchID?: string | string[]) => {      

        if (!branchID || !success || !data) {
            return 'Radiant Repose | Admin Luxury Management';
        }
       
        if (typeof branchID === "string") {
            const branchIdNum = parseInt(branchID)
            
            // Find the branch by ID
            const branch = data.find((branch: StoreBranch) => branch.id === branchIdNum)
            
            // If branch not found, default to luxury
            if (!branch) {
                return 'Radiant Repose | Admin Luxury Management';
            }
            
            // Check branch name for spa or luxury keywords
            const branchName = branch.name.toLowerCase()
            
            if (branchName.includes('spa')) {
                return 'Radiant Repose | Admin Spa Management';
            } else if (branchName.includes('luxury')) {
                return 'Radiant Repose | Admin Luxury Management';
            } else {
                // Default to luxury if neither keyword is found
                return 'Radiant Repose | Admin Luxury Management';
            }
        }
        
        return 'Radiant Repose | Admin Luxury Management';
    }
    
    return {
        title: getTitle(branchID),
        description: "Admin dashboard for Radiant Repose luxury and spa management",
        keywords: "spa management, admin dashboard, luxury management",
    }
}


export default async function Page({ searchParams }: IProps){

    const { filter, branchID } = (await (searchParams))

    return (
        <Suspense fallback={<AdminDashboardSkeleton />}>
            <AdminDashboardServerWrapper branchID={branchID as string} filter={filter as string} />
        </Suspense>
    )
}