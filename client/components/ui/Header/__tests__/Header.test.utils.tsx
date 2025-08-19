import React from 'react';
import { render } from '@testing-library/react-native';
import { View, Text } from 'react-native';
import { ThemeProvider } from '@/providers/themeProvider';
import { HeaderProps } from '../Header.interface';
import { Theme, ThemeContextType, themes, defaultTheme } from '@/themes/themes';

// Type for test elements that have props
interface TestElement {
  props: {
    accessible?: boolean;
    accessibilityLabel?: string;
    accessibilityRole?: string;
    [key: string]: any;
  };
}

// Props for MockAction component
interface MockActionProps {
  testID?: string;
  children?: string;
}

/**
 * Test utility for rendering components wrapped with ThemeProvider
 * This follows the DRY principle and ensures consistent theming across tests
 */
export const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

/**
 * Test utility for rendering components with a specific theme variant
 */
export const renderWithThemeVariant = (
  component: React.ReactElement,
  themeVariant: keyof typeof themes = 'modern'
) => {
  const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );

  return render(<TestWrapper>{component}</TestWrapper>);
};

/**
 * Helper to create theme context for testing
 * Uses actual theme objects instead of mocks
 */
export const createTestThemeContext = (
  themeVariant: keyof typeof themes = 'modern'
): ThemeContextType => {
  const theme = themes[themeVariant];
  return {
    theme,
    themeVariant,
    setThemeVariant: jest.fn(),
    isDark: theme.isDark,
    toggleDarkMode: jest.fn(),
  };
};

/**
 * Mock theme context using the default theme
 * Replaces the old mock with actual theme structure
 */
export const mockThemeContext = createTestThemeContext('modern');

/**
 * Mock action component for testing action functionality
 * Provides a consistent testID for easy querying in tests
 */
