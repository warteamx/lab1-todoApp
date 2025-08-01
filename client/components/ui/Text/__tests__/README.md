# Text Component Tests

This directory contains comprehensive tests for the Text UI component and its preset variations.

## Test Structure

### `Text.test.tsx`
Main test file covering all Text component functionality:

#### Core Component Tests (`<Text />`)
- **Rendering**: Basic text rendering, different content types, empty children, testID support
- **Typography Variants**: All 17 typography variants (display, headline, title, body, label, caption, overline)
- **Colors**: All available theme colors (textPrimary, textSecondary, etc.)
- **Text Alignment**: Left, center, right, justify alignment options
- **Custom Styles**: Style merging and custom style application
- **Accessibility**: Accessibility props and default behavior
- **Props Handling**: React Native Text props pass-through

#### Preset Component Tests
- **DisplayText**: Large, medium, small sizes with proper variant mapping
- **HeadlineText**: Size variants and prop forwarding
- **TitleText**: Size variants and prop forwarding  
- **BodyText**: Size variants and prop forwarding
- **LabelText**: Size variants and prop forwarding
- **CaptionText**: Basic rendering and prop forwarding
- **OverlineText**: Basic rendering and prop forwarding

#### Integration Tests
- **Real-world Usage**: Complex layouts with multiple text components
- **Dynamic Content**: Content updates and rerendering
- **Nested Structures**: Text components within other text components

#### Edge Cases
- **Error Boundaries**: Handling undefined, null, boolean, and zero children
- **Type Safety**: Proper TypeScript integration

### `Text.test.utils.tsx`
Shared utilities and test data:

- **renderWithTheme**: Wrapper for rendering components with ThemeProvider
- **TEST_DATA**: Predefined test data for variants, colors, alignments, and sample texts
- **TEXT_HELPERS**: Helper functions for common test patterns
- **TEXT_SCENARIOS**: Reusable test scenarios for different use cases

## Test Coverage

The tests cover:
- ✅ All 17 typography variants
- ✅ All available theme colors
- ✅ All alignment options
- ✅ All preset components (DisplayText, HeadlineText, etc.)
- ✅ Custom styling and style merging
- ✅ Accessibility features
- ✅ React Native Text props pass-through
- ✅ Edge cases and error handling
- ✅ Real-world usage scenarios
- ✅ TypeScript type safety

## Running Tests

```bash
# Run Text component tests only
npm test -- Text.test.tsx

# Run all UI component tests
npm test -- --testPathPattern="components/ui"

# Run tests with coverage
npm test -- --coverage Text.test.tsx
```

## Test Philosophy

These tests follow the project's established patterns:
- **Simple and Easy to Understand**: Clear test names and organized structure
- **Comprehensive Coverage**: Testing all features and edge cases
- **Maintainable**: Reusable utilities and data-driven tests
- **Integration-Focused**: Testing real-world usage patterns
- **Type-Safe**: Full TypeScript support throughout

The tests prioritize functionality and user experience over implementation details, ensuring the component works correctly for end users.
