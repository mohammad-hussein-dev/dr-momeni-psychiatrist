/**
 * @file Theme provider with Light mode as default.
 * Users can toggle to Dark mode, and preference is saved in localStorage.
 * No automatic system theme detection.
 */
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';

    // DECISION: Always default to 'light' for clinical trustworthiness
    // Only use saved preference if user explicitly chose dark mode
    const saved = localStorage.getItem('dr_theme');
    if (saved === 'dark') return 'dark';

    return 'light'; // Default is always light
  });

  const isDark = theme === 'dark';

  // Apply theme to HTML root element
  useEffect(() => {
    const root = document.documentElement;

    // Remove both classes first
    root.classList.remove('light', 'dark');

    // Add current theme class
    root.classList.add(theme);

    // Set data-theme attribute
    root.setAttribute('data-theme', theme);

    // Set color-scheme for native elements
    root.style.colorScheme = theme;

    // Save to localStorage
    try {
      localStorage.setItem('dr_theme', theme);
    } catch (e) {
      // Silent fail if localStorage is unavailable
    }
  }, [theme]);

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  // Set specific theme
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark }}>
    {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
