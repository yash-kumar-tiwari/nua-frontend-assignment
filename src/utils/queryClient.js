/**
 * @fileoverview TanStack QueryClient singleton.
 * Centralizing the client avoids multiple instances and
 * allows importing it outside React components (e.g. in Axios interceptors).
 */

import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,       // 5 minutes
      gcTime: 1000 * 60 * 10,          // 10 minutes (formerly cacheTime)
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

export default queryClient;
