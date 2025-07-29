import { Stack } from 'expo-router';

export default function VRStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'VR' }} />
    </Stack>
  );
}
