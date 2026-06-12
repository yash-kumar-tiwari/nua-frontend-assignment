/**
 * @fileoverview Custom cart persistence — save/load cart state to/from localStorage.
 *
 * Safe JSON parsing with corrupted data protection.
 * Does NOT depend on redux-persist.
 *
 * Reusable pattern: swap STORAGE_KEY and schema validator for other domains.
 */

const STORAGE_KEY = "nuashop_cart";

const CART_ITEM_KEYS = [
  "productId",
  "title",
  "image",
  "price",
  "selectedColor",
  "selectedSize",
  "quantity",
];

const REQUIRED_TYPES = {
  productId: "number",
  title: "string",
  image: "string",
  price: "number",
  selectedColor: "string",
  selectedSize: "string",
  quantity: "number",
};

/** @param {unknown} item */
function isValidCartItem(item) {
  if (!item || typeof item !== "object") return false;
  return CART_ITEM_KEYS.every(
    (key) => key in item && typeof item[key] === REQUIRED_TYPES[key]
  );
}

/** @param {unknown} value */
function isValidCartState(value) {
  if (!value || typeof value !== "object") return false;
  if (!("items" in value) || !Array.isArray(value.items)) return false;
  if (!value.items.every(isValidCartItem)) return false;
  if (!("coupon" in value)) return false;
  if (value.coupon !== null && typeof value.coupon !== "string") return false;
  return true;
}

/**
 * Persist cart state to localStorage.
 *
 * @param {{ items: CartItem[], coupon: string|null }} state
 * @returns {boolean} true if persisted successfully
 */
export function persistCart(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

/**
 * Load and validate cart state from localStorage.
 *
 * Returns the validated state on success, or null when:
 *   - No stored data exists
 *   - JSON parsing fails
 *   - Data shape is invalid / corrupted
 *
 * @returns {{ items: CartItem[], coupon: string|null } | null}
 */
export function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return null;
    const parsed = JSON.parse(raw);
    return isValidCartState(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
