/**
 * @fileoverview Form validation utility functions.
 */

/**
 * Validate an email address.
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Validate password strength (min 8 chars, 1 uppercase, 1 digit).
 * @param {string} password
 * @returns {{ valid: boolean, message: string }}
 */
export function validatePassword(password) {
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters." };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Password must include an uppercase letter." };
  }
  if (!/\d/.test(password)) {
    return { valid: false, message: "Password must include a number." };
  }
  return { valid: true, message: "" };
}

/**
 * Check if a string is empty or whitespace-only.
 * @param {string} value
 * @returns {boolean}
 */
export function isEmpty(value) {
  return !value || value.trim().length === 0;
}
