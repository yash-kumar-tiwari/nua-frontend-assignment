# NuaShop — E-Commerce Storefront

A modern e-commerce SPA built with **React 19**, **Redux Toolkit**, **TanStack React Query**, and **React Router v7**. Features real-time cart management, product browsing, wishlist, and responsive design.

## Tech Stack

| Layer | Choice |
|-------|--------|
| UI | React 19, SCSS Modules |
| State (client) | Redux Toolkit |
| State (server) | TanStack React Query |
| Routing | React Router v7 |
| Persistence | Custom `cartPersistence` + `redux-persist` |
| Build | Vite 8, Rolldown |
| Linting | ESLint |

## Getting Started

```bash
npm install
npm run dev     # development server at http://localhost:5173
npm run build   # production build to dist/
npm run preview # preview production build
```

## Architecture

```
src/
├── app/            # Root App component, provider wiring
├── features/       # Redux slices & React Query hooks (auth, cart, wishlist, ui, products, orders)
├── components/     # Reusable UI (ProductCard, Toast, Navbar, Footer, CartDrawer)
├── pages/          # Route-level page components
├── layouts/        # RootLayout, AuthLayout
├── services/       # API clients (cart service, product service, auth service)
├── store/          # Redux configureStore + rootReducer
├── constants/      # Routes, API endpoints, query keys
├── hooks/          # Custom hooks (useScrollTop, useScrolled, useDebounce)
├── utils/          # cx, formatCurrency, cartPersistence, queryClient
└── styles/         # Design system: variables, mixins, breakpoints, animations
```

### State Management

- **Redux Toolkit**: Client-only state — auth, cart, wishlist, UI (drawers, toasts)
- **React Query**: Server state — products, orders, categories (caching, stale-while-revalidate)
- **Custom persistence**: Cart state survives refresh via `cartPersistence.js` (debounced subscriber, no `redux-persist`)

### Key Features

- Product browsing with category filtering and sorting
- Variant-aware cart (same product with different color/size = separate items)
- Mock async add-to-cart flow with random delay, random failure, and retry
- URL-synced variant selection on product detail page
- Slide-in cart drawer with focus trap and keyboard navigation
- Toast notification system for success/error feedback
- Wishlist with optimistic toggle
- Responsive design with mobile navigation drawer
- Lazy-loaded routes with Suspense fallbacks
- Error boundary at app root

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
