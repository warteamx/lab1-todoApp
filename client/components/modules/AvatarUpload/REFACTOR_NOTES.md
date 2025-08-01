# AvatarUpload Component Refactoring

## Overview
Refactored the AvatarUpload component to use the app's UI components and theme system for consistency and maintainability.

## Changes Made

### 1. Replaced React Native Components with Themed Components
- **Before**: Used native `View` and `Text` components
- **After**: Uses themed `View` and `Text` components from `@/components/ui`

### 2. Integrated Theme System
- Added `useTheme()` hook for accessing the app's theme
- Replaced hardcoded colors with theme colors:
  - `#f0f0f0` → `theme.colors.neutral100` (avatar background)
  - `#007AFF` → `theme.colors.primary500` (edit badge)
  - `#666` → `theme.colors.textSecondary` (hint text)

### 3. Improved Styling Architecture
- Removed dependency on separate styles file for main component
- Uses theme-based spacing: `theme.spacing.lg`, `theme.spacing.sm`, etc.
- Added theme shadows: `theme.shadows.sm` for depth
- Converted styles file to theme-aware helper functions for future use

### 4. Enhanced User Experience
- **Accessibility**: Added proper `accessibilityLabel`, `accessibilityHint`, and `accessibilityRole`
- **Loading States**: 
  - Better visual feedback with "Uploading..." text
  - Improved loading overlay opacity
  - Additional helpful text during upload
- **Visual Polish**:
  - Added subtle shadows to avatar container and edit badge
  - Better spacing using theme values
  - Improved text alignment and typography

### 5. Typography Consistency
- Uses theme typography variants: `bodyMedium`, `labelSmall`
- Consistent text styling with the app's typography system

## Benefits

1. **Consistency**: Now follows the app's design system
2. **Maintainability**: Changes to theme automatically apply to this component
3. **Accessibility**: Better screen reader support
4. **Theme Support**: Automatically adapts to different themes (light/dark/etc.)
5. **Code Quality**: Cleaner, more readable code structure

## Files Modified

- `AvatarUpload.tsx` - Main component refactored
- `AvatarUpload.styles.ts` - Converted to theme-aware helper functions
- No breaking changes to the component's API

## Usage
The component usage remains the same:

```tsx
<AvatarUpload 
  currentAvatarUrl={user.avatar_url}
  onSuccess={(newUrl) => console.log('Avatar updated:', newUrl)}
/>
```

The component now automatically adapts to the current theme and provides a much better user experience while maintaining all existing functionality.
