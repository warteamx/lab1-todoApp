import React from 'react';
import { render } from '@testing-library/react-native';
import { View, Text } from 'react-native';
import { ThemeProvider } from '@/providers/themeProvider';

/**
 * Test utility for rendering components wrapped with ThemeProvider
 * This follows the DRY principle and ensures consistent theming across tests
 */
export const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

/**
 * Mock action component for testing action functionality
 * Provides a consistent testID for easy querying in tests
 */
export const MockAction = ({ testID = 'mock-action', children = 'Action' }: { testID?: string; children?: string }) => (
  <View testID={testID}>
    <Text>{children}</Text>
  </View>
);

/**
 * Mock router for testing navigation functionality
 */
export const mockRouter = {
  back: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
  canGoBack: jest.fn(() => true),
};

/**
 * Test data for parameterized tests
 */
export const TEST_DATA = {
  themeVariants: ['modern', 'dark', 'warm', 'cool'] as const,
  sampleProps: {
    basicTitle: 'Test Title',
    titleWithSubtitle: {
      title: 'Main Title',
      subtitle: 'Subtitle text',
    },
    withActions: {
      title: 'Actions Test',
      actions: [
        <MockAction key="1" testID="action-1">Edit</MockAction>,
        <MockAction key="2" testID="action-2">Share</MockAction>,
      ],
    },
  },
};

/**
 * Mock theme context for testing theme functionality
 */
export const mockThemeContext = {
  theme: {
    colors: {
      surface: '#ffffff',
      textPrimary: '#000000',
      textSecondary: '#666666',
      interactive: '#007AFF',
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
    },
    shadows: {
      sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
      },
    },
    isDark: false,
  },
  themeVariant: 'modern' as const,
  setThemeVariant: jest.fn(),
  isDark: false,
  toggleDarkMode: jest.fn(),
};

/**
 * Test scenarios for header configurations
 */
export const HEADER_SCENARIOS = {
  basic: {
    description: 'basic header with title only',
    props: { title: 'Basic Title' },
  },
  withSubtitle: {
    description: 'header with title and subtitle',
    props: { title: 'Main Title', subtitle: 'Subtitle' },
  },
  withBack: {
    description: 'header with back button',
    props: { title: 'With Back', showBack: true },
  },
  withActions: {
    description: 'header with actions',
    props: {
      title: 'With Actions',
      actions: [<MockAction key="1" />] as React.ReactNode[],
    },
  },
  withoutThemeToggle: {
    description: 'header without theme toggle',
    props: { title: 'No Theme Toggle', themeToggle: false },
  },
  full: {
    description: 'header with all features',
    props: {
      title: 'Full Header',
      subtitle: 'All features enabled',
      showBack: true,
      actions: [<MockAction key="1" />, <MockAction key="2" />] as React.ReactNode[],
      themeToggle: true,
    },
  },
} as const;

/**
 * Accessibility test helpers
 */
export const ACCESSIBILITY_HELPERS = {
  expectToBeAccessible: (element: any) => {
    expect(element).toBeTruthy();
  },
  expectToHaveLabel: (element: any, label: string) => {
    expect(element.props.accessibilityLabel).toBe(label);
  },
  expectToBeInteractive: (element: any) => {
    expect(element.props.accessible).not.toBe(false);
  },
};
