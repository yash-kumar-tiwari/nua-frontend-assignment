/**
 * @fileoverview React Query hooks for orders domain.
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserOrders,
  fetchOrderById,
  placeOrder,
} from "../../services/ordersService";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { selectCurrentUser } from "../auth/authSlice";
import { clearCart } from "../cart/cartSlice";

/**
 * Fetch all orders for the currently authenticated user.
 */
export function useOrders() {
  const user = useSelector(selectCurrentUser);
  return useQuery({
    queryKey: QUERY_KEYS.orders.list(user?.id),
    queryFn: () => fetchUserOrders(user.id),
    enabled: Boolean(user?.id),
  });
}

/**
 * Fetch a single order by ID.
 * @param {number|string} id
 */
export function useOrder(id) {
  return useQuery({
    queryKey: QUERY_KEYS.orders.detail(id),
    queryFn: () => fetchOrderById(id),
    enabled: Boolean(id),
  });
}

/**
 * Mutation to place a new order.
 * On success: clears the cart and invalidates the orders list cache.
 */
export function usePlaceOrder() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: placeOrder,
    onSuccess: () => {
      dispatch(clearCart());
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.orders.all });
    },
  });
}
