/**
 * @fileoverview Categories API service.
 */

import { fetchCategories } from "./productsService";

// Re-export for semantic clarity — categories belong to the products domain
// but are used independently in the nav and filter UI.
export { fetchCategories };
