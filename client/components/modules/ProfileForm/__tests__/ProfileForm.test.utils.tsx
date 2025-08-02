import React from 'react';
import { render } from '@testing-library/react-native';
import { fireEvent, screen } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/providers/themeProvider';
import { type UpdateProfileDto } from '@/api/profile.api';
import { type ProfileFormProps } from '../ProfileForm.interface';

// Type definitions for test props
export type ProfileFormTestProps = ProfileFormProps;

// Mock mutation interface to match react-query's useMutation return type
export interface MockUpdateProfileMutation {
  mutateAsync: jest.MockedFunction<(data: UpdateProfileDto) => Promise<any>>;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  data: any;
  reset: jest.MockedFunction<() => void>;
}

/**
 * Test utility for rendering components with all necessary providers
 * Provides QueryClient and ThemeProvider context
 */
export const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );

  return render(<TestWrapper>{component}</TestWrapper>);
};

/**
 * Factory function to create mock update profile mutation
 * Allows customization of mutation state for different test scenarios
 */
export const createMockUpdateProfileMutation = (
  overrides: Partial<MockUpdateProfileMutation> = {}
): MockUpdateProfileMutation => {
  return {
    mutateAsync: jest.fn().mockResolvedValue({}),
    isPending: false,
    isError: false,
    error: null,
    data: null,
    reset: jest.fn(),
    ...overrides,
  };
};

/**
 * Mock profile data for testing different scenarios
 */
export const MOCK_PROFILES = {
  validProfile: {
    username: 'testuser123',
    full_name: 'Test User',
    website: 'https://example.com',
  } as UpdateProfileDto,

  minimalProfile: {
    username: 'abc',
    full_name: '',
    website: '',
  } as UpdateProfileDto,

  invalidProfile: {
    username: 'ab', // Too short
    full_name: 'Test User',
    website: 'invalid-url',
  } as UpdateProfileDto,

  emptyProfile: {
    username: '',
    full_name: '',
    website: '',
  } as UpdateProfileDto,
} as const;

/**
 * Validation test scenarios for different field combinations
 */
export const VALIDATION_SCENARIOS = {
  validUsernames: [
    'user123',
    'test_user',
    'UPPERCASE',
    'mixed_Case123',
    'a1b2c3',
  ] as const,

  invalidUsernames: [
    'ab', // Too short
    '', // Empty
    'user-name', // Invalid character
    'user name', // Space
    'user@name', // Special character
    'user.name', // Dot
  ] as const,

  validWebsites: [
    'https://example.com',
    'http://test.org',
    'https://subdomain.example.com',
    'https://example.com/path',
    'http://localhost:3000',
    '', // Empty is valid
  ] as const,

  invalidWebsites: [
    'invalid-url',
    'ftp://example.com',
    'example.com',
    'www.example.com',
    'https://',
    'http://',
  ] as const,
} as const;

/**
 * Helper functions for common form interactions
 * Encapsulates repetitive test actions for better maintainability
 */
export const FORM_INTERACTION_HELPERS = {
  /**
   * Fill form fields with provided data
   */
  fillForm: (data: Partial<UpdateProfileDto>) => {
    if (data.username !== undefined) {
      const usernameInput = screen.getByPlaceholderText('Enter your username');
      fireEvent.changeText(usernameInput, data.username);
    }

    if (data.full_name !== undefined) {
      const fullNameInput = screen.getByPlaceholderText('Enter your full name');
      fireEvent.changeText(fullNameInput, data.full_name);
    }

    if (data.website !== undefined) {
      const websiteInput = screen.getByPlaceholderText('https://your-website.com');
      fireEvent.changeText(websiteInput, data.website);
    }
  },

  /**
   * Get all form input elements
   */
  getFormInputs: () => ({
    username: screen.getByPlaceholderText('Enter your username'),
    fullName: screen.getByPlaceholderText('Enter your full name'),
    website: screen.getByPlaceholderText('https://your-website.com'),
    submitButton: screen.getByText('Update Profile'),
  }),

  /**
   * Clear all form fields
   */
  clearForm: () => {
    const inputs = FORM_INTERACTION_HELPERS.getFormInputs();
    fireEvent.changeText(inputs.username, '');
    fireEvent.changeText(inputs.fullName, '');
    fireEvent.changeText(inputs.website, '');
  },

  /**
   * Submit the form
   */
  submitForm: () => {
    const submitButton = screen.getByText('Update Profile');
    fireEvent.press(submitButton);
  },
} as const;

/**
 * Assertion helpers for common test expectations
 */
export const ASSERTION_HELPERS = {
  /**
   * Check if form fields are disabled
   */
  expectFormToBeDisabled: () => {
    const inputs = FORM_INTERACTION_HELPERS.getFormInputs();
    expect(inputs.username).toBeDisabled();
    expect(inputs.fullName).toBeDisabled();
    expect(inputs.website).toBeDisabled();
    expect(inputs.submitButton).toBeDisabled();
  },

  /**
   * Check if form fields are enabled
   */
  expectFormToBeEnabled: () => {
    const inputs = FORM_INTERACTION_HELPERS.getFormInputs();
    expect(inputs.username).not.toBeDisabled();
    expect(inputs.fullName).not.toBeDisabled();
    expect(inputs.website).not.toBeDisabled();
    expect(inputs.submitButton).not.toBeDisabled();
  },

  /**
   * Check if specific validation error is displayed
   */
  expectValidationError: (errorMessage: string) => {
    expect(screen.getByText(errorMessage)).toBeTruthy();
  },

  /**
   * Check if specific validation error is not displayed
   */
  expectNoValidationError: (errorMessage: string) => {
    expect(screen.queryByText(errorMessage)).toBeNull();
  },

  /**
   * Check if form has values
   */
  expectFormValues: (expectedData: Partial<UpdateProfileDto>) => {
    if (expectedData.username !== undefined) {
      expect(screen.getByDisplayValue(expectedData.username)).toBeTruthy();
    }
    if (expectedData.full_name !== undefined) {
      expect(screen.getByDisplayValue(expectedData.full_name)).toBeTruthy();
    }
    if (expectedData.website !== undefined) {
      expect(screen.getByDisplayValue(expectedData.website)).toBeTruthy();
    }
  },
} as const;

/**
 * Test data for error scenarios
 */
export const ERROR_SCENARIOS = {
  networkError: new Error('Network request failed'),
  validationError: new Error('Validation failed'),
  serverError: new Error('Internal server error'),
  timeoutError: new Error('Request timeout'),
} as const;

/**
 * Expected validation messages from the component
 */
export const EXPECTED_VALIDATION_MESSAGES = {
  USERNAME_REQUIRED: 'Username is required',
  USERNAME_TOO_SHORT: 'Username must be at least 3 characters long',
  USERNAME_INVALID_CHARS: 'Username can only contain letters, numbers, and underscores',
  WEBSITE_INVALID_URL: 'Website must be a valid URL starting with http:// or https://',
} as const;
