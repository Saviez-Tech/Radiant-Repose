import DashboardAreaHeader from "@/components/dashboard/DashboardAreaHeader";
import DashboardDesktopSideNav from "@/components/dashboard/DashboardDesktopSideNav";
import { ReactNode } from "react";
import CartSection from "@/components/dashboard/CartSection";
import CategoriesTabSection from "@/components/dashboard/CategoriesTabSection";
import { getUserSessionID } from "@/lib/helperFns/getUserSession";
// import Scanner from "@/lib/Scanner";


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
        <main className="px-6 w-full flex gap-12 justify-between items-stretch">
          <div className="flex-1 max-w-full">
            <div className="pt-5">
              <h2 className="font-semibold text-primary-deepBlack">Categories</h2>
              <CategoriesTabSection />
            </div>
            {children}
          </div>

          {/* <Scanner /> */}
          <CartSection />
        </main>
      </div>
    </div>
  )
}
