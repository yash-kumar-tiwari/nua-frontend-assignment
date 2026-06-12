/**
 * @fileoverview useScrolled — returns true once the window has scrolled
 * past the given pixel threshold. Passive listener for zero jank.
 * @param {number} threshold - scroll distance in pixels (default: 10)
 * @returns {boolean}
 */

import { useState, useEffect } from "react";

export function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > threshold);
    check(); // initialise from current position (e.g. page restored mid-scroll)
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [threshold]);

  return scrolled;
}
