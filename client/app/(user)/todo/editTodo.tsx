import React, { useState } from 'react';
import { ActivityIndicator, Alert, Switch } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTodos, useUpdateTodo, useDeleteTodo } from '@/api/todo.api';
import { useTheme } from '@/providers/themeProvider';
import { View } from '@/components/ui/View/View';
import { Text } from '@/components/ui/Text/Text';
import { TextInput } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';

export default function EditTodoTab() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const { id: rawId } = params || {};
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const { data: todos } = useTodos();
  const todo = todos?.find(t => t.id === id);
  const [task, setTask] = useState(todo?.task || '');
  const [isCompleted, setIsCompleted] = useState(todo?.is_complete || false);
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  if (!todo) {
    return (
      <View flex={1} justifyContent="center" alignItems="center" padding="lg">
        <Text variant="bodyMedium" color="textPrimary">
          ToDo not found
        </Text>
      </View>
    );
  }

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
    <View flex={1} padding="lg" backgroundColor="background">
      <Text
        variant="headlineMedium"
        color="textPrimary"
        style={{ marginBottom: 24 }}
      >
        Edit ToDo
      </Text>

      <View style={{ gap: 20 }}>
        <TextInput
          label="Task"
          value={task}
          onChangeText={setTask}
          placeholder="Edit task"
          variant="outline"
          size="medium"
        />

        <View flexDirection="row" alignItems="center" style={{ gap: 12 }}>
          <Switch
            value={isCompleted}
            onValueChange={setIsCompleted}
            trackColor={{
              false: theme.colors.neutral300,
              true: theme.colors.interactive,
            }}
            thumbColor={
              isCompleted ? theme.colors.surface : theme.colors.neutral100
            }
          />
          <Text variant="bodyMedium" color="textPrimary">
            {isCompleted ? 'Completed' : 'Pending'}
          </Text>
        </View>

        <Button
          title="Save Changes"
          variant="primary"
          size="large"
          fullWidth
          onPress={handleUpdate}
          disabled={updateTodo.isPending}
          loading={updateTodo.isPending}
        />

        <Button
          title="Delete ToDo"
          variant="secondary"
          size="large"
          fullWidth
          onPress={handleDelete}
          disabled={deleteTodo.isPending}
          loading={deleteTodo.isPending}
        />

        {(updateTodo.isPending || deleteTodo.isPending) && (
          <View alignItems="center" marginTop="md">
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
    </View>
  );
}
