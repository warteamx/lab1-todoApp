import { useAuth } from '@/providers/authProvider';
import { Redirect, Stack } from 'expo-router';
import { NavigationHeader } from '@/components/ui/Navigation/NavigationHeader';

export default function AuthLayout() {
  const { session } = useAuth();

  if (session) {
    return <Redirect href={'/'} />;
  }

  return (
    <Stack
      screenOptions={{
        header: () => (
          <NavigationHeader
            title="Todo App"
            subtitle="Authentication"
            showBack={true}
            showAuth={false}
          />
        ),
      }}
    >
      <Stack.Screen
        name="sign-in"
        options={{
          title: 'Sign In',
          header: () => (
            <NavigationHeader
              title="Sign In"
              subtitle="Welcome back!"
              showAuth={false}
            />
          ),
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          title: 'Sign Up',
          header: () => (
            <NavigationHeader
              title="Sign Up"
              subtitle="Create your account"
              showAuth={false}
            />
          ),
        }}
      />
    </Stack>
  );
}
