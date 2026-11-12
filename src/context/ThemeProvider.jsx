import { useCallback, useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import { ThemeContext } from './ThemeContext';
import {
  applyTheme,
  getDocumentTheme,
  getStoredTheme,
  storeTheme,
  subscribeToSystemTheme,
} from '../utils/theme';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function ThemeProvider({ children }) {
  // The inline script in index.html has already applied the right theme to <html>
  // before first paint, so React reads it back instead of recomputing it.
  const [theme, setThemeState] = useState(getDocumentTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Follow OS theme changes only until the visitor makes an explicit choice.
  useEffect(
    () =>
      subscribeToSystemTheme((systemTheme) => {
        if (!getStoredTheme()) setThemeState(systemTheme);
      }),
    [],
  );

  const setTheme = useCallback((next) => {
    storeTheme(next);
    const root = document.documentElement;
    const commit = () => {
      // Pause per-element colour transitions so the whole page swaps in one
      // clean step instead of buttons/borders fading at different speeds.
      root.dataset.themeSwitching = '';
      flushSync(() => setThemeState(next));
      applyTheme(next);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => delete root.dataset.themeSwitching),
      );
    };
    // Cross-fade the page when the browser supports it; otherwise switch instantly.
    if (document.startViewTransition && !prefersReducedMotion()) {
      document.startViewTransition(commit);
    } else {
      commit();
    }
  }, []);

  const toggleTheme = useCallback(
    () => setTheme(getDocumentTheme() === 'dark' ? 'light' : 'dark'),
    [setTheme],
  );

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
