// Header component for navigation and branding

import React from 'react';
import { Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/providers/themeProvider';
import { View } from '../View';
import { Text } from '../Text';
import { Inline } from '../Layout';
import { TouchableOpacity } from 'react-native';
import { HeaderProps, variantType } from './Header.interface';

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  actions = [],
  themeToggle = true,
}) => {
  const { theme, toggleDarkMode, isDark, setThemeVariant, themeVariant } =
    useTheme();
  const router = useRouter();

  const handleThemeToggle = () => {
    toggleDarkMode();
  };

  const handleThemeVariantToggle = () => {
    const variants: Array<variantType> = [
      'modern',
      'dark',
      'warm',
      'cool',
    ];
    const currentIndex = variants.indexOf(themeVariant);
    const nextIndex = (currentIndex + 1) % variants.length;
    setThemeVariant(variants[nextIndex]);
  };

  return (
    <View
      backgroundColor="surface"
      shadow="sm"
      paddingHorizontal="lg"
      paddingVertical="md"
      style={{
        ...(Platform.OS === 'web' && {
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }),
      }}
    >
      <Inline justify="space-between" align="center">
        {/* Left side - Back button and title */}
        <Inline spacing="md" style={{ flex: 1 }}>
          {showBack && (
            <TouchableOpacity onPress={() => router.back()}>
              <Text variant="titleMedium" color="interactive">
                ← Back
              </Text>
            </TouchableOpacity>
          )}

          <View>
            {title && (
              <Text variant="titleLarge" color="textPrimary">
                {title}
              </Text>
            )}
            {subtitle && (
              <Text variant="bodyMedium" color="textSecondary">
                {subtitle}
              </Text>
            )}
          </View>
        </Inline>

        {/* Right side - Actions and theme toggle */}
        <Inline spacing="sm">
          {actions.map((action, index) => (
            <View key={index}>{action}</View>
          ))}

          {themeToggle && (
            <Inline spacing="xs">
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
            </Inline>
          )}
        </Inline>
      </Inline>
    </View>
  );
};
