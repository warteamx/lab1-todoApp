# Testing Guide

This document provides comprehensive information about testing strategies, tools, and best practices for the Expo Lab client application.

## Table of Contents

- [Overview](#overview)
- [Testing Stack](#testing-stack)
- [Test Structure](#test-structure)
- [Testing Commands](#testing-commands)
- [Unit Testing](#unit-testing)
- [Component Testing](#component-testing)
- [Integration Testing](#integration-testing)
- [E2E Testing](#e2e-testing)
- [Testing Utilities](#testing-utilities)
- [Best Practices](#best-practices)
- [Coverage Reports](#coverage-reports)
- [CI/CD Integration](#cicd-integration)

## Overview

The Expo Lab client implements a comprehensive testing strategy with multiple layers:

- **Unit Tests**: Individual functions, hooks, and utilities
- **Component Tests**: React Native component behavior
- **Integration Tests**: Component interactions and data flow
- **E2E Tests**: Complete user workflows (planned)

## Testing Stack

### Core Testing Framework

- **Jest 29.7.0**: JavaScript testing framework
- **Jest Expo**: Expo-specific Jest configuration
- **React Native Testing Library**: Component testing utilities

### Additional Tools

- **TypeScript**: Type safety in tests
- **ESLint**: Code quality and consistency
- **Coverage Reports**: Istanbul-based coverage analysis

## Test Structure

### File Naming Conventions

```
ComponentName/
├── ComponentName.tsx
└── __tests__/
    ├── ComponentName.test.tsx      # Component tests
    ├── ComponentName.unit.test.tsx # Unit tests (if complex logic)
    └── ComponentName.e2e.test.tsx  # E2E tests (if applicable)
```

### Test File Patterns

Jest configuration automatically discovers tests matching:

- `**/__tests__/**/*.test.{js,jsx,ts,tsx}`
- `**/?(*.)+(spec|test).{js,jsx,ts,tsx}`

### Excluded Patterns

- `*.skip.*`: Temporarily disabled tests
- `*.utils.*`: Test utilities and helpers
- `*.helper.*`: Test helper functions

## Testing Commands

### Development Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests in CI mode
npm run test:ci

# Run specific test file
npm test ComponentName.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="should render"
```

### Coverage Commands

```bash
# Generate coverage report
npm run test:coverage

# View coverage in browser
open coverage/lcov-report/index.html
```

## Unit Testing

### Testing Custom Hooks

```tsx
// hooks/__tests__/useFormValidation.test.ts
import { renderHook, act } from '@testing-library/react-native';
import { useFormValidation } from '../useFormValidation';

describe('useFormValidation', () => {
  const validationRules = {
    username: {
      required: true,
      minLength: 3,
      pattern: /^[a-zA-Z0-9_]+$/,
    },
  };

  it('should validate required fields', () => {
    const { result } = renderHook(() => useFormValidation(validationRules));

    act(() => {
      result.current.validate('username', '');
    });

    expect(result.current.errors.username).toBe('Username is required');
  });

  it('should validate minimum length', () => {
    const { result } = renderHook(() => useFormValidation(validationRules));

    act(() => {
      result.current.validate('username', 'ab');
    });

    expect(result.current.errors.username).toBe(
      'Username must be at least 3 characters'
    );
  });

  it('should clear errors for valid input', () => {
    const { result } = renderHook(() => useFormValidation(validationRules));

    act(() => {
      result.current.validate('username', 'validuser');
    });

    expect(result.current.errors.username).toBeUndefined();
  });
});
```

### Testing Utility Functions

```tsx
// lib/__tests__/api-utils.test.ts
import { formatApiError, createApiClient } from '../api-utils';

describe('api-utils', () => {
  describe('formatApiError', () => {
    it('should format network errors', () => {
      const error = new Error('Network Error');
      const formatted = formatApiError(error);

      expect(formatted).toEqual({
        message: 'Network connection failed',
        type: 'network',
      });
    });

    it('should format API response errors', () => {
      const error = {
        response: {
          status: 400,
          data: { message: 'Invalid input' },
        },
      };

      const formatted = formatApiError(error);

      expect(formatted).toEqual({
        message: 'Invalid input',
        type: 'validation',
        statusCode: 400,
      });
    });
  });
});
```

## Component Testing

### Basic Component Tests

```tsx
// components/ui/Button/__tests__/Button.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';
import { ThemeProvider } from '@/providers/themeProvider';

// Test wrapper with providers
const renderWithProviders = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Button', () => {
  it('should render with title', () => {
    const { getByText } = renderWithProviders(
      <Button title="Test Button" onPress={() => {}} />
    );

    expect(getByText('Test Button')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = renderWithProviders(
      <Button title="Test Button" onPress={onPressMock} />
    );

    fireEvent.press(getByText('Test Button'));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    const onPressMock = jest.fn();
    const { getByText } = renderWithProviders(
      <Button title="Test Button" onPress={onPressMock} disabled />
    );

    const button = getByText('Test Button').parent;

    expect(button).toHaveStyle({ opacity: 0.5 });

    fireEvent.press(getByText('Test Button'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('should render different variants', () => {
    const { getByTestId } = renderWithProviders(
      <Button
        title="Primary"
        variant="primary"
        onPress={() => {}}
        testID="primary-button"
      />
    );

    const button = getByTestId('primary-button');

    expect(button).toHaveStyle({
      backgroundColor: expect.any(String),
    });
  });
});
```

### Component with State Tests

```tsx
// components/modules/ProfileForm/__tests__/ProfileForm.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ProfileForm } from '../ProfileForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/providers/themeProvider';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{component}</ThemeProvider>
    </QueryClientProvider>
  );
};

describe('ProfileForm', () => {
  const mockProfileData = {
    id: '1',
    username: 'testuser',
    full_name: 'Test User',
    website: 'https://example.com',
  };

  it('should render form with initial data', () => {
    const { getByDisplayValue } = renderWithProviders(
      <ProfileForm initialData={mockProfileData} onSuccess={() => {}} />
    );

    expect(getByDisplayValue('testuser')).toBeTruthy();
    expect(getByDisplayValue('Test User')).toBeTruthy();
    expect(getByDisplayValue('https://example.com')).toBeTruthy();
  });

  it('should validate username field', async () => {
    const { getByPlaceholderText, getByText } = renderWithProviders(
      <ProfileForm onSuccess={() => {}} />
    );

    const usernameInput = getByPlaceholderText('Enter username');

    fireEvent.changeText(usernameInput, 'ab'); // Too short
    fireEvent(usernameInput, 'blur');

    await waitFor(() => {
      expect(getByText('Username must be at least 3 characters')).toBeTruthy();
    });
  });

  it('should submit form with valid data', async () => {
    const onSuccessMock = jest.fn();
    const { getByPlaceholderText, getByText } = renderWithProviders(
      <ProfileForm onSuccess={onSuccessMock} />
    );

    const usernameInput = getByPlaceholderText('Enter username');
    const submitButton = getByText('Save Profile');

    fireEvent.changeText(usernameInput, 'validuser');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(onSuccessMock).toHaveBeenCalled();
    });
  });
});
```

## Integration Testing

### API Integration Tests

```tsx
// api/__tests__/profile.api.test.tsx
import React from 'react';
import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProfile, useUpdateProfile } from '../profile.api';

// Mock API calls
jest.mock('../lib/api-utils', () => ({
  apiClient: {
    get: jest.fn(),
    put: jest.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('Profile API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useProfile', () => {
    it('should fetch profile data', async () => {
      const mockProfile = {
        id: '1',
        username: 'testuser',
        full_name: 'Test User',
      };

      require('../lib/api-utils').apiClient.get.mockResolvedValue({
        data: mockProfile,
      });

      const { result } = renderHook(() => useProfile(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockProfile);
    });
  });

  describe('useUpdateProfile', () => {
    it('should update profile data', async () => {
      const updatedProfile = {
        username: 'updateduser',
        full_name: 'Updated User',
      };

      require('../lib/api-utils').apiClient.put.mockResolvedValue({
        data: updatedProfile,
      });

      const { result } = renderHook(() => useUpdateProfile(), {
        wrapper: createWrapper(),
      });

      result.current.mutate(updatedProfile);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(updatedProfile);
    });
  });
});
```

## E2E Testing

### E2E Test Setup (Future Implementation)

```tsx
// e2e/__tests__/profile-flow.e2e.test.tsx
import { by, device, element, expect } from 'detox';

describe('Profile Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should complete profile update flow', async () => {
    // Navigate to profile screen
    await element(by.id('profile-tab')).tap();

    // Edit username
    await element(by.id('username-input')).clearText();
    await element(by.id('username-input')).typeText('newusername');

    // Save changes
    await element(by.id('save-button')).tap();

    // Verify success message
    await expect(
      element(by.text('Profile updated successfully'))
    ).toBeVisible();
  });
});
```

## Testing Utilities

### Custom Test Utilities

```tsx
// __tests__/utils/test-utils.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/providers/themeProvider';

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

export const AllTheProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};

export const renderWithProviders = (ui: React.ReactElement, options = {}) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

// Mock navigation
export const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setOptions: jest.fn(),
  addListener: jest.fn(() => jest.fn()),
};

// Mock route
export const mockRoute = {
  params: {},
  key: 'test-key',
  name: 'test-screen',
};
```

### Mock Factories

```tsx
// __tests__/utils/mock-factories.ts
export const createMockProfile = (overrides = {}) => ({
  id: '1',
  username: 'testuser',
  full_name: 'Test User',
  website: 'https://example.com',
  avatar_url: 'https://example.com/avatar.jpg',
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2023-01-01T00:00:00Z',
  ...overrides,
});

export const createMockApiError = (status = 400, message = 'Bad Request') => ({
  response: {
    status,
    data: { message },
  },
});
```

## Best Practices

### Writing Effective Tests

1. **Test Behavior, Not Implementation**

   ```tsx
   // ❌ Testing implementation details
   expect(component.state.isLoading).toBe(true);

   // ✅ Testing user-visible behavior
   expect(getByText('Loading...')).toBeTruthy();
   ```

2. **Use Descriptive Test Names**

   ```tsx
   // ❌ Vague test name
   it('should work', () => {});

   // ✅ Descriptive test name
   it('should display error message when username is too short', () => {});
   ```

3. **Arrange, Act, Assert Pattern**
   ```tsx
   it('should update username when valid input is provided', () => {
     // Arrange
     const onChangeMock = jest.fn();
     const { getByPlaceholderText } = render(
       <UsernameInput onChange={onChangeMock} />
     );

     // Act
     fireEvent.changeText(getByPlaceholderText('Username'), 'newuser');

     // Assert
     expect(onChangeMock).toHaveBeenCalledWith('newuser');
   });
   ```

### Test Organization

1. **Group Related Tests**

   ```tsx
   describe('ProfileForm', () => {
     describe('validation', () => {
       it('should validate username');
       it('should validate email');
     });

     describe('submission', () => {
       it('should submit valid form');
       it('should handle submission errors');
     });
   });
   ```

2. **Use Setup and Teardown**
   ```tsx
   describe('API tests', () => {
     beforeEach(() => {
       jest.clearAllMocks();
     });

     afterEach(() => {
       cleanup();
     });
   });
   ```

### Mocking Guidelines

1. **Mock External Dependencies**

   ```tsx
   jest.mock('@react-native-async-storage/async-storage', () => ({
     getItem: jest.fn(),
     setItem: jest.fn(),
     removeItem: jest.fn(),
   }));
   ```

2. **Mock API Calls**
   ```tsx
   jest.mock('../lib/api-utils', () => ({
     apiClient: {
       get: jest.fn(),
       post: jest.fn(),
       put: jest.fn(),
       delete: jest.fn(),
     },
   }));
   ```

## Coverage Reports

### Coverage Configuration

Jest configuration in `package.json`:

```json
{
  "jest": {
    "collectCoverage": true,
    "collectCoverageFrom": [
      "**/*.{ts,tsx}",
      "!**/node_modules/**",
      "!**/coverage/**",
      "!**/*.d.ts",
      "!**/index.ts"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

### Coverage Reports

```bash
# Generate coverage report
npm run test:coverage

# Coverage files generated:
coverage/
├── clover.xml           # Clover format
├── coverage-final.json  # JSON format
├── lcov.info           # LCOV format
└── lcov-report/        # HTML report
    └── index.html
```

### Coverage Metrics

- **Lines**: Percentage of executed lines
- **Functions**: Percentage of called functions
- **Branches**: Percentage of executed branches
- **Statements**: Percentage of executed statements

## CI/CD Integration

### GitHub Actions Configuration

```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci
        working-directory: ./client

      - name: Run tests
        run: npm run test:ci
        working-directory: ./client

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./client/coverage/lcov.info
```

### Pre-commit Hooks

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "npm run lint:fix",
      "npm run test -- --findRelatedTests",
      "git add"
    ]
  }
}
```

This testing strategy ensures code quality, prevents regressions, and maintains confidence in the application's functionality across all platforms.
