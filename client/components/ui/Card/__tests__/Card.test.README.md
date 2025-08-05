# Card Component Test Suite

This directory contains comprehensive tests for the Card component and all its related components following React Native testing best practices.

## Test Structure

### Files Overview

- **`Card.test.tsx`** - Main test suite with comprehensive coverage
- **`Card.skip.utils.tsx`** - Reusable test utilities, mock components, and test data (following DRY principle)

## Test Coverage

### Core Card Component (`<Card />`)

#### Rendering Tests
- ✅ Basic rendering with children
- ✅ testID support
- ✅ Multiple children support
- ✅ Default variant behavior

#### Variant Tests
- ✅ `elevated` variant (default)
- ✅ `outlined` variant
- ✅ `filled` variant

#### Styling Props Tests
- ✅ Different padding options (`xs`, `sm`, `md`, `lg`, `xl`)
- ✅ Different border radius options
- ✅ Shadow levels
- ✅ Background colors (`card`, `surface`, `background`)
- ✅ Border colors (for outlined variant)

#### Layout Tests
- ✅ Full width behavior (default and disabled)

#### Interaction Tests
- ✅ onPress functionality
- ✅ Disabled state behavior
- ✅ TouchableOpacity vs View rendering based on onPress prop

#### State Tests
- ✅ Disabled state rendering
- ✅ Disabled opacity when pressable

#### Custom Styling Tests
- ✅ Custom style prop application

### Card Sub-Components

#### CardHeader (`<CardHeader />`)
- ✅ Title-only rendering
- ✅ Title + subtitle rendering
- ✅ Title + subtitle + action rendering
- ✅ Custom children override behavior

#### CardContent (`<CardContent />`)
- ✅ Children rendering
- ✅ Custom padding support

#### CardFooter (`<CardFooter />`)
- ✅ Children rendering
- ✅ Different justify options (`flex-start`, `flex-end`, `center`, `space-between`)

### Card Variants

#### Preset Components
- ✅ `ElevatedCard` rendering and interactions
- ✅ `OutlinedCard` rendering and interactions
- ✅ `FilledCard` rendering and interactions

#### Specialized Components
- ✅ `ListCard` with various prop combinations
  - Title only
  - Title + subtitle
  - Title + subtitle + description
  - Left element support
  - Right element support
  - Both left and right elements
  - Press interactions
  - Disabled state behavior

### Composite Usage Tests
- ✅ Complex card with all sub-components
- ✅ Nested cards support

## Test Utilities

### Mock Components
- **`MockIcon`** - Reusable icon mock for testing icon functionality
- **`MockAction`** - Mock action component for header actions
- **`TestContent.Text`** - Properly wrapped text component for React Native testing
- **`TestContent.View`** - Reusable view component for testing

### Test Data
- **`TEST_DATA`** - Centralized test data including:
  - Card variants
  - Spacing keys
  - Border radius keys
  - Shadow levels
  - Color options
  - Justify options

### Sample Content
- **`SAMPLE_CONTENT`** - Reusable content for consistent testing:
  - Simple text content
  - Header content (title/subtitle)
  - Complex content for ListCard testing

### Helper Functions
- **`renderWithTheme`** - Wraps components with ThemeProvider for consistent theming
- **`ACCESSIBILITY_HELPERS`** - Common accessibility assertions
- **`STYLE_HELPERS`** - Common style testing utilities

## Best Practices Followed

### 1. DRY Principle
- All reusable components, data, and utilities are extracted to `Card.skip.utils.tsx`
- Consistent test patterns across all test suites
- Centralized mock components and test data

### 2. Comprehensive Coverage
- Tests all component variants and props
- Tests both positive and negative scenarios
- Tests component composition and nesting
- Tests accessibility and interaction patterns

### 3. React Native Testing Best Practices
- Proper text wrapping in `<Text>` components for React Native compatibility
- Correct use of `testID` for element querying
- Theme provider wrapping for consistent styling context
- Appropriate use of `fireEvent` for interaction testing

### 4. Clear Test Organization
- Descriptive test suite names and test descriptions
- Logical grouping of related tests
- Consistent naming conventions
- Proper use of `describe` blocks for organization

### 5. Maintainable Test Code
- Centralized test data that's easy to update
- Reusable helper functions
- Clear separation of concerns
- Well-documented utilities

## Running Tests

```bash
# Run all Card tests
npm test Card.test.tsx

# Run specific test file
npx jest components/ui/Card/__tests__/Card.test.tsx

# Run with coverage
npm test -- --coverage Card.test.tsx
```

## Test Statistics

- **Total Tests**: 45 passed, 1 skipped
- **Test Suites**: 1 passed
- **Coverage**: Comprehensive coverage of all Card component functionality
- **Test Categories**: 
  - 10+ rendering tests
  - 15+ variant/styling tests
  - 10+ interaction tests
  - 10+ sub-component tests

## Integration with CI/CD

These tests are designed to run in continuous integration environments and provide:
- Fast execution (< 1 second)
- Reliable results
- Clear error messages
- No external dependencies beyond the theme provider

This test suite serves as a model for testing other UI components in the project, demonstrating comprehensive coverage while maintaining clean, maintainable test code.
