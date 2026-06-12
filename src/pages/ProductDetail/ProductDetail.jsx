/**
 * @fileoverview ProductDetail page — detailed product layout.
 *
 * Includes:
 *   - Breadcrumbs
 *   - Simulated loading state with detail page skeletons
 *   - Gallery: Main image switching with fade animation + mobile horizontal scrolling thumbnails
 *   - Brand/eyebrow, title, price (original/sale support), rating, description
 *   - Color swatches, sizes selector (checks stock), quantity selector (with boundaries)
 *   - Dynamic Stock Alert badge
 *   - Cart addition success animation + Wishlist Redux sync
 *   - Collapsible Product Accordions (Details, Materials, Shipping)
 */

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useParams, useSearchParams, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useProduct } from "../../features/products/useProducts";
import { ROUTES } from "../../constants/routes";
import { addToCart as addToCartAction } from "../../features/cart/cartSlice";
import { showNotification } from "../../features/ui/uiSlice";
import {
  addToWishlist,
  removeFromWishlist,
  selectIsWishlisted,
} from "../../features/wishlist/wishlistSlice";
import { addToCart as addToCartApi } from "../../services/cartService";
import StarRating from "../../components/ui/StarRating/StarRating";
import {
  VARIANT_COLORS,
  SIZES,
  getProductStock,
  getStockStatusLabel,
} from "../../utils/variantHelper";
import {
  HeartIcon,
  BagIcon,
  PlusIcon,
  MinusIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  TruckIcon,
  RefreshIcon,
  ShieldIcon,
  CheckIcon,
} from "../../components/ui/Icon/icons";
import { cx } from "../../utils/cx";
import styles from "./ProductDetail.module.scss";

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
    "men's clothing": "Men's Clothing",
    "women's clothing": "Women's Clothing",
    electronics: "Electronics",
    jewelery: "Jewelry",
  };
  return map[cat] ?? cat;
}

// ─────────────────────────────────────────────────────────────────────────────
// Components
// ─────────────────────────────────────────────────────────────────────────────

/**
 * ProductDetailsSkeleton — Shimmer skeletons matching the page structure
 */
function ProductDetailSkeleton() {
  return (
    <div className={styles.skeletonContainer} aria-hidden="true">
      {/* Breadcrumb skeleton */}
      <div className={styles.skeletonBreadcrumb} />

      <div className={styles.detailGrid}>
        {/* Gallery skeleton */}
        <div className={styles.gallerySkeleton}>
          <div className={styles.skeletonMainImg} />
          <div className={styles.skeletonThumbnails}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.skeletonThumb} />
            ))}
          </div>
        </div>

        {/* Info panel skeleton */}
        <div className={styles.infoSkeleton}>
          <div className={styles.skeletonBadge} />
          <div className={styles.skeletonTitle} />
          <div className={styles.skeletonTitleShort} />
          <div className={styles.skeletonRating} />
          <div className={styles.skeletonPrice} />
          <div className={styles.skeletonDesc} />
          <div className={styles.skeletonDescShort} />

          <div className={styles.skeletonSwatchesLabel} />
          <div className={styles.skeletonSwatches} />

          <div className={styles.skeletonSizesLabel} />
          <div className={styles.skeletonSizes} />

          <div className={styles.skeletonActions} />
        </div>
      </div>
    </div>
  );
}

/**
 * Main Product Details page component
 */
