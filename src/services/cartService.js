/**
 * @fileoverview Mock async cart API.
 *
 * Simulates realistic ecommerce add-to-cart behavior:
 *   - Random network delay (500–2000ms)
 *   - Random failure rate (~20%)
 */

const FAILURE_RATE = 0.2;

/** @param {number} ms */
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const randomDelay = () => Math.floor(Math.random() * 1500) + 500;

/**
 * Simulate adding a product to the cart.
 *
 * @param {{ productId: number, quantity: number, selectedColor: string, selectedSize: string }} _
 * @returns {Promise<{ success: true }>}
 * @throws {Error} On simulated failure.
 */
export async function addToCart(_payload) {
  await delay(randomDelay());

  if (Math.random() < FAILURE_RATE) {
    throw new Error("Something went wrong. Please try again.");
  }

  return { success: true };
}
