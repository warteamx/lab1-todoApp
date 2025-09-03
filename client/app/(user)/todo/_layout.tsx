import { Stack } from 'expo-router';
import { NavigationHeader } from '@/components/ui/Navigation/NavigationHeader';

export default function TodoStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // We handle headers in the parent tabs
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Todo List',
        }}
      />
      <Stack.Screen
        name="newTodo"
        options={{
          title: 'Add New Todo',
          headerShown: true,
          header: () => (
            <NavigationHeader
              title="Add New Todo"
              subtitle="Create a new task"
              showBack={true}
            />
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Edit Todo',
          headerShown: true,
          header: () => (
            <NavigationHeader
              title="Edit Todo"
              subtitle="Update your task"
              showBack={true}
            />
          ),
        }}
      />
    </Stack>
  );
}
