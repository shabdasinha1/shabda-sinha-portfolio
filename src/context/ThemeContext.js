import { createContext } from 'react';

/**
 * Shape: { theme: 'light' | 'dark', setTheme(theme), toggleTheme() }
 * Kept in its own file so ThemeProvider.jsx only exports a component
 * (required for reliable React Fast Refresh).
 */
export const ThemeContext = createContext(null);
