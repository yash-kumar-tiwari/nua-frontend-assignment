/**
 * @fileoverview Date formatting utility.
 */

/**
 * Format a date to a human-readable string.
 * @param {string|Date} date
 * @param {Intl.DateTimeFormatOptions} [options]
 * @returns {string}
 */
export function formatDate(date, options = {}) {
  const defaults = { year: "numeric", month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", { ...defaults, ...options }).format(
    new Date(date)
  );
}

/**
 * Format a date to relative time (e.g., "3 days ago").
 * @param {string|Date} date
 * @returns {string}
 */
export function formatRelativeTime(date) {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const diffMs = new Date(date) - new Date();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (Math.abs(diffDays) < 1) return "today";
  if (Math.abs(diffDays) < 7) return rtf.format(diffDays, "day");
  if (Math.abs(diffDays) < 30) return rtf.format(Math.round(diffDays / 7), "week");
  return rtf.format(Math.round(diffDays / 30), "month");
}
