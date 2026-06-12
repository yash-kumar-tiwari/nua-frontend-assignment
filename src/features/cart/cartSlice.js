/**
 * @fileoverview Cart Redux slice.
 *
 * Manages: cart items with variant support, applied coupon.
 * Persisted via custom cartPersistence utility (not redux-persist).
 */

import { createSlice } from "@reduxjs/toolkit";
import { loadCart } from "../../utils/cartPersistence";

/**
 * @typedef {{ productId: number, title: string, image: string, price: number, selectedColor: string, selectedSize: string, quantity: number }} CartItem
 */

const FALLBACK = { items: [], coupon: null };

/** @type {{ items: CartItem[], coupon: string|null }} */
const initialState = loadCart() ?? FALLBACK;

const itemKey = (item) =>
  `${item.productId}_${item.selectedColor}_${item.selectedSize}`;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { product, quantity = 1, selectedColor = "", selectedSize = "" } =
        action.payload;
      const newItem = {
        productId: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        selectedColor,
        selectedSize,
        quantity,
      };
      const key = itemKey(newItem);
      const existing = state.items.find((item) => itemKey(item) === key);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push(newItem);
      }
    },

    removeFromCart(state, action) {
      const { productId, selectedColor = "", selectedSize = "" } =
        action.payload;
      const key = `${productId}_${selectedColor}_${selectedSize}`;
      state.items = state.items.filter((item) => itemKey(item) !== key);
    },

    increaseQuantity(state, action) {
      const { productId, selectedColor = "", selectedSize = "" } =
        action.payload;
      const key = `${productId}_${selectedColor}_${selectedSize}`;
      const item = state.items.find((it) => itemKey(it) === key);
      if (item) item.quantity += 1;
    },

    decreaseQuantity(state, action) {
      const { productId, selectedColor = "", selectedSize = "" } =
        action.payload;
      const key = `${productId}_${selectedColor}_${selectedSize}`;
      const idx = state.items.findIndex((it) => itemKey(it) === key);
      if (idx !== -1) {
        const item = state.items[idx];
        if (item.quantity <= 1) {
          state.items.splice(idx, 1);
        } else {
          item.quantity -= 1;
        }
      }
    },

    clearCart(state) {
      state.items = [];
      state.coupon = null;
    },

    applyCoupon(state, action) {
      state.coupon = action.payload;
    },

    removeCoupon(state) {
      state.coupon = null;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  applyCoupon,
  removeCoupon,
} = cartSlice.actions;

// ── Selectors ──────────────────────────────────────────────────────────────
export const selectCartItems = (state) => state.cart.items;
export const selectCartCoupon = (state) => state.cart.coupon;

/** Total number of individual units in the cart. */
export const selectCartCount = (state) =>
  state.cart.items.reduce((acc, item) => acc + item.quantity, 0);

/** Raw subtotal (price × quantity for each item). */
export const selectCartSubtotal = (state) =>
  state.cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

/** Find a specific cart item by product + variant composite key. */
export const selectCartItemByVariant =
  (productId, selectedColor = "", selectedSize = "") =>
  (state) =>
    state.cart.items.find(
      (item) =>
        item.productId === productId &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize
    );

export default cartSlice.reducer;
