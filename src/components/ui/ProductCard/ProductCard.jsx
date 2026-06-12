/**
 * @fileoverview ProductCard — the primary product tile for grid layouts.
 *
 * Design: portrait image (3:4), floating badge cluster, hover-lift,
 * Quick Add button that slides up on hover, wishlist toggle.
 *
 * @param {object}  product         - product data object
 * @param {boolean} [isLoading]     - render skeleton if true
 */

import { memo, useState } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../features/cart/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
  selectIsWishlisted,
} from "../../../features/wishlist/wishlistSlice";
import { buildRoute } from "../../../constants/routes";
import { cx } from "../../../utils/cx";
import StarRating from "../StarRating/StarRating";
import { HeartIcon, BagIcon } from "../Icon/icons";
import styles from "./ProductCard.module.scss";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(price);
}

function discountPct(original, current) {
  return Math.round(((original - current) / original) * 100);
}

function humanCategory(cat = "") {
  const map = {
    "men's clothing": "Men's",
    "women's clothing": "Women's",
    electronics: "Electronics",
    jewelery: "Jewelry",
  };
  return map[cat] ?? cat;
}

// ─────────────────────────────────────────────────────────────────────────────
function ProductCard({ product }) {
  const dispatch = useDispatch();
  const isWishlisted = useSelector(selectIsWishlisted(product.id));
  const [imgLoaded, setImgLoaded] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault(); // don't navigate — we're inside a <Link>
    e.stopPropagation();
    dispatch(addToCart({ product, selectedColor: "", selectedSize: "" }));
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1400);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product.id));
    }
  };

  const pct =
    product.isSale && product.originalPrice
      ? discountPct(product.originalPrice, product.price)
      : null;

  return (
    <article className={styles.card}>
      <Link
        to={buildRoute.productDetail(product.id)}
        className={styles.cardInner}
        aria-label={`View ${product.title}`}
      >
        {/* ── Image area ────────────────────────────────────────────── */}
        <div className={styles.imageWrapper}>
          {/* Blur-up placeholder */}
          {!imgLoaded && <div className={styles.imgPlaceholder} aria-hidden="true" />}

          <img
            src={product.image}
            alt={product.title}
            className={cx(styles.image, imgLoaded && styles.imageLoaded)}
            onLoad={() => setImgLoaded(true)}
            loading="lazy"
            decoding="async"
          />

          {/* ── Badges ─────────────────────────────────────────────── */}
          <div className={styles.badges} aria-label="Product badges">
            {product.isSale && pct && (
              <span className={cx(styles.badge, styles.badgeSale)}>
                -{pct}%
              </span>
            )}
            {product.isNew && (
              <span className={cx(styles.badge, styles.badgeNew)}>New</span>
            )}
            {product.isBestseller && !product.isNew && (
              <span className={cx(styles.badge, styles.badgeBestseller)}>
                Bestseller
              </span>
            )}
          </div>

          {/* ── Wishlist button ─────────────────────────────────────── */}
          <button
            className={cx(styles.wishlistBtn, isWishlisted && styles.wishlisted)}
            onClick={handleWishlist}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={isWishlisted}
            type="button"
          >
            <HeartIcon
              size={16}
              strokeWidth={isWishlisted ? 0 : 1.75}
              filled={isWishlisted}
            />
          </button>

          {/* ── Quick Add — slides up on hover ──────────────────────── */}
          <div className={styles.quickAddWrapper} aria-hidden="true">
            <button
              className={cx(
                styles.quickAddBtn,
                addedFeedback && styles.quickAddConfirmed
              )}
              onClick={handleAddToCart}
              tabIndex={-1} // accessible via card link — real add is on detail page
              type="button"
            >
              {addedFeedback ? (
                <span className={styles.addedText}>✓ Added</span>
              ) : (
                <>
                  <BagIcon size={14} strokeWidth={2} />
                  <span>Quick Add</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Product info ───────────────────────────────────────────── */}
        <div className={styles.info}>
          {/* Category */}
          <span className={styles.category}>
            {humanCategory(product.category)}
          </span>

          {/* Title */}
          <h3 className={styles.title}>{product.title}</h3>

          {/* Rating */}
          {product.rating && (
            <StarRating
              rate={product.rating.rate}
              count={product.rating.count}
              size="sm"
              className={styles.rating}
            />
          )}

          {/* Price */}
          <div className={styles.priceRow}>
            <span
              className={cx(
                styles.price,
                product.isSale && styles.priceSale
              )}
            >
              {formatPrice(product.price)}
            </span>
            {product.isSale && product.originalPrice && (
              <span className={styles.originalPrice}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}

export default memo(ProductCard);
