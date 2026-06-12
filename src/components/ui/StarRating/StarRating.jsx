/**
 * @fileoverview StarRating — accessible star display component.
 *
 * @param {number} rate   - rating value 0–5 (float supported)
 * @param {number} count  - number of reviews (optional)
 * @param {boolean} showCount - show review count text
 * @param {'sm'|'md'|'lg'} size
 */

import { StarIcon } from "../Icon/icons";
import styles from "./StarRating.module.scss";
import { cx } from "../../../utils/cx";

const STARS = [1, 2, 3, 4, 5];

export default function StarRating({
  rate = 0,
  count,
  showCount = true,
  size = "sm",
  className,
}) {
  const pct = Math.round((rate / 5) * 100);

  return (
    <div
      className={cx(styles.root, styles[size], className)}
      title={`${rate} out of 5 stars${count ? `, ${count} reviews` : ""}`}
      aria-label={`Rating: ${rate} out of 5${count ? `, ${count} reviews` : ""}`}
    >
      {/* Star track */}
      <div className={styles.stars} aria-hidden="true">
        {/* Empty track */}
        <div className={styles.starsEmpty}>
          {STARS.map((n) => (
            <StarIcon key={n} size={size === "lg" ? 16 : 12} strokeWidth={1.5} />
          ))}
        </div>
        {/* Filled track — clip to percentage */}
        <div className={styles.starsFilled} style={{ width: `${pct}%` }}>
          {STARS.map((n) => (
            <StarIcon key={n} size={size === "lg" ? 16 : 12} strokeWidth={1.5} filled />
          ))}
        </div>
      </div>

      {/* Numeric label */}
      {showCount && (
        <span className={styles.count}>
          <span className={styles.rate}>{rate.toFixed(1)}</span>
          {count != null && (
            <span className={styles.reviews}>({count.toLocaleString()})</span>
          )}
        </span>
      )}
    </div>
  );
}
