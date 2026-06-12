/**
 * @fileoverview Auth API service.
 */

import axiosInstance from "./axiosInstance";
import { ENDPOINTS } from "../constants/api";

/**
 * Login a user.
 * @param {{ username: string, password: string }} credentials
 * @returns {Promise<{ token: string }>}
 */
export async function loginUser(credentials) {
  const { data } = await axiosInstance.post(ENDPOINTS.AUTH_LOGIN, credentials);
  return data;
}

/**
 * Fetch a user profile by ID.
 * @param {number} id
 * @returns {Promise<import('../types').User>}
 */
export async function fetchUserById(id) {
  const { data } = await axiosInstance.get(ENDPOINTS.USER_BY_ID(id));
  return data;
}
