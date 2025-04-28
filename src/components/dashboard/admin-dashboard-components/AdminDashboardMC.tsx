"use client"

import { useState } from "react";
import { sampleAdminTransactions, statuses } from "@/components-data/sample-data";
import ProductCategoriesRevenue from "./charts/ProductCategoriesRevenue";
import RevenueGrowthChart from "./charts/RevenueGrowthChart";
import StatusBox from "./charts/StatusBox";
import AdminStoreLocationsSelect from "./AdminStoreLocationsSelect";
import { storeLocation } from "@/components-data/store-locations";
import ExportDataBtn from "@/components/buttons/ExportDataBtn";
import TimeFrameSelect from "@/components/custom-utils/TimeFrameSelect";
import AdminDashboardTransactionHistory from "./AdminDashboardTransactionHistory";



export default function AdminDashboardMC(){

    const [selectedStore,setSelectedStore] = useState<string>(storeLocation[0].branch)
    const [timeFilter, setTimeFilter] = useState<TimeFilterType>('lastWeek')

    return (
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
                            statuses.map((v,i) => (
                                <StatusBox {...v} key={i} />
                            ))
                        }
                    </div>
                    <div className="hidden md:block !mt-10">
                        <RevenueGrowthChart />
                    </div>
                </div>

                <div className="md:w-[19.125rem]">
                    <ProductCategoriesRevenue />
                </div>

                <div className="block md:hidden">
                    <RevenueGrowthChart />
                </div>
            </div>

            <AdminDashboardTransactionHistory data={sampleAdminTransactions as AdminTransaction[]} />
        </main>
    )
}