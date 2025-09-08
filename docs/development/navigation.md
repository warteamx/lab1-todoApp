# Navigation Documentation

## Overview

The Todo App uses Expo Router with a well-structured navigation system that works consistently across web, mobile (iOS/Android), and desktop platforms. The navigation architecture follows a hierarchical structure with custom headers and theming support.

## Navigation Architecture

### 1. Root Layout (`app/_layout.tsx`)

The root layout provides the base navigation structure and wraps the entire app with necessary providers:

- **AppProviders**: Provides authentication, theme, and query contexts
- **Stack Navigation**: Manages the main app routes
- **Custom Headers**: Uses `NavigationHeader` component for consistent styling

### 2. Route Structure

```
app/
├── _layout.tsx                 # Root layout with providers and stack navigation
├── index.tsx                   # Home/Landing page (redirects based on auth)
├── (auth)/                     # Authentication group routes
│   ├── _layout.tsx            # Auth stack navigation
│   ├── sign-in.tsx            # Sign in screen
│   └── sign-up.tsx            # Sign up screen
└── (user)/                     # Protected user routes
    ├── _layout.tsx            # Tab navigation for authenticated users
    ├── index.tsx              # User dashboard (hidden tab)
    ├── todo/                  # Todo management
    │   ├── _layout.tsx        # Todo stack navigation
    │   ├── index.tsx          # Todo list
    │   ├── newTodo.tsx        # Create new todo
    │   └── [id].tsx           # Edit existing todo
    ├── profile/               # User profile
    │   ├── _layout.tsx        # Profile stack navigation
    │   ├── profile.tsx        # Profile view
    │   └── edit.tsx           # Edit profile
    ├── ui-demo/               # UI component demonstration
    │   ├── _layout.tsx        # UI Demo stack navigation
    │   └── ui-demo.tsx        # UI components showcase
    └── vr/                    # VR experience
        ├── _layout.tsx        # VR stack navigation
        └── index.tsx          # VR main screen
```

## Navigation Components

### NavigationHeader Component

The `NavigationHeader` component provides a consistent header across all screens with the following features:

#### Features:

- **Responsive Design**: Works on web, mobile, and desktop
- **Theme Integration**: Automatically adapts to current theme (dark/light mode)
- **Authentication Status**: Shows login status and sign-out functionality
- **Theme Controls**: Toggle between dark/light mode and theme variants
- **Back Navigation**: Intelligent back button that only appears when navigation is possible
- **Custom Actions**: Support for additional action buttons per screen

#### Props:

```typescript
interface NavigationHeaderProps {
  title?: string; // Main header title
  subtitle?: string; // Optional subtitle
  showBack?: boolean; // Show/hide back button (default: true)
  showThemeToggle?: boolean; // Show/hide theme controls (default: true)
  showAuth?: boolean; // Show/hide auth status (default: true)
  customActions?: React.ReactNode[]; // Additional action buttons
  style?: ViewStyle; // Custom styling
}
```

#### Usage Examples:

```tsx
// Basic header
<NavigationHeader
  title="Todo List"
  subtitle="Manage your tasks"
/>

// Header without auth info (for auth screens)
<NavigationHeader
  title="Sign In"
  subtitle="Welcome back!"
  showAuth={false}
/>

// Header with custom actions
<NavigationHeader
  title="Profile"
  customActions={[
    <Button title="Save" onPress={handleSave} />
  ]}
/>
```

## Platform-Specific Behavior

### Web

- Headers are sticky (position: sticky) for better UX during scrolling
- Full navigation support with browser back/forward buttons
- Responsive design adapts to different screen sizes

### Mobile (iOS/Android)

- Native navigation gestures supported
- Tab bar navigation for main sections
- Stack navigation for detailed views
- Proper safe area handling

### Desktop

- Optimized for larger screens
- Keyboard navigation support
- Hover states for interactive elements

## Authentication Flow

1. **Unauthenticated Users**:
   - Redirected to sign-in page
   - Access to auth routes only
   - Theme controls available but no auth status

2. **Authenticated Users**:
   - Access to all user routes
   - Tab navigation between main sections
   - Auth status and sign-out functionality in header

## Navigation Patterns

### 1. Tab Navigation (User Routes)

- Primary navigation for authenticated users
- Four main tabs: Todo, Demo, VR, Profile
- Each tab has its own stack for detailed navigation

### 2. Stack Navigation

- Used within each tab for deeper navigation
- Examples: Todo List → Add Todo, Profile → Edit Profile
- Automatic back button management

### 3. Modal Navigation

- For overlays and temporary screens
- Maintains navigation context

## Theme Integration

The navigation system is fully integrated with the app's theming system:

- **Dynamic Colors**: All navigation elements adapt to current theme
- **Theme Toggle**: Quick access to theme controls in header
- **Variant Support**: Switch between theme variants (modern, dark, warm, cool)
- **Consistent Styling**: Headers maintain visual consistency across themes

## Best Practices

### 1. Header Configuration

- Always provide meaningful titles and subtitles
- Use consistent header configuration for similar screen types
- Leverage the showAuth prop to hide auth info on auth screens

### 2. Navigation Structure

- Keep navigation hierarchy shallow (max 3 levels)
- Use descriptive route names
- Group related functionality under common stacks

### 3. Platform Considerations

- Test navigation on all target platforms
- Ensure back navigation works intuitively
- Optimize for different screen sizes

### 4. Performance

- Headers are lightweight and performant
- Minimal re-renders through proper memo usage
- Efficient theme context usage

## Troubleshooting

### Common Issues:

1. **Header not showing**: Check if `headerShown: false` is set in screen options
2. **Back button not working**: Ensure router.canGoBack() returns true
3. **Theme not updating**: Verify theme provider is properly wrapped
4. **Auth status incorrect**: Check auth provider setup and session state

### Debug Tips:

- Use React Developer Tools to inspect navigation state
- Check console for navigation warnings
- Verify route structure matches file system
- Test authentication flow in development mode

## Future Enhancements

- **Breadcrumb Navigation**: For complex nested routes
- **Quick Actions**: Header-based shortcuts
- **Search Integration**: Global search in header
- **Notification Badges**: Tab badge support
- **Deep Linking**: URL-based navigation for web
