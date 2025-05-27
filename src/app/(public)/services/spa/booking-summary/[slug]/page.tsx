import Scaffold2 from "@/components/custom-utils/Scalffold";
import { ArrowDown } from "@/components/Svg";
import OrderDetails from "./OrderDetails";
import axios from "axios";
import createAxiosInstance from "@/lib/axios";
import { handleApiError } from "@/lib/helperFns/handleApiErrors";


export async function fetchBookingDetails(id: string) {
  try {
    const axiosInstance = await createAxiosInstance();
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/worker/bookings/${id}`
    );
    // console.log({ res: res.data });

    return {
      success: true,
      data: res.data as BookingDetails,
    };
  } catch (err) {
    let errorMessage = "An Error Occurred";
    console.log(err);
    if (axios.isAxiosError(err)) {
      if (err.response) {
        errorMessage = handleApiError(err.response.data);
      } else if (err.request) {
        console.log(err.request);
        errorMessage = "Request Failed";
      } else {
        errorMessage = err.message;
      }
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }
    return {
      success: false,
      errorMessage,
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { success, data, errorMessage } = await fetchBookingDetails(
    (
      await params
    ).slug
  );

  if (!success || !data) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-md">
        <h3 className="text-red-600 font-medium mb-2">
          Error Loading Booking Data
        </h3>
        <p className="text-red-500">{errorMessage}</p>
      </div>
    );
  }

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

        <OrderDetails details={data} />
      </main>
    </Scaffold2>
  );
}
