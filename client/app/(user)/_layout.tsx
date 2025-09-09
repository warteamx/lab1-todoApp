import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs, useSegments } from 'expo-router';
import { useAuth } from '@/providers/authProvider';
import { useTheme } from '@/providers/themeProvider';
import { NavigationHeader } from '@/components/modules/Navigation/NavigationHeader';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { theme } = useTheme();
  const { session } = useAuth();
  const segments = useSegments();

  if (!session) {
    return <Redirect href={'/'} />;
  }

  // Determine header content based on current route
  const getHeaderProps = () => {
    const currentRoute = segments[segments.length - 1];
    const routeString = String(currentRoute);

    if (routeString === 'newTodo') {
      return {
        title: 'Add New ToDo',
        subtitle: 'Create a new task',
      };
    }

    if (segments.some(segment => String(segment) === 'todo')) {
      return {
        title: 'ToDo List',
        subtitle: 'Manage your tasks',
      };
    }

    if (segments.some(segment => String(segment) === 'ui-demo')) {
      return {
        title: 'UI Demo',
        subtitle: 'Component showcase',
      };
    }

    if (segments.some(segment => String(segment) === 'version')) {
      return {
        title: 'Version Info',
        subtitle: 'App version and demos',
      };
    }

    if (segments.some(segment => String(segment) === 'profile')) {
      return {
        title: 'Profile',
        subtitle: 'Manage your account',
      };
    }

    return {
      title: 'Dashboard',
      subtitle: 'Manage your tasks',
    };
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.interactive,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.neutral200,
        },
        header: () => {
          const headerProps = getHeaderProps();
          return (
            <NavigationHeader
              title={headerProps.title}
              subtitle={headerProps.subtitle}
            />
          );
        },
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />

      <Tabs.Screen
        name="todo"
        options={{
          title: 'ToDo',
          headerShown: true,
          header: () => (
            <NavigationHeader
              title="ToDo List"
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
        name="version"
        options={{
          title: 'Version',
          headerShown: true,
          header: () => (
            <NavigationHeader
              title="Version Info"
              subtitle="App version and demos"
            />
          ),
          tabBarIcon: ({ color }) => <TabBarIcon name="info-circle" color={color} />,
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
