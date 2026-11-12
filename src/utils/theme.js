// Keep THEME_STORAGE_KEY in sync with the bootstrap script in index.html.
export const THEME_STORAGE_KEY = 'portfolio-theme';
export const THEMES = ['light', 'dark'];

const LIGHT_QUERY = '(prefers-color-scheme: light)';

export function getStoredTheme() {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return THEMES.includes(value) ? value : null;
  } catch {
    return null; // Storage can be blocked (private mode, strict settings).
  }
}

export function storeTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* Non-fatal: the theme still applies for this visit. */
  }
}

export function getSystemTheme() {
  return window.matchMedia(LIGHT_QUERY).matches ? 'light' : 'dark';
}

export function subscribeToSystemTheme(callback) {
  const media = window.matchMedia(LIGHT_QUERY);
  const handler = () => callback(media.matches ? 'light' : 'dark');
  media.addEventListener('change', handler);
  return () => media.removeEventListener('change', handler);
}

/** Reads the theme already applied to <html> by the pre-paint script. */
export function getDocumentTheme() {
  const current = document.documentElement.dataset.theme;
  return THEMES.includes(current) ? current : getSystemTheme();
}

// Page background per theme (matches --bg in tokens.css), used for the browser UI colour.
const THEME_COLORS = { light: '#fbfbfd', dark: '#000000' };

export function applyTheme(theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
}
