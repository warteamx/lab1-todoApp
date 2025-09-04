import { Stack } from 'expo-router';

export default function VrStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // We handle headers in the parent tabs
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'VR Experience',
        }}
      />
    </Stack>
  );
}
