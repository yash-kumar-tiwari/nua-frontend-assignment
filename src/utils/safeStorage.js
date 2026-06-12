/**
 * @fileoverview safeStorage — localStorage wrapper that degrades gracefully.
 *
 * Prevents redux-persist from throwing when:
 *   - localStorage is unavailable (SSR, sandboxed iframes)
 *   - A browser extension's context intercepts store dispatch and calls
 *     persistStore without a proper window.localStorage binding.
 *
 * Falls back to a synchronous in-memory store on any access error.
 */

const memoryStore = {};

const safeStorage = {
  getItem: (key) => {
    try {
      return Promise.resolve(localStorage.getItem(key));
    } catch {
      return Promise.resolve(memoryStore[key] ?? null);
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
      return Promise.resolve();
    } catch {
      memoryStore[key] = value;
      return Promise.resolve();
    }
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      return Promise.resolve();
    } catch {
      delete memoryStore[key];
      return Promise.resolve();
    }
  },
};

export default safeStorage;
