/**
 * @fileoverview Scroll-to-top hook.
 * Scrolls the window to the top whenever the pathname changes.
 * Drop this into the RootLayout component.
 */

import { useEffect } from "react";
import { useLocation } from "react-router";

export function useScrollTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
}
