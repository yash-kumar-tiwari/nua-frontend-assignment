/**
 * @fileoverview Auth feature hook.
 * Wraps Redux auth state + login/logout mutations.
 */

import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../services/authService";
import {
  setCredentials,
  logout as logoutAction,
  setAuthLoading,
  setAuthError,
  selectCurrentUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from "./authSlice";

export function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onMutate: () => dispatch(setAuthLoading(true)),
    onSuccess: (data) => {
      // FakeStoreAPI returns { token }; in a real API you'd also get user data
      dispatch(setCredentials({ user: { id: 1, username: "johnd" }, token: data.token }));
    },
    onError: (err) => {
      dispatch(setAuthError(err.message || "Login failed."));
    },
  });

  const logout = () => {
    dispatch(logoutAction());
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login: loginMutation.mutate,
    logout,
    isLoggingIn: loginMutation.isPending,
  };
}
