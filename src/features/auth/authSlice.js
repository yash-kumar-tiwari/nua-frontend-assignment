/**
 * @fileoverview Auth Redux slice.
 *
 * Manages: user identity, JWT token, auth loading/error state.
 * Persisted via redux-persist (see store/index.js).
 */

import { createSlice } from "@reduxjs/toolkit";

/** @type {{ user: object|null, token: string|null, isAuthenticated: boolean, loading: boolean, error: string|null }} */
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Called after a successful login API response.
     * @param {*} state
     * @param {{ payload: { user: object, token: string } }} action
     */
    setCredentials(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      state.loading = false;
    },

    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
    },

    setAuthLoading(state, action) {
      state.loading = action.payload;
    },

    setAuthError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    clearAuthError(state) {
      state.error = null;
    },
  },
});

export const {
  setCredentials,
  logout,
  setAuthLoading,
  setAuthError,
  clearAuthError,
} = authSlice.actions;

// ── Selectors ──────────────────────────────────────────────────────────────
export const selectCurrentUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
