/**
 * @fileoverview ProductList page — Shop / Browse.
 *
 * Sections:
 *   1. Hero           — editorial full-bleed header
 *   2. Featured banner — horizontal highlight strip
 *   3. Filter / sort toolbar
 *   4. Product grid   — cards | skeletons | empty | error
 *
 * State (all local — no API yet):
 *   - activeCategory  — filter
 *   - sortBy          — sort key
 *   - isLoading       — simulated skeleton delay
 *   - showError       — simulated error state toggle
 */

import { useState, useEffect, useMemo, memo } from "react";
import { useSearchParams } from "react-router";
import { useDispatch } from "react-redux";
import { openCartDrawer } from "../../features/ui/uiSlice";
import { useProducts } from "../../features/products/useProducts";
import {
  MOCK_CATEGORIES,
  SORT_OPTIONS,
} from "../../constants/mockProducts";
import { cx } from "../../utils/cx";
import ProductCard from "../../components/ui/ProductCard/ProductCard";
import ProductCardSkeleton from "../../components/ui/ProductCard/ProductCardSkeleton";
import { ChevronDownIcon, ArrowRightIcon } from "../../components/ui/Icon/icons";
import styles from "./ProductList.module.scss";

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components (small, co-located — can be extracted if they grow)
// ─────────────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.heroContent}>
        <p className={styles.heroEyebrow}>New Season · Spring 2026</p>
        <h1 className={styles.heroHeading} id="hero-heading">
          Thoughtfully<br />
          <em>Curated.</em>
        </h1>
        <p className={styles.heroSub}>
          Refined pieces for everyday life. Quality without compromise.
        </p>
        <a href="#product-grid" className={styles.heroBtn}>
          Shop the Collection
          <ArrowRightIcon size={16} strokeWidth={2} />
        </a>
      </div>
      <div className={styles.heroDecor} aria-hidden="true">
        <div className={styles.heroDecorCircle1} />
        <div className={styles.heroDecorCircle2} />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function FeaturedBanner() {
  const dispatch = useDispatch();
  return (
    <section className={styles.banner} aria-label="Promotional banner">
      <div className={styles.bannerInner}>
        <div className={styles.bannerItems}>
          <BannerItem
            label="Free Shipping"
            detail="On orders over $50"
            emoji="✦"
          />
          <BannerItem
            label="New Arrivals"
            detail="Fresh drops every week"
            emoji="◈"
          />
          <BannerItem
            label="30-Day Returns"
            detail="No questions asked"
            emoji="◐"
          />
          <BannerItem
            label="Members Save 15%"
            detail="Join for free today"
            emoji="✦"
          />
        </div>
      </div>
    </section>
  );
}

const BannerItem = memo(function BannerItem({ label, detail, emoji }) {
  return (
    <div className={styles.bannerItem}>
      <span className={styles.bannerEmoji} aria-hidden="true">{emoji}</span>
      <span className={styles.bannerLabel}>{label}</span>
      <span className={styles.bannerDot} aria-hidden="true">·</span>
      <span className={styles.bannerDetail}>{detail}</span>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────

const FilterToolbar = memo(function FilterToolbar({
  categories,
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  resultCount,
}) {
  return (
    <div className={styles.toolbar} aria-label="Filter and sort controls">
      {/* Category pills */}
      <nav className={styles.filterPills} aria-label="Filter by category">
        <ul role="list" className={styles.pillList}>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                type="button"
                className={cx(
                  styles.pill,
                  activeCategory === cat.id && styles.pillActive
                )}
                onClick={() => onCategoryChange(cat.id)}
                aria-pressed={activeCategory === cat.id}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right side: count + sort */}
      <div className={styles.toolbarRight}>
        <span className={styles.resultCount} aria-live="polite">
          {resultCount} product{resultCount !== 1 ? "s" : ""}
        </span>

        <div className={styles.sortWrapper}>
          <label htmlFor="sort-select" className={styles.sortLabel}>
            Sort by
          </label>
          <div className={styles.selectWrapper}>
            <select
              id="sort-select"
              className={styles.sortSelect}
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDownIcon size={14} strokeWidth={2} className={styles.selectChevron} />
          </div>
        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────

function EmptyState({ category }) {
  return (
    <div className={styles.emptyState} role="status">
      <div className={styles.emptyIcon} aria-hidden="true">
        <span className={styles.emptyEmoji}>◻</span>
      </div>
      <h2 className={styles.emptyHeading}>No products found</h2>
      <p className={styles.emptyBody}>
        {category && category !== "all"
          ? `We couldn't find anything in "${category}" right now.`
          : "No products match your current filters."}
        <br />
        Try a different category or check back soon.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function ErrorState({ onRetry }) {
  return (
    <div className={styles.errorState} role="alert">
      <div className={styles.errorIcon} aria-hidden="true">
        <span className={styles.errorEmoji}>✕</span>
      </div>
      <h2 className={styles.errorHeading}>Something went wrong</h2>
      <p className={styles.errorBody}>
        We couldn't load the products. Please check your connection and try again.
      </p>
      <button className={styles.retryBtn} onClick={onRetry} type="button">
        Try again
        <ArrowRightIcon size={14} strokeWidth={2} />
      </button>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// Page component
// ═════════════════════════════════════════════════════════════════════════════
export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Derive filter state from URL params (shareable/bookmarkable)
  const activeCategory = searchParams.get("category") || "all";
  const sortBy = searchParams.get("sort") || "featured";

  // Query products based on category filter
  const {
    data: rawProducts,
    isLoading,
    isError,
    refetch,
  } = useProducts(
    activeCategory !== "all" ? { category: activeCategory } : {}
  );

  // ── Filter + sort ──────────────────────────────────────────────────────────
  const products = useMemo(() => {
    if (!rawProducts) return [];
    let result = [...rawProducts];

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case "newest":
        result = result.filter((p) => p.isNew).concat(
          result.filter((p) => !p.isNew)
        );
        break;
      default:
        // "featured" — bestsellers first
        result.sort(
          (a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0)
        );
    }
    return result;
  }, [rawProducts, sortBy]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleCategoryChange = (cat) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (cat === "all") {
        next.delete("category");
      } else {
        next.set("category", cat);
      }
      return next;
    });
  };

  const handleSortChange = (sort) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (sort === "featured") {
        next.delete("sort");
      } else {
        next.set("sort", sort);
      }
      return next;
    });
  };

  const handleRetry = () => {
    refetch();
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className={styles.page}>
      {/* 1 · Hero */}
      <Hero />

      {/* 2 · Featured banner */}
      <FeaturedBanner />

      {/* 3 · Product section */}
      <section
        id="product-grid"
        className={styles.section}
        aria-label="Product listing"
      >
        <div className={styles.sectionInner}>

          {/* Section header */}
          <header className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionEyebrow}>The Collection</p>
              <h2 className={styles.sectionTitle}>Shop All Products</h2>
            </div>
          </header>

          {/* Filter toolbar */}
          <FilterToolbar
            categories={MOCK_CATEGORIES}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            resultCount={isLoading ? 0 : products.length}
          />

          {/* Grid / state */}
          <div
            className={styles.grid}
            aria-live="polite"
            aria-busy={isLoading}
          >
            {isError ? (
              <div className={styles.stateWrapper}>
                <ErrorState onRetry={handleRetry} />
              </div>
            ) : isLoading ? (
              <ProductCardSkeleton count={8} />
            ) : products.length === 0 ? (
              <div className={styles.stateWrapper}>
                <EmptyState category={activeCategory} />
              </div>
            ) : (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
