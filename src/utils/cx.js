/**
 * @fileoverview cx — lightweight className merging utility.
 * Filters out falsy values and joins the rest with spaces.
 * Drop-in for the `classnames` package without the dependency.
 *
 * @param {...(string|boolean|null|undefined)} classes
 * @returns {string}
 *
 * @example
 * cx(styles.btn, isActive && styles.active, 'extra-class')
 */
export function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}
