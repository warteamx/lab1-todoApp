// Complete theme system combining colors, typography, spacing, and shadows

import { ColorPalette, colorThemes, ThemeVariant } from './colors';
import { Typography, typography, responsiveTypography } from './typography';
import {
  SpacingScale,
  spacing,
  borderRadius,
  layoutSpacing,
  componentSpacing,
} from './spacing';
import { shadows, componentShadows } from './shadows';

export interface Theme {
  // Theme metadata
  name: string;
  variant: ThemeVariant;
  isDark: boolean;

  // Color system
  colors: ColorPalette;

  // Typography system
  typography: Typography;

  // Spacing system
  spacing: SpacingScale;
  borderRadius: typeof borderRadius;
  layoutSpacing: typeof layoutSpacing;
  componentSpacing: typeof componentSpacing;

  // Shadow system
  shadows: typeof shadows;
  componentShadows: typeof componentShadows;
}

// Create theme function
function createTheme(
  variant: ThemeVariant,
  colors: ColorPalette,
  name: string,
  isDark: boolean = false
): Theme {
  return {
    name,
    variant,
    isDark,
    colors,
    typography,
    spacing,
    borderRadius,
    layoutSpacing,
    componentSpacing,
    shadows,
    componentShadows,
  };
}

// Available themes
export const themes = {
  modern: createTheme('modern', colorThemes.modern, 'Modern', false),
  dark: createTheme('dark', colorThemes.dark, 'Dark', true),
  warm: createTheme('warm', colorThemes.warm, 'Warm', false),
  cool: createTheme('cool', colorThemes.cool, 'Cool', false),
} as const;

// Default theme
export const defaultTheme = themes.modern;

// Theme utilities
export const getResponsiveTypography = (
  screenSize: 'mobile' | 'tablet' | 'desktop'
) => {
  return responsiveTypography[screenSize];
};

// Theme context type
export interface ThemeContextType {
  theme: Theme;
  themeVariant: ThemeVariant;
  setThemeVariant: (variant: ThemeVariant) => void;
  isDark: boolean;
  toggleDarkMode: () => void;
}

export type { ThemeVariant, ColorPalette, Typography };
export { colorThemes, typography, spacing, borderRadius, shadows };
