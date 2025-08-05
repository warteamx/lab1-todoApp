# Layout Component Tests

This document provides an overview of the test suite for the Layout component collection, including test structure, utilities, and coverage.

## Overview

The Layout component test suite provides comprehensive coverage for responsive layout components including Container, Screen, Section, Stack, Inline, Grid, Spacer, and Center. The tests follow established patterns from other UI component tests and ensure proper functionality across different screen sizes, themes, and use cases.

## Test Structure

### Main Test File: `Layout.test.tsx`
- **useScreenSize Hook**: Tests responsive screen size detection
- **Container**: Tests container wrapper with responsive behavior
- **Screen**: Tests screen wrapper with scroll functionality
- **Section**: Tests content section grouping with titles
- **Stack**: Tests vertical layout with spacing
- **Inline**: Tests horizontal layout with alignment
- **Grid**: Tests responsive grid layout
- **Spacer**: Tests flexible spacing component
- **Center**: Tests content centering
- **Layout Scenarios**: Tests complex nested layouts
- **Error Handling**: Tests graceful error handling
- **Theme Integration**: Tests compatibility with all theme variants

### Test Utilities: `Layout.test.utils.tsx`
- **`renderWithTheme()`**: Wraps components with ThemeProvider for consistent theming
- **`renderWithThemeVariant()`**: Tests with specific theme variants
- **`MockChild`**: Mock component for testing layout behavior
- **`MockChildren`**: Multiple mock children for complex layouts
- **`TEST_DATA`**: Sample props for all Layout components
- **`SCREEN_SIZE_SCENARIOS`**: Responsive testing scenarios
- **`LAYOUT_SCENARIOS`**: Complex layout combinations
- **`mockDimensions()`**: Mock screen dimensions for responsive testing

## Key Features Tested

### Responsive Design
- ✅ Screen size detection (mobile, tablet, desktop)
- ✅ Responsive breakpoints (768px, 1024px)
- ✅ Adaptive column counts in Grid
- ✅ Responsive padding and spacing

### Layout Components
- ✅ **Container**: Max width, padding, safe area, background
- ✅ **Screen**: Scrollable/non-scrollable, responsive padding
- ✅ **Section**: Title/subtitle rendering, custom spacing
- ✅ **Stack**: Vertical spacing, alignment options
- ✅ **Inline**: Horizontal spacing, alignment, justification, wrapping
- ✅ **Grid**: Responsive columns, spacing, incomplete rows
- ✅ **Spacer**: Fixed spacing, numeric values, flex spacing
- ✅ **Center**: Content centering, min height

### Theme Integration
- ✅ All theme variants (modern, dark, warm, cool)
- ✅ Theme-specific spacing values
- ✅ Color and background customization
- ✅ Consistent theming across components

### Error Handling
- ✅ Graceful handling of empty/undefined children
- ✅ Invalid spacing values
- ✅ Single child in multi-child components
- ✅ Component stability under edge cases

## Test Scenarios

### Simple Layouts
```tsx
// Basic container with content
<Container>
  <MockChild />
</Container>

// Section with title and content
<Section title="Test Section">
  <MockChild />
</Section>
```

### Complex Nested Layouts
```tsx
// Multi-level layout composition
<Container>
  <Screen scrollable={false}>
    <Section title="Complex Layout">
      <Stack spacing="lg">
        <Inline justify="space-between">
          <MockChild>Left</MockChild>
          <MockChild>Right</MockChild>
        </Inline>
        <Grid columns={2}>
          <MockChildren count={4} />
        </Grid>
        <Center minHeight={100}>
          <MockChild>Centered Content</MockChild>
        </Center>
      </Stack>
    </Section>
  </Screen>
</Container>
```

## Responsive Testing

### Screen Size Scenarios
- **Mobile**: < 768px width
- **Tablet**: 768px - 1023px width  
- **Desktop**: ≥ 1024px width

### Responsive Behaviors Tested
- Grid column adaptation based on screen size
- Container max-width and padding adjustments
- Theme-specific responsive spacing values

## Accessibility Considerations

The tests include accessibility helpers for:
- Proper accessibility props validation
- Accessibility label verification
- Role-based element checking

## Usage Examples

### Running Tests
```bash
# Run all Layout tests
npm test Layout.test.tsx

# Run tests in watch mode
npm run test:watch Layout.test.tsx

# Run with coverage
npm run test:coverage Layout.test.tsx
```

### Test Utilities Usage
```tsx
import { 
  renderWithTheme, 
  MockChild, 
  TEST_DATA,
  mockDimensions 
} from './Layout.test.utils';

// Test responsive behavior
mockDimensions(375, 812); // Mobile
renderWithTheme(
  <Container>
    <MockChild />
  </Container>
);

// Test with predefined props
renderWithTheme(
  <Stack {...TEST_DATA.stack.withSpacing}>
    <MockChild />
  </Stack>
);
```

## Coverage Goals

The test suite aims for:
- **100% Component Coverage**: All Layout components tested
- **95%+ Line Coverage**: Comprehensive code path testing
- **All Responsive Breakpoints**: Mobile, tablet, desktop testing
- **All Theme Variants**: Modern, dark, warm, cool theme testing
- **Error Scenarios**: Edge cases and error handling

## Best Practices

### Test Organization
- Group tests by component and functionality
- Use descriptive test names that explain the scenario
- Test both positive and negative cases
- Include responsive and theme testing

### Mock Usage
- Use consistent mock components (`MockChild`, `MockChildren`)
- Mock external dependencies (Dimensions, router)
- Restore mocks after each test

### Assertions
- Test component rendering and behavior
- Verify theme integration
- Check responsive adaptations
- Validate error handling

## Future Enhancements

- **Performance Testing**: Add performance benchmarks for complex layouts
- **Visual Regression**: Add visual testing for layout consistency  
- **Animation Testing**: Test layout transitions and animations
- **Integration Testing**: Test with real content and data

This comprehensive test suite ensures the Layout components work reliably across all supported platforms, screen sizes, and theme configurations while maintaining consistency with the project's established testing patterns.
