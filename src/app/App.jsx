/**
 * @fileoverview Application root — wires all providers together.
 *
 * Provider order (inner-most wins):
 *   PersistGate → Redux Provider → QueryClientProvider → RouterProvider
 */

import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import store, { persistor } from "../store";
import queryClient from "../utils/queryClient";
import router from "../router";
import PageSpinner from "../components/common/PageSpinner/PageSpinner";
import ErrorBoundary from "../components/common/ErrorBoundary/ErrorBoundary";

import "../styles/main.scss";

export default function App() {
  return (
    <Provider store={store}>
      {/* PersistGate delays rendering until rehydration from localStorage is complete */}
      <PersistGate loading={<PageSpinner />} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <RouterProvider router={router} />
          </ErrorBoundary>
          {/* DevTools only visible in development */}
          {import.meta.env.DEV && (
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          )}
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
