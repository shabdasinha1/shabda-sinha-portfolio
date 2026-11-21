/**
 * Brand gradient colours per theme, for components that need real colour values
 * (canvas / WebGL can't read CSS variables). Keep in sync with --gradient-text
 * in src/styles/tokens.css.
 */
export const BRAND_GRADIENT = {
  light: ['#0071e3', '#7c3aed', '#db2777'],
  dark: ['#2997ff', '#a78bfa', '#f472b6'],
};

/** Accent colour per theme (matches --accent in tokens.css). */
export const BRAND_ACCENT = {
  light: '#0066cc',
  dark: '#2997ff',
};
