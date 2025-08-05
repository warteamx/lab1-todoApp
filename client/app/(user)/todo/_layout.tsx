import { Stack } from 'expo-router';

export default function TodoStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Todo' }} />
    </Stack>
  );
}
