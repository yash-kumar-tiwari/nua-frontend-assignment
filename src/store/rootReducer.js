/**
 * @fileoverview Root reducer combining all feature slices.
 */

import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import uiReducer from "../features/ui/uiSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  ui: uiReducer,
});

export default rootReducer;
