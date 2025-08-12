import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@/providers/themeProvider';
import { TextVariant } from '@/themes/typography';

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
  variants: [
    'displayLarge', 'displayMedium', 'displaySmall',
    'headlineLarge', 'headlineMedium', 'headlineSmall',
    'titleLarge', 'titleMedium', 'titleSmall',
    'bodyLarge', 'bodyMedium', 'bodySmall',
    'labelLarge', 'labelMedium', 'labelSmall',
    'caption', 'overline',
  ] as TextVariant[],

  colors: [
    'textPrimary', 'textSecondary', 'textTertiary',
    'primary500', 'secondary500', 'success', 'warning', 'error',
  ] as const,

  alignments: ['left', 'center', 'right', 'justify'] as const,

  sizes: ['large', 'medium', 'small'] as const,

  sampleTexts: {
    short: 'Hello',
    medium: 'Hello World',
    long: 'This is a longer text content to test text wrapping and layout behavior.',
    multiline: 'This is line one.\nThis is line two.\nThis is line three.',
    emoji: 'Hello 👋 World 🌍',
    numbers: '123 456 789',
    special: 'Special chars: @#$%^&*()',
  },
};

/**
 * Helper functions for common test patterns
 */
export const TEXT_HELPERS = {
  expectToHaveText: (element: any, text: string) => {
    expect(element).toBeTruthy();
    expect(element.children[0]).toBe(text);
  },

  expectToHaveAccessibilityLabel: (element: any, label: string) => {
    expect(element.props.accessibilityLabel).toBe(label);
  },

  expectToHaveTestId: (element: any, testId: string) => {
    expect(element.props.testID).toBe(testId);
  },

  expectToHaveStyle: (element: any, styleProp: string, expectedValue: any) => {
    const styles = Array.isArray(element.props.style)
      ? element.props.style.reduce((acc: any, style: any) => ({ ...acc, ...style }), {})
      : element.props.style || {};
    expect(styles[styleProp]).toBe(expectedValue);
  },
};

/**
 * Test scenarios for different use cases
 */
export const TEXT_SCENARIOS = {
  basicRendering: {
    description: 'Basic text rendering with default props',
    props: { children: TEST_DATA.sampleTexts.short },
  },

  withVariant: {
    description: 'Text with specific typography variant',
    props: { variant: 'headlineLarge' as TextVariant, children: TEST_DATA.sampleTexts.medium },
  },

  withColor: {
    description: 'Text with custom color',
    props: { color: 'primary500' as const, children: TEST_DATA.sampleTexts.medium },
  },

  withAlignment: {
    description: 'Text with custom alignment',
    props: { align: 'center' as const, children: TEST_DATA.sampleTexts.medium },
  },

  withCustomStyle: {
    description: 'Text with custom style override',
    props: {
      style: { textDecorationLine: 'underline' },
      children: TEST_DATA.sampleTexts.medium,
    },
  },

  withAccessibility: {
    description: 'Text with accessibility props',
    props: {
      accessibilityLabel: 'Custom accessibility label',
      children: TEST_DATA.sampleTexts.medium,
    },
  },
};
