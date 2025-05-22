import Scaffold2 from "@/components/custom-utils/Scalffold";
import { ArrowDown } from "@/components/Svg";
import OrderDetails from "./OrderDetails";

export default function Page() {
  return (
    <Scaffold2>
      <main className="flex flex-col app-container py-8 md:py-12 px-4">
        <div className="flex  justify-between  items-center gap-3 md:gap-4 mb-6 max-w-4xl mx-auto w-full">
          <h1 className="text-2xl md:text-4xl font-semibold text-primary-deepBlack">
            Booking Summary
          </h1>

          <button className="text-primary-deepBlack flex bg-white rounded-md px-4 py-2 text-sm md:text-base items-center shadow-sm border border-gray-200 hover:bg-gray-50 transition self-end md:self-auto">
            <ArrowDown className="w-4 h-4 md:w-5 md:h-5 mr-0 md:mr-2" />
            <span className="hidden md:inline">Download Summary</span>
          </button>
        </div>

        <OrderDetails />
      </main>
    </Scaffold2>
  );
}
