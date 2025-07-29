import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Redirect, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

// import Colors from '@/constants/colors';
import { useAuth } from '@/providers/authProvider';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session } = useAuth();

  if (!session) {
    return <Redirect href={'/'} />;
  }

  return (
    <Tabs
      screenOptions={
        {
          // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        }
      }
    >
      <Tabs.Screen name="index" options={{ href: null }} />

      <Tabs.Screen
        name="todo"
        options={{
          title: 'Todo',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="cutlery" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="ui-demo"
        options={{
          title: 'UI Demo',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="paint-brush" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="vr"
        options={{
          title: 'VR',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
