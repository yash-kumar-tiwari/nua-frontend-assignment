/**
 * @fileoverview TanStack Query key factory.
 * Centralizing keys prevents typos and enables precise cache invalidation.
 *
 * Usage:
 *   useQuery({ queryKey: QUERY_KEYS.products.list(filters), ... })
 *   queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products.all })
 */

export const QUERY_KEYS = {
  products: {
    all: ["products"],
    list: (filters) => ["products", "list", filters],
    detail: (id) => ["products", "detail", id],
    byCategory: (category) => ["products", "category", category],
  },
  categories: {
    all: ["categories"],
  },
  orders: {
    all: ["orders"],
    list: (userId) => ["orders", "list", userId],
    detail: (id) => ["orders", "detail", id],
  },
  user: {
    me: ["user", "me"],
    profile: (id) => ["user", "profile", id],
  },
};
