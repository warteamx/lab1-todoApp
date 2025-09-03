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
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Edit Todo',
        }}
      />
    </Stack>
  );
}
