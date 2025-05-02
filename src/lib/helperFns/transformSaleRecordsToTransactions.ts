import { nanoid } from "@reduxjs/toolkit";
import { formatNaira } from "./formatNumber";

export function transformSaleRecordsToTransactions(
  saleRecords: SaleRecord[]
): Transaction[] {
  const transactions: Transaction[] = [];

  saleRecords.forEach((sale) => {
    let time = "";
    let formattedDate = "";

    try {
      const dateObj = new Date(sale.date);

      time = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      formattedDate = dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    } catch (error) {
      console.warn("Could not parse date for time extraction:", sale.date);
    }

    sale.scanned_items.forEach((item) => {
      const transaction: Transaction = {
        id: item.id || nanoid(),
        barcode: item.barcode,
        name: item.name,
        image_url: item.image_url,
        quantity: item.quantity,
        price: item.price,
        time: time,
        date: formattedDate,
        amount: formatNaira(item.totalPrice),
        staff: sale.staff,
        subtotal: sale.subtotal,
        discount: sale.discount,
        customer_name: sale.customer_name,
        customer_contact: sale.customer_contact,
      }

      transactions.push(transaction)
    })
  })

  return transactions;
}
