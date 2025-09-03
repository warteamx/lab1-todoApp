import { Stack } from 'expo-router';
import { AppProviders } from '@/providers';
import { NavigationHeader } from '@/components/ui/Navigation/NavigationHeader';

export default function RootLayout() {
  return (
    <AppProviders>
      <Stack
        screenOptions={{
          header: () => (
            <NavigationHeader
              title="Todo App"
              showBack={false}
            />
          ),
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Home',
            header: () => (
              <NavigationHeader
                title="Todo App"
                subtitle="Welcome back!"
                showBack={false}
              />
            ),
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(user)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </AppProviders>
  );
}
