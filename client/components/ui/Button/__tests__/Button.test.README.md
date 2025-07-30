# Button Component Testing

This document outlines the comprehensive testing approach for the Button component, following React Native testing best practices.

## Testing Strategy

### 1. **Test Organization**
- **Grouped by functionality**: Tests are organized into logical groups (Rendering, Variants, States, etc.)
- **Descriptive test names**: Each test clearly describes what it's testing
- **Hierarchical structure**: Using nested `describe` blocks for better organization

### 2. **DRY Principle Implementation**
- **Reusable test utilities** (`Button.test.utils.tsx`):
  - `renderWithTheme()`: Consistent ThemeProvider wrapper
  - `MockIcon`: Reusable mock component
  - `TEST_DATA`: Centralized test data
  - `ACCESSIBILITY_HELPERS`: Common accessibility assertions

### 3. **React Native Testing Best Practices**

#### **Testing Library Usage**
- Uses `@testing-library/react-native` for better testing practices
- Prefers `screen` API for consistent element querying
- Uses semantic queries when possible (`getByText`, `getByTestId`)

#### **Theme Provider Integration**
- All components are wrapped with `ThemeProvider` to ensure real-world usage
- Tests verify theme integration without mocking the theme system
- Maintains consistency across web, iOS, and Android platforms

#### **Parameterized Testing**
```typescript
it.each(TEST_DATA.variants)('renders %s variant correctly', (variant) => {
  // Test implementation
});
```

#### **Accessibility Testing**
- Tests accessibility properties (`accessible`, `accessibilityLabel`, `accessibilityState`)
- Verifies disabled states for screen readers
- Uses helper functions for consistent accessibility checks

#### **Interaction Testing**
- Tests user interactions (`onPress`, `onPressIn`, `onPressOut`)
- Verifies disabled and loading state behaviors
- Uses `fireEvent` for realistic user interaction simulation

## Test Coverage

### **Core Functionality**
- ✅ Text rendering (children vs title prop)
- ✅ All button variants (primary, secondary, outline, ghost, danger)
- ✅ All button sizes (small, medium, large)
- ✅ Loading and disabled states
- ✅ Icon integration (left, right, icon-only)
- ✅ Layout options (fullWidth)
- ✅ Custom styling
- ✅ User interactions
- ✅ Accessibility compliance

### **Component Variants**
- ✅ All preset button components (PrimaryButton, SecondaryButton, etc.)
- ✅ IconButton special behavior
- ✅ Variant-specific interactions

### **Cross-Platform Considerations**
- **Web**: Uses standard React Native Web components
- **iOS/Android**: Native TouchableOpacity behavior
- **Theme integration**: Works consistently across all platforms

## Test Utilities

### `renderWithTheme(component)`
Wraps components with ThemeProvider for consistent theming.

### `MockIcon({ testID })`
Provides a consistent mock icon component for testing icon functionality.

### `TEST_DATA`
Centralized test data including variants, sizes, and button types.

### `ACCESSIBILITY_HELPERS`
Common accessibility assertion functions:
- `expectToBeAccessible(element)`
- `expectToBeDisabled(element)`
- `expectToHaveLabel(element, label)`

## Running Tests

```bash
# Run Button component tests
npm test -- Button.test.tsx

# Run with coverage
npm run test:coverage -- Button.test.tsx

# Watch mode
npm run test:watch -- Button.test.tsx
```

## Test Performance

- **40 test cases** covering all functionality
- **Fast execution** (~0.8s total)
- **Minimal setup** with reusable utilities
- **Parallel execution** where possible

## Best Practices Demonstrated

1. **Avoid implementation details**: Tests focus on behavior, not internal implementation
2. **Test user interactions**: Focus on how users interact with the component
3. **Consistent theming**: Always test with real theme provider
4. **Accessibility first**: Include accessibility in all relevant tests
5. **DRY principle**: Reusable utilities and test data
6. **Clear test structure**: Logical grouping and descriptive names
7. **Cross-platform compatibility**: Tests work on web, iOS, and Android
8. **Parameterized testing**: Efficient testing of similar scenarios
9. **Mock strategies**: Use simple, focused mocks (MockIcon)
10. **Error scenarios**: Test disabled states and edge cases

## Future Enhancements

- [ ] Visual regression testing with screenshot comparisons
- [ ] Performance testing for large lists of buttons
- [ ] Integration tests with form components
- [ ] E2E tests for critical user flows
