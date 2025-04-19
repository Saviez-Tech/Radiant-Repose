import DashboardAreaHeader from "@/components/dashboard/DashboardAreaHeader";
import DashboardDesktopSideNav from "@/components/dashboard/DashboardDesktopSideNav";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex lg:min-h-screen bg-gray-50/80 px-4 md:px-7 lg:px-0">
      <div className="flex-grow">
        <DashboardDesktopSideNav />
      </div>

      <div className="flex-grow relative lg:overflow-y-auto w-full lg:pt-28 px-1">
        <DashboardAreaHeader />
        {children}
      </div>
    </div>
  )
}
