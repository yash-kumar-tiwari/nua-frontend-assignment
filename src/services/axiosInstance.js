/**
 * @fileoverview Axios instance with request/response interceptors.
 *
 * - Attaches Authorization Bearer token from Redux store on every request.
 * - Normalizes all error shapes to { message, status, data }.
 * - Handles 401 by dispatching logout and redirecting to /login.
 */

import axios from "axios";
import { API_BASE_URL } from "../constants/api";
import { ROUTES } from "../constants/routes";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ── Request interceptor ────────────────────────────────────────────────────
axiosInstance.interceptors.request.use(
  (config) => {
    /**
     * Lazily import the store to avoid circular dependency at module init time.
     * The store is only available after it has been created.
     */
    import("../store").then(({ default: store }) => {
      const token = store.getState().auth.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    });
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor ───────────────────────────────────────────────────
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;

    if (response?.status === 401) {
      const { default: store } = await import("../store");
      const { logout } = await import("../features/auth/authSlice");
      store.dispatch(logout());
      // Navigate without React Router's navigate() since we're outside a component
      window.location.href = ROUTES.LOGIN;
    }

    // Normalize error shape
    const normalizedError = {
      message:
        response?.data?.message ||
        error.message ||
        "An unexpected error occurred.",
      status: response?.status || 0,
      data: response?.data || null,
    };

    return Promise.reject(normalizedError);
  }
);

export default axiosInstance;
