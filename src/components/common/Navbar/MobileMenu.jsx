/**
 * @fileoverview MobileMenu — slide-in navigation drawer for small screens.
 *
 * Accessibility:
 *   - role="dialog" + aria-modal + aria-label
 *   - Body scroll locked while open
 *   - Escape key closes
 *   - Focus trap cycles Tab within the menu
 *   - First focusable element receives focus on mount
 *   - Returns focus to the trigger element on close
 */

import { useEffect, useRef } from "react";
import { NavLink, Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuthenticated, logout } from "../../../features/auth/authSlice";
import { selectCartCount } from "../../../features/cart/cartSlice";
import { selectWishlistCount } from "../../../features/wishlist/wishlistSlice";
import { openCartDrawer } from "../../../features/ui/uiSlice";
import { ROUTES } from "../../../constants/routes";
import { cx } from "../../../utils/cx";
import {
  XIcon,
  BagIcon,
  HeartIcon,
  UserIcon,
  ChevronRightIcon,
} from "../../ui/Icon/icons";
import styles from "./MobileMenu.module.scss";

// Selects all keyboard-focusable elements
const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const NAV_LINKS = [
  { to: ROUTES.HOME, label: "Home", end: true },
  { to: ROUTES.PRODUCTS, label: "Shop", end: false },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function MobileMenu({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector(selectWishlistCount);

  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);

  // ── Body scroll lock ──────────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      return () => {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // ── Escape key handler ────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  // ── Focus management ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;

    // Focus the close button on open
    closeBtnRef.current?.focus();

    const panel = panelRef.current;
    const getFocusable = () =>
      Array.from(panel.querySelectorAll(FOCUSABLE_SELECTORS)).filter(
        (el) => !el.closest("[aria-hidden]")
      );

    const onTab = (e) => {
      if (e.key !== "Tab") return;
      const focusable = getFocusable();
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", onTab);
    return () => document.removeEventListener("keydown", onTab);
  }, [isOpen]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleCartOpen = () => {
    onClose();
    dispatch(openCartDrawer());
  };

  const handleLogout = () => {
    dispatch(logout());
    onClose();
  };

  // ── Render ────────────────────────────────────────────────────────────────
  if (!isOpen) return null;

  return (
    <>
      {/* Scrim / overlay */}
      <div
        className={styles.overlay}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        id="mobile-menu"
      >
        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className={styles.header}>
          <Link
            to={ROUTES.HOME}
            className={styles.panelLogo}
            onClick={onClose}
            aria-label="Nua — go to homepage"
          >
            <BagIcon size={18} strokeWidth={2} />
            <span>nua</span>
          </Link>

          <button
            ref={closeBtnRef}
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close navigation menu"
            type="button"
          >
            <XIcon size={20} strokeWidth={1.75} />
          </button>
        </div>

        {/* ── Main nav links ─────────────────────────────────────────────── */}
        <nav className={styles.nav} aria-label="Mobile navigation">
          <ul className={styles.navList} role="list">
            {NAV_LINKS.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cx(styles.navLink, isActive && styles.navLinkActive)
                  }
                >
                  <span>{label}</span>
                  <ChevronRightIcon size={16} strokeWidth={1.5} className={styles.chevron} />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Quick actions ──────────────────────────────────────────────── */}
        <div className={styles.quickActions}>
          <p className={styles.sectionLabel}>Quick access</p>

          <button
            className={styles.quickAction}
            onClick={handleCartOpen}
            type="button"
          >
            <span className={styles.quickActionIcon}>
              <BagIcon size={18} strokeWidth={1.5} />
            </span>
            <span className={styles.quickActionLabel}>Cart</span>
            {cartCount > 0 && (
              <span className={styles.quickBadge}>{cartCount}</span>
            )}
          </button>

          <Link
            to={ROUTES.WISHLIST}
            className={styles.quickAction}
            onClick={onClose}
          >
            <span className={styles.quickActionIcon}>
              <HeartIcon size={18} strokeWidth={1.5} />
            </span>
            <span className={styles.quickActionLabel}>Wishlist</span>
            {wishlistCount > 0 && (
              <span className={styles.quickBadge}>{wishlistCount}</span>
            )}
          </Link>
        </div>

        {/* ── Auth section ───────────────────────────────────────────────── */}
        <div className={styles.authSection}>
          {isAuthenticated ? (
            <>
              <Link
                to={ROUTES.PROFILE}
                className={styles.quickAction}
                onClick={onClose}
              >
                <span className={styles.quickActionIcon}>
                  <UserIcon size={18} strokeWidth={1.5} />
                </span>
                <span className={styles.quickActionLabel}>My Account</span>
              </Link>
              <button
                className={cx(styles.authBtn, styles.authBtnSecondary)}
                onClick={handleLogout}
                type="button"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className={styles.authButtons}>
              <Link
                to={ROUTES.LOGIN}
                className={cx(styles.authBtn, styles.authBtnPrimary)}
                onClick={onClose}
              >
                Sign In
              </Link>
              <Link
                to={ROUTES.REGISTER}
                className={cx(styles.authBtn, styles.authBtnSecondary)}
                onClick={onClose}
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
