import { StyleSheet } from 'react-native';
import { Theme } from '@/themes/themes';

// Theme-aware style helpers for AvatarUpload component
// These can be used if custom styling beyond the themed components is needed

export const createAvatarStyles = (theme: Theme, avatarSize: number = 120) => {
  const editBadgeSize = avatarSize * 0.25; // 25% of avatar size

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      marginVertical: theme.spacing.lg,
    },
    avatarContainer: {
      position: 'relative',
      width: avatarSize,
      height: avatarSize,
      borderRadius: avatarSize / 2,
      marginBottom: theme.spacing.sm,
    },
    avatar: {
      width: avatarSize,
      height: avatarSize,
      borderRadius: avatarSize / 2,
      backgroundColor: theme.colors.neutral100,
    },
    loadingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: avatarSize / 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    editBadge: {
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
    },
    editBadgeText: {
      fontSize: editBadgeSize * 0.4,
      color: theme.colors.textOnPrimary,
    },
    hint: {
      fontSize: theme.typography.body.medium.fontSize,
      color: theme.colors.textSecondary,
      marginTop: theme.spacing.xs,
      textAlign: 'center' as const,
    },
  });
};

// Helper function to get avatar image styles
export const getAvatarImageStyle = (theme: Theme, size: number = 120) => ({
  width: size,
  height: size,
  borderRadius: size / 2,
  backgroundColor: theme.colors.neutral100,
});

// Helper function to get loading overlay styles
export const getLoadingOverlayStyle = (theme: Theme, size: number = 120) => ({
  position: 'absolute' as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  borderRadius: size / 2,
  justifyContent: 'center' as const,
  alignItems: 'center' as const,
});
