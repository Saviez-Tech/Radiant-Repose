import { formatNaira } from "./formatNumber";

export function transformSaleRecordsToTransactions(
  saleRecords: SaleRecord[]
): Transaction[] {
  // Check if saleRecords exists and is an array
  if (!saleRecords || !Array.isArray(saleRecords)) {
    console.warn("transformSaleRecordsToTransactions received invalid input:", saleRecords);
    return []
  }
  
  const transactions: Transaction[] = [];
 
  saleRecords.forEach((sale) => {
    let time = "";
    let formattedDate = "";
   
    try {
      const dateObj = new Date(sale.transaction.timestamp);
      time = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      formattedDate = dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    } catch (error) {
      console.warn("Could not parse date for time extraction:", sale.transaction?.timestamp, error);
    }
   
    // Create a transaction from the updated sale record structure
    const legacyTransaction: Transaction = {
      id: String(sale.id),
      barcode: sale.product.barcode || "",
      name: sale.product.name,
      image_url: sale.product.image_url,
      quantity: sale.quantity,
      price: sale.product.price,
      time: time,
      date: formattedDate,
      amount: formatNaira(parseFloat(sale.price_at_sale)),
      staff: sale.transaction.staff,
      subtotal: sale.transaction.subtotal,
      discount: sale.transaction.discount,
      customer_name: sale.transaction.customer_name,
      customer_contact: sale.transaction.customer_contact,
    }
   
    transactions.push(legacyTransaction)
  })
 
  return transactions;
}