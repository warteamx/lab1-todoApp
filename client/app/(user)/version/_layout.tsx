import { Stack } from 'expo-router';

export default function VersionStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // We handle headers in the parent tabs
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Version Info',
        }}
      />
    </Stack>
  );
}
