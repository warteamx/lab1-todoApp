// Documentation layout with navigation

import { Stack } from 'expo-router';
import { NavigationHeader } from '@/components/modules/Navigation/NavigationHeader';

export default function DocsLayout() {
  return (
    <Stack
      screenOptions={{
        header: () => (
          <NavigationHeader
            title="Documentation"
            showBack={true}
          />
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Documentation',
          header: () => (
            <NavigationHeader
              title="Documentation"
              subtitle="App guides and information"
              showBack={true}
            />
          ),
        }}
      />
      <Stack.Screen
        name="[slug]"
        options={{
          title: 'Document',
          header: () => (
            <NavigationHeader
              title="Documentation"
              showBack={true}
            />
          ),
        }}
      />
    </Stack>
  );
}
