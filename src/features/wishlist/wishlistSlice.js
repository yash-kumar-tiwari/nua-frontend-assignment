/**
 * @fileoverview Wishlist Redux slice.
 *
 * Stores product IDs (numbers) only — full product data is fetched via React Query.
 * Persisted via redux-persist (see store/index.js).
 */

import { createSlice } from "@reduxjs/toolkit";

/** @type {{ items: number[] }} */
const initialState = {
  items: [], // array of product IDs
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    /**
     * Add a product ID to the wishlist (no-op if already present).
     * @param {{ payload: number }} action product id
     */
    addToWishlist(state, action) {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
    },

    /**
     * Remove a product ID from the wishlist.
     * @param {{ payload: number }} action product id
     */
    removeFromWishlist(state, action) {
      state.items = state.items.filter((id) => id !== action.payload);
    },

    clearWishlist(state) {
      state.items = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

// ── Selectors ──────────────────────────────────────────────────────────────
export const selectWishlistIds = (state) => state.wishlist.items;
export const selectWishlistCount = (state) => state.wishlist.items.length;

/** Returns true if the given product ID is in the wishlist. */
export const selectIsWishlisted = (productId) => (state) =>
  state.wishlist.items.includes(productId);

export default wishlistSlice.reducer;
