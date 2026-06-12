/**
 * @fileoverview Full-page loading spinner used as Suspense fallback
 * and PersistGate loading state.
 */

import styles from "./PageSpinner.module.scss";

export default function PageSpinner() {
  return (
    <div className={styles.overlay} role="status" aria-label="Loading">
      <div className={styles.spinner} />
    </div>
  );
}
