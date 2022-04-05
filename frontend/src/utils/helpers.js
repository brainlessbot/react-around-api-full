/**
 * Convert a list of class names to a string.
 *
 * @param {string} classNames
 * @return {string}
 */
export const combineClasses = (...classNames) => classNames.filter(Boolean).join(' ');
