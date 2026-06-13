# Why We Picked What We Picked

## React 19

React 19 ships with a built-in compiler that optimizes code automatically. No more manual `useMemo`/`useCallback`/`React.memo` sprinkles everywhere — the compiler figures out what needs to re-render and what doesn't. Lets you actually use React's power without fighting it.

## Redux Toolkit over Context API

Context works fine for stuff like theme toggles or locale. But for e-commerce cart workloads it falls apart — every context change re-renders every consumer. No built-in way to stop that without manually layering `useMemo` and `React.memo` across your whole component tree.

RTK fixes this with a single store + granular subscriptions. `useSelector` checks reference equality, so components only re-render when their specific slice changes. Cart badge subscribes to `selectCartCount` and stays out of auth's business. Plus Redux DevTools gives you action replay and time-travel debugging — super handy for tracing cart bugs through async flows.

The "but boilerplate" argument doesn't really hold anymore. `createSlice` generates actions + reducers in ~10 lines. Middleware (thunks, listeners) keeps side effects clean and reducers pure.

## TanStack React Query over Redux for Server State

Products, orders, categories — this stuff lives on the server, not in the client. Pulling it into Redux means writing thunks, managing loading/error states by hand, deduplicating requests, caching, invalidating stale data, refetch-on-focus… about 200 lines of boilerplate per resource, and every dev writes it differently.

React Query handles all of it declaratively. `useQuery` gives you loading/error/data states out of the box. Stale time prevents redundant fetches, background refetch on focus keeps data fresh, `queryClient.invalidateQueries` gives you precise cache control after mutations. Cleaner separation: Redux owns UI state (cart items, auth tokens, drawer visibility), React Query owns server data (product list, order history). No duplicated server data in the store, nothing to sync manually.

---

## Future Improvements (MVP Gaps)

Things that didn't make the cut for v1 but should come next:

- **Login / Signup** — real auth instead of mock
- **Wishlist** — persisted to backend, not just local state
- **Payment Gateway** — Stripe or similar for actual checkout
- **Pagination** — server-driven cursor pagination instead of client-side filtering
- **Code Optimization** — cleanup, bundle splitting, lazy loading where it matters
