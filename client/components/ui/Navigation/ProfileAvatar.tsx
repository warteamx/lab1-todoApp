// Simple Profile Avatar component for navigation header

import React from 'react';
import { Image, TouchableOpacity, Platform } from 'react-native';
import { useAuth } from '@/providers/authProvider';
import { useTheme } from '@/providers/themeProvider';
import { useProfile } from '@/api/profile.api';
import { DEFAULT_AVATAR_URL } from '@/constants/api';
import { Text } from '../Text/Text';
import { View } from '../View/View';

interface ProfileAvatarProps {
  size?: number;
  onPress?: () => void;
  showStatus?: boolean;
}

const getAvatarSource = (currentAvatarUrl?: string) => {
  if (currentAvatarUrl && currentAvatarUrl.startsWith('http')) {
    return { uri: currentAvatarUrl };
  }
  return { uri: DEFAULT_AVATAR_URL };
};

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  size = 32,
  onPress,
  showStatus = false,
}) => {
  const { session, loading } = useAuth();
  const { theme } = useTheme();
  const { data: profile } = useProfile();

  const isLoggedIn = !!session;
  const avatarSource = getAvatarSource(profile?.avatar_url);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: size / 2,
        ...theme.shadows.sm,
      }}
      accessible={true}
      accessibilityLabel={isLoggedIn ? "Profile settings" : "Sign in"}
      accessibilityRole="button"
    >
      <Image
        source={avatarSource}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: theme.colors.neutral100,
          borderWidth: 2,
          borderColor: isLoggedIn ? theme.colors.success : theme.colors.border,
        }}
        accessible={true}
        accessibilityLabel="Profile avatar"
      />

      {/* Status indicator */}
      {showStatus && (
        <View
          style={{
            position: 'absolute',
            bottom: -2,
            right: -2,
            width: size * 0.3,
            height: size * 0.3,
            borderRadius: (size * 0.3) / 2,
            backgroundColor: isLoggedIn ? theme.colors.success : theme.colors.warning,
            borderWidth: 1,
            borderColor: theme.colors.surface,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: size * 0.15,
              color: theme.colors.textOnPrimary,
            }}
          >
            {loading ? '⋯' : isLoggedIn ? '✓' : '!'}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
