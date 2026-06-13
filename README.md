# NuaShop — E-Commerce Storefront

A modern e-commerce SPA built with **React 19**, **Redux Toolkit**, **TanStack React Query**, and **React Router v7**. Real-time cart management, product browsing, wishlist, responsive design — the usual e-commerce stuff but done right.

## Quick Start

```bash
npm install
npm run dev       # local dev at http://localhost:5173
npm run build     # build for production → dist/
npm run preview   # preview the build
```

## Tech Stack

| Layer | What we used |
|-------|-------------|
| UI | React 19, SCSS Modules |
| Client State | Redux Toolkit |
| Server State | TanStack React Query |
| Routing | React Router v7 |
| Persistence | `cartPersistence` + `redux-persist` |
| Build | Vite 8, Rolldown |
| Linting | ESLint |

## Project Structure

```
src/
├── app/            # Root App, provider wiring
├── features/       # Redux slices & React Query hooks
├── components/     # Reusable UI bits (ProductCard, Toast, Navbar, etc.)
├── pages/          # Route-level page components
├── layouts/        # RootLayout, AuthLayout
├── services/       # API clients
├── store/          # Redux configureStore + rootReducer
├── constants/      # Routes, endpoints, query keys
├── hooks/          # useScrollTop, useScrolled, useDebounce
├── utils/          # cx, formatCurrency, cartPersistence, queryClient
└── styles/         # Variables, mixins, breakpoints, animations
```

## How State Works

- **Redux Toolkit** → client-only state: auth, cart, wishlist, UI toggles
- **React Query** → server state: products, orders, categories (caching, stale-while-revalidate)
- **Custom persistence** → cart survives page refresh via debounced subscriber (no redux-persist)

## What It Does

- Browse products with category filtering + sorting
- Variant-aware cart (same product, different color/size = separate line items)
- Mock async add-to-cart with random delay, random failure, retry
- URL-synced variant selection on product detail page
- Slide-in cart drawer with focus trap + keyboard nav
- Toast notifications for success/error
- Wishlist with optimistic toggle
- Responsive, mobile nav drawer
- Lazy-loaded routes with Suspense
- Error boundary at root

## Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview build |
| `npm run lint` | Lint everything |
