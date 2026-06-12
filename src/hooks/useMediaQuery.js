/**
 * @fileoverview Media query hook.
 * Returns true when the given CSS media query matches.
 *
 * @param {string} query - e.g. "(max-width: 768px)"
 * @returns {boolean}
 */

import { useState, useEffect } from "react";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = (event) => setMatches(event.matches);

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
