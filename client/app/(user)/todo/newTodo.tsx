
import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Button, TextInput, Switch } from 'react-native';
import { useCreateTodo } from '@/api/todo.api';
import { useTheme } from '@/providers/themeProvider';

export default function NewTodoTab() {
  const [task, setTask] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const { mutate, isPending, error } = useCreateTodo();
  const { theme } = useTheme();

  const handleAddTodo = () => {
    if (!task.trim()) return;
    mutate({ task, is_complete: isCompleted }, {
      onSuccess: () => {
        setTask('');
        setIsCompleted(false);
      },
    });
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: theme === 'dark' ? '#222' : '#fff' }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, color: theme === 'dark' ? '#fff' : '#222' }}>New Todo Tab</Text>
      <TextInput
        value={task}
        onChangeText={setTask}
        placeholder="Enter task"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10, color: theme === 'dark' ? '#fff' : '#222', backgroundColor: theme === 'dark' ? '#333' : '#fff' }}
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#888'}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Switch
          value={isCompleted}
          onValueChange={setIsCompleted}
        />
        <Text style={{ marginLeft: 8, color: theme === 'dark' ? '#fff' : '#222' }}>{isCompleted ? 'Completed' : 'Pending'}</Text>
      </View>
      <Button title="Add Todo" onPress={handleAddTodo} disabled={isPending} />
      {isPending && <ActivityIndicator size="large" color="#888" />}
      {error && <Text style={{ color: 'red' }}>Error: {(error as Error).message}</Text>}
    </View>
  );
}