import { Stack } from 'expo-router';

export default function ProfileStack() {
  return (
    <Stack>
      <Stack.Screen name="profile" options={{ title: 'Profile' }} />
    </Stack>
  );
}
