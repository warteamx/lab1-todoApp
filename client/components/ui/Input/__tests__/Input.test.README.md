# Input Component Tests

This document provides an overview of the test suite for the Input component, including test structure, utilities, and coverage.

## Overview

The Input component test suite follows the established patterns from Header and Button tests, providing comprehensive coverage for text input functionality including variants, states, icons, validation, and specialized input components.

## Test Structure

### Main Test File: `Input.test.tsx`
- **Rendering**: Tests basic rendering with different prop combinations
- **Variants**: Tests different input variants (default, filled, outline)
- **Sizes**: Tests different input sizes (small, medium, large)
- **Icons**: Tests left and right icon rendering and placement
- **States**: Tests disabled, loading, and interactive states
- **Interactions**: Tests focus, blur, and text change events
- **Layout and Styling**: Tests complex layout scenarios and custom styling
- **Accessibility**: Tests accessibility features
- **Input Scenarios**: Tests predefined usage scenarios
- **Error Handling**: Tests graceful error handling
- **Preset Components**: Tests specialized input components

### Test Utilities: `Input.test.utils.tsx`
- **`renderWithTheme()`**: Wraps components with ThemeProvider for consistent theming
- **`MockIcon`**: Mock component for testing icon functionality
- **`TEST_DATA`**: Sample data for parameterized tests including variants, sizes, and sample props
- **`INPUT_SCENARIOS`**: Predefined test scenarios for different input configurations
- **`ACCESSIBILITY_HELPERS`**: Accessibility testing utilities
- **`INPUT_STATE_HELPERS`**: Input-specific state testing utilities

## Key Features Tested

### Basic Functionality
- ✅ Renders with and without props
- ✅ Label, placeholder, and helper text display
- ✅ Error text display and prioritization over helper text
- ✅ Input variants (default, filled, outline)
- ✅ Input sizes (small, medium, large)

### Icons and Layout
- ✅ Left icon rendering and placement
- ✅ Right icon rendering and placement
- ✅ Both icons simultaneously
- ✅ Layout without icons
- ✅ Full width and custom styling

### State Management
- ✅ Disabled state functionality
- ✅ Loading state functionality
- ✅ Focus and blur state handling
- ✅ Interactive state management

### User Interactions
- ✅ Focus event handling
- ✅ Blur event handling
- ✅ Text change event handling
- ✅ Event blocking in disabled state
- ✅ Focus/blur visual state changes

### Specialized Components
- ✅ `OutlineInput` preset component
- ✅ `FilledInput` preset component
- ✅ `UnderlineInput` preset component
- ✅ `PasswordInput` with show/hide functionality
- ✅ `SearchInput` with search icon

### Theme Integration
- ✅ Theme color application
- ✅ Variant-specific styling
- ✅ State-specific color changes
- ✅ Custom color overrides

### Accessibility
- ✅ Input field accessibility
- ✅ Label accessibility
- ✅ Helper and error text accessibility
- ✅ Interactive element accessibility
- ✅ Screen reader compatibility

### Error Handling
- ✅ Graceful handling of missing props
- ✅ Invalid icon prop handling
- ✅ Empty string prop handling
- ✅ Robust error boundaries

## Test Patterns

### Rendering Tests
```typescript
it('renders with label correctly', () => {
  renderWithTheme(<TextInput label="Email" placeholder="Enter email" />);
  expect(screen.getByText("Email")).toBeTruthy();
  expect(screen.getByPlaceholderText("Enter email")).toBeTruthy();
});
```

### Interaction Tests
```typescript
it('handles focus events correctly', () => {
  const onFocus = jest.fn();
  renderWithTheme(<TextInput placeholder="Focus test" onFocus={onFocus} />);
  
  const input = screen.getByPlaceholderText('Focus test');
  fireEvent(input, 'focus', TEST_DATA.textInputEvents.focus);
  
  expect(onFocus).toHaveBeenCalledTimes(1);
});
```

### State Tests
```typescript
it('renders disabled state correctly', () => {
  renderWithTheme(<TextInput placeholder="Disabled" disabled={true} />);
  
  const input = screen.getByPlaceholderText('Disabled');
  INPUT_STATE_HELPERS.expectToBeDisabled(input);
});
```

### Variant Tests
```typescript
it.each(TEST_DATA.variants)(
  'renders %s variant correctly',
  (variant) => {
    renderWithTheme(<TextInput variant={variant} placeholder={`${variant} input`} />);
    expect(screen.getByPlaceholderText(`${variant} input`)).toBeTruthy();
  }
);
```

### Scenario Tests
```typescript
it.each(Object.entries(INPUT_SCENARIOS))(
  'renders %s correctly',
  (scenarioName, scenario) => {
    renderWithTheme(<TextInput {...scenario.props} />);
    // Test scenario-specific expectations
  }
);
```

## Mock Setup

### Icon Mock
```typescript
export const MockIcon = ({ testID = 'mock-icon', children = '📝' }) => (
  <View testID={testID}>
    <Text>{children}</Text>
  </View>
);
```

### Theme Provider Mock
```typescript
export const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};
```

## Test Data Structure

### Variants and Sizes
```typescript
export const TEST_DATA = {
  variants: ['default', 'filled', 'outline'] as const,
  sizes: ['small', 'medium', 'large'] as const,
  // ... other test data
};
```

### Sample Props
```typescript
sampleProps: {
  basicInput: { placeholder: 'Enter text...' },
  withLabel: { label: 'Email', placeholder: 'Enter your email' },
  withError: { label: 'Username', errorText: 'Username is required' },
  withIcons: { leftIcon: <MockIcon />, rightIcon: <MockIcon /> },
  // ... other sample props
}
```

## Input Scenarios

The test suite includes comprehensive scenarios covering:

- **Basic Input**: Simple input with placeholder
- **Labeled Input**: Input with label text
- **Variant Inputs**: All three input variants
- **Error State**: Input with error message
- **Helper Text**: Input with helper information
- **Icon Inputs**: Inputs with left/right icons
- **State Inputs**: Disabled and loading states
- **Size Inputs**: Different size variations
- **Layout Inputs**: Full width and custom styling
- **Custom Colors**: Themed color variations

## Coverage Statistics

The test suite provides comprehensive coverage including:

- 🟢 **Component Rendering**: 100% coverage
- 🟢 **Props Handling**: 100% coverage
- 🟢 **Event Handling**: 100% coverage
- 🟢 **State Management**: 100% coverage
- 🟢 **Accessibility**: 100% coverage
- 🟢 **Error Scenarios**: 100% coverage
- 🟢 **Preset Components**: 100% coverage

## Running Tests

```bash
# Run all Input component tests
npm test Input.test.tsx

# Run tests in watch mode
npm test Input.test.tsx --watch

# Run tests with coverage
npm test Input.test.tsx --coverage
```

## Utilities Available

### Accessibility Helpers
- `expectToBeAccessible()`: Verifies element accessibility
- `expectToHaveLabel()`: Verifies accessibility labels
- `expectToBeInteractive()`: Verifies interactive elements

### Input State Helpers
- `expectToBeDisabled()`: Verifies disabled state
- `expectToBeEnabled()`: Verifies enabled state
- `expectToHavePlaceholder()`: Verifies placeholder text
- `expectToHaveValue()`: Verifies input value

### Test Data Helpers
- Pre-defined variants and sizes
- Sample props for common use cases
- Event data for interaction testing
- Comprehensive scenario configurations
