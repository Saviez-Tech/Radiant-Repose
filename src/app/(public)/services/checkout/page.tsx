import CustomerDetails from "@/components/cheechout-page/CustomerDetails";
import DeliveryAddress from "@/components/cheechout-page/DeliveryAddress";
import OrderSummary from "@/components/cheechout-page/OrderSummary";
import Payment from "@/components/cheechout-page/Payment";
import Scalffold from "@/components/custom-utils/Scalffold";

export default function Page() {
  return (
    <Scalffold>
      <div className="flex app-container flex-col  py-6">
        <div className="grid md:grid-cols-2 gap-[65px]">
          <div>
            <OrderSummary subTotal={0} />
            <CustomerDetails />
            <DeliveryAddress />
          </div>
          <div>
            <Payment />
          </div>
        </div>
      </div>
    </Scalffold>
  );
}
