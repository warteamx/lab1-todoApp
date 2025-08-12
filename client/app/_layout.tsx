import { Stack } from 'expo-router';
import { AppProviders } from '@/providers';
import { useAuth } from '@/providers/authProvider';
import { useTheme } from '@/providers/themeProvider';
import { View } from '@/components/ui/View/View';
import { Text } from '@/components/ui/Text/Text';
import { Button } from '@/components/ui/Button/Button';

function SessionAndThemeInfo() {
  const { session, loading } = useAuth();
  const { toggleDarkMode, themeVariant } = useTheme();
  return (
    <>
      <Stack />
      <>
        <View
          position="absolute"
          top={0}
          right={0}
          padding="sm"
          style={{
            zIndex: 100,
          }}
          backgroundColor="surface"
        >
          <Text variant="bodySmall" color="textPrimary">
            Session XXX :{' '}
            {loading ? 'Loading...' : session ? 'Logged in' : 'Not logged in'}
          </Text>
          <View flexDirection="row" alignItems="center" style={{ gap: 8 }}>
            <Text variant="bodySmall" color="textPrimary">
              Theme: {themeVariant}
            </Text>
            <Button
              title="Toggle"
              variant="secondary"
              size="small"
              onPress={toggleDarkMode}
            />
          </View>
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
