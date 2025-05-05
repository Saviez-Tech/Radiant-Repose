"use client"

import { ReactNode, useEffect, useState } from "react";
import ProductCategoriesRevenue from "./charts/ProductCategoriesRevenue";
import RevenueGrowthChart from "./charts/RevenueGrowthChart";
import StatusBox from "./charts/StatBox";
import AdminStoreLocationsSelect from "./AdminStoreLocationsSelect";
import { storeLocation } from "@/components-data/store-locations";
import ExportDataBtn from "@/components/buttons/ExportDataBtn";
import TimeFrameSelect from "@/components/custom-utils/TimeFrameSelect";
import AdminDashboardTransactionHistory from "./AdminDashboardTransactionHistory";
import { Icon } from "@iconify/react/dist/iconify.js";
import { transformSaleRecordsToTransactions } from "@/lib/helperFns/transformSaleRecordsToTransactions";
import AdminDashboardSkeleton from "@/components/loaders/DashboardSkeleton";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { validateDate } from "@/lib/helperFns/formatDate";

export default function AdminDashboardMC({ data }:{  data: {
    categorySales: SalesSummaryData;
    sales: SalesRecordList;
    totalGoodsSold: StatData;
    filter: string
  } | undefined }){

    const [selectedStore,setSelectedStore] = useState<string>(storeLocation[0].branch.toString())
    const [timeFilter, setTimeFilter] = useState<string>(data?.filter || validateDate(new Date().toISOString()))
    const [isLoading, setIsLoading] = useState(false)
    
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const statMeta: Record<keyof StatData, { label: string; icon: ReactNode }> = {
        total_goods_sold: { label: "Total Goods", icon: <Icon icon="octicon:tracked-by-closed-completed-16" width="24" height="24" className="size-7" /> },
        total_price: { label: "Total Sales", icon: <Icon icon="ic:outline-pending" width="33" height="33" className="size-8" /> },
        low_stock: { label: "Low Stock", icon: <Icon icon="ph:hourglass-simple-low-fill" width="33" height="33" className="size-8" /> },
    }

    const statsArray = (data: StatData) => 
        (Object.entries(data) as [keyof StatData, number][]).map(([key, value]) => ({
            value,
            label: statMeta[key].label,
            icon: statMeta[key].icon,
            stat: key,
        })
    )

    const transactions = data?.sales ? transformSaleRecordsToTransactions(data?.sales) : []
    
    const handlePageRefresh = () => {
        setIsLoading(true)
        const newUrl = `${pathname}?filter=${timeFilter}`
        router.push(newUrl)
    }

    useEffect(() => {
        setIsLoading(false)
    }, [searchParams])

    useEffect(() => {
        if (timeFilter !== data?.filter && !isLoading){
            handlePageRefresh()
        }
    }, [timeFilter, data?.filter])

    if (isLoading) {
        return <AdminDashboardSkeleton />
    }

    return (
        data?.categorySales &&
        data.sales &&
        data.totalGoodsSold ?
        <main className="gap-9 overflow-x-auto px-1">
            <div className="flex justify-between mt-6 mb-3 items-center px-1 gap-y-3">
                <h2 className="text-primary-deepBlack font-medium text-lg hidden md:block">Total Luxury Sales</h2>
                <AdminStoreLocationsSelect selectedStore={selectedStore} setSelectedStore={setSelectedStore} />
                <ExportDataBtn />
            </div>

            <div className="flex mt-8 justify-between items-center md:hidden">
                <h2 className="text-primary-deepBlack font-medium text-base block">Total Luxury Sales</h2>
                <TimeFrameSelect timeFilter={timeFilter} setTimeFilter={setTimeFilter} />
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-5 mt-6">
                <div className="md:flex-1 lg:min-w-[40em] space-y-6 md:space-y-0">
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-4 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] ">
                        {
                            statsArray(data.totalGoodsSold).map((v,i) => (
                                <StatusBox {...v} key={i} />
                            ))
                        }
                    </div>
                    <div className="hidden md:block !mt-10">
                        <RevenueGrowthChart transactions={transactions} timeFilter={timeFilter} setTimeFilter={setTimeFilter} />
                    </div>
                </div>

                <div className="md:w-[19.125rem]">
                    <ProductCategoriesRevenue data={data.categorySales} />
                </div>

                <div className="block md:hidden">
                    <RevenueGrowthChart transactions={transactions} timeFilter={timeFilter} setTimeFilter={setTimeFilter} />
                </div>
            </div>

            <AdminDashboardTransactionHistory transactions={transactions} timeFilter={timeFilter} setTimeFilter={setTimeFilter} />
        </main>
        :
        <AdminDashboardSkeleton />
    )
}