import React, { useRef } from 'react';
import {
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useUploadAvatar } from '@/api/profile.api';
import { WEB_FILE_CONSTRAINTS } from '@/constants/api';
import { View, Text } from '@/components/ui';
import { useTheme } from '@/providers/themeProvider';
import { AvatarUploadProps } from './AvatarUpload.interface';
import {
  requestPermissions,
  validateWebFile,
  uploadWebImage,
  checkWebFileApiSupport,
  openCamera,
  openImagePicker,
  getAvatarSource,
  showImagePickerAlert,
} from './AvatarUpload.helper';

export const AvatarUpload: React.FC<AvatarUploadProps> = ({
  currentAvatarUrl,
  onSuccess,
}) => {
  const uploadAvatarMutation = useUploadAvatar();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();

  const handleWebFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const file = target.files?.[0];

    if (file) {
      if (validateWebFile(file)) {
        uploadWebImage(file, uploadAvatarMutation, onSuccess);
      }
    }

    // Reset the input so the same file can be selected again
    target.value = '';
  };

  const pickImage = async() => {
    if (Platform.OS === 'web') {
      // Check if File API is supported
      if (!checkWebFileApiSupport()) {
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

    showImagePickerAlert(
      () => openCamera(uploadAvatarMutation, onSuccess),
      () => openImagePicker(uploadAvatarMutation, onSuccess)
    );
  };

  const avatarSize = 120;
  const editBadgeSize = 30;
  const isLoading = uploadAvatarMutation.isPending;

  return (
    <View alignItems="center" marginVertical="lg">
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
        style={{
          position: 'relative',
          width: avatarSize,
          height: avatarSize,
          borderRadius: avatarSize / 2,
          marginBottom: theme.spacing.sm,
          ...theme.shadows.sm,
          opacity: isLoading ? 0.7 : 1,
        }}
        onPress={pickImage}
        disabled={isLoading}
        accessible={true}
        accessibilityLabel="Change avatar"
        accessibilityHint={Platform.OS === 'web'
          ? 'Click to upload a new avatar image'
          : 'Tap to take a photo or select from library'
        }
        accessibilityRole="button"
        accessibilityState={{ disabled: isLoading }}
      >
        <Image
          source={getAvatarSource(currentAvatarUrl)}
          style={{
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
            backgroundColor: theme.colors.neutral100,
          }}
          accessible={true}
          accessibilityLabel="Current avatar"
        />
        {isLoading && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              borderRadius: avatarSize / 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator size="large" color={theme.colors.primary500} testID="loading-indicator" />
            <Text
              variant="labelSmall"
              color="textOnPrimary"
              style={{
                marginTop: theme.spacing.xs,
                color: '#ffffff',
              }}
            >
              Uploading...
            </Text>
          </View>
        )}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: editBadgeSize,
            height: editBadgeSize,
            borderRadius: editBadgeSize / 2,
            backgroundColor: theme.colors.primary500,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: theme.colors.surface,
            ...theme.shadows.sm,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: theme.colors.textOnPrimary,
            }}
          >
            ✏️
          </Text>
        </View>
      </TouchableOpacity>
      <Text
        variant="bodyMedium"
        color="textSecondary"
        style={{
          marginTop: theme.spacing.xs,
          textAlign: 'center',
        }}
      >
        {Platform.OS === 'web'
          ? 'Click to upload avatar'
          : 'Tap to change avatar'}
      </Text>
      {isLoading && (
        <Text
          variant="labelSmall"
          color="textTertiary"
          style={{
            marginTop: theme.spacing.xs / 2,
            textAlign: 'center',
          }}
        >
          Please wait while your image is being processed...
        </Text>
      )}
    </View>
  );
};


