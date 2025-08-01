# View Component Tests

This directory contains comprehensive unit tests for the View component and its preset variants.

## Test Structure

### Core Tests (`View.test.tsx`)
- **Rendering**: Basic rendering, children handling, testID, and prop passing
- **Background Colors**: Tests for all theme background colors
- **Spacing Properties**: Tests for padding and margin with both spacing keys and numeric values
- **Border Properties**: Border radius, width, and color tests
- **Shadow Properties**: Tests for all shadow levels
- **Layout Properties**: Flexbox, dimensions, and positioning tests
- **Custom Style Override**: Tests for style prop and style composition
- **Real-world Usage Scenarios**: Common layout patterns and use cases
- **Preset Components**: Tests for SafeView, CenterView, RowView, and ColumnView

### Test Utilities (`View.test.utils.tsx`)
- **renderWithTheme**: Consistent theme provider wrapper for tests
- **TEST_DATA**: Parameterized test data for comprehensive coverage
- **VIEW_HELPERS**: Utility functions for test setup and assertions
- **VIEW_SCENARIOS**: Real-world usage patterns and common layouts

## Test Philosophy

### Best Practices Followed
1. **Behavior over Implementation**: Tests focus on component behavior rather than internal implementation details
2. **Parameterized Testing**: Uses `it.each()` for comprehensive property testing
3. **Real-world Scenarios**: Tests common usage patterns developers would actually use
4. **Clear Test Names**: Descriptive test names that explain what is being tested
5. **DRY Principle**: Shared utilities and data to avoid test duplication

### What We Test
- ✅ Component rendering with different props
- ✅ Prop validation and application
- ✅ Children handling and content rendering
- ✅ Theme integration and theming behavior
- ✅ Accessibility prop passing
- ✅ Style composition and overrides
- ✅ Preset component functionality

### What We Don't Test
- ❌ Internal style calculation logic (implementation detail)
- ❌ Theme provider implementation (tested elsewhere)
- ❌ React Native View implementation (platform responsibility)
- ❌ Style object exact structure (brittle implementation detail)

## Running Tests

```bash
# Run View component tests
npm test -- components/ui/View/__tests__/View.test.tsx

# Run with coverage
npm run test:coverage -- components/ui/View/__tests__/View.test.tsx

# Watch mode for development
npm run test:watch -- components/ui/View/__tests__/View.test.tsx
```

## Coverage

The tests achieve high coverage focusing on:
- All prop combinations and variants
- Edge cases and error conditions
- Common usage patterns
- Preset component behaviors

The test suite includes **109 test cases** covering all major functionality while maintaining fast execution and clear failure reporting.
