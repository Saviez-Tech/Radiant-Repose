import { formattedDate } from "@/lib/helperFns/formatDate";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AdminDashBoardHeaderSectionPageName } from "./AdminDashboardPageName";
import Logo from "@/components/layout-components/Logo";
import LogoSrc from "../../../public-assets/logo/Logo1.svg";
import AdminMobileSidebar from "./AdminMobileSidebar";
import { Menu } from "lucide-react";
import ToggleMobileMenuButton from "@/components/custom-utils/ToggleMobileMenuButton";


export default function AdminDashboardHeaderSection(){
    return (
        <>
            <header className="hidden lg:flex pt-6 items-center px-8 absolute mx-auto h-24 border-b-2 border-b-gray-200/70 py-4 top-0 left-0 w-full justify-between">
                <AdminDashBoardHeaderSectionPageName />

                <div className="flex items-center gap-2  basis-2/6 w-2/6">
                    <div className="relative w-fit">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <span className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-green-500 ring-2 ring-white animate-ping" />
                        <span className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="basis-2/6 w-2/6">
                        <p className="truncate text-sm text-primary-deepBlack font-medium">Jessica Blessing</p>
                        <p className="text-xs">Admin</p>
                    </div>
                </div>


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