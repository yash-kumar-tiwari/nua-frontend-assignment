/**
 * @fileoverview Application router.
 * Uses React Router v7 createBrowserRouter with lazy-loaded page components.
 * All protected routes are wrapped in ProtectedRoute.
 */

import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import { ROUTES } from "../constants/routes";
import RootLayout from "../layouts/RootLayout/RootLayout";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import PageSpinner from "../components/common/PageSpinner/PageSpinner";

// ── Lazy page imports ─────────────────────────────────────────────────────────
const Home           = lazy(() => import("../pages/Home/Home"));
const ProductList    = lazy(() => import("../pages/ProductList/ProductList"));
const ProductDetail  = lazy(() => import("../pages/ProductDetail/ProductDetail"));
const Cart           = lazy(() => import("../pages/Cart/Cart"));
const Checkout       = lazy(() => import("../pages/Checkout/Checkout"));
const OrderSuccess   = lazy(() => import("../pages/OrderSuccess/OrderSuccess"));
const Login          = lazy(() => import("../pages/Auth/Login/Login"));
const Register       = lazy(() => import("../pages/Auth/Register/Register"));
const Profile        = lazy(() => import("../pages/Profile/Profile"));
const Wishlist       = lazy(() => import("../pages/Wishlist/Wishlist"));
const NotFound       = lazy(() => import("../pages/NotFound/NotFound"));
const ProtectedRoute = lazy(() => import("../components/common/ProtectedRoute/ProtectedRoute"));

/** Wrap a page in Suspense with a full-page spinner fallback. */
const withSuspense = (element) => (
  <Suspense fallback={<PageSpinner />}>{element}</Suspense>
);

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <RootLayout />,
    children: [
      { index: true,                       element: withSuspense(<Home />) },
      { path: ROUTES.PRODUCTS,             element: withSuspense(<ProductList />) },
      { path: ROUTES.PRODUCT_DETAIL,       element: withSuspense(<ProductDetail />) },
      { path: ROUTES.CART,                 element: withSuspense(<Cart />) },

      // Protected routes
      {
        element: withSuspense(<ProtectedRoute />),
        children: [
          { path: ROUTES.CHECKOUT,         element: withSuspense(<Checkout />) },
          { path: ROUTES.ORDER_SUCCESS,    element: withSuspense(<OrderSuccess />) },
          { path: ROUTES.PROFILE,          element: withSuspense(<Profile />) },
          { path: ROUTES.WISHLIST,         element: withSuspense(<Wishlist />) },
        ],
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: ROUTES.LOGIN,                element: withSuspense(<Login />) },
      { path: ROUTES.REGISTER,            element: withSuspense(<Register />) },
    ],
  },
  { path: ROUTES.NOT_FOUND,               element: withSuspense(<NotFound />) },
]);

export default router;
