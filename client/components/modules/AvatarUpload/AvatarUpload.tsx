import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useUploadAvatar } from '@/api/profile.api';
import {
  DEFAULT_AVATAR_URL,
  VALIDATION_MESSAGES,
  IMAGE_PICKER_OPTIONS,
  WEB_FILE_CONSTRAINTS,
} from '@/constants/api';
import { handleApiError } from '@/lib/api-utils';

interface AvatarUploadProps {
  currentAvatarUrl?: string;
  onSuccess?: (newAvatarUrl: string) => void;
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({
  currentAvatarUrl,
  onSuccess,
}) => {
  const uploadAvatarMutation = useUploadAvatar();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const requestPermissions = async () => {
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

  const handleWebFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const file = target.files?.[0];

    if (file) {
      // Validate file type
      if (!WEB_FILE_CONSTRAINTS.allowedTypes.includes(file.type as any)) {
        Alert.alert(
          'Error',
          `Please select a valid image file (${WEB_FILE_CONSTRAINTS.allowedExtensions.join(', ')})`
        );
        return;
      }

      // Validate file size
      if (file.size > WEB_FILE_CONSTRAINTS.maxSizeInBytes) {
        Alert.alert('Error', 'Image size must be less than 5MB');
        return;
      }

      uploadWebImage(file);
    }

    // Reset the input so the same file can be selected again
    target.value = '';
  };

  const uploadWebImage = async (file: File) => {
    try {
      const result = await uploadAvatarMutation.mutateAsync(file);
      onSuccess?.(result.avatar_url);
      Alert.alert('Success', VALIDATION_MESSAGES.UPLOAD_SUCCESS);
    } catch (error) {
      handleApiError(error, VALIDATION_MESSAGES.UPLOAD_ERROR);
    }
  };

  const pickImage = async () => {
    console.log('Picking image...');

    if (Platform.OS === 'web') {
      // Check if File API is supported
      if (
        !window.File ||
        !window.FileReader ||
        !window.FileList ||
        !window.Blob
      ) {
        Alert.alert('Error', 'File upload is not supported in this browser');
        return;
      }

      // Use HTML file input for web
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
      return;
    }

    // Native platform logic
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    Alert.alert(
      'Select Avatar',
      "Choose how you'd like to select your avatar",
      [
        {
          text: 'Camera',
          onPress: () => openCamera(),
        },
        {
          text: 'Photo Library',
          onPress: () => openImagePicker(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const openCamera = async () => {
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
      await uploadImage(result.assets[0]);
    }
  };

  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: IMAGE_PICKER_OPTIONS.allowsEditing,
      aspect: IMAGE_PICKER_OPTIONS.aspect,
      quality: IMAGE_PICKER_OPTIONS.quality,
    });

    if (!result.canceled && result.assets[0]) {
      await uploadImage(result.assets[0]);
    }
  };

  const uploadImage = async (asset: ImagePicker.ImagePickerAsset) => {
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

  const getAvatarSource = () => {
    if (currentAvatarUrl && currentAvatarUrl.startsWith('http')) {
      return { uri: currentAvatarUrl };
    }
    return { uri: DEFAULT_AVATAR_URL };
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' && (
        <input
          ref={fileInputRef as any}
          type="file"
          accept={WEB_FILE_CONSTRAINTS.allowedExtensions.join(',')}
          style={{ display: 'none' }}
          onChange={handleWebFileSelect}
        />
      )}
      <TouchableOpacity
        style={styles.avatarContainer}
        onPress={pickImage}
        disabled={uploadAvatarMutation.isPending}
      >
        <Image source={getAvatarSource()} style={styles.avatar} />
        {uploadAvatarMutation.isPending && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        )}
        <View style={styles.editBadge}>
          <Text style={styles.editBadgeText}>✏️</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.hint}>
        {Platform.OS === 'web'
          ? 'Click to upload avatar'
          : 'Tap to change avatar'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatarContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 8,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  editBadgeText: {
    fontSize: 12,
  },
  hint: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
