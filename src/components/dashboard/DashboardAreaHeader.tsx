import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Icon } from "@iconify/react/dist/iconify.js";


export default function DashboardAreaHeader(){
    return (
        <header className="pt-6 flex items-center px-8 absolute mx-auto h-24 border-b-2 border-b-gray-200/70 py-4 top-0 left-0 w-full justify-between">
            <div>
                <h1 className="font-medium text-base text-primary-deepBlack"><span className="font-semibold">Radiant Repose</span> Point of Sales System</h1>
                <p className="text-xs">Varoyal Plaza, opp Royal Spring Palm suit, Akachi road, Owerri</p>
            </div>


            <div className="flex items-center gap-2">
                <div className="relative w-fit">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <span className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-green-500 ring-2 ring-white animate-ping" />
                    <span className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div>
                    <p className="truncate text-sm text-primary-deepBlack font-medium">Jessica Blessing</p>
                    <p className="text-xs">Staff/Cashier 3</p>
                </div>
            </div>


            <div className="flex items-center gap-1 text-sm font-light">
                <Icon icon="uit:calender" width="24" height="24" />
                <span>January 18th 2025, 11:47AM</span>
            </div>
        </header>
    )
}