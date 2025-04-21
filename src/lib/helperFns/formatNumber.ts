export function formatNaira(value: number | string, showDecimal: boolean): string {
    const amount = typeof value === "string" ? parseFloat(value) : value;
  
    if (isNaN(amount)) return "₦0.00";
  
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: showDecimal ? 2 : 0,
    }).format(amount)
}
  