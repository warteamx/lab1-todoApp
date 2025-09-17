import React from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { View } from '../View/View';
import { Text } from '../Text/Text';
import { useTheme } from '@/providers/themeProvider';
import { Version } from '../Version';

export const Footer: React.FC = () => {
  const { theme } = useTheme();

  const handleWarteamXPress = () => {
    Linking.openURL('https://www.warteamx.com');
  };

  const handleGitHubPress = () => {
    Linking.openURL('https://github.com/warteamx/lab1-todoApp');
  };

  return (
    <View
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      paddingVertical="md"
      paddingHorizontal="lg"
      alignItems="center"
      backgroundColor="background"
      style={{ gap: 8 }}
    >
      <View flexDirection="row" alignItems="center" style={{ gap: 4 }}>
        <Text variant="bodySmall" color="textSecondary">
          © 2025
        </Text>
        <TouchableOpacity onPress={handleWarteamXPress}>
          <Text variant="bodySmall" color="interactive">
            ☠️ WarteamX
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleGitHubPress}>
        <View flexDirection="row" alignItems="center" style={{ gap: 6 }}>
          <AntDesign name="github" size={16} color={theme.colors.interactive} />
          <Text variant="bodySmall" color="interactive">
            Source Code
          </Text>
        </View>
      </TouchableOpacity>
      <Version />
    </View>
  );
};
