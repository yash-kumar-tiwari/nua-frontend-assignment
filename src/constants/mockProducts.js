/**
 * @fileoverview Mock product data — mirrors the FakeStoreAPI response shape.
 *
 * Used for the UI-only phase before API integration.
 * Shape is intentionally identical to the real API so the swap is a
 * one-line change: replace MOCK_PRODUCTS with the useProducts() data.
 *
 * Extra fields added vs the raw API:
 *   - originalPrice  → enables sale price display
 *   - isSale         → boolean flag
 *   - isNew          → "New" badge
 *   - isBestseller   → "Bestseller" badge
 */

export const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "Slim-Fit Performance Jacket",
    price: 89.95,
    originalPrice: 129.95,
    isSale: true,
    isNew: false,
    isBestseller: true,
    description:
      "Engineered for movement. A slim-fit outer shell with moisture-wicking lining keeps you dry and sharp from commute to gym.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: { rate: 4.7, count: 218 },
  },
  {
    id: 2,
    title: "Heritage Cotton Tee",
    price: 29.99,
    originalPrice: null,
    isSale: false,
    isNew: true,
    isBestseller: false,
    description:
      "100% organic cotton single-jersey. Preshrunk, relaxed fit, reinforced collar — built for decades of everyday wear.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: { rate: 4.1, count: 95 },
  },
  {
    id: 3,
    title: "Essential Casual Shirt",
    price: 55.00,
    originalPrice: null,
    isSale: false,
    isNew: false,
    isBestseller: false,
    description:
      "A refined casual shirt with a subtle texture weave. Pair with chinos or layer under a jacket.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    rating: { rate: 4.4, count: 150 },
  },
  {
    id: 4,
    title: "Classic Plaid Flannel",
    price: 65.00,
    originalPrice: 85.00,
    isSale: true,
    isNew: false,
    isBestseller: false,
    description:
      "Midweight 100% flannel. Perfect layering piece for autumn and winter.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_FMwebp_QL65_.jpg",
    rating: { rate: 3.9, count: 61 },
  },
  {
    id: 5,
    title: "Precision Stainless Watch",
    price: 695.00,
    originalPrice: null,
    isSale: false,
    isNew: true,
    isBestseller: false,
    description:
      "Swiss-assembled movement. 316L stainless steel case. Sapphire crystal glass. 100m water resistant.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_FMwebp_QL65_.jpg",
    rating: { rate: 4.8, count: 312 },
  },
  {
    id: 6,
    title: "Diamond Tennis Bracelet",
    price: 995.00,
    originalPrice: 1299.00,
    isSale: true,
    isNew: false,
    isBestseller: true,
    description:
      "Lab-grown diamond pavé set in 18k white gold. 7-inch adjustable clasp.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_FMwebp_QL65_.jpg",
    rating: { rate: 4.6, count: 189 },
  },
  {
    id: 7,
    title: "Ultralight Wireless Earbuds",
    price: 149.00,
    originalPrice: 199.00,
    isSale: true,
    isNew: false,
    isBestseller: true,
    description:
      "Active noise-cancellation. 32-hour total battery life. IPX5 waterproof. Instant pairing.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    rating: { rate: 4.5, count: 402 },
  },
  {
    id: 8,
    title: "Mechanical Keyboard Pro",
    price: 229.95,
    originalPrice: null,
    isSale: false,
    isNew: true,
    isBestseller: false,
    description:
      "TKL layout with hot-swappable sockets. PBT doubleshot keycaps. Aluminum top-frame.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    rating: { rate: 4.3, count: 178 },
  },
  {
    id: 9,
    title: "Floral Midi Dress",
    price: 115.00,
    originalPrice: null,
    isSale: false,
    isNew: true,
    isBestseller: false,
    description:
      "Lightweight chiffon. Adjustable spaghetti straps. Midi-length silhouette. Hand-wash.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
    rating: { rate: 4.2, count: 124 },
  },
  {
    id: 10,
    title: "Structured Blazer",
    price: 189.00,
    originalPrice: 249.00,
    isSale: true,
    isNew: false,
    isBestseller: true,
    description:
      "Double-breasted silhouette. Peak lapel. Fully lined. Dry clean only.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    rating: { rate: 4.6, count: 203 },
  },
  {
    id: 11,
    title: "Cashmere Roll-Neck",
    price: 275.00,
    originalPrice: null,
    isSale: false,
    isNew: false,
    isBestseller: true,
    description:
      "Grade-A Inner Mongolian cashmere. 12-gauge knit. Ribbed collar, cuffs and hem.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/71HblAHs1xL._AC_UY879_-2.jpg",
    rating: { rate: 4.8, count: 91 },
  },
  {
    id: 12,
    title: "Canvas Weekend Tote",
    price: 79.00,
    originalPrice: null,
    isSale: false,
    isNew: false,
    isBestseller: false,
    description:
      "Waxed canvas exterior. Full-grain leather straps and base. Fits a 15-inch laptop.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71HblAHs1xL._AC_UY879_-2.jpg",
    rating: { rate: 4.0, count: 73 },
  },
];

// ── Category filter options ────────────────────────────────────────────────────
export const MOCK_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "men's clothing", label: "Men's" },
  { id: "women's clothing", label: "Women's" },
  { id: "electronics", label: "Electronics" },
  { id: "jewelery", label: "Jewelry" },
];

// ── Sort options ──────────────────────────────────────────────────────────────
export const SORT_OPTIONS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Top Rated" },
  { id: "newest", label: "New Arrivals" },
];
