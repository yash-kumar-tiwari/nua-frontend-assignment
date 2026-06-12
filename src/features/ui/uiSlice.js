/**
 * @fileoverview UI Redux slice.
 *
 * Manages: transient UI state (drawers, menus, theme, toast notifications).
 * NOT persisted — resets on every page load.
 */

import { createSlice } from "@reduxjs/toolkit";

/** @type {{ isCartDrawerOpen: boolean, isMenuOpen: boolean, theme: 'light'|'dark', notification: { message: string, type: 'success'|'error'|'info'|'warning' }|null }} */
const initialState = {
  isCartDrawerOpen: false,
  isMenuOpen: false,
  theme: "light",
  notification: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openCartDrawer(state) {
      state.isCartDrawerOpen = true;
    },
    closeCartDrawer(state) {
      state.isCartDrawerOpen = false;
    },
    toggleCartDrawer(state) {
      state.isCartDrawerOpen = !state.isCartDrawerOpen;
    },

    openMenu(state) {
      state.isMenuOpen = true;
    },
    closeMenu(state) {
      state.isMenuOpen = false;
    },
    toggleMenu(state) {
      state.isMenuOpen = !state.isMenuOpen;
    },

    setTheme(state, action) {
      state.theme = action.payload;
    },

    /**
     * Show a toast notification.
     * @param {{ payload: { message: string, type?: 'success'|'error'|'info'|'warning' } }} action
     */
    showNotification(state, action) {
      state.notification = {
        type: "info",
        ...action.payload,
      };
    },
    clearNotification(state) {
      state.notification = null;
    },
  },
});

export const {
  openCartDrawer,
  closeCartDrawer,
  toggleCartDrawer,
  openMenu,
  closeMenu,
  toggleMenu,
  setTheme,
  showNotification,
  clearNotification,
} = uiSlice.actions;

// ── Selectors ──────────────────────────────────────────────────────────────
export const selectIsCartDrawerOpen = (state) => state.ui.isCartDrawerOpen;
export const selectIsMenuOpen = (state) => state.ui.isMenuOpen;
export const selectTheme = (state) => state.ui.theme;
export const selectNotification = (state) => state.ui.notification;

export default uiSlice.reducer;
