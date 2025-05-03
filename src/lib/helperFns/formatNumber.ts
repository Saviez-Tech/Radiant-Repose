export function formatNaira(
  value: number | string, 
  showDecimal: boolean = true, 
  useSymbol: boolean = false
): string {
  const amount = typeof value === "string" ? parseFloat(value) : value;
  
  if (isNaN(amount)) return useSymbol ? "₦0.00" : "N0.00";
  
  const prefix = useSymbol ? "₦" : "N";
  
  return `${prefix}${new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: showDecimal ? 2 : 0,
    maximumFractionDigits: showDecimal ? 2 : 0,
  }).format(amount)}`;
}