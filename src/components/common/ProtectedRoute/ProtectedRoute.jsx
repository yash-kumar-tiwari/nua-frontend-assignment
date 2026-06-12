/**
 * @fileoverview ProtectedRoute guard component.
 *
 * Renders its <Outlet> when the user is authenticated.
 * Redirects to /login (with the originating location in state) otherwise.
 */

import { Navigate, Outlet, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../../features/auth/authSlice";
import { ROUTES } from "../../../constants/routes";

export default function ProtectedRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        state={{ from: location }}
        replace
      />
    );
  }

  return <Outlet />;
}
