import DashboardAreaHeader from "@/components/dashboard/DashboardAreaHeader";
import DashboardDesktopSideNav from "@/components/dashboard/DashboardDesktopSideNav";
import { ReactNode } from "react";
import LuxuryCartSection from "@/components/dashboard/LuxuryCartSection";
import CategoriesTabSection from "@/components/dashboard/CategoriesTabSection";
import { getUserSessionID } from "@/lib/helperFns/getUserSession";
import SpaCartSection from "@/components/dashboard/spa-section/SpaCartSection";


type LayoutProps = {
  children: ReactNode;
}

export default async function Layout({ children }: LayoutProps) {

  const sessionUserID = await getUserSessionID()
  return (
    <div className="flex md:min-h-screen bg-gray-50/80  md:px-0">
      <div className="flex-grow">
        <DashboardDesktopSideNav sessionUserID={sessionUserID} />
      </div>

      <div className="flex-grow relative md:overflow-y-auto w-full md:pt-28 px-1">
        <DashboardAreaHeader />
        <main className="px-6 relative w-full flex gap-12 justify-between items-stretch">
          <div className="flex-1 max-w-full">
            <CategoriesTabSection />
            {children}
          </div>

          <LuxuryCartSection />
          <SpaCartSection />
        </main>
      </div>
    </div>
  )
}