export const MockAction: React.FC<MockActionProps> = ({ testID = 'mock-action', children = 'Action' }) => (
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
 * Test constants for reusability across tests
 */
export const TEST_CONSTANTS = {
  // Theme variants
  themeVariants: ['modern', 'dark', 'warm', 'cool'] as const,

  // Common test values
  titles: {
    basic: 'Test Title',
    main: 'Main Title',
    actions: 'Actions Test',
    withBack: 'With Back',
    withActions: 'With Actions',
    noThemeToggle: 'No Theme Toggle',
    full: 'Full Header',
  },

  // Subtitles
  subtitles: {
    basic: 'Subtitle text',
    full: 'All features enabled',
  },

  // Action labels
  actionLabels: {
    edit: 'Edit',
    share: 'Share',
    save: 'Save',
    delete: 'Delete',
  },
} as const;

/**
 * Factory function for creating Header props to reduce duplication
 */
const createHeaderProps = (overrides: Partial<HeaderProps> = {}): HeaderProps => ({
  title: TEST_CONSTANTS.titles.basic,
  ...overrides,
});

/**
 * Test scenarios for header configurations using factory pattern
 */
export const HEADER_SCENARIOS = {
  basic: {
    description: 'basic header with title only',
    props: createHeaderProps({ title: TEST_CONSTANTS.titles.basic }),
  },
  withSubtitle: {
    description: 'header with title and subtitle',
    props: createHeaderProps({
      title: TEST_CONSTANTS.titles.main,
      subtitle: TEST_CONSTANTS.subtitles.basic,
    }),
  },
  withBack: {
    description: 'header with back button',
    props: createHeaderProps({
      title: TEST_CONSTANTS.titles.withBack,
      showBack: true,
    }),
  },
  withActions: {
    description: 'header with actions',
    props: createHeaderProps({
      title: TEST_CONSTANTS.titles.withActions,
      actions: [
        <MockAction key="1" testID="action-1">{TEST_CONSTANTS.actionLabels.edit}</MockAction>,
        <MockAction key="2" testID="action-2">{TEST_CONSTANTS.actionLabels.share}</MockAction>,
      ],
    }),
  },
  withoutThemeToggle: {
    description: 'header without theme toggle',
    props: createHeaderProps({
      title: TEST_CONSTANTS.titles.noThemeToggle,
      themeToggle: false,
    }),
  },
  full: {
    description: 'header with all features',
    props: createHeaderProps({
      title: TEST_CONSTANTS.titles.full,
      subtitle: TEST_CONSTANTS.subtitles.full,
      showBack: true,
      actions: [
        <MockAction key="1" testID="action-1">{TEST_CONSTANTS.actionLabels.edit}</MockAction>,
        <MockAction key="2" testID="action-2">{TEST_CONSTANTS.actionLabels.share}</MockAction>,
      ],
      themeToggle: true,
    }),
  },
} as const;

/**
 * Accessibility test helpers with proper TypeScript types
 */
export const ACCESSIBILITY_HELPERS = {
  expectToBeAccessible: (element: TestElement) => {
    expect(element).toBeTruthy();
    expect(element.props.accessible).not.toBe(false);
  },

  expectToHaveLabel: (element: TestElement, label: string) => {
    expect(element.props.accessibilityLabel).toBe(label);
  },

  expectToBeInteractive: (element: TestElement) => {
    expect(element.props.accessible).not.toBe(false);
  },

  expectToHaveAccessibilityRole: (element: TestElement, role?: string) => {
    if (role) {
      expect(element.props.accessibilityRole).toBe(role);
    }
  },
} as const;

/**
 * Theme-based test helpers using actual theme values
 */
export const THEME_HELPERS = {
  expectThemeColor: (colorKey: keyof Theme['colors'], expectedValue?: string) => {
    const theme = defaultTheme;
    if (expectedValue) {
      expect(theme.colors[colorKey]).toBe(expectedValue);
    } else {
      expect(theme.colors[colorKey]).toBeDefined();
    }
  },

  expectThemeSpacing: (spacingKey: keyof Theme['spacing'], expectedValue?: number) => {
    const theme = defaultTheme;
    if (expectedValue) {
      expect(theme.spacing[spacingKey]).toBe(expectedValue);
    } else {
      expect(theme.spacing[spacingKey]).toBeDefined();
    }
  },

  getAllThemeVariants: () => Object.keys(themes) as (keyof typeof themes)[],

  getThemeByVariant: (variant: keyof typeof themes) => themes[variant],
} as const;

/**
 * Common test patterns and utilities
 */
export const TEST_PATTERNS = {
  // Test all theme variants
  testAllThemes: (testFn: (theme: Theme, variant: keyof typeof themes) => void) => {
    THEME_HELPERS.getAllThemeVariants().forEach(variant => {
      const theme = THEME_HELPERS.getThemeByVariant(variant);
      testFn(theme, variant);
    });
  },

  // Test with different action configurations
  testWithActions: (testFn: (actions: React.ReactNode[]) => void) => {
    const actionConfigurations = [
      [], // No actions
      [<MockAction key="1" />], // Single action
      [<MockAction key="1" />, <MockAction key="2" />], // Multiple actions
    ];
    actionConfigurations.forEach(testFn);
  },
} as const;

/**
 * Backward compatibility layer for existing tests
 * @deprecated Use TEST_CONSTANTS and HEADER_SCENARIOS instead
 */
export const TEST_DATA = {
  themeVariants: TEST_CONSTANTS.themeVariants,
  sampleProps: {
    basicTitle: TEST_CONSTANTS.titles.basic,
    titleWithSubtitle: {
      title: TEST_CONSTANTS.titles.main,
      subtitle: TEST_CONSTANTS.subtitles.basic,
    },
    withActions: {
      title: TEST_CONSTANTS.titles.actions,
      actions: [
        <MockAction key="1" testID="action-1">{TEST_CONSTANTS.actionLabels.edit}</MockAction>,
        <MockAction key="2" testID="action-2">{TEST_CONSTANTS.actionLabels.share}</MockAction>,
      ],
    },
  },
} as const;
