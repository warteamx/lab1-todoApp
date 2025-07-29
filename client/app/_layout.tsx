import { View, Text, Button } from 'react-native';
import { Stack } from 'expo-router';
import { AppProviders } from '@/providers';
import { useAuth } from '@/providers/authProvider';
import { useTheme } from '@/providers/themeProvider';

function SessionAndThemeInfo() {
  const { session, loading, profile } = useAuth();
  const { theme, toggleDarkMode, themeVariant } = useTheme();
  return (
    <>
      <Stack />
      <>
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            padding: 8,
            zIndex: 100,
            backgroundColor: theme.colors.surface,
          }}
        >
          <Text style={{ color: theme.colors.textPrimary }}>
            Session:{' '}
            {loading ? 'Loading...' : session ? 'Logged in' : 'Not logged in'}
          </Text>
          <Text style={{ color: theme.colors.textPrimary }}>
            Theme: {themeVariant}{' '}
            <Button onPress={toggleDarkMode} title="Toggle" />
          </Text>
        </View>
      </>
    </>
  );
}

export default function RootLayout() {
  return (
    <AppProviders>
      <SessionAndThemeInfo />
    </AppProviders>
  );
}