export default function ProductDetail() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [productId]);

  // Find product via TanStack Query
  const { data: product, isLoading, isError } = useProduct(productId);

  // Redux Wishlist
  const isWishlisted = useSelector(
    product ? selectIsWishlisted(product.id) : () => false
  );

  // ── URL-synced variant state ──────────────────────────────────────────────
  const [searchParams, setSearchParams] = useSearchParams();

  const colorParam = searchParams.get("color");
  const sizeParam = searchParams.get("size");

  const validColorIds = useMemo(
    () => VARIANT_COLORS.map((c) => c.id),
    []
  );

  const selectedColor = validColorIds.includes(colorParam)
    ? colorParam
    : VARIANT_COLORS[0].id;

  const selectedSize = SIZES.includes(sizeParam) ? sizeParam : null;

  const updateVariantParams = useCallback(
    (overrides) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if ("color" in overrides) {
          next.set("color", overrides.color);
        }
        if ("size" in overrides) {
          if (overrides.size) {
            next.set("size", overrides.size);
          } else {
            next.delete("size");
          }
        }
        return next;
      });
    },
    [setSearchParams]
  );

  // ── Other state ───────────────────────────────────────────────────────────
  const [activeImage, setActiveImage] = useState("");
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [cartBtnState, setCartBtnState] = useState("idle"); // idle | adding | success
  const [imgFade, setImgFade] = useState(false);

  // Accordion open/close state
  const [accordionOpen, setAccordionOpen] = useState({
    details: true,
    materials: false,
    shipping: false,
  });

  // Set active image when product finishes loading
  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
    }
  }, [product]);

  // Generate deterministic mock variants & stock map
  const stockMap = useMemo(() => {
    if (!product) return {};
    return getProductStock(product.id);
  }, [product]);

  // Calculate discount rate
  const discountRate = useMemo(() => {
    if (product && product.isSale && product.originalPrice) {
      return discountPct(product.originalPrice, product.price);
    }
    return null;
  }, [product]);

  // Generate 4 mock gallery images by appending unique query variables to prevent browser cache issues
  const galleryImages = useMemo(() => {
    if (!product) return [];
    return [
      product.image,
      `${product.image}?v=2`,
      `${product.image}?v=3`,
      `${product.image}?v=4`,
    ];
  }, [product]);

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (isError) {
    return (
      <div className={styles.notFound}>
        <h2>Error Loading Product</h2>
        <p>We encountered an issue loading this product. Please check your connection and try again.</p>
        <Link to={ROUTES.PRODUCTS} className={styles.backBtn}>
          Back to Shop
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product Not Found</h2>
        <p>The product you are looking for does not exist or has been removed.</p>
        <Link to={ROUTES.PRODUCTS} className={styles.backBtn}>
          Back to Shop
        </Link>
      </div>
    );
  }

  // Handle Thumbnail switching with visual animation
  const handleImageSwitch = (imgUrl) => {
    if (activeImage === imgUrl) return;
    setImgFade(true);
    setTimeout(() => {
      setActiveImage(imgUrl);
      setImgFade(false);
    }, 150);
  };

  // Determine current variant combination stock status
  const currentStockStatus = selectedSize
    ? stockMap[selectedColor]?.[selectedSize]
    : null;

  // Determine if adding is allowed
  const isAvailable = currentStockStatus !== "sold_out";

  // Quantity control
  const handleQtyChange = (amount) => {
    const newQty = qty + amount;
    // Check upper boundary based on low stock or available status
    const limit = currentStockStatus === "low" ? 3 : 10;
    if (newQty >= 1 && newQty <= limit) {
      setQty(newQty);
    }
  };

  // Color switcher
  const handleColorChange = (colorId) => {
    const sizeSoldOut =
      selectedSize && stockMap[colorId]?.[selectedSize] === "sold_out";
    updateVariantParams({ color: colorId, size: sizeSoldOut ? null : undefined });
    setQty(1);
  };

  // Size switcher
  const handleSizeChange = (size) => {
    updateVariantParams({ size });
    setSizeError(false);
    setQty(1);
  };

  // Add to Wishlist toggle
  const handleWishlistToggle = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product.id));
    }
  };

  // Add to Cart submit
  const handleAddToCartSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSize) {
      setSizeError(true);
      const sizeSelectorEl = document.getElementById("size-selector-label");
      if (sizeSelectorEl) {
        sizeSelectorEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    if (!isAvailable) return;

    setCartBtnState("adding");

    try {
      await addToCartApi({ productId: product.id, quantity: qty, selectedColor, selectedSize });

      dispatch(
        addToCartAction({ product, quantity: qty, selectedColor, selectedSize })
      );
      setCartBtnState("success");
      dispatch(
        showNotification({
          message: `${product.title} has been added to your cart.`,
          type: "success",
        })
      );
      setTimeout(() => setCartBtnState("idle"), 2000);
    } catch (err) {
      setCartBtnState("error");
      dispatch(
        showNotification({
          message: err.message || "Failed to add item to cart.",
          type: "error",
        })
      );
    }
  };

  // Collapsible Accordion toggle
  const toggleAccordion = (section) => {
    setAccordionOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* ── Breadcrumb Navigation ────────────────────────────────────── */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link to={ROUTES.HOME} className={styles.breadcrumbLink}>
            Home
          </Link>
          <ChevronRightIcon size={12} strokeWidth={2} className={styles.crumbArrow} />
          <Link to={ROUTES.PRODUCTS} className={styles.breadcrumbLink}>
            Shop
          </Link>
          <ChevronRightIcon size={12} strokeWidth={2} className={styles.crumbArrow} />
          <span className={styles.breadcrumbActive} aria-current="page">
            {product.title}
          </span>
        </nav>

        {/* ── Main Details Grid ────────────────────────────────────────── */}
        <div className={styles.layoutGrid}>
          
          {/* Left: Product Gallery */}
          <section className={styles.gallerySection} aria-label="Product Gallery">
            <div className={styles.galleryContainer}>
              {/* Active Image frame */}
              <div className={styles.mainImageFrame}>
                <img
                  src={activeImage}
                  alt={`${product.title} main view`}
                  className={cx(styles.mainImage, imgFade && styles.mainImageFade)}
                />
                
                {/* Float Badges */}
                <div className={styles.galleryBadges}>
                  {product.isSale && discountRate && (
                    <span className={cx(styles.badge, styles.badgeSale)}>
                      -{discountRate}% OFF
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
              </div>

              {/* Thumbnails row (scrolling on mobile) */}
              <div className={styles.thumbnailRow} aria-label="Product thumbnail switcher">
                {galleryImages.map((imgUrl, index) => (
                  <button
                    key={index}
                    type="button"
                    className={cx(
                      styles.thumbnailBtn,
                      activeImage === imgUrl && styles.thumbnailActive
                    )}
                    onClick={() => handleImageSwitch(imgUrl)}
                    aria-label={`Switch to gallery image ${index + 1}`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.title} thumbnail ${index + 1}`}
                      className={styles.thumbnailImg}
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Right: Product Purchase Panel (Sticky on desktop) */}
          <section className={styles.purchaseSection} aria-labelledby="product-title-heading">
            <div className={styles.stickyPanel}>
              
              {/* Category & Brand Eyebrow */}
              <div className={styles.eyebrowRow}>
                <span className={styles.brandName}>NUA ESSENTIALS</span>
                <span className={styles.categoryDivider}>·</span>
                <span className={styles.categoryName}>
                  {humanCategory(product.category)}
                </span>
              </div>

              {/* Title */}
              <h1 id="product-title-heading" className={styles.productTitle}>
                {product.title}
              </h1>

              {/* Ratings */}
              {product.rating && (
                <div className={styles.ratingRow}>
                  <StarRating
                    rate={product.rating.rate}
                    count={product.rating.count}
                    size="md"
                    className={styles.ratingStars}
                  />
                </div>
              )}

              {/* Pricing details */}
              <div className={styles.priceContainer}>
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
                    <>
                      <span className={styles.originalPrice}>
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className={styles.savingsLabel}>
                        Save {formatPrice(product.originalPrice - product.price)}
                      </span>
                    </>
                  )}
                </div>
                <p className={styles.taxNotice}>Tax included. Free shipping on orders over $50.</p>
              </div>

              {/* Brief Description */}
              <div className={styles.descriptionContainer}>
                <p className={styles.description}>{product.description}</p>
              </div>

              {/* Interactive Purchase form */}
              <form onSubmit={handleAddToCartSubmit} className={styles.purchaseForm}>
                
                {/* Color Swatch Section */}
                <div className={styles.selectorGroup}>
                  <div className={styles.selectorHeader}>
                    <span className={styles.selectorLabel}>
                      Color:{" "}
                      <span className={styles.selectedVal}>
                        {VARIANT_COLORS.find((c) => c.id === selectedColor)?.label}
                      </span>
                    </span>
                  </div>
                  <div className={styles.swatchList} role="radiogroup" aria-label="Select color">
                    {VARIANT_COLORS.map((color) => {
                      const colorHex = color.hex;
                      const hasBorder = color.border;
                      const isSelected = selectedColor === color.id;

                      return (
                        <button
                          key={color.id}
                          type="button"
                          className={cx(
                            styles.swatchBtn,
                            isSelected && styles.swatchActive
                          )}
                          onClick={() => handleColorChange(color.id)}
                          aria-label={`Select color ${color.label}`}
                          aria-checked={isSelected}
                          role="radio"
                          style={{
                            "--swatch-color": colorHex,
                            "--swatch-border": hasBorder || "transparent",
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Size Selector Section */}
                <div className={cx(styles.selectorGroup, sizeError && styles.selectorGroupError)}>
                  <div className={styles.selectorHeader}>
                    <span id="size-selector-label" className={styles.selectorLabel}>
                      Size:{" "}
                      <span className={styles.selectedVal}>
                        {selectedSize || "Select a size"}
                      </span>
                    </span>
                    {sizeError && (
                      <span className={styles.errorText} role="alert">
                        Please choose a size
                      </span>
                    )}
                  </div>
                  <div
                    className={styles.sizeGrid}
                    role="radiogroup"
                    aria-label="Select size"
                  >
                    {SIZES.map((size) => {
                      const sizeStock = stockMap[selectedColor]?.[size] || "available";
                      const isSoldOut = sizeStock === "sold_out";
                      const isLow = sizeStock === "low";
                      const isSelected = selectedSize === size;

                      return (
                        <button
                          key={size}
                          type="button"
                          disabled={isSoldOut}
                          className={cx(
                            styles.sizeBtn,
                            isSelected && styles.sizeActive,
                            isLow && styles.sizeLowStock,
                            isSoldOut && styles.sizeSoldOut
                          )}
                          onClick={() => handleSizeChange(size)}
                          aria-label={`Size ${size}${isSoldOut ? " - Sold out" : isLow ? " - Low stock" : ""}`}
                          aria-checked={isSelected}
                          aria-disabled={isSoldOut}
                          role="radio"
                        >
                          <span className={styles.sizeName}>{size}</span>
                          {isLow && <span className={styles.sizeDot} aria-hidden="true" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Real-time Stock alert label */}
                {selectedSize && (
                  <div className={styles.stockAlertRow}>
                    <div
                      className={cx(
                        styles.stockAlertDot,
                        currentStockStatus === "sold_out"
                          ? styles.alertDotRed
                          : currentStockStatus === "low"
                          ? styles.alertDotOrange
                          : styles.alertDotGreen
                      )}
                    />
                    <span
                      className={cx(
                        styles.stockAlertText,
                        currentStockStatus === "sold_out"
                          ? styles.alertTextRed
                          : currentStockStatus === "low"
                          ? styles.alertTextOrange
                          : styles.alertTextGreen
                      )}
                    >
                      {currentStockStatus === "sold_out"
                        ? "Sold Out — check back later"
                        : currentStockStatus === "low"
                        ? `Low Stock — only 2 left in this variant!`
                        : "Available — ready to ship"}
                    </span>
                  </div>
                )}

                {/* Quantity + Checkout CTA Row */}
                <div className={styles.actionRow}>
                  {/* Quantity selector */}
                  <div
                    className={cx(
                      styles.qtySelector,
                      (!selectedSize || !isAvailable) && styles.qtyDisabled
                    )}
                    aria-label="Quantity selector"
                  >
                    <button
                      type="button"
                      className={styles.qtyBtn}
                      onClick={() => handleQtyChange(-1)}
                      disabled={!selectedSize || !isAvailable || qty <= 1}
                      aria-label="Decrease quantity"
                    >
                      <MinusIcon size={14} strokeWidth={2.5} />
                    </button>
                    <span className={styles.qtyVal} aria-live="polite">
                      {qty}
                    </span>
                    <button
                      type="button"
                      className={styles.qtyBtn}
                      onClick={() => handleQtyChange(1)}
                      disabled={
                        !selectedSize ||
                        !isAvailable ||
                        qty >= (currentStockStatus === "low" ? 3 : 10)
                      }
                      aria-label="Increase quantity"
                    >
                      <PlusIcon size={14} strokeWidth={2.5} />
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    type="submit"
                    className={cx(
                      styles.addToCartBtn,
                      cartBtnState === "adding" && styles.btnAdding,
                      cartBtnState === "success" && styles.btnSuccess,
                      cartBtnState === "error" && styles.btnError,
                      selectedSize && !isAvailable && styles.btnSoldOut
                    )}
                    disabled={
                      (cartBtnState === "adding") ||
                      (selectedSize && !isAvailable)
                    }
                  >
                    {cartBtnState === "adding" ? (
                      <span className={styles.spinner} aria-hidden="true" />
                    ) : cartBtnState === "success" ? (
                      <span className={styles.btnSuccessContent}>
                        <CheckIcon size={16} strokeWidth={2.5} />
                        <span>Added to Cart</span>
                      </span>
                    ) : cartBtnState === "error" ? (
                      <span className={styles.btnSuccessContent}>
                        <RefreshIcon size={16} strokeWidth={2.5} />
                        <span>Try Again</span>
                      </span>
                    ) : selectedSize && !isAvailable ? (
                      "Out of Stock"
                    ) : (
                      <>
                        <BagIcon size={16} strokeWidth={2} />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist toggle */}
                  <button
                    type="button"
                    className={cx(
                      styles.wishlistToggleBtn,
                      isWishlisted && styles.wishlistedActive
                    )}
                    onClick={handleWishlistToggle}
                    aria-label={
                      isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                    }
                    aria-pressed={isWishlisted}
                  >
                    <HeartIcon
                      size={18}
                      strokeWidth={isWishlisted ? 0 : 2}
                      filled={isWishlisted}
                    />
                  </button>
                </div>
              </form>

              {/* Reusable Trust Badges */}
              <div className={styles.trustBadges}>
                <div className={styles.trustItem}>
                  <TruckIcon size={18} strokeWidth={1.5} className={styles.trustIcon} />
                  <span>Free shipping over $50</span>
                </div>
                <div className={styles.trustItem}>
                  <RefreshIcon size={18} strokeWidth={1.5} className={styles.trustIcon} />
                  <span>Flexible 30-day returns</span>
                </div>
                <div className={styles.trustItem}>
                  <ShieldIcon size={18} strokeWidth={1.5} className={styles.trustIcon} />
                  <span>Secured SSL checkout</span>
                </div>
              </div>

              {/* Accordion Panels */}
              <div className={styles.accordionGroup}>
                {/* Details Tab */}
                <div className={styles.accordionItem}>
                  <button
                    type="button"
                    className={styles.accordionHeader}
                    onClick={() => toggleAccordion("details")}
                    aria-expanded={accordionOpen.details}
                  >
                    <span>Product Details</span>
                    <ChevronDownIcon
                      size={16}
                      className={cx(
                        styles.accordionArrow,
                        accordionOpen.details && styles.arrowRotated
                      )}
                    />
                  </button>
                  <div
                    className={cx(
                      styles.accordionBody,
                      accordionOpen.details && styles.bodyOpen
                    )}
                  >
                    <p className={styles.accordionText}>
                      This premium article features modern details, tailored profiles, and comfortable, functional fabrics. Carefully selected materials ensure a structured fit and long-term durability. Suitable for day-to-night styling or layered outfits.
                    </p>
                    <ul className={styles.accordionList}>
                      <li>Structured modern styling</li>
                      <li>Curated, harmonious textures</li>
                      <li>Reinforced stitching at key stress points</li>
                      <li>Tailored premium silhouette</li>
                    </ul>
                  </div>
                </div>

                {/* Materials & Care Tab */}
                <div className={styles.accordionItem}>
                  <button
                    type="button"
                    className={styles.accordionHeader}
                    onClick={() => toggleAccordion("materials")}
                    aria-expanded={accordionOpen.materials}
                  >
                    <span>Materials & Care</span>
                    <ChevronDownIcon
                      size={16}
                      className={cx(
                        styles.accordionArrow,
                        accordionOpen.materials && styles.arrowRotated
                      )}
                    />
                  </button>
                  <div
                    className={cx(
                      styles.accordionBody,
                      accordionOpen.materials && styles.bodyOpen
                    )}
                  >
                    <p className={styles.accordionText}>
                      Crafted from premium sustainable fibers. We recommend a gentle cold wash with similar colors to retain texture.
                    </p>
                    <ul className={styles.accordionList}>
                      <li>100% curated organic canvas/composite blend</li>
                      <li>Do not bleach or tumble dry</li>
                      <li>Cool iron if needed</li>
                      <li>Dry clean optional for extended life</li>
                    </ul>
                  </div>
                </div>

                {/* Shipping & Returns Tab */}
                <div className={styles.accordionItem}>
                  <button
                    type="button"
                    className={styles.accordionHeader}
                    onClick={() => toggleAccordion("shipping")}
                    aria-expanded={accordionOpen.shipping}
                  >
                    <span>Shipping & Returns</span>
                    <ChevronDownIcon
                      size={16}
                      className={cx(
                        styles.accordionArrow,
                        accordionOpen.shipping && styles.arrowRotated
                      )}
                    />
                  </button>
                  <div
                    className={cx(
                      styles.accordionBody,
                      accordionOpen.shipping && styles.bodyOpen
                    )}
                  >
                    <p className={styles.accordionText}>
                      We process orders within 1–2 business days. Shipping times range between 3–5 days for continental regions. Returns are supported within 30 days of purchase.
                    </p>
                    <ul className={styles.accordionList}>
                      <li>Free economy shipping over $50</li>
                      <li>$5.99 flat rate shipping for orders under $50</li>
                      <li>Pre-printed return shipping labels included</li>
                      <li>Refunds processed within 3 days of arrival</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
