/**
 * @fileoverview productService — maps product API requests and augments responses.
 *
 * Implements:
 *   - Response augmentation: Injects isSale, originalPrice, isNew, and isBestseller
 *     deterministically based on product ID. This guarantees existing visual badges
 *     and layout pricing continue functioning flawlessly.
 */

import api from "./api";
import { ENDPOINTS } from "../constants/api";

/**
 * Deterministically augments a raw FakeStoreAPI product record with e-commerce features
 * to match our layout design system and avoid breaking the UI.
 */
function augmentProduct(p) {
  if (!p) return p;

  const isSale = p.id % 3 === 0;
  const originalPrice = isSale
    ? Math.round(p.price * 1.35 * 100) / 100 // 35% markup, rounded to 2 decimal places
    : null;

  return {
    ...p,
    isSale,
    originalPrice,
    isNew: p.id % 5 === 0,
    isBestseller: p.id % 4 === 0,
  };
}

export const productService = {
  /**
   * Fetch all products or products filtered by category.
   * @param {{ limit?: number, category?: string }} params
   */
  getAllProducts: async ({ limit, category } = {}) => {
    const url = category
      ? ENDPOINTS.PRODUCTS_BY_CATEGORY(category)
      : ENDPOINTS.PRODUCTS;

    const { data } = await api.get(url, {
      params: { limit },
    });

    if (Array.isArray(data)) {
      return data.map(augmentProduct);
    }
    return data;
  },

  /**
   * Fetch a single product details by ID.
   * @param {number|string} id
   */
  getProductById: async (id) => {
    const { data } = await api.get(ENDPOINTS.PRODUCT_BY_ID(id));
    return augmentProduct(data);
  },

  /**
   * Fetch all category string labels.
   */
  getCategories: async () => {
    const { data } = await api.get(ENDPOINTS.PRODUCT_CATEGORIES);
    return data;
  },
};
