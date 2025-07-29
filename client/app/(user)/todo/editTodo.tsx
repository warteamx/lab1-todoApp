import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTodos, useUpdateTodo, useDeleteTodo } from '@/api/todo.api';

export default function EditTodoTab() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { id: rawId } = params || {};
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const { data: todos } = useTodos();
  const todo = todos?.find(t => t.id === id);
  const [task, setTask] = useState(todo?.task || '');
  const [isCompleted, setIsCompleted] = useState(todo?.is_complete || false);
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  if (!todo) return <Text>Todo not found</Text>;

  const handleUpdate = () => {
    updateTodo.mutate(
      { id, task, is_complete: isCompleted },
      {
        onSuccess: () => router.back(),
        onError: err => Alert.alert('Error', (err as Error).message),
      }
    );
  };

  const handleDelete = () => {
    deleteTodo.mutate(id, {
      onSuccess: () => router.back(),
      onError: err => Alert.alert('Error', (err as Error).message),
    });
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>
        Edit Todo
      </Text>
      <TextInput
        value={task}
        onChangeText={setTask}
        placeholder="Edit task"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 8,
          marginBottom: 10,
        }}
      />
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
      >
        <Switch value={isCompleted} onValueChange={setIsCompleted} />
        <Text style={{ marginLeft: 8 }}>
          {isCompleted ? 'Completed' : 'Pending'}
        </Text>
      </View>
      <Button
        title="Save Changes"
        onPress={handleUpdate}
        disabled={updateTodo.isPending}
      />
      <View style={{ height: 10 }} />
      <Button
        title="Delete Todo"
        color="red"
        onPress={handleDelete}
        disabled={deleteTodo.isPending}
      />
      {(updateTodo.isPending || deleteTodo.isPending) && (
        <ActivityIndicator size="large" color="#888" />
      )}
    </View>
  );
}
