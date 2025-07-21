
import { View, Text, Button } from 'react-native';
import { Stack } from "expo-router";
import { AppProviders } from '@/providers';
import { useAuth } from '@/providers/authProvider';
import { useTheme } from '@/providers/themeProvider';

function SessionAndThemeInfo() {
  const { session, loading, profile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <Stack />
      <>
        <View style={{ position: 'absolute', top: 0, right: 0, padding: 8, zIndex: 100, backgroundColor: '#eee' }}>
          <Text>Session: {loading ? 'Loading...' : session ? 'Logged in' : 'Not logged in'}</Text>
          <Text>Theme: {theme} <Button onPress={toggleTheme} title="Toggle" /></Text>
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
