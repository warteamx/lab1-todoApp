// Navigation Header component for consistent navigation across all screens

import React, { useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { View } from '../../ui/View/View';
import { Text } from '../../ui/Text/Text';
import { Inline } from '../../ui/Layout/Layout';
import { NavigationHeaderProps } from './NavigationHeader.interface';
import { NavigationHeaderModal } from './NavigationHeader.modal';
import { ProfileAvatar } from './ProfileAvatar';
import { useTheme } from '@/providers/themeProvider';

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  title,
  subtitle,
  showBack = true,
  showThemeToggle = true,
  showAuth = true,
  customActions = [],
  style,
}) => {
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Determine if we should show back button based on route
  const isRootRoute = pathname === '/' || pathname === '/sign-in' || pathname === '/sign-up';
  const shouldShowBack = showBack && !isRootRoute && router.canGoBack();

  return (
    <>
      <View
        backgroundColor="surface"
        shadow="sm"
        paddingHorizontal="lg"
        paddingVertical="md"
        style={[
          {
            ...(Platform.OS === 'web' && {
              position: 'sticky',
              top: 0,
              zIndex: 100,
            }),
            borderBottomWidth: 1,
            borderBottomColor: theme.isDark ? '#333' : '#e0e0e0',
          },
          style,
        ]}
      >
        <Inline justify="space-between" align="center">
          {/* Left side - Back button and title */}
          <Inline spacing="md" style={{ flex: 1 }}>
            {shouldShowBack && (
              <TouchableOpacity onPress={() => router.back()}>
                <Text variant="titleMedium" color="interactive">
                  ← Back
                </Text>
              </TouchableOpacity>
            )}

            <View style={{ flex: 1 }}>
              {title && (
                <Text variant="titleLarge" color="textPrimary" numberOfLines={1}>
                  {title}
                </Text>
              )}
              {subtitle && (
                <Text variant="bodyMedium" color="textSecondary" numberOfLines={1}>
                  {subtitle}
                </Text>
              )}
            </View>
          </Inline>

          {/* Right side - Custom actions and profile avatar */}
          <Inline spacing="sm" align="center">
            {/* Custom actions */}
            {customActions.map((action: React.ReactNode, index: number) => (
              <View key={index}>{action}</View>
            ))}

            {/* Profile Avatar Button - opens settings modal */}
            {(showAuth || showThemeToggle) && (
              <ProfileAvatar
                size={36}
                showStatus={true}
                onPress={() => setShowSettingsModal(true)}
              />
            )}
          </Inline>
        </Inline>
      </View>

      {/* Settings Modal */}
      <NavigationHeaderModal
        visible={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />
    </>
  );
};
