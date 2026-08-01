import React, { useState } from 'react';
import { ActivityIndicator, Alert, Switch } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Todo, useTodos, useUpdateTodo, useDeleteTodo } from '@/api/todo.api';
import { useTheme } from '@/providers/themeProvider';
import { View } from '@/components/ui/View/View';
import { Text } from '@/components/ui/Text/Text';
import { TextInput } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';

type EditTodoFormProps = {
  todo: Todo;
  onDelete: (id: number) => void;
  onUpdate: (data: { id: number; task: string; is_complete: boolean }) => void;
  isDeleting: boolean;
  isUpdating: boolean;
  theme: ReturnType<typeof useTheme>['theme'];
};

function EditTodoForm({
  todo,
  onDelete,
  onUpdate,
  isDeleting,
  isUpdating,
  theme,
}: EditTodoFormProps) {
  const [task, setTask] = useState(todo.task);
  const [isCompleted, setIsCompleted] = useState(todo.is_complete);

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
          onPress={() =>
            onUpdate({ id: todo.id, task, is_complete: isCompleted })
          }
          disabled={isUpdating}
          loading={isUpdating}
        />

        <Button
          title="Delete ToDo"
          variant="secondary"
          size="large"
          fullWidth
          onPress={() => onDelete(todo.id)}
          disabled={isDeleting}
          loading={isDeleting}
        />

        {(isUpdating || isDeleting) && (
          <View alignItems="center" marginTop="md">
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
    </View>
  );
}

export default function EditTodoTab() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const { id: rawId } = params || {};
  const idParam = Array.isArray(rawId) ? rawId[0] : rawId;
  const id = idParam ? Number(idParam) : undefined;
  const { data: todos, isLoading, error } = useTodos();
  const todo = typeof id === 'number' ? todos?.find(t => t.id === id) : undefined;
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  if (isLoading) {
    return (
      <View flex={1} justifyContent="center" alignItems="center" padding="lg">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View flex={1} justifyContent="center" alignItems="center" padding="lg">
        <Text variant="bodyMedium" color="textPrimary">
         Error: {(error as Error).message}
        </Text>
      </View>
    );
  }

  if (!todo) {
    return (
      <View flex={1} justifyContent="center" alignItems="center" padding="lg">
        <Text variant="bodyMedium" color="textPrimary">
         ToDo not found
        </Text>
      </View>
    );
  }

  const handleUpdate = (data: {
    id: number;
    task: string;
    is_complete: boolean;
  }) => {
    updateTodo.mutate(
      data,
      {
        onSuccess: () => router.back(),
        onError: err => Alert.alert('Error', (err as Error).message),
      }
    );
  };

  const handleDelete = (todoId: number) => {
    deleteTodo.mutate(todoId, {
      onSuccess: () => router.back(),
      onError: err => Alert.alert('Error', (err as Error).message),
    });
  };

  return (
    <EditTodoForm
      todo={todo}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
      isDeleting={deleteTodo.isPending}
      isUpdating={updateTodo.isPending}
      theme={theme}
    />
  );
}
