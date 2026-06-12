# Architecture Decisions

## Why Redux Toolkit over Context API

Context API is adequate for low-frequency updates like theme toggling or locale selection, but it breaks down under e-commerce cart workloads. Every context value change forces all consumers to re-render, and there is no built-in way to bail out of re-renders without manual `useMemo`/`React.memo` coordination across the entire subtree. With multiple contexts (cart, auth, wishlist, UI), nested consumers trigger cascading re-renders that are difficult to isolate.

Redux Toolkit solves this via a single store with granular subscriptions. Selectors are pure functions that return derived data, and `useSelector` performs reference-equality checks so components re-render only when their specific slice changes. This means the cart badge can subscribe to `selectCartCount` without re-rendering when the auth slice updates. Redux DevTools also provides action replay and time-travel debugging — invaluable for tracing cart mutations across async add-to-cart flows.

The boilerplate argument against Redux is largely moot with RTK's `createSlice`, which generates actions and reducers in ~10 lines. The middleware ecosystem (thunks, listeners) also provides a clear pattern for side effects, keeping reducers pure and testable.

## Why React Query over Redux for Server State

Products, orders, and categories are server-owned state — they live in an API, not in the client. Fetching them into Redux requires writing thunks, managing loading/error/loading states manually, deduplicating requests, caching responses, invalidating stale data, and handling refetch-on-focus. This is roughly 200 lines of boilerplate per resource, and every developer implements it slightly differently.

React Query handles all of this declaratively. `useQuery` gives loading, error, and data states out of the box. Stale time prevents redundant refetches, background refetch on window focus keeps data fresh without user action, and `queryClient.invalidateQueries` provides precise cache invalidation after mutations. The separation of concerns is cleaner: Redux owns UI state (cart items, auth tokens, drawer visibility), React Query owns server state (product list, order history). This avoids duplicating server data in the Redux store and eliminates the need to keep it in sync.

## Future Improvements

- **Authentication**: Replace mock login with JWT-based auth flow using secure HttpOnly cookies and a real backend.
- **Checkout flow**: Multi-step checkout with address collection, payment gateway (Stripe), and order confirmation.
- **Image optimization**: Replace placeholder URLs with a CDN that serves WebP/AVIF with responsive `srcset`.
- **Offline support**: Service worker with stale-while-revalidate caching so product pages load without connectivity.
- **Performance monitoring**: Core Web Vitals tracking via `web-vitals` library with Real User Monitoring (RUM).
- **Testing**: Unit tests for Redux slices and selectors, integration tests for cart flow, E2E tests with Playwright for critical purchase paths.
- **Infinite scroll / pagination**: Replace client-side filtering with server-driven cursor pagination for the product list.
- **Internationalization**: i18n support with `react-intl` for multi-language product descriptions and checkout.
