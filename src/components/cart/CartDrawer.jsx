/**
 * @fileoverview CartDrawer — right-side slide-in cart page.
 *
 * Behaviours:
 *   - Controlled via Redux UI state (ui.isCartDrawerOpen)
 *   - Cart items sourced from Redux (cartSlice) with variant-aware add/remove/qty
 *   - Focus trapped within drawer boundaries
 *   - Body scroll locked when visible
 *   - Escape key closes
 *   - State switcher header to test [Populated, Empty, Loading, Error] states
 */

import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import { selectIsCartDrawerOpen, closeCartDrawer } from "../../features/ui/uiSlice";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  selectCartItems,
  selectCartSubtotal,
} from "../../features/cart/cartSlice";
import { ROUTES } from "../../constants/routes";
import { cx } from "../../utils/cx";
import {
  XIcon,
  TrashIcon,
  PlusIcon,
  MinusIcon,
  BagIcon,
  ShieldIcon,
  RefreshIcon,
} from "../ui/Icon/icons";
import styles from "./CartDrawer.module.scss";

// Focusable selectors for keyboard navigation focus-trap
const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Helper to format prices
function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export default function CartDrawer() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsCartDrawerOpen);
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);

  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);

  // States (loading/error are mock states for UI preview)
  const [drawerState, setDrawerState] = useState(() =>
    items.length > 0 ? "populated" : "empty"
  );
  const [isRetrying, setIsRetrying] = useState(false);

  // Sync drawer state with actual cart
  useEffect(() => {
    if (items.length > 0 && drawerState === "empty") {
      setDrawerState("populated");
    } else if (items.length === 0 && drawerState === "populated") {
      setDrawerState("empty");
    }
  }, [items, drawerState]);

  // Close helper
  const handleClose = () => dispatch(closeCartDrawer());

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
    const onKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // ── Focus management ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;

    // Focus close button on mount
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
  }, [isOpen, drawerState]); // Re-bind on drawerState change since elements shift

  // ── Redux Cart Handlers ────────────────────────────────────────────────────
  const handleIncrease = (item) => {
    dispatch(
      increaseQuantity({
        productId: item.productId,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
      })
    );
  };

  const handleDecrease = (item) => {
    dispatch(
      decreaseQuantity({
        productId: item.productId,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
      })
    );
  };

  const handleRemove = (item) => {
    dispatch(
      removeFromCart({
        productId: item.productId,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
      })
    );
  };

  const handleRetry = () => {
    setIsRetrying(true);
    setDrawerState("loading");
    setTimeout(() => {
      setIsRetrying(false);
      setDrawerState("populated");
    }, 800);
  };

  // Calculations
  const isFreeShipping = subtotal >= 50;
  const shippingFee = subtotal === 0 ? 0 : isFreeShipping ? 0 : 5.99;
  const grandTotal = subtotal + shippingFee;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={styles.overlay}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Slide-in container */}
      <div
        ref={panelRef}
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart Drawer"
        id="shopping-cart-drawer"
      >
        {/* ── Testing State Switcher ────────────────────────────────────── */}
        <div className={styles.stateSelector} aria-label="Mock state previewer">
          <span className={styles.stateLabel}>Mock State:</span>
          <div className={styles.statePills}>
            {["populated", "empty", "loading", "error"].map((s) => (
              <button
                key={s}
                type="button"
                className={cx(
                  styles.statePill,
                  drawerState === s && styles.statePillActive
                )}
                onClick={() => setDrawerState(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* ── Drawer Header ─────────────────────────────────────────────── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <BagIcon size={18} strokeWidth={2} />
            <h2 className={styles.headerTitle}>Shopping Cart</h2>
            {drawerState === "populated" && items.length > 0 && (
              <span className={styles.countBadge} aria-label={`${items.length} items in cart`}>
                {items.length}
              </span>
            )}
          </div>
          <button
            ref={closeBtnRef}
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="Close cart drawer"
            type="button"
          >
            <XIcon size={20} strokeWidth={2} />
          </button>
        </div>

        {/* ── Free Shipping Progress (populated only) ────────────────────── */}
        {drawerState === "populated" && items.length > 0 && (
          <div className={styles.shippingBar}>
            <p className={styles.shippingText}>
              {isFreeShipping ? (
                <>🎉 You qualify for <strong>Free Economy Shipping</strong>!</>
              ) : (
                <>Add <strong>{formatPrice(50 - subtotal)}</strong> more for <strong>Free Shipping</strong>.</>
              )}
            </p>
            <div className={styles.progressTrack} aria-hidden="true">
              <div
                className={styles.progressBar}
                style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* ── Main Drawer Scrollable Body ────────────────────────────────── */}
        <div className={styles.body}>
          
          {/* LOADING STATE */}
          {drawerState === "loading" && (
            <div className={styles.loadingState} aria-label="Loading cart items">
              {[1, 2].map((i) => (
                <div key={i} className={styles.skeletonItem} aria-hidden="true">
                  <div className={styles.skeletonThumb} />
                  <div className={styles.skeletonDetails}>
                    <div className={styles.skeletonTitle} />
                    <div className={styles.skeletonSubtitle} />
                    <div className={styles.skeletonFooter} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ERROR STATE */}
          {drawerState === "error" && (
            <div className={styles.errorState} role="alert">
              <div className={styles.errorIcon} aria-hidden="true">!</div>
              <h3 className={styles.errorHeading}>Something went wrong</h3>
              <p className={styles.errorText}>
                We were unable to load your shopping cart. Please check your internet connection and try again.
              </p>
              <button
                type="button"
                className={styles.retryBtn}
                onClick={handleRetry}
                disabled={isRetrying}
              >
                {isRetrying ? "Retrying..." : "Retry Connection"}
              </button>
            </div>
          )}

          {/* EMPTY CART STATE */}
          {drawerState === "empty" && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIconContainer} aria-hidden="true">
                <BagIcon size={48} strokeWidth={1.25} />
              </div>
              <h3 className={styles.emptyHeading}>Your cart is empty</h3>
              <p className={styles.emptyText}>
                Looks like you haven't added anything to your cart yet. Let's find some organic essentials.
              </p>
              <button
                type="button"
                className={styles.continueBtn}
                onClick={handleClose}
              >
                Start Browsing
              </button>
            </div>
          )}

          {/* POPULATED STATE */}
          {drawerState === "populated" && items.length > 0 && (
            <ul className={styles.itemList} role="list" aria-label="Cart items list">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.selectedColor}-${item.selectedSize}`}
                  className={styles.itemRow}
                >
                  {/* Thumbnail */}
                  <div className={styles.itemThumbWrapper}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className={styles.itemThumb}
                      loading="lazy"
                    />
                  </div>

                  {/* Detail Panel */}
                  <div className={styles.itemDetails}>
                    <div className={styles.itemHeader}>
                      <h4 className={styles.itemTitle}>{item.title}</h4>
                      <button
                        className={styles.removeBtn}
                        onClick={() => handleRemove(item)}
                        aria-label={`Remove ${item.title} from cart`}
                        type="button"
                      >
                        <TrashIcon size={16} strokeWidth={1.5} />
                      </button>
                    </div>

                    {/* Variant descriptors */}
                    <div className={styles.itemVariantRow}>
                      <span className={styles.variantTag}>Color: {item.selectedColor}</span>
                      <span className={styles.variantDivider}>·</span>
                      <span className={styles.variantTag}>Size: {item.selectedSize}</span>
                    </div>

                    <div className={styles.itemFooter}>
                      {/* Quantity Controls */}
                      <div className={styles.qtyController} aria-label="Adjust quantity">
                        <button
                          type="button"
                          className={styles.qtyBtn}
                          onClick={() => handleDecrease(item)}
                          aria-label={`Decrease quantity of ${item.title}`}
                        >
                          <MinusIcon size={12} strokeWidth={2.5} />
                        </button>
                        <span className={styles.qtyVal} aria-live="polite">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className={styles.qtyBtn}
                          onClick={() => handleIncrease(item)}
                          disabled={item.quantity >= 10}
                          aria-label={`Increase quantity of ${item.title}`}
                        >
                          <PlusIcon size={12} strokeWidth={2.5} />
                        </button>
                      </div>

                      {/* Pricing */}
                      <span className={styles.itemPrice}>
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

        </div>

        {/* ── Summary & Checkout CTAs (populated only) ───────────────────── */}
        {drawerState === "populated" && items.length > 0 && (
          <div className={styles.summarySection}>
            <div className={styles.summaryRows} role="table" aria-label="Cart totals summary">
              <div className={styles.summaryRow} role="row">
                <span className={styles.summaryLabel} role="rowheader">Subtotal</span>
                <span className={styles.summaryValue} role="cell">{formatPrice(subtotal)}</span>
              </div>
              <div className={styles.summaryRow} role="row">
                <span className={styles.summaryLabel} role="rowheader">Shipping</span>
                <span className={cx(styles.summaryValue, isFreeShipping && styles.freeShippingVal)} role="cell">
                  {isFreeShipping ? "FREE" : formatPrice(shippingFee)}
                </span>
              </div>
              <div className={cx(styles.summaryRow, styles.grandTotalRow)} role="row">
                <span className={styles.grandTotalLabel} role="rowheader">Total</span>
                <span className={styles.grandTotalValue} role="cell">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <div className={styles.summaryActions}>
              <Link
                to={ROUTES.CHECKOUT}
                className={styles.checkoutBtn}
                onClick={handleClose}
              >
                Proceed to Checkout
              </Link>
              <button
                type="button"
                className={styles.continueShopBtn}
                onClick={handleClose}
              >
                Continue Shopping
              </button>
            </div>

            <div className={styles.trustBadges}>
              <div className={styles.trustItem}>
                <ShieldIcon size={14} className={styles.trustIcon} />
                <span>Secure SSL Payment</span>
              </div>
              <div className={styles.trustItem}>
                <RefreshIcon size={14} className={styles.trustIcon} />
                <span>30-Day Easy Returns</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
