export const getClient = (key, overrides = {}) => {
  if (typeof Firstclasspostcodes !== 'undefined') {
    return Firstclasspostcodes(key, overrides);
  }
  throw new Error(`
    Missing Firstclasspostcodes JS library.
    See: https://github.com/firstclasspostcodes/firstclasspostcodes-js
  `);
};