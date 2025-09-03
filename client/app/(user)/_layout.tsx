import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';
import { useAuth } from '@/providers/authProvider';
import { useTheme } from '@/providers/themeProvider';
import { NavigationHeader } from '@/components/ui/Navigation/NavigationHeader';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { theme } = useTheme();
  const { session } = useAuth();

  if (!session) {
    return <Redirect href={'/'} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.interactive,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.neutral200,
        },
        header: () => (
          <NavigationHeader
            title="Dashboard"
            subtitle="Manage your tasks"
          />
        ),
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />

      <Tabs.Screen
        name="todo"
        options={{
          title: 'Todo',
          headerShown: true,
          header: () => (
            <NavigationHeader
              title="Todo List"
              subtitle="Manage your tasks"
            />
          ),
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="check-square" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="ui-demo"
        options={{
          title: 'Demo',
          headerShown: true,
          header: () => (
            <NavigationHeader
              title="UI Demo"
              subtitle="Component showcase"
            />
          ),
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="paint-brush" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="vr"
        options={{
          title: 'VR',
          headerShown: true,
          header: () => (
            <NavigationHeader
              title="VR Experience"
              subtitle="Virtual reality demo"
            />
          ),
          tabBarIcon: ({ color }) => <TabBarIcon name="space-shuttle" color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile 🧑',
          headerShown: true,
          header: () => (
            <NavigationHeader
              title="Profile"
              subtitle="Manage your account"
            />
          ),
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
