# Header Component Tests

This document provides an overview of the test suite for the Header component, including test structure, utilities, and coverage.

## Overview

The Header component test suite follows the established patterns from Button and Card tests, providing comprehensive coverage for navigation header functionality including title display, back navigation, actions, and theme controls.

## Test Structure

### Main Test File: `Header.test.tsx`
- **Rendering**: Tests basic rendering with different prop combinations
- **Back Button**: Tests navigation back button behavior
- **Actions**: Tests action button rendering and functionality  
- **Theme Toggle**: Tests theme switching controls
- **Layout and Styling**: Tests complex layout scenarios
- **Accessibility**: Tests accessibility features
- **Header Scenarios**: Tests predefined usage scenarios
- **Error Handling**: Tests graceful error handling

### Test Utilities: `Header.test.utils.tsx`
- **`renderWithTheme()`**: Wraps components with ThemeProvider for consistent theming
- **`MockAction`**: Mock component for testing action functionality
- **`mockRouter`**: Mock expo-router for testing navigation
- **`TEST_DATA`**: Sample data for parameterized tests
- **`HEADER_SCENARIOS`**: Predefined test scenarios
- **`ACCESSIBILITY_HELPERS`**: Accessibility testing utilities

## Key Features Tested

### Basic Functionality
- ✅ Renders with and without props
- ✅ Title and subtitle display
- ✅ Back button visibility and functionality
- ✅ Action button rendering and layout
- ✅ Theme toggle controls

### Navigation
- ✅ Back button calls router.back()
- ✅ Back button visibility controlled by showBack prop
- ✅ Router integration through expo-router mock

### Theme Integration
- ✅ Theme toggle button rendering
- ✅ Theme variant switching
- ✅ Conditional theme toggle display
- ✅ Interactive theme controls

### Layout & Styling
- ✅ Complex layouts with all elements
- ✅ Proper spacing and arrangement
- ✅ Platform-specific styling considerations

### Accessibility
- ✅ Interactive elements are accessible
- ✅ Proper keyboard navigation support
- ✅ Screen reader compatibility

### Error Handling
- ✅ Graceful handling of missing props
- ✅ Invalid action prop handling
- ✅ Robust error boundaries

## Test Patterns

### Rendering Tests
```typescript
it('renders with title correctly', () => {
  renderWithTheme(<Header title="Test Title" />);
  expect(screen.getByText("Test Title")).toBeTruthy();
});
```

### Interaction Tests
```typescript
it('calls router.back when back button is pressed', () => {
  renderWithTheme(<Header title="Test" showBack={true} />);
  const backButton = screen.getByText('← Back');
  fireEvent.press(backButton);
  expect(mockRouter.back).toHaveBeenCalledTimes(1);
});
```

### Scenario Tests
```typescript
it.each(Object.entries(HEADER_SCENARIOS))(
  'renders %s correctly',
  (scenarioName, scenario) => {
    renderWithTheme(<Header {...scenario.props} />);
    // Test scenario-specific expectations
  }
);
```

## Mock Setup

### Router Mock
```typescript
jest.mock('expo-router', () => ({
  useRouter: () => mockRouter,
}));
```

### Theme Provider
Uses real ThemeProvider for authentic theme integration testing.

## Coverage Statistics

- **Total Tests**: 27 passing + 1 skipped
- **Test Categories**: 8 main categories
- **Key Scenarios**: 6 predefined scenarios tested
- **Accessibility Tests**: Dedicated accessibility validation
- **Error Cases**: Comprehensive error handling coverage

## Test Data

### Sample Props
- Basic title strings
- Title with subtitle combinations  
- Action button arrays
- Theme toggle configurations

### Test Scenarios
- Basic header with title only
- Header with subtitle
- Header with back button
- Header with actions
- Header without theme toggle
- Full-featured header

## Running Tests

```bash
# Run Header tests only
npm test -- Header.test.tsx

# Run with verbose output
npm test -- Header.test.tsx --verbose

# Run with coverage
npm test -- Header.test.tsx --coverage
```

## Dependencies

- `@testing-library/react-native`: Testing utilities
- `expo-router`: Navigation (mocked)
- `@/providers/themeProvider`: Theme context
- Custom UI components: View, Text, Button components

## Best Practices Followed

- **DRY Principle**: Reusable test utilities and data
- **Comprehensive Coverage**: All props and interactions tested
- **Real-world Scenarios**: Tests match actual usage patterns
- **Accessibility First**: Dedicated accessibility testing
- **Error Resilience**: Robust error handling validation
- **Performance**: Efficient test structure and execution

---

This test suite ensures the Header component works reliably across all supported use cases while maintaining high code quality and accessibility standards.
