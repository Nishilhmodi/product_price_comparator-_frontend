/**
 * Formats a number as Indian Rupee (INR) currency.
 * Example: 1995 -> ₹1,995
 * 
 * @param {number} amount - The amount to format.
 * @returns {string} The formatted currency string.
 */
export function formatINR(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '₹0';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}
