export function formatPrice(price) {
  const num = parseFloat(String(price || 0).replace(",", "."));
  return isNaN(num) ? "0.00" : num.toFixed(2);
}
