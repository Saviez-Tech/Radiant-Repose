import { formatNaira } from "./formatNumber";

export function transformLuxurySaleRecordsToTransactions(
  saleRecords: SaleRecord[]
): Transaction[] {
  // Check if saleRecords exists and is an array
  if (!saleRecords || !Array.isArray(saleRecords)) {
    console.warn("transformSaleRecordsToTransactions received invalid input:", saleRecords)
    return []
  }
  
  const transactions: Transaction[] = [];
 
  saleRecords.forEach((sale) => {
    let time = "";
    let formattedDate = "";
   
    try {
      const dateObj = new Date(sale.transaction.timestamp)
      time = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      formattedDate = dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    } catch (error) {
      console.warn("Could not parse date for time extraction:", sale.transaction?.timestamp, error)
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



export function transformSpaRecordsToSpaTransactions(
  spaRecords: SalesRecordForSpaList
): SpaTransaction[] {

  if (!spaRecords || !Array.isArray(spaRecords)) {
    console.warn("transformSpaRecordsToSpaTransactions received invalid input:", spaRecords)
    return []
  }
  
  const spaTransactions: SpaTransaction[] = [];
 
  spaRecords.forEach((spaRecord) => {
    let time = "";
    let formattedDate = "";
   
    try {
      const dateObj = new Date(spaRecord.transaction_time)
      time = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      formattedDate = dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    } catch (error) {
      console.warn("Could not parse date for time extraction:", spaRecord.transaction_time, error)
    }
   
    // Create a spa transaction from the spa sale record
    const spaTransaction: SpaTransaction = {
      id: String(spaRecord.id),
      barcode: spaRecord.barcode || null,
      image_url: spaRecord.image_url || null,
      transaction_code: spaRecord.transaction_code,
      product_name: spaRecord.product_name || null,
      service_name: spaRecord.service_name || null,
      quantity: spaRecord.quantity,
      price_at_sale: spaRecord.price_at_sale,
      staff: spaRecord.staff,
      time: time,
      date: formattedDate,
      transaction_time: spaRecord.transaction_time,
    }
   
    spaTransactions.push(spaTransaction)
  })
 
  return spaTransactions;
}