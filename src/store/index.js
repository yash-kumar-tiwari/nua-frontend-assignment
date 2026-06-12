/**
 * @fileoverview Redux store configuration.
 *
 * Persisted slices:
 *   - auth, wishlist via redux-persist (in localStorage).
 *   - cart via custom cartPersistence (debounced subscriber — not redux-persist).
 * NOT persisted: ui (intentionally reset on page load).
 */

import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import safeStorage from "../utils/safeStorage";
const storage = safeStorage;
import rootReducer from "./rootReducer";
import { persistCart } from "../utils/cartPersistence";

const persistConfig = {
  key: "nuashop",
  version: 1,
  storage,
  whitelist: ["auth", "wishlist"], // cart persisted manually via subscriber
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: import.meta.env.DEV,
});

// ── Custom cart persistence (debounced) ────────────────────────────────────

/** @type {ReturnType<typeof setTimeout> | undefined} */
let cartTimer;

store.subscribe(() => {
  if (cartTimer) clearTimeout(cartTimer);
  cartTimer = setTimeout(() => persistCart(store.getState().cart), 300);
});

// ── Exports ────────────────────────────────────────────────────────────────

export const persistor = persistStore(store);

export default store;
