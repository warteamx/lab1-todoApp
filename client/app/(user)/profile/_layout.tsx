import { Stack } from 'expo-router';
import { NavigationHeader } from '@/components/modules/Navigation/NavigationHeader';

export default function ProfileStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // We handle headers in the parent tabs
      }}
    >
      <Stack.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          title: 'Edit Profile',
          headerShown: true,
          header: () => (
            <NavigationHeader
              title="Edit Profile"
              subtitle="Update your information"
              showBack={true}
            />
          ),
        }}
      />
    </Stack>
  );
}
