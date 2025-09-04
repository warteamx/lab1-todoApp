// NavigationHeader Modal component for user settings (auth + theme)

import React from 'react';
import { Modal, Pressable, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/providers/authProvider';
import { useTheme } from '@/providers/themeProvider';
import { ThemeVariant } from '@/themes/themes';
import { View } from '../../ui/View/View';
import { Text } from '../../ui/Text/Text';
import { Button } from '../../ui/Button/Button';
import { Inline } from '../../ui/Layout/Layout';
import { THEME_OPTIONS } from './NavigationHeader.helper';

interface NavigationHeaderModalProps {
  visible: boolean;
  onClose: () => void;
}

export const NavigationHeaderModal: React.FC<NavigationHeaderModalProps> = ({
  visible,
  onClose,
}) => {
  const { themeVariant, setThemeVariant, theme } = useTheme();
  const { session, loading, signOut } = useAuth();
  const router = useRouter();

  // Theme selection handler
  const handleThemeSelect = (variant: ThemeVariant) => {
    setThemeVariant(variant);
  };

  // Sign out handler
  const handleSignOut = async() => {
    try {
      await signOut();
      router.replace('/');
      onClose();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
        onPress={onClose}
      >
        <Pressable
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: 16,
            padding: 24,
            width: '100%',
            maxWidth: 400,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 8,
          }}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <Text
            variant="titleMedium"
            color="textPrimary"
            style={{ textAlign: 'center', marginBottom: 24 }}
          >
            Settings
          </Text>

          {/* Auth Section */}
          <View style={{ marginBottom: 24 }}>
            <Text
              variant="titleSmall"
              color="textPrimary"
              style={{ marginBottom: 12 }}
            >
              Account
            </Text>

            <View
              style={{
                padding: 16,
                backgroundColor: theme.colors.background,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: theme.colors.border,
              }}
            >
              {loading ? (
                <Text variant="bodyMedium" color="textSecondary">
                  Loading...
                </Text>
              ) : session ? (
                <View>
                  <Inline spacing="xs" align="center" style={{ marginBottom: 12 }}>
                    <Text variant="bodyMedium" color="success">
                      ✓ Logged in
                    </Text>
                    {session.user?.email && (
                      <Text variant="labelSmall" color="textSecondary">
                        {session.user.email}
                      </Text>
                    )}
                  </Inline>
                  <Inline spacing="sm" style={{ marginBottom: 8 }}>
                    <Button
                      title="Edit Profile"
                      variant="primary"
                      size="small"
                      onPress={() => {
                        router.push('/profile/profile');
                        onClose();
                      }}
                    />
                    <Button
                      title="Sign Out"
                      variant="secondary"
                      size="small"
                      onPress={handleSignOut}
                    />
                  </Inline>
                </View>
              ) : (
                <View>
                  <Text variant="bodyMedium" color="warning" style={{ marginBottom: 12 }}>
                    Not logged in
                  </Text>
                  <Inline spacing="sm">
                    <Button
                      title="Sign In"
                      variant="primary"
                      size="small"
                      onPress={() => {
                        router.push('/sign-in');
                        onClose();
                      }}
                    />
                    <Button
                      title="Sign Up"
                      variant="secondary"
                      size="small"
                      onPress={() => {
                        router.push('/sign-up');
                        onClose();
                      }}
                    />
                  </Inline>
                </View>
              )}
            </View>
          </View>

          {/* Documentation Section */}
          <View style={{ marginBottom: 24 }}>
            <Text
              variant="titleSmall"
              color="textPrimary"
              style={{ marginBottom: 12 }}
            >
              Help & Resources
            </Text>

            <View
              style={{
                padding: 16,
                backgroundColor: theme.colors.background,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: theme.colors.border,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  router.push('/docs');
                  onClose();
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 8,
                }}
              >
                <Text style={{ fontSize: 20, marginRight: 12 }}>📚</Text>
                <View style={{ flex: 1 }}>
                  <Text variant="bodyMedium" color="textPrimary">
                    Documentation
                  </Text>
                  <Text variant="labelSmall" color="textSecondary">
                    App guides, architecture, and feature docs
                  </Text>
                </View>
                <Text style={{ color: theme.colors.interactive, fontSize: 16 }}>
                  →
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Theme Section */}
          <View style={{ marginBottom: 24 }}>
            <Inline spacing="sm" align="center" style={{ marginBottom: 12 }}>
              <Text variant="titleSmall" color="textPrimary">
                Theme
              </Text>
            </Inline>

            <View style={{ gap: 8 }}>
              {THEME_OPTIONS.map((themeOption) => (
                <TouchableOpacity
                  key={themeOption.variant}
                  onPress={() => handleThemeSelect(themeOption.variant)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderRadius: 12,
                    backgroundColor:
                      themeOption.variant === themeVariant
                        ? theme.colors.background
                        : 'transparent',
                    borderWidth: 1,
                    borderColor:
                      themeOption.variant === themeVariant
                        ? theme.colors.interactive
                        : theme.colors.border,
                  }}
                >
                  <Text style={{ fontSize: 20, marginRight: 12 }}>
                    {themeOption.icon}
                  </Text>

                  <View style={{ flex: 1 }}>
                    <Text
                      variant="bodyMedium"
                      color={themeOption.variant === themeVariant ? 'interactive' : 'textPrimary'}
                    >
                      {themeOption.name}
                    </Text>
                    <Text
                      variant="labelSmall"
                      color={themeOption.variant === themeVariant ? 'interactive' : 'textSecondary'}
                    >
                      {themeOption.description}
                    </Text>
                  </View>

                  {themeOption.variant === themeVariant && (
                    <Text style={{ color: theme.colors.interactive, fontSize: 16 }}>
                      ✓
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Close Button */}
          <TouchableOpacity
            onPress={onClose}
            style={{
              padding: 12,
              backgroundColor: theme.colors.neutral200,
              borderRadius: 8,
              alignItems: 'center',
            }}
          >
            <Text variant="labelMedium" color="textSecondary">
              Close
            </Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
