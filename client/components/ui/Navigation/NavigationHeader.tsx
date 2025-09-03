// Navigation Header component for consistent navigation across all screens

import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { useAuth } from '@/providers/authProvider';
import { useTheme } from '@/providers/themeProvider';
import { View } from '../View/View';
import { Text } from '../Text/Text';
import { Button } from '../Button/Button';
import { Inline } from '../Layout/Layout';
import { NavigationHeaderProps } from './NavigationHeader.interface';

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  title,
  subtitle,
  showBack = true,
  showThemeToggle = true,
  showAuth = true,
  customActions = [],
  style,
}) => {
  const { toggleDarkMode, isDark, setThemeVariant, themeVariant } = useTheme();
  const { session, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Determine if we should show back button based on route
  const isRootRoute = pathname === '/' || pathname === '/sign-in' || pathname === '/sign-up';
  const shouldShowBack = showBack && !isRootRoute && router.canGoBack();

  const handleThemeToggle = () => {
    toggleDarkMode();
  };

  const handleThemeVariantToggle = () => {
    const variants = ['modern', 'dark', 'warm', 'cool'] as const;
    const currentIndex = variants.indexOf(themeVariant);
    const nextIndex = (currentIndex + 1) % variants.length;
    setThemeVariant(variants[nextIndex]);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
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
          borderBottomColor: isDark ? '#333' : '#e0e0e0',
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

        {/* Right side - Custom actions, auth info, and theme toggle */}
        <Inline spacing="sm" align="center">
          {/* Custom actions */}
          {customActions.map((action: React.ReactNode, index: number) => (
            <View key={index}>{action}</View>
          ))}

          {/* Auth section */}
          {showAuth && (
            <Inline spacing="xs" align="center">
              {loading ? (
                <Text variant="labelSmall" color="textSecondary">
                  Loading...
                </Text>
              ) : session ? (
                <Inline spacing="xs" align="center">
                  <Text variant="labelSmall" color="success">
                    ✓ Logged in
                  </Text>
                  <Button
                    title="Sign Out"
                    variant="secondary"
                    size="small"
                    onPress={handleSignOut}
                  />
                </Inline>
              ) : (
                <Text variant="labelSmall" color="warning">
                  Not logged in
                </Text>
              )}
            </Inline>
          )}

          {/* Theme controls */}
          {showThemeToggle && (
            <Inline spacing="xs" align="center">
              <TouchableOpacity onPress={handleThemeToggle}>
                <Text variant="labelMedium" color="interactive">
                  {isDark ? '☀️' : '🌙'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleThemeVariantToggle}>
                <Text variant="labelMedium" color="interactive">
                  🎨
                </Text>
              </TouchableOpacity>

              <Text variant="labelSmall" color="textSecondary">
                {themeVariant}
              </Text>
            </Inline>
          )}
        </Inline>
      </Inline>
    </View>
  );
};
