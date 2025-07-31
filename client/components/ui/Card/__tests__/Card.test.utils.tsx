import React from 'react';
import { render } from '@testing-library/react-native';
import { View } from 'react-native';
import { ThemeProvider } from '@/providers/themeProvider';
import { Text } from '../../Text';

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
 * Mock action component for testing card header actions
 */
export const MockAction = ({ testID = 'mock-action' }: { testID?: string }) => (
  <View testID={testID} />
);

/**
 * Test content components for consistent testing
 */
export const TestContent = {
  Text: ({ children, testID }: { children: string; testID?: string }) => (
    <Text testID={testID}>{children}</Text>
  ),
  View: ({ children, testID }: { children?: React.ReactNode; testID?: string }) => (
    <View testID={testID}>{children}</View>
  ),
};

/**
 * Test data for parameterized tests
 */
export const TEST_DATA = {
  variants: ['elevated', 'outlined', 'filled'] as const,
  spacingKeys: ['xs', 'sm', 'md', 'lg', 'xl'] as const,
  borderRadiusKeys: ['xs', 'sm', 'md', 'lg', 'xl'] as const,
  shadowLevels: ['xs', 'sm', 'md', 'lg', 'xl'] as const,
  backgroundColors: ['card', 'surface', 'background'] as const,
  borderColors: ['border', 'borderSecondary'] as const,
  cardTypes: [
    { name: 'ElevatedCard', variant: 'elevated' },
    { name: 'OutlinedCard', variant: 'outlined' },
    { name: 'FilledCard', variant: 'filled' },
  ] as const,
  headerJustifyOptions: ['flex-start', 'flex-end', 'center', 'space-between'] as const,
};

/**
 * Common test scenarios for card interactions
 */
export const INTERACTION_SCENARIOS = {
  enabled: {
    shouldCallOnPress: true,
    description: 'enabled card',
  },
  disabled: {
    shouldCallOnPress: false,
    description: 'disabled card',
    props: { disabled: true },
  },
} as const;

/**
 * Sample content for card testing
 */
export const SAMPLE_CONTENT = {
  simple: 'Card Content',
  header: {
    title: 'Card Title',
    subtitle: 'Card Subtitle',
  },
  complex: {
    title: 'Complex Card',
    subtitle: 'With multiple elements',
    description: 'This is a more complex card with various content elements',
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
  expectToHaveRole: (element: any, role: string) => {
    expect(element.props.accessibilityRole).toBe(role);
  },
};

/**
 * Style testing helpers
 */
// export const STYLE_HELPERS = {
//   expectToHaveStyle: (element: any, expectedStyle: object) => {
//     expect(element.props.style).toEqual(
//       expect.objectContaining(expectedStyle)
//     );
//   },
//   expectToHaveBackgroundColor: (element: any, color: string) => {
//     expect(element.props.style).toEqual(
//       expect.objectContaining({ backgroundColor: color })
//     );
//   },
//   expectToHaveBorder: (element: any, width: number, color?: string) => {
//     const borderExpectation = { borderWidth: width };
//     if (color) {
//       Object.assign(borderExpectation, { borderColor: color });
//     }
//     expect(element.props.style).toEqual(
//       expect.objectContaining(borderExpectation)
//     );
//   },
// };
