/**
 * @fileoverview Currency formatting utility.
 */

/**
 * Format a number as USD currency string.
 * @param {number} amount
 * @param {string} [currency="USD"]
 * @param {string} [locale="en-US"]
 * @returns {string}
 */
export function formatCurrency(amount, currency = "USD", locale = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Calculate discount percentage between original and sale price.
 * @param {number} original
 * @param {number} sale
 * @returns {number} rounded percentage
 */
export function calcDiscountPercent(original, sale) {
  if (!original || original <= 0) return 0;
  return Math.round(((original - sale) / original) * 100);
}
