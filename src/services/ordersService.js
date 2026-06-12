/**
 * @fileoverview Orders API service.
 */

import axiosInstance from "./axiosInstance";
import { ENDPOINTS } from "../constants/api";

/**
 * Fetch all carts (orders) for a user.
 * @param {number} userId
 */
export async function fetchUserOrders(userId) {
  const { data } = await axiosInstance.get(ENDPOINTS.USER_CARTS(userId));
  return data;
}

/**
 * Fetch a single cart/order by ID.
 * @param {number} id
 */
export async function fetchOrderById(id) {
  const { data } = await axiosInstance.get(ENDPOINTS.CART_BY_ID(id));
  return data;
}

/**
 * Place a new order.
 * @param {object} orderPayload
 */
export async function placeOrder(orderPayload) {
  const { data } = await axiosInstance.post(ENDPOINTS.CARTS, orderPayload);
  return data;
}
