// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000',
  ENDPOINTS: {
    PROFILE: '/api/profile',
    TODO: '/api/todo',
  },
} as const;

// Image picker options
export const IMAGE_PICKER_OPTIONS = {
  mediaTypes: 'Images' as const,
  allowsEditing: true,
  aspect: [1, 1] as [number, number],
  quality: 0.8,
} as const;

// Web file upload constraints
export const WEB_FILE_CONSTRAINTS = {
  maxSizeInBytes: 5 * 1024 * 1024, // 5MB
  allowedTypes: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
  ],
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
} as const;

// Default avatar URL
export const DEFAULT_AVATAR_URL = 'https://api.dicebear.com/9.x/bottts/svg';

// Form validation messages
export const VALIDATION_MESSAGES = {
  USERNAME_REQUIRED: 'Username is required',
  UPLOAD_SUCCESS: 'Avatar updated successfully!',
  UPLOAD_ERROR: 'Failed to upload avatar. Please try again.',
  UPDATE_SUCCESS: 'Profile updated successfully',
  UPDATE_ERROR: 'Failed to update profile',
  PERMISSION_REQUIRED: 'Permission Required',
  CAMERA_PERMISSION: 'Camera permission is needed to take photos.',
  MEDIA_PERMISSION:
    'Sorry, we need camera roll permissions to upload your avatar.',
} as const;
