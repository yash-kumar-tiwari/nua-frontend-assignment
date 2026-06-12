/**
 * @fileoverview Debounce hook.
 * Returns a debounced version of `value` that only updates
 * after `delay` ms of no changes.
 *
 * @param {*} value
 * @param {number} delay - milliseconds
 * @returns {*} debouncedValue
 */

import { useState, useEffect } from "react";

export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
