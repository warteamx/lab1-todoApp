# Profile Management Features

This document outlines the new profile management features implemented in the Expo client application.

## Features Overview

### 1. Profile Information Updates
- **Username**: Required field with validation (min 3 characters, alphanumeric + underscore only)
- **Full Name**: Optional field for display name
- **Website**: Optional field with URL validation

### 2. Avatar Upload
- Upload from camera or photo library
- Image cropping with square aspect ratio
- Automatic permission handling
- Loading states and error handling

### 3. Real-time Data Management
- Uses TanStack Query for efficient data fetching and caching
- Optimistic updates for better UX
- Automatic cache invalidation and synchronization

## Architecture & Best Practices

### Components Structure
```
client/
├── api/
│   └── profile.api.ts          # TanStack Query hooks and API functions
├── components/
│   ├── AvatarUpload.tsx        # Reusable avatar upload component
│   ├── ProfileForm.tsx         # Form for editing profile data
│   └── index.ts                # Barrel exports
├── constants/
│   └── api.ts                  # API endpoints and configuration
├── hooks/
│   └── useFormValidation.ts    # Reusable form validation hook
├── lib/
│   └── api-utils.ts            # API utility functions
└── app/(user)/profile/
    └── profile.tsx             # Main profile screen
```

### Key Features Implemented

#### 1. **Reusable Components**
- `AvatarUpload`: Handles image selection, upload, and display
- `ProfileForm`: Manages form state, validation, and submission
- Both components are fully self-contained and reusable

#### 2. **Robust Form Validation**
- Custom `useFormValidation` hook for type-safe validation
- Real-time validation with error display
- Configurable validation rules
- Username validation: required, min length, character restrictions
- Website validation: optional URL format validation

#### 3. **Error Handling**
- Centralized error handling utilities
- User-friendly error messages
- Proper API error responses
- Loading states for all async operations

#### 4. **TanStack Query Integration**
- `useProfile`: Fetch profile data with caching
- `useUpdateProfile`: Update profile with optimistic updates
- `useUploadAvatar`: Upload avatar with cache invalidation
- Proper cache management and synchronization

#### 5. **Type Safety**
- Full TypeScript integration
- Shared types between client and server
- Type-safe API calls and form handling

### API Endpoints

#### Server Routes Added
- `GET /api/profile/:userId` - Fetch user profile
- `PUT /api/profile/profile` - Update profile information  
- `POST /api/profile/avatar` - Upload avatar image

### Configuration

#### Constants (`constants/api.ts`)
- API base URL configuration
- Image picker options
- Validation messages
- Default avatar URL

#### Environment Variables
- `EXPO_PUBLIC_API_URL`: API base URL (defaults to localhost:3000)

### Usage Example

```tsx
import { AvatarUpload, ProfileForm } from '@/components';
import { useProfile } from '@/api/profile.api';

function ProfileScreen() {
  const { data: profile, isLoading } = useProfile();
  
  return (
    <View>
      <AvatarUpload 
        currentAvatarUrl={profile?.avatar_url}
        onSuccess={(newUrl) => console.log('Avatar updated:', newUrl)}
      />
      
      <ProfileForm
        initialData={profile}
        onSuccess={() => console.log('Profile updated')}
      />
    </View>
  );
}
```

### Testing

To test the new features:

1. Start the server: `cd server && npm run dev`
2. Start the client: `cd client && npx expo start`
3. Navigate to the profile screen
4. Try updating username, full name, and website
5. Test avatar upload from camera and photo library
6. Verify validation messages for invalid inputs

### Future Enhancements

1. **Image Optimization**: Add image compression before upload
2. **Profile Privacy**: Add privacy settings for profile visibility
3. **Social Features**: Add bio field and social media links
4. **Offline Support**: Cache profile updates for offline sync
5. **Profile Verification**: Add verification badges for profiles

## Dependencies Added

- `expo-image-picker`: For image selection from camera/gallery
- Form validation and error handling utilities
- Enhanced TanStack Query configuration

The implementation follows React Native and Expo best practices with proper error handling, loading states, and a clean, maintainable architecture.
