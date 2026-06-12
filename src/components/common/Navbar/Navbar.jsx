/**
 * @fileoverview Navbar — global sticky header.
 *
 * Structure:
 *   skip link → header → [logo | desktop-nav | actions] → MobileMenu portal
 *
 * Behaviours:
 *   - Frosted glass when scrolled past 12px
 *   - Cart badge animates with numberPop on count change
 *   - Active nav links underlined via NavLink isActive
 *   - Mobile: only logo + cart + hamburger visible
 */

import { useState } from "react";
import { Link, NavLink } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { selectCartCount } from "../../../features/cart/cartSlice";
import { selectIsAuthenticated } from "../../../features/auth/authSlice";
import { openCartDrawer } from "../../../features/ui/uiSlice";
import { ROUTES } from "../../../constants/routes";
import { useScrolled } from "../../../hooks/useScrolled";
import { cx } from "../../../utils/cx";
import MobileMenu from "./MobileMenu";
import {
  BagIcon,
  HeartIcon,
  UserIcon,
  MenuIcon,
} from "../../ui/Icon/icons";
import styles from "./Navbar.module.scss";

// ── Static data ────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { to: ROUTES.HOME, label: "Home", end: true },
  { to: ROUTES.PRODUCTS, label: "Shop", end: false },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isScrolled = useScrolled(12);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCartOpen = () => dispatch(openCartDrawer());
  const openMenu = () => setMobileMenuOpen(true);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* ── Skip to main content (keyboard accessibility) ─────────────────── */}
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <header
        className={cx(
          styles.header,
          isScrolled && styles.scrolled,
          isMobileMenuOpen && styles.menuOpen
        )}
        role="banner"
      >
        <div className={styles.inner}>

          {/* Logo ─────────────────────────────────────────────────────────── */}
          <Link
            to={ROUTES.HOME}
            className={styles.logo}
            aria-label="Nua — return to homepage"
          >
            <BagIcon size={20} strokeWidth={2} />
            <span className={styles.logoText} aria-hidden="true">nua</span>
          </Link>

          {/* Desktop nav ──────────────────────────────────────────────────── */}
          <nav
            className={styles.desktopNav}
            aria-label="Main navigation"
          >
            <ul className={styles.navList} role="list">
              {NAV_LINKS.map(({ to, label, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      cx(styles.navLink, isActive && styles.navLinkActive)
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions ─────────────────────────────────────────────────────── */}
          <div className={styles.actions}>

            {/* Wishlist — desktop only */}
            <Link
              to={ROUTES.WISHLIST}
              className={cx(styles.iconBtn, styles.desktopOnly)}
              aria-label="View wishlist"
            >
              <HeartIcon size={19} strokeWidth={1.75} />
            </Link>

            {/* Profile / Sign-in — desktop only */}
            <Link
              to={isAuthenticated ? ROUTES.PROFILE : ROUTES.LOGIN}
              className={cx(styles.iconBtn, styles.desktopOnly)}
              aria-label={isAuthenticated ? "My account" : "Sign in"}
            >
              <UserIcon size={19} strokeWidth={1.75} />
            </Link>

            {/* Cart ──────────────────────────────────────────────────────── */}
            <button
              className={styles.cartBtn}
              onClick={handleCartOpen}
              aria-label={`Open cart${cartCount > 0 ? `, ${cartCount} item${cartCount !== 1 ? "s" : ""}` : ""}`}
              type="button"
            >
              <BagIcon size={19} strokeWidth={1.75} />
              {cartCount > 0 && (
                <span
                  key={cartCount}           /* key change triggers pop animation */
                  className={styles.cartBadge}
                  aria-hidden="true"
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>

            {/* Hamburger — mobile only ───────────────────────────────────── */}
            <button
              className={cx(styles.iconBtn, styles.menuToggle)}
              onClick={openMenu}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-haspopup="dialog"
              type="button"
            >
              <MenuIcon size={20} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile menu ───────────────────────────────────────────────────── */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMenu} />
    </>
  );
}
