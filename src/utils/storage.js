/**
 * @fileoverview localStorage utility helpers.
 * All read/write operations are wrapped in try/catch to handle
 * SecurityError (private browsing) and QuotaExceededError gracefully.
 */

const PREFIX = "nuashop_";

/**
 * Read a value from localStorage.
 * @template T
 * @param {string} key
 * @param {T} [defaultValue]
 * @returns {T}
 */
export function getItem(key, defaultValue = null) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw !== null ? JSON.parse(raw) : defaultValue;
  } catch {
    return defaultValue;
  }
}

/**
 * Write a value to localStorage.
 * @param {string} key
 * @param {*} value
 * @returns {boolean} success
 */
export function setItem(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Remove a single key from localStorage.
 * @param {string} key
 */
export function removeItem(key) {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch {
    // no-op
  }
}

/**
 * Clear ALL app-prefixed keys from localStorage.
 */
export function clearAll() {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => localStorage.removeItem(k));
  } catch {
    // no-op
  }
}
