/**
 * @fileoverview API base URL and endpoint path constants.
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://fakestoreapi.com";

export const ENDPOINTS = {
  // Products
  PRODUCTS: "/products",
  PRODUCT_BY_ID: (id) => `/products/${id}`,
  PRODUCT_CATEGORIES: "/products/categories",
  PRODUCTS_BY_CATEGORY: (category) => `/products/category/${category}`,

  // Auth
  AUTH_LOGIN: "/auth/login",
  USER_BY_ID: (id) => `/users/${id}`,

  // Cart
  CARTS: "/carts",
  CART_BY_ID: (id) => `/carts/${id}`,
  USER_CARTS: (userId) => `/carts/user/${userId}`,
};
