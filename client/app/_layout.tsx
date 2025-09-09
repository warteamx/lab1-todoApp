import { Stack } from 'expo-router';
import { AppProviders } from '@/providers';
import { NavigationHeader } from '@/components/modules/Navigation/NavigationHeader';

export default function RootLayout() {
  return (
    <AppProviders>
      <Stack
        screenOptions={{
          header: () => (
            <NavigationHeader
              title="✅ ToDoApp"
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
                title="✅ ToDoApp"
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
        <Stack.Screen
          name="docs"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </AppProviders>
  );
}
