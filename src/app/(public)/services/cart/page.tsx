import Scalffold from "@/components/custom-utils/Scalffold";
import Link from "next/link";
import Table from "./Table";

export default function Page() {
  return (
    <Scalffold>
      <div className="flex app-container flex-col justify-center gap-5 py-6 ">
        <div className="flex justify-between">
          <h2>Cart</h2>
          <Link href="/services" className="text-primary-darkRed">
            Go back to Shopping
          </Link>
        </div>
        <Table />
      </div>
    </Scalffold>
  );
}
