/**
 * @fileoverview Variant and stock helper for products.
 * Generates deterministic mock variants and stock mapping logic.
 */

export const VARIANT_COLORS = [
  { id: "black", label: "Black", hex: "#111111" },
  { id: "white", label: "White", hex: "#FAFAFA", border: "#CCCCCC" }, // Add a border for visibility on white bg
  { id: "blue", label: "Blue", hex: "#3B82F6" },
  { id: "green", label: "Green", hex: "#10B981" },
];

export const SIZES = ["S", "M", "L", "XL"];

/**
 * Generates a deterministic stock map for a product based on its ID.
 * Returns: {
 *   [colorId]: {
 *     [size]: "available" | "low" | "sold_out"
 *   }
 * }
 */
export function getProductStock(productId) {
  const stockMap = {};

  VARIANT_COLORS.forEach((color, colorIdx) => {
    stockMap[color.id] = {};
    SIZES.forEach((size, sizeIdx) => {
      // Create a deterministic value using the product ID and color/size indexes
      const hash = (productId * 7 + colorIdx * 13 + sizeIdx * 17) % 10;
      
      if (hash === 0 || hash === 3) {
        stockMap[color.id][size] = "sold_out";
      } else if (hash === 1 || hash === 5) {
        stockMap[color.id][size] = "low";
      } else {
        stockMap[color.id][size] = "available";
      }
    });
  });

  return stockMap;
}

/**
 * Returns helper info for stock display.
 */
export function getStockStatusLabel(status, qtyLeft = 2) {
  switch (status) {
    case "sold_out":
      return {
        label: "Out of Stock",
        className: "statusSoldOut",
        canBuy: false,
      };
    case "low":
      return {
        label: `Low Stock — Only ${qtyLeft} left!`,
        className: "statusLowStock",
        canBuy: true,
      };
    case "available":
    default:
      return {
        label: "In Stock — Ready to Ship",
        className: "statusAvailable",
        canBuy: true,
      };
  }
}
