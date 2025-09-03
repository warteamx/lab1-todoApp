import { Stack } from 'expo-router';

export default function UiDemoStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // We handle headers in the parent tabs
      }}
    >
      <Stack.Screen
        name="ui-demo"
        options={{
          title: 'UI Demo',
        }}
      />
    </Stack>
  );
}
