# ProfileForm Test Suite Documentation

## Overview

This test suite provides comprehensive coverage for the `ProfileForm` component, following React Native testing best practices with Jest and React Native Testing Library. The suite emphasizes simplicity, maintainability, and real-world testing scenarios.

## Test Architecture

### 1. **Test File Structure**
```
ProfileForm/
├── __tests__/
│   ├── ProfileForm.test.tsx          # Main test file
│   ├── ProfileForm.test.utils.tsx    # Test utilities and helpers
│   └── ProfileForm.test.README.md    # This documentation
```

### 2. **Testing Strategy**

#### **Simplicity First Approach**
- **Minimal Mocking**: Only essential dependencies are mocked (API calls, React Native Alert)
- **Real Components**: Uses actual UI components instead of complex mocks
- **Provider Wrapping**: Uses real QueryClient and ThemeProvider for authentic testing environment
- **Type Safety**: Maintains TypeScript types throughout tests without resorting to `any`

#### **Test Categories**

1. **Rendering Tests**
   - Component renders without errors
   - Initial data population
   - Required field indicators
   - Form field presence

2. **Form Validation Tests**
   - Username validation (required, minimum length, character restrictions)
   - Website URL validation
   - Real-time error clearing
   - Error message display

3. **Form Submission Tests**
   - Successful submission flow
   - Error handling
   - Loading state management
   - Validation blocking submission

4. **Loading States**
   - Input field disabling during submission
   - Button state management
   - UI feedback during async operations

5. **Accessibility Tests**
   - Label associations
   - Error message accessibility
   - Form field accessibility

6. **Edge Cases**
   - Undefined callback handling
   - Empty field handling
   - Whitespace handling

## Test Utilities Design

### **MockUpdateProfileMutation Interface**
```typescript
interface MockUpdateProfileMutation {
  mutateAsync: jest.MockedFunction<(data: UpdateProfileDto) => Promise<any>>;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  data: any;
  reset: jest.MockedFunction<() => void>;
}
```

**Purpose**: Provides a typed mock that mirrors react-query's mutation interface without complex implementation details.

### **Provider Wrapper (renderWithProviders)**
```typescript
const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {component}
      </ThemeProvider>
    </QueryClientProvider>
  );
};
```

**Benefits**:
- Uses real providers instead of mocks
- Disables retries for predictable test behavior
- Maintains actual provider logic and context

### **Test Data Organization**

#### **MOCK_PROFILES**
Predefined profile data for different test scenarios:
- `validProfile`: Complete valid profile data
- `minimalProfile`: Minimum required data
- `invalidProfile`: Data that should fail validation
- `emptyProfile`: Empty form state

#### **VALIDATION_SCENARIOS**
Organized validation test cases:
- `validUsernames`: Array of valid username examples
- `invalidUsernames`: Array of invalid username examples  
- `validWebsites`: Array of valid website URL examples
- `invalidWebsites`: Array of invalid website URL examples

#### **FORM_INTERACTION_HELPERS**
Reusable functions for common form operations:
- `fillForm()`: Populate form fields with data
- `getFormInputs()`: Get all form input elements
- `clearForm()`: Clear all form fields
- `submitForm()`: Submit the form

## Key Testing Principles

### 1. **User-Centric Testing**
Tests interact with the form as a user would:
- Finding elements by placeholder text, labels, and button text
- Using fireEvent for user interactions
- Testing error messages as they appear to users

### 2. **Async Operation Handling**
Proper handling of asynchronous operations:
- Uses `waitFor()` for async state changes
- Tests both success and error scenarios
- Validates loading states and their effects

### 3. **Type Safety**
Maintains TypeScript type safety throughout:
- Typed mock interfaces
- Typed test data
- Explicit type annotations where needed
- No use of `any` types

### 4. **Realistic Mocking Strategy**
```typescript
// Mock only external dependencies
jest.mock('@/api/profile.api');
jest.mock('@/lib/api-utils');
jest.mock('react-native', () => ({
  ...jest.requireActual('react-native'),
  Alert: { alert: jest.fn() },
}));
```

**Philosophy**: Mock the minimum necessary to isolate the component while maintaining realistic behavior.

## Test Execution Flow

### **Setup Phase**
1. Clear all mocks before each test
2. Set up mock return values for hooks
3. Render component with providers

### **Interaction Phase**
1. Use helper functions to interact with form
2. Trigger user events (typing, button presses)
3. Wait for async state updates

### **Assertion Phase**
1. Verify expected UI states
2. Check mock function calls
3. Validate error handling
4. Confirm accessibility requirements

## Error Handling Testing

### **Validation Errors**
Tests cover all validation rules defined in `validationRules`:
- Required field validation
- Format validation (username characters, URL format)
- Length validation (minimum username length)

### **API Errors**
Tests simulate network and server errors:
- Network failures
- Server validation errors
- Timeout scenarios

### **User Experience**
Ensures good UX during error states:
- Error messages are clear and helpful
- Form remains usable after errors
- Loading states prevent double submissions

## Maintenance Guidelines

### **Adding New Tests**
1. Use existing test utilities and helpers
2. Follow the established test categories
3. Maintain type safety
4. Use descriptive test names that explain the scenario

### **Updating Test Data**
1. Update `MOCK_PROFILES` for new data scenarios
2. Add new validation cases to `VALIDATION_SCENARIOS`
3. Extend helper functions for new interactions

### **Best Practices**
1. **DRY Principle**: Use utilities to avoid repetitive code
2. **Clear Naming**: Test names should explain what is being tested
3. **Single Responsibility**: Each test should focus on one specific behavior
4. **Realistic Scenarios**: Test real user workflows and edge cases

## Running the Tests

```bash
# Run all tests
npm test

# Run ProfileForm tests specifically
npm test ProfileForm.test.tsx

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

## Coverage Goals

The test suite aims for comprehensive coverage of:
- ✅ **Component Rendering**: All render paths and prop combinations
- ✅ **User Interactions**: All form interactions and submissions
- ✅ **Validation Logic**: All validation rules and error states
- ✅ **Async Operations**: Loading states and error handling
- ✅ **Accessibility**: Screen reader compatibility and navigation
- ✅ **Edge Cases**: Boundary conditions and error scenarios

This approach ensures the ProfileForm component is robust, accessible, and provides a excellent user experience across all scenarios.
