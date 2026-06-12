/**
 * @fileoverview Persistent state hook backed by localStorage.
 * Behaves like useState but reads/writes through the storage utility.
 *
 * @template T
 * @param {string} key - localStorage key (without prefix)
 * @param {T} initialValue
 * @returns {[T, (value: T | ((prev: T) => T)) => void]}
 */

import { useState, useCallback } from "react";
import { getItem, setItem } from "../utils/storage";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    return getItem(key, initialValue);
  });

  const setValue = useCallback(
    (value) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        setItem(key, next);
        return next;
      });
    },
    [key]
  );

  return [storedValue, setValue];
}
