import React from 'react';
import { render } from '@testing-library/react-native';
import { View } from 'react-native';
import { ThemeProvider } from '@/providers/themeProvider';

/**
 * Test utility for rendering components wrapped with ThemeProvider
 * This follows the DRY principle and ensures consistent theming across tests
 */
export const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

/**
 * Mock icon component for testing icon functionality
 * Provides a consistent testID for easy querying in tests
 */
export const MockIcon = ({ testID = 'mock-icon' }: { testID?: string }) => (
  <View testID={testID} />
);

/**
 * Test data for parameterized tests
 */
export const TEST_DATA = {
  variants: ['primary', 'secondary', 'outline', 'ghost', 'danger'] as const,
  sizes: ['small', 'medium', 'large'] as const,
  buttonVariants: [
    { name: 'PrimaryButton', variant: 'primary' },
    { name: 'SecondaryButton', variant: 'secondary' },
    { name: 'OutlineButton', variant: 'outline' },
    { name: 'GhostButton', variant: 'ghost' },
    { name: 'DangerButton', variant: 'danger' },
  ] as const,
};

/**
 * Common test scenarios for button interactions
 */
export const INTERACTION_SCENARIOS = {
  enabled: {
    shouldCallOnPress: true,
    description: 'enabled button',
  },
  disabled: {
    shouldCallOnPress: false,
    description: 'disabled button',
    props: { disabled: true },
  },
  loading: {
    shouldCallOnPress: false,
    description: 'loading button',
    props: { loading: true },
  },
} as const;

/**
 * Accessibility test helpers
 */
export const ACCESSIBILITY_HELPERS = {
  expectToBeAccessible: (element: any) => {
    expect(element.props.accessible).toBe(true);
  },
  expectToBeDisabled: (element: any) => {
    expect(element.props.accessibilityState?.disabled).toBe(true);
  },
  expectToHaveLabel: (element: any, label: string) => {
    expect(element.props.accessibilityLabel).toBe(label);
  },
};
