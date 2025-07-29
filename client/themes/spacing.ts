// Consistent spacing system for margins, padding, and layout

export interface SpacingScale {
  xs: number; // 4px
  sm: number; // 8px
  md: number; // 16px
  lg: number; // 24px
  xl: number; // 32px
  '2xl': number; // 40px
  '3xl': number; // 48px
  '4xl': number; // 64px
  '5xl': number; // 80px
  '6xl': number; // 96px
}

// Base spacing scale (4px grid system)
export const spacing: SpacingScale = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
  '5xl': 80,
  '6xl': 96,
};

// Layout spacing for different screen sizes
export const layoutSpacing = {
  // Container padding
  containerPadding: {
    mobile: spacing.md, // 16px
    tablet: spacing.lg, // 24px
    desktop: spacing.xl, // 32px
  },

  // Section spacing
  sectionSpacing: {
    mobile: spacing['2xl'], // 40px
    tablet: spacing['3xl'], // 48px
    desktop: spacing['4xl'], // 64px
  },

  // Card padding
  cardPadding: {
    small: spacing.md, // 16px
    medium: spacing.lg, // 24px
    large: spacing.xl, // 32px
  },

  // Component spacing
  componentSpacing: {
    tight: spacing.xs, // 4px
    normal: spacing.sm, // 8px
    loose: spacing.md, // 16px
  },

  // Form spacing
  formSpacing: {
    fieldGap: spacing.md, // 16px
    labelGap: spacing.sm, // 8px
    buttonGap: spacing.lg, // 24px
  },
};

// Border radius scale
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
} as const;

// Component-specific spacing patterns
export const componentSpacing = {
  // Button spacing
  button: {
    paddingVertical: {
      small: spacing.sm, // 8px
      medium: spacing.md, // 16px
      large: spacing.lg, // 24px
    },
    paddingHorizontal: {
      small: spacing.md, // 16px
      medium: spacing.lg, // 24px
      large: spacing.xl, // 32px
    },
    gap: spacing.sm, // 8px between icon and text
  },

  // Input spacing
  input: {
    paddingVertical: spacing.md, // 16px
    paddingHorizontal: spacing.md, // 16px
    marginBottom: spacing.md, // 16px
  },

  // Card spacing
  card: {
    padding: spacing.lg, // 24px
    gap: spacing.md, // 16px between elements
    marginBottom: spacing.md, // 16px between cards
  },

  // List spacing
  list: {
    itemPadding: spacing.md, // 16px
    itemGap: spacing.sm, // 8px between items
    sectionGap: spacing.lg, // 24px between sections
  },

  // Navigation spacing
  navigation: {
    tabPadding: spacing.md, // 16px
    tabGap: spacing.lg, // 24px
    headerPadding: spacing.lg, // 24px
  },
};

// Responsive breakpoints
export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  largeDesktop: 1440,
} as const;

// Safe area spacing for different platforms
export const safeAreaSpacing = {
  top: {
    ios: 44, // Standard iOS status bar + safe area
    android: 24, // Standard Android status bar
    web: 0, // No safe area needed on web
  },
  bottom: {
    ios: 34, // iOS home indicator area
    android: 0, // Usually no bottom safe area on Android
    web: 0, // No safe area needed on web
  },
};

export type SpacingKey = keyof SpacingScale;
export type BorderRadiusKey = keyof typeof borderRadius;
