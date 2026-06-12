/**
 * @fileoverview React Query hooks for products domain.
 */

import { useQuery } from "@tanstack/react-query";
import { productService } from "../../services/productService";
import { QUERY_KEYS } from "../../constants/queryKeys";

/**
 * Fetch a paginated / filtered product list.
 * @param {{ limit?: number, category?: string }} [filters]
 */
export function useProducts(filters = {}) {
  return useQuery({
    queryKey: QUERY_KEYS.products.list(filters),
    queryFn: () => productService.getAllProducts(filters),
  });
}

/**
 * Fetch a single product by ID.
 * Query is disabled when id is falsy.
 * @param {number|string|undefined} id
 */
export function useProduct(id) {
  return useQuery({
    queryKey: QUERY_KEYS.products.detail(id),
    queryFn: () => productService.getProductById(id),
    enabled: Boolean(id),
  });
}

/**
 * Fetch all product categories.
 * Long staleTime — categories rarely change.
 */
export function useCategories() {
  return useQuery({
    queryKey: QUERY_KEYS.categories.all,
    queryFn: () => productService.getCategories(),
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}
