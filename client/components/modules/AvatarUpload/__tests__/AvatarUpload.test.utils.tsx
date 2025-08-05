import React from 'react';
import { render } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DEFAULT_AVATAR_URL } from '@/constants/api';

// Mock Platform before other imports
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: jest.fn((obj) => obj.ios || obj.native || obj.default),
}));

// Mock ThemeProvider and AuthProvider to avoid complex dependencies
jest.mock('@/providers/themeProvider', () => ({
  useTheme: () => ({
    theme: {
      colors: {
        primary500: '#007AFF',
        neutral100: '#F5F5F5',
        surface: '#FFFFFF',
        textOnPrimary: '#FFFFFF',
        textSecondary: '#666666',
        textTertiary: '#999999',
      },
      spacing: {
        xs: 4,
        sm: 8,
        lg: 16,
      },
      shadows: {
        sm: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 2,
        },
      },
    },
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/providers/authProvider', () => ({
  useAuth: () => ({
    session: {
      access_token: 'mock-token',
      user: { id: 'mock-user-id' },
    },
  }),
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock custom UI components
jest.mock('@/components/ui', () => ({
  View: ({ children, ...props }: any) => (
    <div {...props} data-testid="mock-view">
      {children}
    </div>
  ),
  Text: ({ children, ...props }: any) => (
    <span {...props} data-testid="mock-text">
      {children}
    </span>
  ),
}));

// Export the mock for use in tests
export { mockUploadAvatarMutation };

// Mock the profile API module
const mockUploadAvatarMutation = {
  mutateAsync: jest.fn(),
  isPending: false,
  reset: jest.fn(() => {
    mockUploadAvatarMutation.mutateAsync.mockClear();
    mockUploadAvatarMutation.isPending = false;
  }),
};

jest.mock('@/api/profile.api', () => ({
  useUploadAvatar: () => mockUploadAvatarMutation,
}));

// Mock the auth provider
jest.mock('@/providers/authProvider', () => ({
  useAuth: () => ({
    session: {
      access_token: 'mock-token',
      user: { id: 'mock-user-id' },
    },
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock custom UI components
jest.mock('@/components/ui', () => ({
  View: ({ children, ...props }: any) => (
    <div {...props} data-testid="mock-view">
      {children}
    </div>
  ),
  Text: ({ children, ...props }: any) => (
    <span {...props} data-testid="mock-text">
      {children}
    </span>
  ),
}));

/**
 * Test data and mock responses
 */
export const TEST_DATA = {
  validImageTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  invalidImageTypes: ['text/plain', 'application/pdf', 'video/mp4'],
  maxFileSize: 5 * 1024 * 1024, // 5MB
  avatarUrls: {
    default: DEFAULT_AVATAR_URL,
    custom: 'https://example.com/custom-avatar.jpg',
    uploaded: 'https://example.com/new-avatar.jpg',
  },
};

export const MOCK_RESPONSES = {
  successfulUpload: {
    avatar_url: TEST_DATA.avatarUrls.uploaded,
  },
  uploadError: {
    message: 'Upload failed',
    status: 500,
  },
};

/**
 * Creates a mock File object for testing web file uploads
 */
export const createMockFile = (
  name: string,
  type: string,
  size: number
): File => {
  const file = new File(['mock content'], name, { type });

  // Mock the size property since jsdom doesn't set it automatically
  Object.defineProperty(file, 'size', {
    value: size,
    writable: false,
  });

  return file;
};

/**
 * Creates a mock ImagePicker result for testing native image selection
 */
export const createMockImagePickerResult = () => ({
  canceled: false,
  assets: [
    {
      uri: 'file://mock-image.jpg',
      width: 1000,
      height: 1000,
      type: 'image',
      fileName: 'mock-image.jpg',
      fileSize: 1024,
    },
  ],
});

/**
 * Creates a mock blob for testing native image uploads
 */
export const createMockBlob = (type: string = 'image/jpeg') => {
  return new Blob(['mock image data'], { type });
};

/**
 * Renders component with all necessary providers for testing
 * This ensures the component has access to theme, auth, and query context
 */
export const renderWithProviders = (component: React.ReactElement) => {
  // Create a fresh QueryClient for each test to avoid state pollution
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries in tests
      },
      mutations: {
        retry: false, // Disable retries in tests
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

/**
 * Mock fetch for testing web uploads
 */
export const mockFetch = (response: any, ok: boolean = true) => {
  (global as any).fetch = jest.fn(() =>
    Promise.resolve({
      ok,
      json: () => Promise.resolve(response),
      blob: () => Promise.resolve(createMockBlob()),
    })
  );
};

/**
 * Mock window File API support
 */
export const mockFileApiSupport = (supported: boolean = true) => {
  if (supported) {
    (global as any).window = {
      ...global.window,
      File: File,
      FileReader: FileReader,
      FileList: FileList,
      Blob: Blob,
    };
  } else {
    delete (global as any).window.File;
    delete (global as any).window.FileReader;
    delete (global as any).window.FileList;
    delete (global as any).window.Blob;
  }
};

/**
 * Mock HTML input element for web file selection testing
 */
export const mockHTMLInputElement = () => {
  const mockClick = jest.fn();
  const mockElement = {
    click: mockClick,
    value: '',
    files: null,
  };

  (global as any).HTMLInputElement = jest.fn(() => mockElement);

  return { mockClick, mockElement };
};

/**
 * Test scenarios for permission handling
 */
export const PERMISSION_SCENARIOS = {
  granted: {
    status: 'granted' as const,
    granted: true,
    canAskAgain: true,
    expires: 'never' as const,
  },
  denied: {
    status: 'denied' as const,
    granted: false,
    canAskAgain: true,
    expires: 'never' as const,
  },
  undetermined: {
    status: 'undetermined' as const,
    granted: false,
    canAskAgain: true,
    expires: 'never' as const,
  },
};

/**
 * Helper to create accessibility test assertions
 */
export const ACCESSIBILITY_HELPERS = {
  expectAccessibleButton: (element: any) => {
    expect(element).toHaveProp('accessible', true);
    expect(element).toHaveProp('accessibilityRole', 'button');
    expect(element).toHaveProp('accessibilityLabel');
  },

  expectAccessibleImage: (element: any, label: string) => {
    expect(element).toHaveProp('accessible', true);
    expect(element).toHaveProp('accessibilityLabel', label);
  },

  expectDisabledState: (element: any, disabled: boolean) => {
    expect(element).toHaveProp('accessibilityState', { disabled });
  },
};
