import Link from "next/link";
import TableRow from "./TableRow";
import { demoCartProducts, dummyProducts } from "@/components-data/sample-data";
import OrderSummary from "./OrderSummary";

export default function Table() {
  const cartItems = dummyProducts;
  return (
    <div className="overflow-x-auto bg-white rounded-xl overflow-hidden ">
      <table className="table-auto w-full">
        <thead className=" border-b border-gray-200 bg-[#F8F8F8]">
          <tr>
            <th className="text-left p-4 text-[13px] font-semibold text-gray-600">
              Item/Product Name
            </th>
            <th className="text-left p-4 text-[13px] font-semibold text-gray-600">
              Quantity
            </th>
            <th className="text-center p-4 text-[13px] font-semibold text-gray-600">
              Unit Price
            </th>
            <th className="text-center p-4 text-[13px] font-semibold text-gray-600">
              Total
            </th>
            <th className="text-center p-4 text-[13px] font-semibold text-gray-600">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white ">
          {cartItems.map((item) => (
            <TableRow key={item.id} {...item} />
          ))}
        </tbody>

      </table>
       <OrderSummary />
    </div>
  );
}
