/**
 * @fileoverview Auth layout — clean centered layout for Login/Register pages.
 */

import { Outlet } from "react-router";
import styles from "./AuthLayout.module.scss";

export default function AuthLayout() {
  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <Outlet />
      </div>
    </div>
  );
}
