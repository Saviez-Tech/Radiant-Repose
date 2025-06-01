export function formatNaira(
  value: number | string,
  showDecimal: boolean = true,
  useSymbol: boolean = false
): string {
  // Handle string values more carefully to avoid floating-point issues
  let amount: number;
  
  if (typeof value === "string") {
    amount = parseFloat(value);
  } else {
    amount = value;
  }
 
  if (isNaN(amount)) return useSymbol ? "₦0.00" : "N0.00";
  
  // Round to avoid floating-point precision issues
  amount = Math.round((amount + Number.EPSILON) * 100) / 100;
 
  const prefix = useSymbol ? "₦" : "N";
 
  return `${prefix}${new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: showDecimal ? 2 : 0,
    maximumFractionDigits: showDecimal ? 2 : 0,
  }).format(amount)}`;
}