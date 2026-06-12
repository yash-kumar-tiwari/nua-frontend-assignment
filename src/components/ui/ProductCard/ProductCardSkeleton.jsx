/**
 * @fileoverview ProductCardSkeleton — loading placeholder matching
 * the exact ProductCard dimensions. Prevents layout shift during fetch.
 *
 * @param {number} [count=8] - number of skeleton cards to render
 */

import styles from "./ProductCardSkeleton.module.scss";

function SkeletonCard() {
  return (
    <div className={styles.card} aria-hidden="true">
      {/* Image placeholder */}
      <div className={styles.image} />

      {/* Info placeholder */}
      <div className={styles.info}>
        <div className={styles.category} />
        <div className={styles.titleLine1} />
        <div className={styles.titleLine2} />
        <div className={styles.stars} />
        <div className={styles.price} />
      </div>
    </div>
  );
}

export default function ProductCardSkeleton({ count = 8 }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </>
  );
}
