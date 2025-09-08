# Architecture Guide

This document outlines the architecture, design patterns, and folder structure of the Expo Lab client application.

## Table of Contents

- [Overview](#overview)
- [Folder Structure](#folder-structure)
- [Architecture Patterns](#architecture-patterns)
- [Core Technologies](#core-technologies)
- [Components Architecture](#components-architecture)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Routing](#routing)
- [Styling & Theming](#styling--theming)
- [Best Practices](#best-practices)

## Overview

The Expo Lab client is built using **Clean Architecture** principles with a focus on:

- **Separation of Concerns**: Clear boundaries between UI, business logic, and data layers
- **Modularity**: Reusable components and utilities
- **Type Safety**: Full TypeScript integration
- **Testability**: Comprehensive testing setup with Jest and React Native Testing Library
- **Cross-Platform**: Single codebase for iOS, Android, and Web

## Folder Structure

```
client/
├── api/                        # API layer & TanStack Query hooks
│   ├── profile.api.ts         # Profile-related API calls
│   └── todo.api.ts            # Todo-related API calls
├── app/                       # File-based routing (Expo Router)
│   ├── _layout.tsx           # Root layout with providers
│   ├── index.tsx             # Landing/home screen
│   ├── (auth)/               # Authentication group
│   │   ├── _layout.tsx       # Auth layout
│   │   ├── sign-in.tsx       # Sign in screen
│   │   └── sign-up.tsx       # Sign up screen
│   └── (user)/               # Protected user group
│       ├── _layout.tsx       # User layout
│       ├── index.tsx         # User dashboard
│       ├── profile/          # Profile screens
│       ├── todo/             # Todo screens
│       ├── ui-demo/          # UI component demos
│       └── vr/               # VR/AR features
├── assets/                   # Static assets
│   ├── fonts/               # Custom fonts
│   └── images/              # Images and icons
├── components/              # Reusable UI components
│   ├── index.ts            # Barrel exports
│   ├── modules/            # Feature-specific components
│   │   ├── AvatarUpload/   # Avatar upload module
│   │   └── ProfileForm/    # Profile form module
│   └── ui/                 # Base UI components
│       ├── index.ts        # UI barrel exports
│       ├── Button/         # Button component
│       ├── Card/           # Card component
│       ├── Header/         # Header component
│       ├── Input/          # Input component
│       ├── Layout/         # Layout component
│       ├── Text/           # Text component
│       └── View/           # View component
├── constants/              # Application constants
│   ├── api.ts             # API endpoints and config
│   └── colors.ts          # Color constants
├── hooks/                 # Custom React hooks
│   └── useFormValidation.ts # Form validation hook
├── lib/                  # Utility libraries
│   ├── api-utils.ts      # API utility functions
│   └── supabase.ts       # Supabase client configuration
├── providers/            # React Context providers
│   ├── index.tsx         # Provider composition
│   ├── authProvider.tsx  # Authentication provider
│   ├── queryProvider.tsx # TanStack Query provider
│   └── themeProvider.tsx # Theme provider
├── themes/               # Design system
│   ├── index.ts          # Theme exports
│   ├── colors.ts         # Color palette
│   ├── shadows.ts        # Shadow definitions
│   ├── spacing.ts        # Spacing scale
│   ├── themes.ts         # Theme configuration
│   └── typography.ts     # Typography scale
└── docs/                 # Documentation
    ├── INSTALLATION.md   # Installation guide
    ├── ARCHITECTURE.md   # This file
    ├── TESTING.md        # Testing guide
    └── README-client.md  # Client-specific README
```

## Architecture Patterns

### Clean Architecture Layers

#### 1. Presentation Layer (`components/`, `app/`)

- **UI Components**: Reusable, stateless components
- **Screens**: Feature-specific screens with business logic
- **Layouts**: Shared layout components

#### 2. Application Layer (`hooks/`, `providers/`)

- **Custom Hooks**: Encapsulated business logic
- **Context Providers**: Global state management
- **Form Validation**: Input validation logic

#### 3. Infrastructure Layer (`api/`, `lib/`)

- **API Integration**: HTTP clients and TanStack Query hooks
- **External Services**: Third-party service integrations
- **Utilities**: Helper functions and configurations

#### 4. Domain Layer (`constants/`, `themes/`)

- **Business Rules**: Application constants and configurations
- **Design System**: Theme and styling definitions

### Component Architecture

```
Component Structure:
├── ComponentName/
│   ├── ComponentName.tsx       # Main component
│   ├── ComponentName.types.ts  # TypeScript types
│   ├── ComponentName.styles.ts # Styles (if needed)
│   ├── index.ts               # Barrel export
│   └── __tests__/             # Tests
│       └── ComponentName.test.tsx
```

## Core Technologies

### Runtime & Framework

- **React Native 0.79.2**: Cross-platform mobile framework
- **Expo SDK 53**: Development platform and tools
- **React 19.0.0**: UI library
- **TypeScript 5.8.3**: Type safety and developer experience

### Routing & Navigation

- **Expo Router 5.0.6**: File-based routing system
- **React Navigation**: Navigation library integration

### State Management

- **TanStack Query 5.83.0**: Server state management
- **React Context**: Local state management
- **Async Storage**: Persistent storage

### Styling & UI

- **Custom Design System**: Consistent theming
- **Responsive Design**: Cross-platform layouts
- **Dark/Light Mode**: Theme switching

### Authentication & Data

- **Supabase**: Authentication and database
- **Expo Auth Session**: OAuth integration
- **Expo Secure Store**: Secure token storage

## Components Architecture

### Base UI Components (`components/ui/`)

#### Design Principles

1. **Composable**: Components can be combined to create complex UIs
2. **Themeable**: Consistent with design system
3. **Accessible**: WCAG compliance
4. **Cross-Platform**: Works on iOS, Android, and Web

#### Component Pattern Example

```tsx
// components/ui/Button/Button.tsx
interface ButtonProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function Button({
  title,
  variant = 'primary',
  size = 'medium',
  ...props
}: ButtonProps) {
  const theme = useTheme();
  const styles = createButtonStyles(theme, variant, size);

  return (
    <Pressable style={styles.container} {...props}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}
```

### Module Components (`components/modules/`)

Feature-specific components with complex business logic:

- **AvatarUpload**: Handles image selection and upload
- **ProfileForm**: Manages profile data editing
- **TodoList**: Todo management functionality

## State Management

### Global State (React Context)

#### Authentication State

```tsx
// providers/authProvider.tsx
const AuthContext = createContext<{
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}>({});
```

#### Theme State

```tsx
// providers/themeProvider.tsx
const ThemeContext = createContext<{
  themeVariant: 'light' | 'dark';
  theme: Theme;
  toggleDarkMode: () => void;
}>({});
```

### Server State (TanStack Query)

#### Query Hooks Pattern

```tsx
// api/profile.api.ts
export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}
```

## API Integration

### API Layer Structure

```tsx
// lib/api-utils.ts
export const apiClient = axios.create({
  baseURL: Constants.expoConfig?.extra?.apiUrl,
  timeout: 10000,
});

// Interceptors for auth, error handling, etc.
```

### TanStack Query Integration

- **Queries**: Data fetching with caching
- **Mutations**: Data updates with optimistic updates
- **Cache Management**: Automatic invalidation and synchronization

## Routing

### File-Based Routing (Expo Router)

```
app/
├── _layout.tsx          # Root layout
├── index.tsx            # Home screen (/)
├── (auth)/              # Auth group
│   ├── _layout.tsx      # Auth layout
│   ├── sign-in.tsx      # /sign-in
│   └── sign-up.tsx      # /sign-up
└── (user)/              # Protected group
    ├── _layout.tsx      # User layout
    ├── index.tsx        # /user
    └── profile/         # /user/profile
        └── index.tsx
```

### Navigation Patterns

#### Route Groups

- `(auth)`: Authentication-related screens
- `(user)`: Protected user screens

#### Layout Nesting

- Root layout: App providers and global UI
- Group layouts: Specific navigation and authentication

## Styling & Theming

### Design System Structure

```tsx
// themes/themes.ts
export const lightTheme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    // ...
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    h1: { fontSize: 32, fontWeight: 'bold' },
    body: { fontSize: 16, fontWeight: 'normal' },
    // ...
  },
};
```

### Theme Usage

```tsx
function ThemedComponent() {
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        padding: theme.spacing.md,
      }}
    >
      <Text style={theme.typography.body}>Themed content</Text>
    </View>
  );
}
```

## Best Practices

### Code Organization

1. **Barrel Exports**: Use `index.ts` files for clean imports
2. **Type Safety**: Define interfaces for all props and data
3. **Error Boundaries**: Implement error handling at component level
4. **Performance**: Use React.memo and useMemo when appropriate

### Component Guidelines

1. **Single Responsibility**: Each component has one clear purpose
2. **Composition over Inheritance**: Build complex UIs by combining simple components
3. **Props Interface**: Well-defined TypeScript interfaces
4. **Default Props**: Sensible defaults for optional props

### State Management Guidelines

1. **Local First**: Use local state when possible
2. **Context for Global**: Use Context for truly global state
3. **Server State**: Use TanStack Query for server data
4. **Immutability**: Always update state immutably

### File Naming Conventions

- **Components**: PascalCase (`Button.tsx`)
- **Hooks**: camelCase with "use" prefix (`useFormValidation.ts`)
- **Utilities**: camelCase (`api-utils.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS`)

### Testing Strategy

- **Unit Tests**: Test individual components and hooks
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user flows
- **Snapshot Tests**: Prevent unintended UI changes

This architecture ensures maintainability, scalability, and developer productivity while following React Native and Expo best practices.
