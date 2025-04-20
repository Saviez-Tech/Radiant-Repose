import DashboardAreaHeader from "@/components/dashboard/DashboardAreaHeader";
import DashboardDesktopSideNav from "@/components/dashboard/DashboardDesktopSideNav";
import { ReactNode } from "react";
import CartSection from "@/components/dashboard/CartSection";
import CategoriesTabSection from "@/components/dashboard/CategoriesTabSection";


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
        <main className="px-8 w-full flex gap-12 justify-between">
          <div className="flex-1">
            <div className="pt-5">
              <h2 className="font-semibold text-primary-deepBlack">Categories</h2>
              <CategoriesTabSection />
            </div>

            <section className="mt-14">
              <div className="flex items-center gap-4">
                <h2 className="font-semibold text-primary-deepBlack">Scanned Items</h2>
                <hr className="flex-1 h-[1px] w-full bg-primary-base_color2/20" />
              </div>

              {/* Since Each Category is a dashboard sub link, and its only content 
              are the scanned items in that catergory. The Cart and every other section appear on each page */}
              {children}
            </section>
          </div>

          <CartSection />
        </main>
      </div>
    </div>
  )
}
