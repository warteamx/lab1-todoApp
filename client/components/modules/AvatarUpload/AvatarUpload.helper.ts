import { Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {
  DEFAULT_AVATAR_URL,
  VALIDATION_MESSAGES,
  IMAGE_PICKER_OPTIONS,
  WEB_FILE_CONSTRAINTS,
} from '@/constants/api';
import { handleApiError } from '@/lib/api-utils';

export const requestPermissions = async(): Promise<boolean> => {
  if (Platform.OS === 'web') {
    // No permissions needed for web
    return true;
  }

  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert(
      VALIDATION_MESSAGES.PERMISSION_REQUIRED,
      VALIDATION_MESSAGES.MEDIA_PERMISSION
    );
    return false;
  }
  return true;
};

export const validateWebFile = (file: File): boolean => {
  // Validate file type
  if (!WEB_FILE_CONSTRAINTS.allowedTypes.includes(file.type as any)) {
    Alert.alert(
      'Error',
      `Please select a valid image file (${WEB_FILE_CONSTRAINTS.allowedExtensions.join(', ')})`
    );
    return false;
  }

  // Validate file size
  if (file.size > WEB_FILE_CONSTRAINTS.maxSizeInBytes) {
    Alert.alert('Error', 'Image size must be less than 5MB');
    return false;
  }

  return true;
};

export const uploadWebImage = async(
  file: File,
  uploadAvatarMutation: any,
  onSuccess?: (newAvatarUrl: string) => void
): Promise<void> => {
  try {
    const result = await uploadAvatarMutation.mutateAsync(file);
    onSuccess?.(result.avatar_url);
    Alert.alert('Success', VALIDATION_MESSAGES.UPLOAD_SUCCESS);
  } catch (error) {
    handleApiError(error, VALIDATION_MESSAGES.UPLOAD_ERROR);
  }
};

export const checkWebFileApiSupport = (): boolean => {
  return !!(
    window.File &&
    window.FileReader &&
    window.FileList &&
    window.Blob
  );
};

export const openCamera = async(
  uploadAvatarMutation: any,
  onSuccess?: (newAvatarUrl: string) => void
): Promise<void> => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert(
      VALIDATION_MESSAGES.PERMISSION_REQUIRED,
      VALIDATION_MESSAGES.CAMERA_PERMISSION
    );
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: IMAGE_PICKER_OPTIONS.allowsEditing,
    aspect: IMAGE_PICKER_OPTIONS.aspect,
    quality: IMAGE_PICKER_OPTIONS.quality,
  });

  if (!result.canceled && result.assets[0]) {
    await uploadImage(result.assets[0], uploadAvatarMutation, onSuccess);
  }
};

export const openImagePicker = async(
  uploadAvatarMutation: any,
  onSuccess?: (newAvatarUrl: string) => void
): Promise<void> => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: IMAGE_PICKER_OPTIONS.allowsEditing,
    aspect: IMAGE_PICKER_OPTIONS.aspect,
    quality: IMAGE_PICKER_OPTIONS.quality,
  });

  if (!result.canceled && result.assets[0]) {
    await uploadImage(result.assets[0], uploadAvatarMutation, onSuccess);
  }
};

export const uploadImage = async(
  asset: ImagePicker.ImagePickerAsset,
  uploadAvatarMutation: any,
  onSuccess?: (newAvatarUrl: string) => void
): Promise<void> => {
  try {
    // Create a blob from the image URI
    const response = await fetch(asset.uri);
    const blob = await response.blob();

    const result = await uploadAvatarMutation.mutateAsync(blob);
    onSuccess?.(result.avatar_url);
    Alert.alert('Success', VALIDATION_MESSAGES.UPLOAD_SUCCESS);
  } catch (error) {
    handleApiError(error, VALIDATION_MESSAGES.UPLOAD_ERROR);
  }
};

export const getAvatarSource = (currentAvatarUrl?: string) => {
  if (currentAvatarUrl && currentAvatarUrl.startsWith('http')) {
    return { uri: currentAvatarUrl };
  }
  return { uri: DEFAULT_AVATAR_URL };
};

export const showImagePickerAlert = (
  onCameraPress: () => void,
  onLibraryPress: () => void
): void => {
  Alert.alert(
    'Select Avatar',
    'Choose how you\'d like to select your avatar',
    [
      {
        text: 'Camera',
        onPress: onCameraPress,
      },
      {
        text: 'Photo Library',
        onPress: onLibraryPress,
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]
  );
};
