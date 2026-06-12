/**
 * @fileoverview Products API service.
 * All calls go through the shared axiosInstance.
 */

import axiosInstance from "./axiosInstance";
import { ENDPOINTS } from "../constants/api";

/**
 * Fetch paginated product list with optional filters.
 * FakeStoreAPI supports ?limit=N.
 * @param {{ limit?: number, category?: string }} params
 * @returns {Promise<import('../types').Product[]>}
 */
export async function fetchProducts({ limit, category } = {}) {
  const url = category
    ? ENDPOINTS.PRODUCTS_BY_CATEGORY(category)
    : ENDPOINTS.PRODUCTS;

  const { data } = await axiosInstance.get(url, {
    params: { limit },
  });

  return data;
}

/**
 * Fetch a single product by ID.
 * @param {number|string} id
 * @returns {Promise<import('../types').Product>}
 */
export async function fetchProductById(id) {
  const { data } = await axiosInstance.get(ENDPOINTS.PRODUCT_BY_ID(id));
  return data;
}

/**
 * Fetch all product categories.
 * @returns {Promise<string[]>}
 */
export async function fetchCategories() {
  const { data } = await axiosInstance.get(ENDPOINTS.PRODUCT_CATEGORIES);
  return data;
}
