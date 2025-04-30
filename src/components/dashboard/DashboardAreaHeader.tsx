import { formattedDate } from "@/lib/helperFns/formatDate";
import { Icon } from "@iconify/react/dist/iconify.js";
import AuthUserDetailsWithActiveStatus from "../layout-components/AuthUserDetailsWithActiveStatus";


export default function DashboardAreaHeader(){
    
    return (
        <header className="pt-6 flex items-center px-8 lg:absolute mx-auto h-24 border-b-2 border-b-gray-200/70 py-4 top-0 left-0 w-full justify-between">
            <div>
                <h2 className="font-medium text-base text-primary-deepBlack"><span className="font-semibold">Radiant Repose</span> Point of Sales System</h2>
                <p className="text-xs">Varoyal Plaza, opp Royal Spring Palm suit, Akachi road, Owerri</p>
            </div>

            <AuthUserDetailsWithActiveStatus />

            <div className="flex items-center gap-1 text-sm font-light">
                <Icon icon="uit:calender" width="24" height="24" />
                <span>{formattedDate}</span>
            </div>
        </header>
    )
}