import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Theme, ThemeVariant, themes, defaultTheme } from '@/themes/themes';

interface ThemeContextType {
  theme: Theme;
  themeVariant: ThemeVariant;
  setThemeVariant: (variant: ThemeVariant) => void;
  isDark: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeVariant, setThemeVariant] = useState<ThemeVariant>('modern');
  
  const theme = themes[themeVariant];
  const isDark = theme.isDark;

  const toggleDarkMode = () => {
    if (isDark) {
      setThemeVariant('modern'); // Switch to light mode
    } else {
      setThemeVariant('dark'); // Switch to dark mode
    }
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      themeVariant, 
      setThemeVariant, 
      isDark, 
      toggleDarkMode 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
