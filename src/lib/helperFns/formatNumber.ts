export function formatNaira(value: number | string, showDecimal: boolean): string {
  const amount = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(amount)) return "N0.00";

  return `N${new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: showDecimal ? 2 : 0,
    maximumFractionDigits: showDecimal ? 2 : 0,
  }).format(amount)}`;
}
