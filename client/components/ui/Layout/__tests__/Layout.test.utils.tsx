import React from 'react';
import { render } from '@testing-library/react-native';
import { View, Text } from 'react-native';
import { ThemeProvider } from '@/providers/themeProvider';
import { Theme, ThemeContextType, themes } from '@/themes/themes';
import {
  ContainerProps,
  ScreenProps,
  SectionProps,
  StackProps,
  InlineProps,
  GridProps,
  SpacerProps,
  CenterProps,
  ScreenSize,
} from '../Layout.interface';

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
 */
export const mockThemeContext = createTestThemeContext('modern');

/**
 * Mock child component for testing layout behavior
 */
export const MockChild: React.FC<{ testID?: string; children?: React.ReactNode }> = ({
  testID = 'mock-child',
  children = 'Test Content'
}) => (
  <View testID={testID}>
    <Text>{children}</Text>
  </View>
);

/**
 * Mock multiple children for testing layout with multiple elements
 */
export const MockChildren: React.FC<{ count?: number; prefix?: string }> = ({
  count = 3,
  prefix = 'Child'
}) => (
  <>
    {Array.from({ length: count }, (_, index) => (
      <MockChild
        key={index}
        testID={`mock-child-${index}`}
        children={`${prefix} ${index + 1}`}
      />
    ))}
  </>
);

/**
 * Test constants for reusability across tests
 */
export const TEST_CONSTANTS = {
  // Theme variants
  themeVariants: ['modern', 'dark', 'warm', 'cool'] as const,

  // Screen sizes
  screenSizes: ['mobile', 'tablet', 'desktop'] as const,

  // Spacing values
  spacingValues: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const,

  // Test content
  content: {
    title: 'Test Section Title',
    subtitle: 'Test section subtitle with description',
    text: 'Test content text',
  },

  // Common test values
  dimensions: {
    mobile: { width: 375, height: 812 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1200, height: 800 },
  },
};

/**
 * Sample props for different Layout components
 */
export const TEST_DATA = {
  container: {
    basic: {},
    withMaxWidth: { maxWidth: 800 },
    withPadding: { padding: 'lg' as const },
    withBackgroundColor: { backgroundColor: 'surface' },
    noSafeArea: { safeArea: false },
  } as Record<string, Partial<ContainerProps>>,

  screen: {
    basic: {},
    nonScrollable: { scrollable: false },
    withPadding: { padding: 'xl' as const },
    withBackgroundColor: { backgroundColor: 'background' },
  } as Record<string, Partial<ScreenProps>>,

  section: {
    basic: {},
    withTitle: { title: TEST_CONSTANTS.content.title },
    withTitleAndSubtitle: {
      title: TEST_CONSTANTS.content.title,
      subtitle: TEST_CONSTANTS.content.subtitle
    },
    withSpacing: { spacing: '3xl' as const },
  } as Record<string, Partial<SectionProps>>,

  stack: {
    basic: {},
    withSpacing: { spacing: 'lg' as const },
    centered: { align: 'center' as const },
    stretched: { align: 'stretch' as const },
  } as Record<string, Partial<StackProps>>,

  inline: {
    basic: {},
    withSpacing: { spacing: 'xl' as const },
    centered: { align: 'center' as const, justify: 'center' as const },
    spaceBetween: { justify: 'space-between' as const },
    wrapped: { wrap: true },
  } as Record<string, Partial<InlineProps>>,

  grid: {
    basic: {},
    twoColumns: { columns: 2 },
    fourColumns: { columns: 4 },
    withSpacing: { spacing: 'lg' as const },
  } as Record<string, Partial<GridProps>>,

  spacer: {
    basic: {},
    withSize: { size: 'xl' as const },
    withNumericSize: { size: 32 },
    withFlex: { flex: 1 },
  } as Record<string, Partial<SpacerProps>>,

  center: {
    basic: {},
    withMinHeight: { minHeight: 200 },
    withStringMinHeight: { minHeight: '50%' },
  } as Record<string, Partial<CenterProps>>,
};

/**
 * Screen size scenarios for responsive testing
 */
export const SCREEN_SIZE_SCENARIOS = {
  mobile: {
    size: 'mobile' as ScreenSize,
    description: 'Mobile screen size',
    expectedColumns: 2,
    expectedPadding: 'md',
  },
  tablet: {
    size: 'tablet' as ScreenSize,
    description: 'Tablet screen size',
    expectedColumns: 3,
    expectedPadding: 'lg',
  },
  desktop: {
    size: 'desktop' as ScreenSize,
    description: 'Desktop screen size',
    expectedColumns: 4,
    expectedPadding: 'xl',
  },
};

/**
 * Layout component scenarios for comprehensive testing
 */
export const LAYOUT_SCENARIOS = [
  {
    name: 'Container with nested Stack',
    description: 'Container component with Stack layout inside',
    component: 'container-stack',
  },
  {
    name: 'Screen with Grid layout',
    description: 'Screen component with Grid layout for cards',
    component: 'screen-grid',
  },
  {
    name: 'Section with Inline actions',
    description: 'Section with inline button actions',
    component: 'section-inline',
  },
  {
    name: 'Complex nested layout',
    description: 'Multiple layout components nested together',
    component: 'complex-nested',
  },
];

/**
 * Accessibility testing helpers
 */
export const ACCESSIBILITY_HELPERS = {
  // Check if element has proper accessibility props
  hasAccessibilityProps: (element: any) => {
    return element.props.accessible !== undefined;
  },

  // Get accessibility label from element
  getAccessibilityLabel: (element: any) => {
    return element.props.accessibilityLabel;
  },

  // Check if element has proper role
  hasAccessibilityRole: (element: any, expectedRole: string) => {
    return element.props.accessibilityRole === expectedRole;
  },
};

/**
 * Theme testing helpers
 */
export const THEME_HELPERS = {
  // Get all available theme variants
  getAllThemeVariants: () => Object.keys(themes) as (keyof typeof themes)[],

  // Test component with all theme variants
  testWithAllThemes: (renderFn: (theme: keyof typeof themes) => void) => {
    THEME_HELPERS.getAllThemeVariants().forEach(renderFn);
  },

  // Get theme-specific values
  getThemeValue: (theme: Theme, path: string) => {
    return path.split('.').reduce((obj: any, key) => obj?.[key], theme);
  },
};

/**
 * Layout testing patterns
 */
export const TEST_PATTERNS = {
  // Test spacing consistency
  testSpacing: (spacingKey: string) => {
    const theme = mockThemeContext.theme;
    return theme.spacing[spacingKey as keyof typeof theme.spacing];
  },

  // Test layout combinations
  testLayoutCombinations: (components: React.ReactElement[]) => {
    return components.map(component => renderWithTheme(component));
  },
};

// Backward compatibility
export { TEST_DATA as TEST_DATA_LEGACY };
