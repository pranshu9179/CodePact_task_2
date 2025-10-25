// src/utils/pricing.js
export const RATES = {
  cow: 50, // ₹50 per litre
  buffalo: 60, // ₹60 per litre
};

export function calculatePrice(type, qty) {
  const key = String(type).toLowerCase();
  const rate = key === "buffalo" ? RATES.buffalo : RATES.cow;
  // multiply digit-by-digit safe arithmetic (qty might be float)
  // We'll use Number to ensure numeric behavior and toFixed(2) for display elsewhere
  const total = Number(rate) * Number(qty);
  return Number(Number(total).toFixed(2));
}
