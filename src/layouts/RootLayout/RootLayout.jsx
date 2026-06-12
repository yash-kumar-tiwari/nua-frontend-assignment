/**
 * @fileoverview RootLayout — rendered for all main (non-auth) routes.
 *
 * Structure:
 *   <Navbar />          fixed, full-width
 *   <main id="main-content">
 *     <Outlet />        page content (lazy-loaded)
 *   </main>
 *   <Footer />
 *
 * Also contains: CartDrawer slot, Toast slot (uncommented when implemented).
 */

import { Outlet } from "react-router";
import { useScrollTop } from "../../hooks/useScrollTop";
import Navbar from "../../components/common/Navbar/Navbar";
import Footer from "../../components/common/Footer/Footer";
import CartDrawer from "../../components/cart/CartDrawer";
import Toast from "../../components/ui/Toast/Toast";
import styles from "./RootLayout.module.scss";

export default function RootLayout() {
  useScrollTop();

  return (
    <div className={styles.root}>
      <Navbar />

      <main id="main-content" className={styles.main} tabIndex={-1}>
        <Outlet />
      </main>

      <Footer />

      <CartDrawer />
      <Toast />
    </div>
  );
}
