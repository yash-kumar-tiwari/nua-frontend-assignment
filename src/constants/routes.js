/**
 * @fileoverview Centralized route path constants.
 * Import these instead of hardcoding strings in <Link> or navigate() calls.
 */

export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/products/:productId",
  CART: "/cart",
  CHECKOUT: "/checkout",
  ORDER_SUCCESS: "/order-success/:orderId",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
  WISHLIST: "/wishlist",
  NOT_FOUND: "*",
};

/**
 * Helpers to build dynamic route paths.
 */
export const buildRoute = {
  productDetail: (productId) => `/products/${productId}`,
  orderSuccess: (orderId) => `/order-success/${orderId}`,
};
