import React from 'react';
import { render } from '@testing-library/react-native';
import { View, Text } from 'react-native';
import { ThemeProvider } from '@/providers/themeProvider';
import { ThemedInputProps } from '../Input.interface';
import { Theme, ThemeContextType, themes, defaultTheme } from '@/themes/themes';

// Type for test elements that have props
interface TestElement {
  props: {
    editable?: boolean;
    accessible?: boolean;
    accessibilityLabel?: string;
    placeholder?: string;
    value?: string;
    [key: string]: any;
  };
}

// Props for MockIcon component
interface MockIconProps {
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
 * Mock icon component for testing icon functionality
 * Provides a consistent testID for easy querying in tests
 */
export const MockIcon: React.FC<MockIconProps> = ({ testID = 'mock-icon', children = '📝' }) => (
  <View testID={testID}>
    <Text>{children}</Text>
  </View>
);

/**
 * Test data constants for reusability across tests
 */
export const TEST_CONSTANTS = {
  // Input variants and sizes
  variants: ['default', 'filled', 'outline'] as const,
  sizes: ['small', 'medium', 'large'] as const,

  // Common test values
  placeholders: {
    basic: 'Enter text...',
    email: 'Enter your email',
    password: 'Enter password',
    search: 'Search...',
    disabled: 'Cannot edit',
    loading: 'Loading...',
  },

  // Labels
  labels: {
    email: 'Email',
    password: 'Password',
    username: 'Username',
    search: 'Search',
    disabled: 'Disabled Input',
    loading: 'Loading Input',
  },

  // Messages
  messages: {
    helper: 'Minimum 8 characters',
    error: 'Username is required',
  },

  // Test input values
  testValues: {
    sample: 'Test input value',
    email: 'test@example.com',
    password: 'password123',
  },
} as const;

/**
 * Event objects for testing input interactions
 */
export const TEST_EVENTS = {
  focus: { nativeEvent: { target: 1 } } as const,
  blur: { nativeEvent: { target: 1 } } as const,
  changeText: TEST_CONSTANTS.testValues.sample,
} as const;

/**
 * Backward compatibility layer for existing tests
 * @deprecated Use TEST_CONSTANTS and INPUT_SCENARIOS instead
 */
export const TEST_DATA = {
  variants: TEST_CONSTANTS.variants,
  sizes: TEST_CONSTANTS.sizes,
  sampleProps: {
    basicInput: {
      placeholder: TEST_CONSTANTS.placeholders.basic,
    },
    withLabel: {
      label: TEST_CONSTANTS.labels.email,
      placeholder: TEST_CONSTANTS.placeholders.email,
    },
    withHelperText: {
      label: TEST_CONSTANTS.labels.password,
      placeholder: TEST_CONSTANTS.placeholders.password,
      helperText: TEST_CONSTANTS.messages.helper,
    },
    withError: {
      label: TEST_CONSTANTS.labels.username,
      placeholder: 'Enter username',
      errorText: TEST_CONSTANTS.messages.error,
    },
    withIcons: {
      label: TEST_CONSTANTS.labels.search,
      placeholder: TEST_CONSTANTS.placeholders.search,
      leftIcon: <MockIcon testID="left-icon">🔍</MockIcon>,
      rightIcon: <MockIcon testID="right-icon">✕</MockIcon>,
    },
    disabled: {
      label: TEST_CONSTANTS.labels.disabled,
      placeholder: TEST_CONSTANTS.placeholders.disabled,
      disabled: true,
    },
    loading: {
      label: TEST_CONSTANTS.labels.loading,
      placeholder: TEST_CONSTANTS.placeholders.loading,
      loading: true,
    },
  },
  textInputEvents: TEST_EVENTS,
} as const;

/**
 * Reusable input props factory for DRY testing
 */
const createInputProps = (overrides: Partial<ThemedInputProps> = {}): ThemedInputProps => ({
  placeholder: TEST_CONSTANTS.placeholders.basic,
  ...overrides,
});

/**
 * Test scenarios for input configurations using factory pattern
 */
export const INPUT_SCENARIOS = {
  basic: {
    description: 'basic input with placeholder only',
    props: createInputProps({ placeholder: TEST_CONSTANTS.placeholders.basic }),
  },
  withLabel: {
    description: 'input with label',
    props: createInputProps({
      label: TEST_CONSTANTS.labels.email,
      placeholder: TEST_CONSTANTS.placeholders.email,
    }),
  },
  outlined: {
    description: 'outlined input variant',
    props: createInputProps({
      variant: 'outline',
      label: 'Outlined',
      placeholder: 'Outlined input',
    }),
  },
  filled: {
    description: 'filled input variant',
    props: createInputProps({
      variant: 'filled',
      label: 'Filled',
      placeholder: 'Filled input',
    }),
  },
  withError: {
    description: 'input with error state',
    props: createInputProps({
      label: TEST_CONSTANTS.labels.username,
      placeholder: 'Enter username',
      errorText: TEST_CONSTANTS.messages.error,
    }),
  },
  withHelperText: {
    description: 'input with helper text',
    props: createInputProps({
      label: TEST_CONSTANTS.labels.password,
      placeholder: TEST_CONSTANTS.placeholders.password,
      helperText: TEST_CONSTANTS.messages.helper,
    }),
  },
  withIcons: {
    description: 'input with left and right icons',
    props: createInputProps({
      label: TEST_CONSTANTS.labels.search,
      placeholder: TEST_CONSTANTS.placeholders.search,
      leftIcon: <MockIcon key="left" testID="left-icon">🔍</MockIcon>,
      rightIcon: <MockIcon key="right" testID="right-icon">✕</MockIcon>,
    }),
  },
  disabled: {
    description: 'disabled input',
    props: createInputProps({
      label: TEST_CONSTANTS.labels.disabled,
      placeholder: TEST_CONSTANTS.placeholders.disabled,
      disabled: true,
    }),
  },
  loading: {
    description: 'loading input state',
    props: createInputProps({
      label: TEST_CONSTANTS.labels.loading,
      placeholder: TEST_CONSTANTS.placeholders.loading,
      loading: true,
    }),
  },
  smallSize: {
    description: 'small size input',
    props: createInputProps({
      size: 'small',
      label: 'Small',
      placeholder: 'Small input',
    }),
  },
  largeSize: {
    description: 'large size input',
    props: createInputProps({
      size: 'large',
      label: 'Large',
      placeholder: 'Large input',
    }),
  },
  fullWidth: {
    description: 'full width input',
    props: createInputProps({
      fullWidth: true,
      label: 'Full Width',
      placeholder: 'Full width input',
    }),
  },
  customColors: {
    description: 'input with custom colors',
    props: createInputProps({
      label: 'Custom Colors',
      placeholder: 'Custom styled input',
      backgroundColor: 'surface',
      borderColor: 'interactive',
      textColor: 'textPrimary',
    }),
  },
} as const;

/**
 * Accessibility test helpers with consistent patterns
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
    expect(element.props.editable).not.toBe(false);
  },

  expectToHaveAccessibilityRole: (element: TestElement, role?: string) => {
    if (role) {
      expect(element.props.accessibilityRole).toBe(role);
    }
  },
} as const;

/**
 * Input state helpers for testing different input states with DRY principle
 */
export const INPUT_STATE_HELPERS = {
  expectToBeDisabled: (element: TestElement) => {
    expect(element.props.editable).toBe(false);
  },

  expectToBeEnabled: (element: TestElement) => {
    expect(element.props.editable).not.toBe(false);
  },

  expectToHavePlaceholder: (element: TestElement, placeholder: string) => {
    expect(element.props.placeholder).toBe(placeholder);
  },

  expectToHaveValue: (element: TestElement, value: string) => {
    expect(element.props.value).toBe(value);
  },

  expectToBeSecure: (element: TestElement) => {
    expect(element.props.secureTextEntry).toBe(true);
  },

  expectToHaveKeyboardType: (element: TestElement, keyboardType: string) => {
    expect(element.props.keyboardType).toBe(keyboardType);
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
  // Test all variants of a component
  testAllVariants: (
    testFn: (variant: string) => void,
    variants = TEST_CONSTANTS.variants
  ) => {
    variants.forEach(variant => testFn(variant));
  },

  // Test all sizes of a component
  testAllSizes: (
    testFn: (size: string) => void,
    sizes = TEST_CONSTANTS.sizes
  ) => {
    sizes.forEach(size => testFn(size));
  },

  // Test all theme variants
  testAllThemes: (testFn: (theme: Theme, variant: keyof typeof themes) => void) => {
    THEME_HELPERS.getAllThemeVariants().forEach(variant => {
      const theme = THEME_HELPERS.getThemeByVariant(variant);
      testFn(theme, variant);
    });
  },
} as const;
