import { Stack } from 'expo-router';

export default function UIDemoStack() {
  return (
    <Stack>
      <Stack.Screen name="ui-demo" options={{ title: 'UI Demo' }} />
    </Stack>
  );
}
