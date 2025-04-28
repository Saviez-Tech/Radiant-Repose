import AdminDashboardHeaderSection from "@/components/dashboard/admin-dashboard-components/AdminDashboardHeaderSection";
import AdminDashboardSideNav from "@/components/dashboard/admin-dashboard-components/AdminDashboardSideNav";
import { ReactNode } from "react";


type LayoutProps = {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex lg:min-h-screen bg-gray-50/80 md:px-7 lg:px-0">
      <div className="flex-grow">
        <AdminDashboardSideNav />
      </div>

      <div className="flex-grow relative lg:overflow-y-auto w-full lg:pt-28">
        <AdminDashboardHeaderSection />
        <div className="lg:px-8">
          {children}
        </div>
      </div>
    </div>
  )
}
