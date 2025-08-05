import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@/providers/themeProvider';

/**
 * Test utility for rendering components wrapped with ThemeProvider
 * This follows the DRY principle and ensures consistent theming across tests
 */
export const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

/**
 * Test data for parameterized tests
 */
export const TEST_DATA = {
  // Background colors from theme
  backgroundColors: [
    'background',
    'surface',
    'primary500',
    'secondary500',
    'success',
    'warning',
    'error',
  ] as const,

  // Spacing values
  spacingKeys: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const,
  spacingNumbers: [4, 8, 16, 24, 32] as const,

  // Border radius keys
  borderRadiusKeys: ['sm', 'md', 'lg', 'xl', '2xl'] as const,
  borderRadiusNumbers: [2, 4, 8, 12, 16] as const,

  // Shadow levels
  shadowLevels: ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const,

  // Border colors
  borderColors: [
    'border',
    'borderSecondary',
    'primary500',
    'secondary500',
    'error',
  ] as const,

  // Flex direction values
  flexDirections: ['row', 'column', 'row-reverse', 'column-reverse'] as const,

  // Justify content values
  justifyContentValues: [
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'space-evenly',
  ] as const,

  // Align items values
  alignItemsValues: [
    'flex-start',
    'flex-end',
    'center',
    'stretch',
    'baseline',
  ] as const,

  // Position values
  positionValues: ['absolute', 'relative'] as const,

  // Size values
  sizeValues: {
    numbers: [100, 200, 300],
    strings: ['50%', '100%', 'auto'],
  },
};

/**
 * Helper functions for common test patterns
 */
export const VIEW_HELPERS = {
  /**
   * Creates a simple test case with testID for easy identification
   */
  createTestView: (testID: string, props = {}) => ({
    testID,
    ...props,
  }),

  /**
   * Gets expected style properties for spacing tests
   */
  getExpectedSpacing: (type: string, value: string | number) => {
    const spacingMap = {
      xs: 4, sm: 8, md: 16, lg: 24, xl: 32, '2xl': 40, '3xl': 48,
    };

    return typeof value === 'number'
      ? value
      : spacingMap[value as keyof typeof spacingMap];
  },

  /**
   * Gets expected border radius for tests
   */
  getExpectedBorderRadius: (value: string | number) => {
    const borderRadiusMap = {
      sm: 4, md: 8, lg: 12, xl: 16, '2xl': 20,
    };

    return typeof value === 'number'
      ? value
      : borderRadiusMap[value as keyof typeof borderRadiusMap];
  },
};

/**
 * Test scenarios for common View usage patterns
 */
export const VIEW_SCENARIOS = {
  /**
   * Basic layout containers
   */
  basicContainers: [
    { name: 'safe container', props: { flex: 1, backgroundColor: 'background' as const } },
    { name: 'centered container', props: { flex: 1, justifyContent: 'center' as const, alignItems: 'center' as const } },
    { name: 'row container', props: { flexDirection: 'row' as const, alignItems: 'center' as const } },
    { name: 'column container', props: { flexDirection: 'column' as const } },
  ],

  /**
   * Card-like components
   */
  cardComponents: [
    {
      name: 'basic card',
      props: {
        backgroundColor: 'surface' as const,
        padding: 'md' as const,
        borderRadius: 'md' as const,
        shadow: 'sm' as const,
      },
    },
    {
      name: 'elevated card',
      props: {
        backgroundColor: 'surface' as const,
        padding: 'lg' as const,
        borderRadius: 'lg' as const,
        shadow: 'md' as const,
      },
    },
  ],

  /**
   * Layout sections
   */
  layoutSections: [
    {
      name: 'header section',
      props: {
        paddingHorizontal: 'md' as const,
        paddingVertical: 'sm' as const,
        backgroundColor: 'primary500' as const,
      },
    },
    {
      name: 'content section',
      props: {
        flex: 1,
        padding: 'md' as const,
        backgroundColor: 'background' as const,
      },
    },
    {
      name: 'footer section',
      props: {
        paddingHorizontal: 'md' as const,
        paddingVertical: 'sm' as const,
        borderTopWidth: 1,
        borderColor: 'border' as const,
      },
    },
  ],
};
