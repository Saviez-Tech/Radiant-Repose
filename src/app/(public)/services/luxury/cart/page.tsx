
import Scalffold from "@/components/custom-utils/Scalffold";
import Link from "next/link";
import Table from "./Table";
import { fetchProductsData } from "@/components/dashboard/admin-dashboard-components/ProductManagementServerWrapper";

export default async function Page() {
    const { success, data } = await fetchProductsData()
        
        if (!success) {
          return (
            <div className="p-6 bg-red-50 border border-red-200 rounded-md">
              <h3 className="text-red-600 font-medium mb-2">Error Loading Products Data</h3>
              {/* <p className="text-red-500">{errorMessage}</p> */}
            </div>
          )
        }

  return (
    <Scalffold>
      <div className="flex app-container flex-col justify-center gap-5 py-6 ">
        <div className="flex justify-between">
          <h2>Cart</h2>
          <Link href="/services/luxury" className="text-primary-darkRed">
            Go back to Shopping
          </Link>
        </div>
        <Table products={data} />
        <div className="flex flex-col justify-center items-center gap-2 py-14">
          <p className="font-semibold text-lg">PROCEED TO</p>
          <Link
            href="/services/luxury/checkout"
            className="px-8 py-3 bg-primary-darkRed text-white rounded-3xl flex items-center max-md:text-sm gap-2 w-fit hover:bg-red-700 transition"
          >
            Checkout
          </Link>
        </div>
      </div>
    </Scalffold>
  );
}
