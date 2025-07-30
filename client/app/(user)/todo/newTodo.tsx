import React, { useState } from 'react';
import { ActivityIndicator, Switch } from 'react-native';
import { useCreateTodo } from '@/api/todo.api';
import { useTheme } from '@/providers/themeProvider';
import { View } from '@/components/ui/View';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button/Button';
import { TextInput } from '@/components/ui/Input';

export default function NewTodoTab() {
  const [task, setTask] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const { mutate, isPending, error } = useCreateTodo();
  const { theme } = useTheme();

  const handleAddTodo = () => {
    if (!task.trim()) return;
    mutate(
      { task, is_complete: isCompleted },
      {
        onSuccess: () => {
          setTask('');
          setIsCompleted(false);
        },
      }
    );
  };

  return (
    <View flex={1} padding="lg" backgroundColor="background">
      <Text
        variant="headlineMedium"
        color="textPrimary"
        style={{ marginBottom: 24 }}
      >
        Add New Todo
      </Text>

      <View style={{ gap: 20 }}>
        <TextInput
          label="Task"
          value={task}
          onChangeText={setTask}
          placeholder="Enter your task..."
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
            {isCompleted ? 'Mark as completed' : 'Mark as pending'}
          </Text>
        </View>

        <Button
          title="Add Todo"
          variant="primary"
          size="large"
          fullWidth
          onPress={handleAddTodo}
          disabled={isPending || !task.trim()}
          loading={isPending}
        />

        {error && (
          <View padding="md" backgroundColor="error" borderRadius="md">
            <Text variant="bodyMedium" color="textOnPrimary">
              Error: {(error as Error).message}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
