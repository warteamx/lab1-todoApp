import { Stack } from 'expo-router';

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
          title: 'ToDo List',
        }}
      />
      <Stack.Screen
        name="newTodo"
        options={{
          title: 'Add New ToDo',
        }}
      />
      <Stack.Screen
        name="editTodo"
        options={{
          title: 'Edit ToDo',
        }}
      />
    </Stack>
  );
}
