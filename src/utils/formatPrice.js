// Ensure price is always treated as a number
export function formatPrice(price) {
  const num = parseFloat(String(price).replace(",", "."));
  if (isNaN(num)) return "0.00";
  return num.toFixed(2);
}
