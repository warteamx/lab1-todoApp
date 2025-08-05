// Typography system with consistent font sizes, weights, and line heights

import { Platform } from 'react-native';

export interface TypographyScale {
  fontSize: number;
  lineHeight: number;
  fontWeight: '300' | '400' | '500' | '600' | '700' | '800' | '900';
  letterSpacing?: number;
}

export interface Typography {
  // Display text (hero sections, main headings)
  display: {
    large: TypographyScale;
    medium: TypographyScale;
    small: TypographyScale;
  };

  // Headlines (section headings, titles)
  headline: {
    large: TypographyScale;
    medium: TypographyScale;
    small: TypographyScale;
  };

  // Titles (card titles, dialog titles)
  title: {
    large: TypographyScale;
    medium: TypographyScale;
    small: TypographyScale;
  };

  // Body text (paragraphs, descriptions)
  body: {
    large: TypographyScale;
    medium: TypographyScale;
    small: TypographyScale;
  };

  // Labels (buttons, form labels, small text)
  label: {
    large: TypographyScale;
    medium: TypographyScale;
    small: TypographyScale;
  };

  // Caption text (helper text, timestamps)
  caption: TypographyScale;

  // Overline text (categories, badges)
  overline: TypographyScale;
}

// Font families - using system fonts for best performance and platform consistency
export const fontFamilies = {
  // Main text font
  primary: Platform.select({
    ios: 'System',
    android: 'Roboto',
    web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  }),

  // Monospace font for code
  mono: Platform.select({
    ios: 'Menlo',
    android: 'monospace',
    web: '"SF Mono", Monaco, Inconsolata, "Roboto Mono", "Source Code Pro", monospace',
  }),
} as const;

// Typography scale
export const typography: Typography = {
  display: {
    large: {
      fontSize: 48,
      lineHeight: 56,
      fontWeight: '700',
      letterSpacing: -0.5,
    },
    medium: {
      fontSize: 40,
      lineHeight: 48,
      fontWeight: '700',
      letterSpacing: -0.25,
    },
    small: {
      fontSize: 32,
      lineHeight: 40,
      fontWeight: '600',
      letterSpacing: 0,
    },
  },

  headline: {
    large: {
      fontSize: 28,
      lineHeight: 36,
      fontWeight: '600',
      letterSpacing: 0,
    },
    medium: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: '600',
      letterSpacing: 0,
    },
    small: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: '600',
      letterSpacing: 0,
    },
  },

  title: {
    large: {
      fontSize: 18,
      lineHeight: 28,
      fontWeight: '500',
      letterSpacing: 0,
    },
    medium: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '500',
      letterSpacing: 0.15,
    },
    small: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '500',
      letterSpacing: 0.1,
    },
  },

  body: {
    large: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '400',
      letterSpacing: 0.15,
    },
    medium: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '400',
      letterSpacing: 0.25,
    },
    small: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '400',
      letterSpacing: 0.4,
    },
  },

  label: {
    large: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '500',
      letterSpacing: 0.1,
    },
    medium: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '500',
      letterSpacing: 0.5,
    },
    small: {
      fontSize: 11,
      lineHeight: 16,
      fontWeight: '500',
      letterSpacing: 0.5,
    },
  },

  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    letterSpacing: 0.4,
  },

  overline: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 1.5,
  },
};

// Responsive typography adjustments for different screen sizes
export const responsiveTypography = {
  mobile: typography,

  tablet: {
    ...typography,
    display: {
      large: { ...typography.display.large, fontSize: 56, lineHeight: 64 },
      medium: { ...typography.display.medium, fontSize: 44, lineHeight: 52 },
      small: { ...typography.display.small, fontSize: 36, lineHeight: 44 },
    },
    headline: {
      large: { ...typography.headline.large, fontSize: 32, lineHeight: 40 },
      medium: { ...typography.headline.medium, fontSize: 28, lineHeight: 36 },
      small: { ...typography.headline.small, fontSize: 24, lineHeight: 32 },
    },
  },

  desktop: {
    ...typography,
    display: {
      large: { ...typography.display.large, fontSize: 64, lineHeight: 72 },
      medium: { ...typography.display.medium, fontSize: 48, lineHeight: 56 },
      small: { ...typography.display.small, fontSize: 40, lineHeight: 48 },
    },
    headline: {
      large: { ...typography.headline.large, fontSize: 36, lineHeight: 44 },
      medium: { ...typography.headline.medium, fontSize: 32, lineHeight: 40 },
      small: { ...typography.headline.small, fontSize: 28, lineHeight: 36 },
    },
    body: {
      large: { ...typography.body.large, fontSize: 18, lineHeight: 28 },
      medium: { ...typography.body.medium, fontSize: 16, lineHeight: 24 },
      small: { ...typography.body.small, fontSize: 14, lineHeight: 20 },
    },
  },
};

// Utility type for text styles
export type TextVariant =
  | 'displayLarge'
  | 'displayMedium'
  | 'displaySmall'
  | 'headlineLarge'
  | 'headlineMedium'
  | 'headlineSmall'
  | 'titleLarge'
  | 'titleMedium'
  | 'titleSmall'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall'
  | 'labelLarge'
  | 'labelMedium'
  | 'labelSmall'
  | 'caption'
  | 'overline';
