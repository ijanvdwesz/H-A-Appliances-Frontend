// utils/formatPrice.js
export function formatPrice(price) {
  if (price == null || isNaN(price)) return "0.00";
  return Number(price).toFixed(2);
}
