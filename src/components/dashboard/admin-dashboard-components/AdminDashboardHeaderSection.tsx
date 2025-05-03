import { formattedDate } from "@/lib/helperFns/formatDate";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AdminDashBoardHeaderSectionPageName } from "./AdminDashboardPageName";
import Logo from "@/components/layout-components/Logo";
import LogoSrc from "../../../public-assets/logo/Logo1.svg";
import AdminMobileSidebar from "./AdminMobileSidebar";
import ToggleMobileMenuButton from "@/components/custom-utils/ToggleMobileMenuButton";
import AuthUserDetailsWithActiveStatus from "@/components/layout-components/AuthUserDetailsWithActiveStatus";


export default function AdminDashboardHeaderSection(){
    return (
        <>
            <header className="hidden lg:flex pt-6 items-center px-8 absolute mx-auto h-24 border-b-2 border-b-gray-200/70 py-4 top-0 left-0 w-full justify-between">
                <AdminDashBoardHeaderSectionPageName />

                <AuthUserDetailsWithActiveStatus />


                <div className="flex items-center gap-1 text-sm font-light">
                    <Icon icon="uit:calender" width="24" height="24" />
                    <span>{formattedDate}</span>
                </div>
            </header>

            {/* This is Header for Mobile Devices */}
            <header className="pt-6 flex lg:hidden border-b  justify-center items-center lg:pe-8 lg:ps-1 lg:absolute lg:mx-auto lg:h-24 lg:border-b-2 lg:border-b-gray-200/70 lg:py-4 lg:top-0 lg:left-0 lg:w-full lg:justify-between">
                <div className="flex items-center justify-between flex-wrap w-full lg:hidden pb-8">
                    <Logo src={LogoSrc} width={90} height={90} className="w-36" />

                    <AdminMobileSidebar />
                    <ToggleMobileMenuButton />
                </div>
            </header>
        </>
    )
}