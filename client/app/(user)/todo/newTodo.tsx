import React, { useState } from 'react';
import { Switch } from 'react-native';
import { useCreateTodo } from '@/api/todo.api';
import { useTheme } from '@/providers/themeProvider';
import { View } from '@/components/ui/View/View';
import { Text } from '@/components/ui/Text/Text';
import { Button } from '@/components/ui/Button/Button';
import { TextInput } from '@/components/ui/Input/Input';

export default function NewTodoTab() {
  const [task, setTask] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [importance, setImportance] = useState<'low' | 'medium' | 'high'>('medium');
  const [status, setStatus] = useState<'pending' | 'in_progress' | 'completed'>(
    'pending'
  );
  const { mutate, isPending, error } = useCreateTodo();
  const { theme } = useTheme();

  const handleAddTodo = () => {
    if (!task.trim()) return;
    mutate(
      {
        task,
        is_complete: isCompleted || status === 'completed',
        importance,
        status,
      },
      {
        onSuccess: () => {
          setTask('');
          setIsCompleted(false);
          setImportance('medium');
          setStatus('pending');
        },
      }
    );
  };

  return (
    <View flex={1} padding="6xl" backgroundColor="background">
      <Text
        variant="headlineMedium"
        color="textPrimary"
        style={{ marginBottom: 24 }}
      >
        Add New ToDo
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
            onValueChange={value => {
              setIsCompleted(value);
              setStatus(value ? 'completed' : 'pending');
            }}
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
        <View>
          <Text variant="labelMedium" color="textSecondary" style={{ marginBottom: 8 }}>
            Importance
          </Text>
          <View flexDirection="row" style={{ gap: 8 }}>
            {(['low', 'medium', 'high'] as const).map(level => (
              <Button
                key={level}
                title={level}
                size="small"
                variant={importance === level ? 'primary' : 'outline'}
                onPress={() => setImportance(level)}
              />
            ))}
          </View>
        </View>

        <View>
          <Text variant="labelMedium" color="textSecondary" style={{ marginBottom: 8 }}>
            Status
          </Text>
          <View flexDirection="row" style={{ gap: 8, flexWrap: 'wrap' }}>
            {(['pending', 'in_progress', 'completed'] as const).map(nextStatus => (
              <Button
                key={nextStatus}
                title={nextStatus}
                size="small"
                variant={status === nextStatus ? 'primary' : 'outline'}
                onPress={() => {
                  setStatus(nextStatus);
                  setIsCompleted(nextStatus === 'completed');
                }}
              />
            ))}
          </View>
        </View>
        <View marginTop="lg" maxWidth={400} alignSelf="center" width="100%">
          <Button
            title="Add ToDo Task"
            variant="primary"
            size="large"
            fullWidth
            onPress={handleAddTodo}
            disabled={isPending || !task.trim()}
            loading={isPending}
          />
        </View>

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
