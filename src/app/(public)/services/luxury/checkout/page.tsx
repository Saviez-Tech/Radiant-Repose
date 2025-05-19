import Payment from "@/components/cheechout-page/Payment";
import Scalffold from "@/components/custom-utils/Scalffold";
import CheckoutForm from "./CheckoutForm";
import { fetchProductsData } from "@/components/dashboard/admin-dashboard-components/ProductManagementServerWrapper";

export default async function Page() {
  const { success, data, errorMessage } = await fetchProductsData();

  if (!success) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-md">
        <h3 className="text-red-600 font-medium mb-2">
          Error Loading Products Data
        </h3>
        <p className="text-red-500">{errorMessage}</p>
      </div>
    );
  }

  return (
    <Scalffold>
      <div className="flex app-container flex-col  py-6">
        <div className="grid md:grid-cols-2 gap-[65px]">
          <div>
            <CheckoutForm products={data} />
          </div>
          <div>
            <Payment />
          </div>
        </div>
      </div>
    </Scalffold>
  );
}
