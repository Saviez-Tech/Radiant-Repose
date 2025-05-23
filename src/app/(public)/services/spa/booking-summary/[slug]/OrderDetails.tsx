import BookingSummaryCard from "@/components/spa/BookingSummaryCard";
import SelectedServicesCard from "@/components/spa/SelectedServicesCard";
import Link from "next/link";

export default function OrderDetails() {
  return (
    <section className="py-8  px-4">
      <div className="w-full bg-white p-6 md:p-7 rounded-lg max-w-4xl mx-auto">
        <div className="flex items-center mb-4">
          <h2 className="md:text-xl text-lg font-semibold text-primary-deepBlack whitespace-nowrap mr-4">
            Order Details
          </h2>
          <hr className="flex-1 border-primary-deepBlack/15" />
        </div>

        {CustomerDetails.map((item, idx) => (
          <div
            className="flex justify-between text-primary-midGray mt-3 text-sm md:text-base"
            key={idx}
          >
            <p>{item.label}</p>
            <p>{item.value}</p>
          </div>
        ))}

        <div className="flex flex-col items-end gap-2 mt-6 md:w-[400px] ml-auto text-sm text-right">
          <div className="flex justify-between w-full">
            <span className="text-primary-midGray">Subtotal</span>
            <span className="text-primary-midGray">₦473,598</span>
          </div>

          <div className="flex justify-between w-full">
            <span className="text-primary-midGray">Discount</span>
            <span className="text-primary-midGray">₦0.00</span>
          </div>

          <hr className="w-full border-dashed border-primary-midGray my-2" />

          <div className="flex justify-between w-full font-bold text-primary-deepBlack">
            <span>Total</span>
            <span>₦316,000</span>
          </div>
        </div>

        <div className="flex items-center mt-8 mb-4">
          <h2 className="md:text-xl text-lg font-semibold text-primary-deepBlack whitespace-nowrap mr-4">
            Services
          </h2>
          <hr className="flex-1 border-primary-deepBlack/15" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-11">
          {dummyServices.map((service) => (
            // i will use the correct card later
            <BookingSummaryCard key={service.id} services={service} />
          ))}
        </div>

        <p className="text-primary-midGray text-xs md:text-sm mt-6 text-center mb-6">
          Please arrive 10–15 minutes early. Kindly make your payment at the counter before your session begins.
        </p>

        <hr className="border-primary-deepBlack/15 my-4" />

        <div className="flex justify-center mt-6">
          <Link
            href="/services/spa/listing"
            className="btn-primary !px-5 !py-3 text-sm md:text-base flex items-center gap-2"
          >
            Book Another Appointment
          </Link>
        </div>
      </div>
    </section>
  );
}

const CustomerDetails = [
  { label: "Full Name", value: "Dominic Evans" },
  { label: "Phone Number", value: "+234 1234 5678" },
  { label: "Payment Method", value: "In-Store Payment" },
  { label: "Unique Reference Code:", value: "SPA-BOOK-20250601-1047" },
];

export const dummyServices: SpaService[] = [
  {
    id: 1,
    name: "Hot Stone Therapy",
    description:
      "A deeply relaxing massage that eases tension, improves circulation and revitalizes the body.",
    price: 65000,
    type: "session",
    image: "/images/christin-hume.png",
  },
  {
    id: 2,
    name: "Hot Stone Therapy",
    description:
      "A deeply relaxing massage that eases tension, improves circulation and revitalizes the body.",
    price: 65000,
    type: "session",
    image: "/images/christin-hume.png",
  },
  {
    id: 3,
    name: "Hot Stone Therapy",
    description:
      "A deeply relaxing massage that eases tension, improves circulation and revitalizes the body.",
    price: 65000,
    type: "session",
    image: "/images/christin-hume.png",
  },
  {
    id: 4,
    name: "Hot Stone Therapy",
    description:
      "A deeply relaxing massage that eases tension, improves circulation and revitalizes the body.",
    price: 65000,
    type: "session",
    image: "/images/christin-hume.png",
  },
];
