import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useUploadAvatar } from '@/api/profile.api';
import { WEB_FILE_CONSTRAINTS } from '@/constants/api';
import { AvatarUploadProps } from './AvatarUpload.interface';
import { styles } from './AvatarUpload.styles';
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

  const pickImage = async () => {
    console.log('Picking image...');

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
        <Image source={getAvatarSource(currentAvatarUrl)} style={styles.avatar} />
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


