import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import { View, Text } from 'react-native';
import { ThemeProvider } from '@/providers/themeProvider';
import { ThemedInputProps } from '../Input.interface';

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

// Mock theme context interface
interface MockThemeContext {
  theme: {
    colors: {
      surface: string;
      textPrimary: string;
      textSecondary: string;
      textTertiary: string;
      textDisabled: string;
      interactive: string;
      error: string;
      border: string;
      borderSecondary: string;
      borderActive: string;
      neutral50: string;
      neutral100: string;
    };
    spacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
    };
    shadows: {
      sm: {
        shadowColor: string;
        shadowOffset: { width: number; height: number };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
      };
    };
    isDark: boolean;
  };
  themeVariant: 'modern';
  setThemeVariant: jest.MockedFunction<any>;
  isDark: boolean;
  toggleDarkMode: jest.MockedFunction<any>;
}

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
export const MockIcon: React.FC<MockIconProps> = ({ testID = 'mock-icon', children = '📝' }) => (
  <View testID={testID}>
    <Text>{children}</Text>
  </View>
);

/**
 * Test data for parameterized tests
 */
export const TEST_DATA = {
  variants: ['default', 'filled', 'outline'] as const,
  sizes: ['small', 'medium', 'large'] as const,
  sampleProps: {
    basicInput: {
      placeholder: 'Enter text...',
    },
    withLabel: {
      label: 'Email',
      placeholder: 'Enter your email',
    },
    withHelperText: {
      label: 'Password',
      placeholder: 'Enter password',
      helperText: 'Minimum 8 characters',
    },
    withError: {
      label: 'Username',
      placeholder: 'Enter username',
      errorText: 'Username is required',
    },
    withIcons: {
      label: 'Search',
      placeholder: 'Search...',
      leftIcon: <MockIcon testID="left-icon">🔍</MockIcon>,
      rightIcon: <MockIcon testID="right-icon">✕</MockIcon>,
    },
    disabled: {
      label: 'Disabled Input',
      placeholder: 'Cannot edit',
      disabled: true,
    },
    loading: {
      label: 'Loading Input',
      placeholder: 'Loading...',
      loading: true,
    },
  },
  textInputEvents: {
    focus: {
      nativeEvent: { target: 1 },
    } as const,
    blur: {
      nativeEvent: { target: 1 },
    } as const,
    changeText: 'Test input value' as const,
  },
};

/**
 * Mock theme context for testing theme functionality
 */
export const mockThemeContext: MockThemeContext = {
  theme: {
    colors: {
      surface: '#ffffff',
      textPrimary: '#000000',
      textSecondary: '#666666',
      textTertiary: '#999999',
      textDisabled: '#cccccc',
      interactive: '#007AFF',
      error: '#FF3B30',
      border: '#E5E5E7',
      borderSecondary: '#D1D1D6',
      borderActive: '#007AFF',
      neutral50: '#F2F2F7',
      neutral100: '#E5E5EA',
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
 * Test scenarios for input configurations
 */
export const INPUT_SCENARIOS = {
  basic: {
    description: 'basic input with placeholder only',
    props: { placeholder: 'Basic input' },
  },
  withLabel: {
    description: 'input with label',
    props: { label: 'Email', placeholder: 'Enter email' },
  },
  outlined: {
    description: 'outlined input variant',
    props: { variant: 'outline' as const, label: 'Outlined', placeholder: 'Outlined input' },
  },
  filled: {
    description: 'filled input variant',
    props: { variant: 'filled' as const, label: 'Filled', placeholder: 'Filled input' },
  },
  withError: {
    description: 'input with error state',
    props: {
      label: 'Username',
      placeholder: 'Enter username',
      errorText: 'This field is required'
    },
  },
  withHelperText: {
    description: 'input with helper text',
    props: {
      label: 'Password',
      placeholder: 'Enter password',
      helperText: 'Must be at least 8 characters'
    },
  },
  withIcons: {
    description: 'input with left and right icons',
    props: {
      label: 'Search',
      placeholder: 'Search...',
      leftIcon: <MockIcon key="left" testID="left-icon">🔍</MockIcon>,
      rightIcon: <MockIcon key="right" testID="right-icon">✕</MockIcon>,
    } as ThemedInputProps,
  },
  disabled: {
    description: 'disabled input',
    props: {
      label: 'Disabled',
      placeholder: 'Cannot edit',
      disabled: true
    },
  },
  loading: {
    description: 'loading input state',
    props: {
      label: 'Loading',
      placeholder: 'Loading...',
      loading: true
    },
  },
  smallSize: {
    description: 'small size input',
    props: {
      size: 'small' as const,
      label: 'Small',
      placeholder: 'Small input'
    },
  },
  largeSize: {
    description: 'large size input',
    props: {
      size: 'large' as const,
      label: 'Large',
      placeholder: 'Large input'
    },
  },
  fullWidth: {
    description: 'full width input',
    props: {
      fullWidth: true,
      label: 'Full Width',
      placeholder: 'Full width input'
    },
  },
  customColors: {
    description: 'input with custom colors',
    props: {
      label: 'Custom Colors',
      placeholder: 'Custom styled input',
      backgroundColor: 'surface' as const,
      borderColor: 'interactive' as const,
      textColor: 'textPrimary' as const,
    },
  },
} as const;

/**
 * Accessibility test helpers
 */
export const ACCESSIBILITY_HELPERS = {
  expectToBeAccessible: (element: TestElement) => {
    expect(element).toBeTruthy();
  },
  expectToHaveLabel: (element: TestElement, label: string) => {
    expect(element.props.accessibilityLabel).toBe(label);
  },
  expectToBeInteractive: (element: TestElement) => {
    expect(element.props.accessible).not.toBe(false);
  },
  expectToBeEditable: (element: TestElement) => {
    expect(element.props.editable).not.toBe(false);
  },
};

/**
 * Input state helpers for testing different input states
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
};
